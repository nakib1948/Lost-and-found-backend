import { jwtToken } from "./../../utils/jwtToken";
import { PrismaClient } from "@prisma/client";
import config from "../../config";

const prisma = new PrismaClient();
const getProfile = async (token: string) => {
  const decoded = jwtToken.verifyToken(token, config.jwt_secret as string);
  const getUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: decoded.email,
    },
  });
  if (!getUser) {
    throw new Error("User not found");
  }
  const result = await prisma.userProfile.findFirstOrThrow({
    where: {
      userId: getUser.id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return result;
};
const updateProfile = async (token: string, data) => {
  const decoded = jwtToken.verifyToken(token, config.jwt_secret as string);
  const { name, email, ...rest } = data;
  const getUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: decoded.email,
    },
  });
  if (!getUser) {
    throw new Error("User not found");
  }
  const getUserProfile = await prisma.userProfile.findFirstOrThrow({
    where: {
      userId: getUser.id,
    },
  });
  await prisma.user.update({
    where: {
      id: getUser.id,
    },
    data: { name, email },
  });
  const result = await prisma.userProfile.update({
    where: {
      id: getUserProfile.id,
    },
    data: rest,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
  console.log(result);
  const accessToken = jwtToken.generateToken(
    {
      email: result.user.email,
      role: result.user.role,
    },
    config.jwt_secret as string,
    config.expires_in as string
  );
  return { result, token: accessToken };
};

export const profileServices = {
  getProfile,
  updateProfile,
};

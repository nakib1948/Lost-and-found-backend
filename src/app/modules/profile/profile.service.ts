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
export const profileServices = {
  getProfile,
};

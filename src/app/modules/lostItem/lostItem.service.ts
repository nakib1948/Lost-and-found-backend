import { PrismaClient } from "@prisma/client";
import { jwtToken } from "../../utils/jwtToken";
import config from "../../config";

const prisma = new PrismaClient();
const createLostItem = async (payload, token: any) => {
  const decoded = jwtToken.verifyToken(token, config.jwt_secret as string);
  const getUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: decoded.email,
    },
  });
  if (!getUser) {
    throw new Error("User not found");
  }

  payload.userId = getUser.id;

  const result = await prisma.lostItem.create({
    data: payload,
  });

  return result;
};
const getLostItem = async (token: string) => {
  const decoded = jwtToken.verifyToken(token, config.jwt_secret as string);
  const getUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: decoded.email,
    },
  });
  if (!getUser) {
    throw new Error("User not found");
  }
  const result = await prisma.lostItem.findMany({
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
export const lostItemService = {
  createLostItem,
  getLostItem,
};

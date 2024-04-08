import { PrismaClient } from "@prisma/client";
import { Iitem } from "./foundItem.interface";
import { jwtToken } from "../../utils/jwtToken";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";

const prisma = new PrismaClient();
const createFoundItem = async (payload, token: any) => {
  const decoded = jwtToken.verifyToken(token, config.jwt_secret as string);
  const getUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: decoded.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!getUser) {
    throw new Error("User not found");
  }
  const getCategory = await prisma.foundItemCategory.findUniqueOrThrow({
    where: {
      id: payload.categoryId,
    },
  });
  if (!getCategory) {
    throw new Error("Category not found");
  }
  payload.userId = getUser.id;

  const result = await prisma.foundItem.create({
    data: payload,
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
      category: true,
    },
  });

  return result;
};

const getFoundItem = async () => {
  const result = await prisma.foundItem.findMany({
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
      category: true,
    },
  });
  return result;
};

export const foundItemService = {
  createFoundItem,
  getFoundItem,
};

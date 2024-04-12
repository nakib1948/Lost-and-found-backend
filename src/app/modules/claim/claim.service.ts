import { jwtToken } from "./../../utils/jwtToken";
import { PrismaClient } from "@prisma/client";
import config from "../../config";

const prisma = new PrismaClient();
const createClaim = async (payload, token: string) => {
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

  const result = await prisma.claim.create({
    data: payload,
  });

  return result;
};

const getAllClaim = async (token: string) => {
  const decoded = jwtToken.verifyToken(token, config.jwt_secret as string);
  const getUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: decoded.email,
    },
  });
  if (!getUser) {
    throw new Error("User not found");
  }
  const result = await prisma.claim.findMany({
    include: {
      foundItem: {
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
      },
    },
  });

  return result;
};

export const claimServices = {
  createClaim,
  getAllClaim,
};

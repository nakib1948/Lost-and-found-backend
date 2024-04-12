import { PrismaClient } from "@prisma/client";
import { jwtToken } from "../../utils/jwtToken";
import config from "../../config";
import { Iclaim } from "./claim.interface";

const prisma = new PrismaClient();
const createClaim = async (payload, token: any) => {
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

  payload.userId = getUser.id;

  const result = await prisma.claim.create({
    data: payload,
  });

  return result;
};

export const claimServices = {
  createClaim,
};

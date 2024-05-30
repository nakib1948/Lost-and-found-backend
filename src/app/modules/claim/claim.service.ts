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
    where: {
      userId: getUser.id,
    },
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
        },
      },
    },
  });
  const importantdata = result.map((data) => ({
    id: data.id,
    itemName: data.foundItem.foundItemName,
    category: data.foundItem.itemCategory,
    location: data.foundItem.location,
    phone: data.foundItem.phone,
    email: data.foundItem.email,
    status: data.status,
  }));

  return importantdata;
};
const getSingleProductClaim = async (token: string, id: string) => {
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
    where: {
      foundItemId: id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  const approvedCheck = await prisma.claim.findMany({
    where: {
      foundItemId: id,
      status: "APPROVED",
    },
  });
  const importantdata = result.map((data) => ({
    id: data.id,
    name: data.user.name,
    email: data.user.email,
    lostDate: data.lostDate,
    phone: data.phone,
    request: data.claimRequest,
    status: data.status,
    image: data.imageProf,
  }));

  return { data: importantdata, checkStatus: approvedCheck };
};

const updateClaimStatus = async (token: string, data) => {
  const decoded = jwtToken.verifyToken(token, config.jwt_secret as string);
  const getUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: decoded.email,
    },
  });
  if (!getUser) {
    throw new Error("User not found");
  }
  const result = await prisma.$transaction(async (transactionClient) => {
    const result = await transactionClient.claim.update({
      where: {
        id: data.id,
      },
      data: {
        status: "APPROVED",
      },
    });

    await transactionClient.claim.updateMany({
      where: {
        foundItemId: data.foundItemId,
        status: "PENDING",
      },
      data: {
        status: "REJECTED",
      },
    });

    await transactionClient.foundItem.update({
      where: {
        id: data.foundItemId,
      },
      data: {
        status: "Found",
      },
    });
    return result;
  });
  return result;
};

export const claimServices = {
  createClaim,
  getAllClaim,
  updateClaimStatus,
  getSingleProductClaim,
};

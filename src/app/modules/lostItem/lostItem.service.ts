import { PrismaClient } from "@prisma/client";
import { jwtToken } from "../../utils/jwtToken";
import config from "../../config";
import { calculatePagination } from "../../utils/pagination";
import { itemSearchAbleFields } from "./lostItem.constant";

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

const getAllLostItem = async (query: any, options: any) => {
  const { searchTerm, ...filterData } = query;
  const { limit, page, skip } = calculatePagination(options);
  const allQuery = [];

  if (query.searchTerm) {
    allQuery.push({
      OR: itemSearchAbleFields.map((properites) => ({
        [properites]: {
          contains: query.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    allQuery.push({
      AND: Object.keys(filterData).map((properties) => ({
        [properties]: {
          equals: filterData[properties],
        },
      })),
    });
  }

  const result = await prisma.lostItem.findMany({
    where: {
      AND: allQuery,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: "desc" },
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
  const total = await prisma.lostItem.count({
    where: {
      AND: allQuery,
    },
  });
  return {
    meta: { page, limit, total },
    data: result,
  };
};

const updateLostItemStatus = async (token: string, data:any) => {
  const decoded = jwtToken.verifyToken(token, config.jwt_secret as string);
  const getUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: decoded.email,
    },
  });
  if (!getUser) {
    throw new Error("User not found");
  }
  const result = await prisma.lostItem.update({
    where: {
      id: data.id,
    },
    data: { foundStatus:"FOUND" },
  });

  return result;
};


export const lostItemService = {
  createLostItem,
  getLostItem,
  getAllLostItem,
  updateLostItemStatus
};

import { PrismaClient } from "@prisma/client";
import { jwtToken } from "../../utils/jwtToken";
import config from "../../config";
import { calculatePagination } from "../../utils/pagination";
import { itemSearchAbleFields } from "./foundItem.constant";
import { Iitem } from "./foundItem.interface";

const prisma = new PrismaClient();
const createFoundItem = async (payload: Iitem, token: any) => {
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
    },
  });

  return result;
};

const getFoundItem = async (query: any, options: any) => {
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

  const result = await prisma.foundItem.findMany({
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
  const total = await prisma.foundItem.count({
    where: {
      AND: allQuery,
    },
  });
  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getUserFoundItem = async (token: string) => {
  const decoded = jwtToken.verifyToken(token, config.jwt_secret as string);
  const getUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: decoded.email,
    },
  });
  if (!getUser) {
    throw new Error("User not found");
  }
  const result = await prisma.foundItem.findMany({
    where: {
      userId: getUser.id,
    },
  });

  return result;
};

export const foundItemService = {
  createFoundItem,
  getFoundItem,
  getUserFoundItem
};

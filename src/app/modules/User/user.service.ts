import { PrismaClient } from "@prisma/client";
import { jwtToken } from "../../utils/jwtToken";
import config from "../../config";

const prisma = new PrismaClient();
const createUser = async (data: any) => {
  const { profile, ...userData } = data;
  const result = await prisma.$transaction(async (transactionClient) => {
    const createuser = await transactionClient.user.create({
      data: userData,
    });
    const createUserProfile = await transactionClient.userProfile.create({
      data: {
        userId: createuser.id,
        ...profile,
      },
    });

    const user = {
      ...createuser,
      profile: createUserProfile,
    };

    return user;
  });
  return result;
};
const getAllUser = async (token: string) => {
  const decoded = jwtToken.verifyToken(token, config.jwt_secret as string);
  const getUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: decoded.email,
      role: "ADMIN"
    },
  });
  if (!getUser) {
    throw new Error("User not found");
  }
  const result = await prisma.user.findMany({});
  return result;
};

const updateUserStatus = async (token: string, data) => {
  const decoded = jwtToken.verifyToken(token, config.jwt_secret as string);
  console.log(data)
  const getUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: decoded.email,
    },
  });
  if (!getUser) {
    throw new Error("User not found");
  }
  const result = await prisma.user.update({
    where: {
      id: data.id,
    },
    data: { isDeleted:data.status },
  });

  return result;
};
const getAllStatistics = async (token: string) => {
  const decoded = jwtToken.verifyToken(token, config.jwt_secret as string);
  const getUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: decoded.email,
    },
  });
  if (!getUser) {
    throw new Error("User not found");
  }
  
  const totalFoundItem = await prisma.foundItem.count({})
  const totalLostItem = await prisma.lostItem.count({})
  const totalUser = await prisma.user.count({})
  const totalBlockUser = await prisma.user.count({
    where:{
      isDeleted:"block"
    }
  })
  const ownerFound = await prisma.foundItem.count({
    where:{
      status:"Found"
    }
  })
  const result ={totalFoundItem,totalLostItem,totalUser,totalBlockUser,ownerFound}
  return result;
};

export const userService = {
  createUser,
  getAllUser,
  updateUserStatus,
  getAllStatistics
};

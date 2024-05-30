import { PrismaClient } from "@prisma/client";

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



export const userService = {
  createUser,
};

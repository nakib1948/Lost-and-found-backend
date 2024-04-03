import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const createUser = async (data: any) => {
  console.log("data")
};

export const userService = {
  createUser,
};

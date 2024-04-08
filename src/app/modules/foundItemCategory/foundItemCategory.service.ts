import { PrismaClient } from "@prisma/client";
import { Icategory } from "./foundItemCategory.interface";

const prisma = new PrismaClient();
const createCategory = async (payload: Icategory) => {
  const result = await prisma.foundItemCategory.create({
    data: payload,
  });

  return result;
};

export const categoryService = {
  createCategory,
};

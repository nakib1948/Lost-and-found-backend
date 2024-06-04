import { PrismaClient } from "@prisma/client";
import { Ilogin } from "./auth.interface";
import config from "../../config";
import { jwtToken } from "../../utils/jwtToken";

const prisma = new PrismaClient();
const login = async (payload: Ilogin) => {
  const { email, password } = payload;
  const userExist = await prisma.user.findUniqueOrThrow({
    where: { email, isDeleted: "unblock" },
  });
  if (userExist.password !== password)
    throw new Error("Password don't matched");

  const accessToken = jwtToken.generateToken(
    {
      email: userExist.email,
      role: userExist.role,
    },
    config.jwt_secret as string,
    config.expires_in as string
  );
  return {
    id: userExist.id,
    name: userExist.name,
    email: userExist.email,
    token: accessToken,
  };
};

export const authService = {
  login,
};

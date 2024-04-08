import { NextFunction, Request, Response } from "express";
import config from "../config";
import { Secret } from "jsonwebtoken";
import { jwtToken } from "../utils/jwtToken";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("You are not authorized");
      }
      const verifiedUser = jwtToken.verifyToken(
        token,
        config.jwt_secret as Secret
      );
      if (!verifiedUser) {
        throw new Error("You are not authorized");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;

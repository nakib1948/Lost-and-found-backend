import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import handleZodError from "../errors/zodError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = err.message || "Something went wrong!";
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    message = simplifiedError?.message;
  }
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message,
    errorDetails: err,
  });
};

export default globalErrorHandler;

import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { claimServices } from "./claim.service";

const createClaim = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await claimServices.createClaim(req.body, token);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Claim created successfully",
    data: result,
  });
});

export const claimController = {
  createClaim,
};

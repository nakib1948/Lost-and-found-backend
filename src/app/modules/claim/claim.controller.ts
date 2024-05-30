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
const getAllClaim = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await claimServices.getAllClaim(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Claim retrieved successfully",
    data: result,
  });
});
const getSingleProductClaim = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await claimServices.getSingleProductClaim(token,req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Claim retrieved successfully",
    data: result,
  });
});
const updateClaimStatus = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const result = await claimServices.updateClaimStatus(token,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Claim updated successfully",
    data: result,
  });
});

export const claimController = {
  createClaim,
  getAllClaim,
  updateClaimStatus,
  getSingleProductClaim
};

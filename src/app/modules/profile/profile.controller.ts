import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { profileServices } from "./profile.service";


const getProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const result = await profileServices.getProfile(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile retrieved successfully",
    data: result,
  });
});

export const profileController = {
    getProfile
};

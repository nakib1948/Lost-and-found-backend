import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { profileServices } from "./profile.service";
import { userService } from "../User/user.service";

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
const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;

  const result = await profileServices.updateProfile(token, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});

const updatePassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;

  const result = await profileServices.updatePassword(token, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "password updated successfully",
    data: result,
  });
});

export const profileController = {
  getProfile,
  updateProfile,
  updatePassword
};

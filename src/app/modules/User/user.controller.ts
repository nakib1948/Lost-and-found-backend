import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const result = await userService.getAllUser(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All user retrieved successfully",
    data: result,
  });
});
const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const result = await userService.updateUserStatus(token,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user status updated successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  getAllUser,
  updateUserStatus
};

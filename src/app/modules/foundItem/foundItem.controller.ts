import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { foundItemService } from "./foundItem.service";

const createFoundItem = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await foundItemService.createFoundItem(req.body, token);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Found item reported successfully",
    data: result,
  });
});
const getFoundItem = catchAsync(async (req: Request, res: Response) => {
  
  const result = await foundItemService.getFoundItem();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Found item retrieved successfully",
    data: result,
  });
});

export const foundItemController = {
  createFoundItem,
  getFoundItem
};

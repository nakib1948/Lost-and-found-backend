import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { lostItemService } from "./lostItem.service";

const createLostItem = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await lostItemService.createLostItem(req.body, token);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Lost item reported successfully",
    data: result,
  });
});


export const lostItemController = {
    createLostItem,
};

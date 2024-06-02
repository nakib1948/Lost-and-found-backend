import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { lostItemService } from "./lostItem.service";
import pick from "../../utils/pick";
import { itemFilterableFields } from "./lostItem.constant";

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

const getLostItem = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const result = await lostItemService.getLostItem(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "lost item retrieved successfully",
    data: result,
  });
});

const getAllLostItem = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, itemFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await lostItemService.getAllLostItem(filters, options);
  const { meta, data } = result;
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Lost item retrieved successfully",
    meta,
    data,
  });
});
const updateLostItemStatus = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const result = await lostItemService.updateLostItemStatus(token,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lost Item status updated successfully",
    data: result,
  });
});

export const lostItemController = {
    createLostItem,
    getLostItem,
    getAllLostItem,
    updateLostItemStatus
};

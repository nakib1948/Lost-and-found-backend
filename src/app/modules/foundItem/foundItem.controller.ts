import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { foundItemService } from "./foundItem.service";
import pick from "../../utils/pick";
import { itemFilterableFields } from "./foundItem.constant";

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
  const filters = pick(req.query, itemFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await foundItemService.getFoundItem(filters, options);
  const { meta, data } = result;
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Found item retrieved successfully",
    meta,
    data,
  });
});

const getUserFoundItem = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const result = await foundItemService.getUserFoundItem(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "found item retrieved successfully",
    data: result,
  });
});

export const foundItemController = {
  createFoundItem,
  getFoundItem,
  getUserFoundItem,
};

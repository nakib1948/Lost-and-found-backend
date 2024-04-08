import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { categoryService } from "./foundItemCategory.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.createCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Found item category created successfully",
    data: result,
  });
});

export const categoryController = {
    createCategory,
};

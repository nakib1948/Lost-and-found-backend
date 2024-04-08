import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";



const login:RequestHandler = catchAsync(async(req,res)=>{
   const result = await authService.login(req.body);

   sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"User logged in successfully",
      data:result
   })
})

export const authController = {
    login
}
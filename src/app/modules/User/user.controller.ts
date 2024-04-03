import { Request, Response } from "express";
import { userService } from "./user.service";


const createUser = async(req:Request,res:Response)=> {
    const result =await userService.createUser(req.body);
    try {
        res.status(200).json({
            success: true,
            message: "Admin Created successfully!",
            data:result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error?.name || "Something went wrong",
            error: error
        })
    }
    
}

export const userController ={
    createUser
}
import status from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";


// const createUser = async(req:Request, res:Response) =>{

// try {
//     const payload = req.body;
//     const user = await userService.registerUser(payload)
//     res.status(status.CREATED).json({message:"User Registered", data:{user}})

// } catch (error) {
//     res.status(status.INTERNAL_SERVER_ERROR).json({
//     success:false,
//     statusCode:status.INTERNAL_SERVER_ERROR,
//     message:"Failed to register user",
//     error:(error as Error).message
//     })
// }
// }

const createUser = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUser(payload)

    res.status(status.CREATED).json({
        success:true,
        statusCode: status.CREATED,
        message:"User registered successfully",
        data: {
            user
        }
    })
})

export const userController = {
    createUser
}
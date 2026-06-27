import status from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
// import {} from "../../utils/jwt"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

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

    // res.status(status.CREATED).json({
    //     success:true,
    //     statusCode: status.CREATED,
    //     message:"User registered successfully",
    //     data: {
    //         user
    //     }
    // })

    sendResponse(res, {
        success:true,
        statusCode: status.CREATED,
        message: "User Registered Successfully",
        data: {user}
    })
})

const getProfile = catchAsync(async(req:Request, res:Response) =>{
    const cookies = req.cookies;
    
    const {accessToken} = cookies;

    // const verifiedToken = jwt.verify(accessToken, config.jwt_access_secret)

    // console.log(verifiedToken);

    const verifiedToken = jwtUtils.verifiedToken(accessToken, config.jwt_access_secret)

    if(typeof verifiedToken === "string"){
        throw new Error (verifiedToken)
    }


    const profile = await userService.getProfileService(verifiedToken.id)

    // res.send(verifiedToken)

    sendResponse(res, {
        success:true,
        statusCode:status.OK,
        message:"Profile Fetched successfully",
        data: {profile}
    })
})

export const userController = {
    createUser,
    getProfile
}
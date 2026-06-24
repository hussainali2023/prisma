import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import status from "http-status";
import { Request, Response } from "express";
import config from "../../config";
import { userService } from "./user.service";

const createUser = async(req:Request, res:Response) =>{

try {
    const payload = req.body;
const user = await userService.registerUser(payload)



    res.status(status.CREATED).json({message:"User Registered", data:{user}})

} catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
        success:false,
        statusCode:status.INTERNAL_SERVER_ERROR,
        message:"Failed to register user",
        error:(error as Error).message
    })
}
}

export const userController = {
    createUser
}
import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import config from "../../config"
import { RegisterUserPayload } from "./user.interface"
import { NextFunction, Request, RequestHandler, Response } from "express"
import status from "http-status"


const registerUser = async (payload:RegisterUserPayload) =>{

    const {name, email, password, profilePhoto} = payload

        const isUserExist = await prisma.user.findUnique({
        where: {email}
    })

    if(isUserExist){
        throw new Error("User with this email already exists")
    }
    const hashpassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

    const createdUser = await prisma.user.create({
        data: {
        name,
        email,
        password: hashpassword,
        profile: {
            create: {
                profilePhoto
            }
        }
        }
    })

    // await prisma.profile.create({
    //     data: {
    //         userId: createdUser.id,
    //         profilePhoto:profilePhoto
    //     }
    // })

    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email || email
        },
        omit: {
            password:true
        },
        include: {
            profile:true
        }
    })

    return user;
}

export const userService = {
    registerUser
}
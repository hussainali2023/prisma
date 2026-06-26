import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface"

const loginUser = async(payload: ILoginUser) => {
    const {email, password} = payload;

    // check the user exists or not 
    // const user = await prisma.user.findUnique({
    //     where: {email}
    // })

    // if(!user){
    //     throw new Error("User not found")
    // }

    const user = await prisma.user.findUniqueOrThrow({
        where: {email},
    })

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if(!isPasswordMatched){
        throw new Error("Password is not correct")
    }

    return user;
}

export const authService = {
    loginUser
}
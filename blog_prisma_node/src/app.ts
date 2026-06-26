import cookieParser from "cookie-parser"
import express, { type Application, type Request, type Response } from "express"
import cors from "cors"
import { status } from "http-status"
import { prisma } from "./lib/prisma"
import bcrypt from "bcryptjs"
import config from "./config"
import { userRoutes } from "./modules/users/user.route"
import { authRoutes } from "./modules/auth/auth.route"


const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/", (req: Request, res:Response) =>{
    res.send("Hello World")
})

app.use("/api/v1/users", userRoutes)
app.use("/api/v1/auth", authRoutes)


export default app;
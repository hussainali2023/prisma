import cookieParser from "cookie-parser"
import express, { type Application, type Request, type Response } from "express"
import cors from "cors"
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/", (req: Request, res:Response) =>{
    res.send("Hello World")
})


export default app;
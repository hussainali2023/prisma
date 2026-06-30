import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import status from "http-status";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

router.post("/register", userController.createUser)
router.get("/me", (req:Request, res:Response, next: NextFunction)=> {
      const cookies = req.cookies;
      
      const {accessToken} = cookies;
  
      // const verifiedToken = jwt.verify(accessToken, config.jwt_access_secret)
  
      // console.log(verifiedToken);
  
      const verifiedToken = jwtUtils.verifiedToken(accessToken, config.jwt_access_secret)


  
      if(typeof verifiedToken === "string"){
          throw new Error (verifiedToken)
      }

    const {name, email, role, id} = verifiedToken;

    //   const requiredRoles = ["ADMIN", "USER", "AUTHOR"]
    const requiredRoles = [Role.ADMIN, Role.USER]

    if(!requiredRoles.includes(role)){
        return res.status(403).json({
            success:false,
            statusCode:status.FORBIDDEN,
            message:"Sorry! You don't have the permission"
        })
    }

    next();
},  userController.getProfile)

export const userRoutes: Router = router;
import express from "express"
import { loginUser, registerUser } from "../controllers/UserController.js"

const userRouter = express.Router()

// we need data of user like email password 

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)

export default userRouter
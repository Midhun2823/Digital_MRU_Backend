import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/AdminController.js";

const adminRouter = express.Router()

// we need data of user like email password 

adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);

export default adminRouter;
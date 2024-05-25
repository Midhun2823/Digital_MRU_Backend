import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  cancelOrder,
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
} from "../controllers/OrderController.js";

// using this express we create router
const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/updatestatus", updateStatus);
orderRouter.post("/cancelorder", cancelOrder);
 
export default orderRouter;

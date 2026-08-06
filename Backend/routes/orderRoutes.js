import express from "express";

import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js"; 

const router = express.Router();

// User
router.post("/", protect, placeOrder);
router.get("/my",  protect, getMyOrders);

// Admin (for now only protected by login)
router.get("/",  protect, getAllOrders);
router.put("/:id",  protect, updateOrderStatus);

export default router;
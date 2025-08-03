const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} = require("../controllers/orderController");
const { protect, farmer } = require("../middlewares/auth");

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id", protect, farmer, updateOrderToPaid);
router.put("/:id", protect, farmer, updateOrderToDelivered);

// Admin route
router.get("/", protect, getOrders);

module.exports = router;

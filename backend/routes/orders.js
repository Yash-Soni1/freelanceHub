// routes/orders.js
const router = require("express").Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} = require("../controllers/orderController");

// Create new order (client)
router.post("/", verifyToken, createOrder);

// Get logged-in user's orders
router.get("/my", verifyToken, getMyOrders);

// Get order by ID
router.get("/:id", verifyToken, getOrderById);

// Update order status (freelancer/admin)
router.put("/:id/status", verifyToken, updateOrderStatus);

// Delete order
router.delete("/:id", verifyToken, deleteOrder);

module.exports = router;

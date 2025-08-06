// controllers/orderController.js
const Order = require("../models/Order");

// @desc Create a new order
// @route POST /api/orders
// @access Private
const createOrder = async (req, res) => {
  try {
    const order = new Order({
      client: req.user._id,
      gig: req.body.gig,
      freelancer: req.body.freelancer,
      price: req.body.price,
      status: "pending"
    });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: "Error creating order", error: err.message });
  }
};

// @desc Get orders for logged-in user
// @route GET /api/orders/my
// @access Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ client: req.user._id })
      .populate("gig", "title price")
      .populate("freelancer", "username email");

    // Transform data to match what frontend needs
    const formattedOrders = orders.map(order => ({
      id: order._id,
      gigTitle: order.gig?.title || "Untitled Gig",
      price: order.gig?.price || order.price || 0,
      freelancer: order.freelancer?.username || "Unknown Freelancer",
      status: order.status
    }));

    res.json(formattedOrders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};


// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("gig")
      .populate("client", "username email")
      .populate("freelancer", "username email");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order", error: err.message });
  }
};

// @desc Update order status
// @route PUT /api/orders/:id/status
// @access Private
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status || order.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Error updating order", error: err.message });
  }
};

// @desc Delete order
// @route DELETE /api/orders/:id
// @access Private
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await order.deleteOne();
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting order", error: err.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};

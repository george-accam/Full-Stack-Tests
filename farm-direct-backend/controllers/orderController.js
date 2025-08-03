// controllers/orderController.js
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

// @desc    Create new order
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // Calculate total and verify products
    let totalAmount = 0;
    const orderItems = [];
    const farmerIds = new Set();

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.product}` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough quantity for product: ${product.name}`,
        });
      }

      farmerIds.add(product.farmer.toString());

      totalAmount += product.price * item.quantity;

      orderItems.push({
        product: item.product,
        quantity: item.quantity,
        priceAtPurchase: product.price,
      });
    }

    // For simplicity, we assume one farmer per order
    if (farmerIds.size !== 1) {
      return res.status(400).json({
        message: "All products must be from the same farmer",
      });
    }

    const farmerId = Array.from(farmerIds)[0];

    // Create order
    const order = new Order({
      customer: req.user.id,
      farmer: farmerId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    // Save order and update product quantities
    const createdOrder = await order.save();

    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { quantity: -item.quantity },
      });
    }

    res.status(201).json(createdOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "name email")
      .populate("farmer", "name email")
      .populate("items.product", "name image");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the user is either the customer or the farmer
    if (
      order.customer._id.toString() !== req.user.id &&
      order.farmer._id.toString() !== req.user.id
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(500).send("Server error");
  }
};

// Update order to paid
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the user is the farmer
    if (order.farmer.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    order.status = "processing";
    order.updatedAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Farmer
const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the user is the farmer
    if (order.farmer.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    order.status = "delivered";
    order.updatedAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    let orders;

    if (req.user.role === "customer") {
      orders = await Order.find({ customer: req.user.id })
        .populate("farmer", "name")
        .sort({ createdAt: -1 });
    } else {
      orders = await Order.find({ farmer: req.user.id })
        .populate("customer", "name")
        .sort({ createdAt: -1 });
    }

    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("customer", "name")
      .populate("farmer", "name")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};

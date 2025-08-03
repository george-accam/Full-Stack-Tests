// controllers/productController.js
const Product = require("../models/Product");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query)
      .populate("farmer", "name email phone")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "farmer",
      "name email phone"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).send("Server error");
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Farmer
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, expiryDate } =
      req.body;

    const farmer = await User.findById(req.user.id);
    if (!farmer || farmer.role !== "farmer") {
      return res.status(401).json({ message: "Not authorized as a farmer" });
    }

    let imagePath = "";
    if (req.file) {
      imagePath = req.file.path;
    } else {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      quantity,
      expiryDate,
      image: imagePath,
      farmer: req.user.id,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Farmer
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, expiryDate } =
      req.body;

    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product belongs to the farmer
    if (product.farmer.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    let imagePath = product.image;
    if (req.file) {
      // Delete old image
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      imagePath = req.file.path;
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        quantity,
        expiryDate,
        image: imagePath,
      },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Farmer
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product belongs to the farmer
    if (product.farmer.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Delete product image
    if (fs.existsSync(product.image)) {
      fs.unlinkSync(product.image);
    }

    await product.remove();
    res.json({ message: "Product removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).send("Server error");
  }
};

// @desc    Get farmer's products
// @route   GET /api/products/farmer/:id
// @access  Public
const getFarmerProducts = async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.params.id })
      .populate("farmer", "name email phone")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFarmerProducts,
};

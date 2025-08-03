// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFarmerProducts,
} = require("../controllers/productController");
const { protect, farmer } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/farmer/:id", getFarmerProducts);

// Protected farmer routes
router.post("/", protect, farmer, upload.single("image"), createProduct);
router.put("/:id", protect, farmer, upload.single("image"), updateProduct);
router.delete("/:id", protect, farmer, deleteProduct);

module.exports = router;

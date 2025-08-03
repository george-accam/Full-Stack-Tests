// app.js
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Load env vars
dotenv.config();

// Route files
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Mount routers
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

module.exports = app;

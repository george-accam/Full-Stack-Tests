const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
const register = async (req, res) => {
  const { name, email, password, role, address, phone } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
      role,
      address,
      phone,
    });

    await user.save();

    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ 
            message: "User registered successfully",
            user: { 
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
                phone: user.phone
            },  
            token 
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error" + err.message);
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        res.json({
          message: "User login successfully",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            address: user.address,
            phone: user.phone,
          },
          token,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get current user
const getMe = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      message: "User retrieved successfully",
      user: { 
        id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        address: user?.address,
        phone: user?.phone,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error" + err.message);
  }
};

module.exports = {
  register,
  login,
  getMe,
};

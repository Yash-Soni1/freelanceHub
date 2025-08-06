// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "User not found" });
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const isFreelancer = (req, res, next) => {
  if (req.user && req.user.role === "freelancer") {
    return next();
  }
  return res.status(403).json({ message: "Not authorized as a freelancer" });
};

module.exports = { verifyToken, isFreelancer };

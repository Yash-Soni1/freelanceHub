// routes/authRoutes.js
const router = require("express").Router();
const {
  register,
  login,
  updateUsername,
  updatePassword,
  deleteAccount
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.put("/update-username", verifyToken, updateUsername);
router.put("/update-password", verifyToken, updatePassword);
router.delete("/delete-account", verifyToken, deleteAccount);

module.exports = router;

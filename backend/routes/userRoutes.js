const express = require("express");
const router = express.Router();
// import middleware to protect route
const { protect } = require("../middleware/authMiddleware");

// Import Controllers
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;

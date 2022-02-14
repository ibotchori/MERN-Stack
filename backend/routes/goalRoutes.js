const express = require("express");
const router = express.Router();

// import middleware to protect route
const { protect } = require("../middleware/authMiddleware");

// Import Controllers
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController");

// Merge routes with same URL in one line
router.route("/").get(protect, getGoals).post(protect, setGoals);
router.route("/:id").put(protect, updateGoals).delete(protect, deleteGoals);

module.exports = router;

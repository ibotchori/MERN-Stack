const express = require("express");
const router = express.Router();

// get goals
router.get("/", (req, res) => {
  res.status(200).json({ message: "Get Goals" });
});

// Create Goal
router.post("/", (req, res) => {
  res.status(200).json({ message: "Set Goal" });
});

// Update Goal
router.put("/:id", (req, res) => {
  res.status(200).json({ message: `Update Goal ${req.params.id}` });
});

// Delete Goal
router.delete("/:id", (req, res) => {
  res.status(200).json({ message: `Delete Goal ${req.params.id}` });
});

module.exports = router;

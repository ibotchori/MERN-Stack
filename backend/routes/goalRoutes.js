const express = require("express");
const router = express.Router();

// Import Controllers
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController");

// Merge routes with same URL in one line
router.route('/').get(getGoals).post(setGoals)
router.route('/:id').put(updateGoals).delete(deleteGoals)




module.exports = router;

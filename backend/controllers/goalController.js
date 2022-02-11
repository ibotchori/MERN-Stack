// @desc Get all goals
// @route GET /api/goals
// @access Private
const getGoals = (req, res) => {
  res.status(200).json({ message: "Get Goals" });
};

// @desc Set goal
// @route PUT /api/goals/:id
// @access Private
const setGoals = (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "Set Goals" });
};

// @desc  Update Goal
// @route GET /api/goals
// @access Private
const updateGoals = (req, res) => {
  res.status(200).json({ message: `Update Goal ${req.params.id}` });
};

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoals = (req, res) => {
  res.status(200).json({ message: `Delete Goal ${req.params.id}` });
};

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};

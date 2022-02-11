// import express async handler to use it instead of try catch
const asyncHandler = require("express-async-handler");
// import goal model
const Goal = require("../model/goalModel");

// @desc Get all goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  // get all goals from database
  const goals = await Goal.find();
  // show goals on response
  res.status(200).json(goals);
});

// @desc Set goal
// @route PUT /api/goals/:id
// @access Private
const setGoals = asyncHandler(async (req, res) => {
  // check request body (text field)
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  // create goal
  const goal = await Goal.create({
    text: req.body.text,
  });
  //  see created goal on response
  res.status(200).json(goal);
});

// @desc  Update Goal
// @route GET /api/goals
// @access Private
const updateGoals = asyncHandler(async (req, res) => {
  // get goal from database by id
  const goal = await Goal.findById(req.params.id);
  // if not found trow error
  if (!goal) {
    res.status(200);
    throw new Error("Goal not found");
  }
  // update goal
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  // see updated goal on response
  res.status(200).json(updatedGoal);
});

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};

// import express async handler to use it instead of try catch
const asyncHandler = require("express-async-handler");
// import goal model
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc Get all goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  // get specific user's goals from database
  const goals = await Goal.find({ user: req.user.id });
  // show user's goals on response
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
  // creating a specific user goals
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
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
  // if no goal found, trow the error
  if (!goal) {
    res.status(200);
    throw new Error("Goal not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure the logged in user matches the goals user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User nos authorized");
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
  // get goal from database by id
  const goal = await Goal.findById(req.params.id);
  // if no goal found, trow the error
  if (!goal) {
    res.status(200);
    throw new Error("Goal not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure the logged in user matches the goals user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User nos authorized");
  }
  // remove goal from database
  await goal.remove();
  // see removed goal id response
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};

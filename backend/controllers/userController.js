// import express async handler to use it instead of try catch
const asyncHandler = require("express-async-handler");
// import goal model
const User = require("../models/userModel");
// import bcrypt to hash password
const bcrypt = require("bcryptjs");

const jsonwebtoken = require("jsonwebtoken");

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  // Extract name, email and password from request body
  const { name, email, password } = req.body;
  // if one of them is not in request body, trow error
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // Check if user exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  // Hash password
  // create salt
  const salt = await bcrypt.genSalt(10);
  // generate hashed password with salt (password = entered password, from request body)
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  // see user information on response
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login user" });
});

// @desc Get user data
// @route GET /api/users/me
// @access Public
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "User data display" });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};

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
  // back user information (with token) on response
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
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
  // Extract email and password from request body
  const { email, password } = req.body;

  // check for user email
  const user = await User.findOne({ email });
  // check if user is already in database and password is correct
  if (user && (await bcrypt.compare(password, user.password))) {
    // back user information (with token) on response
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  // back user (from the middleware) on response
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  // it takes 3 argument. 1 payload, passed in {id}. 2 secret. 3 expires in
  return jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};

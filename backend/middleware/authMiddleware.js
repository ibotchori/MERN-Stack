// import express async handler to use it instead of try catch
const asyncHandler = require("express-async-handler");
// import user model
const User = require("../models/userModel");

const jsonwebtoken = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Checking authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      // call the next peace of middleware
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  // If no token at all
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };

const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");

// Connect to mongo database
const connectDB = require("./config/db");
connectDB();

const app = express();

// Middleware
app.use(express.json()); // <-- body parser
app.use(express.urlencoded({ extended: false })); // <-- url encode

// Goal routes
app.use("/api/goals", require("./routes/goalRoutes"));

// overwrite the default express error handler with custom error handler middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

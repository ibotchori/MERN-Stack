const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

// Connect to mongo database
const connectDB = require("./config/db");
connectDB();

const app = express();

// Middleware
app.use(express.json()); // <-- body parser
app.use(express.urlencoded({ extended: false })); // <-- url encode

// // Add cors middleware to access localhost:3000
// const cors = require("cors");
// const whitelist = ["http://localhost:3000"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
// app.use(cors(corsOptions));

/*  Routes */
// Goal routes
app.use("/api/goals", require("./routes/goalRoutes"));
// User route
app.use("/api/users", require("./routes/userRoutes"));

// Server frontend
if (process.env.NODE_ENV === "production") {
  // set static folder, points to static assets
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // any routes
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("Please set to production (ENV)");
  });
}

// overwrite the default express error handler with custom error handler middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

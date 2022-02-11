/* Goal model for save data to database */
const mongoose = require("mongoose");

// Create schema (describe the way your data looks)
const GoalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  { timestamps: true }
);

// Export GoalSchema model and give it the name 'Posts'
module.exports = mongoose.model("Goal", GoalSchema);

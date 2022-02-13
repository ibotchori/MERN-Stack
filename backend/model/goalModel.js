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
  //timestamps option that tells Mongoose to automatically manage createdAt and updatedAt properties on your documents.
  { timestamps: true }
);

// Export GoalSchema model and give it the name 'Posts'
module.exports = mongoose.model("Goal", GoalSchema);

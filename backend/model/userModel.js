/* Usee model for save data to database */
const mongoose = require("mongoose");

// Create schema (describe the way your data looks)
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  // timestamps option that tells Mongoose to automatically manage createdAt and updatedAt properties on your documents.
  { timestamps: true }
);

// Export UserSchema model and give it the name 'Posts'
module.exports = mongoose.model("User", UserSchema);

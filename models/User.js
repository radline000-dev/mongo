const mongoose = require("mongoose");

// Clear Base User Model
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    name: {
      first: { type: String, required: [true, "Both first name required"] },
      last: { type: String, required: [true, "Both last name required"] },
    },
    age: {
      type: Number,
    },
    email: String,
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;

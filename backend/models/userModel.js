const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
  },
  confirmPassword: {
    type: String,
    require: true,
  },
  passwordHistory: [{ type: String }], // সর্বশেষ ৫টা পাসওয়ার্ড
  refreshToken: String,
  isVerified: Boolean,
});

module.exports = mongoose.model("User", userSchema);

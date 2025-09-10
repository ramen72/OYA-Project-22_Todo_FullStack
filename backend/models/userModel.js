const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: String,
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);

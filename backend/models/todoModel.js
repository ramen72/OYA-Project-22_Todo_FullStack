const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    userDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    mediaUrl: String,
    mediaType: {
      type: String,
      enum: ["image", "video", null],
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);

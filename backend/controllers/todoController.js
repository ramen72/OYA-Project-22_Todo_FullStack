const todoModel = require("../models/todoModel");

let createTodoController = async (req, res) => {
  // console.log(req);
  try {
    const { text } = req.body;
    let mediaUrl = null;
    let mediaType = null;
    if (req.file) {
      mediaUrl = req.file.path;
      if (req.file.mimetype.startsWith("image")) {
        mediaType = "image";
      } else if (req.file.mimetype.startsWith("video")) {
        mediaType = "video";
      }
    }
    const todo = new todoModel({
      // req.userInfo.id comes from "authMiddleware.js"
      userId: req.userInfo.id,
      text, // text: text
      mediaUrl, // mediaUrl: mediaUrl
      mediaType, // mediaType: mediaType
    });
    await todo.save();
    res.send({ message: `Todo is created successfully.` });
  } catch (error) {
    res.send({ error: error.message });
  }
};
module.exports = { createTodoController };

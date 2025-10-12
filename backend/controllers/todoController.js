const fs = require("fs"); // Add this at the top
const path = require("path");
const todoModel = require("../models/todoModel");

// ******************************* Create Todo Controller *************************************************************
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
      userDetails: req.userInfo.id,
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

// ******************************* Get All data controller *************************************************************
let getAllTodos = async (req, res) => {
  // const todos = await todoModel
  //   .find({ userDetails: req.userInfo.id })
  //   .populate("userDetails"); // populate("userDetails") generate all data based on userDetails when need all data of user then we should use populate(), otherwise not.
  // res.send({ data: todos });

  try {
    const { page = 1, limit = 10, type, search } = req.query;
    const query = { userDetails: req.userInfo.id };
    if (type) {
      query.mediaType = type;
    }
    if (search) {
      query.text = {
        $regex: search,
        $options: "i",
      };
    }

    const todos = await todoModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));
    res.send({
      page: Number(page),
      limit: Number(limit),
      todos,
    });
  } catch (error) {
    res.send({ error: error });
  }
};

// ******************************* Todo Update controller *************************************************************
let updateTodo = async (req, res) => {
  let updateId = req.params.id;
  let userId = req.userInfo.id;

  try {
    const { text } = req.body;
    const todo = await todoModel.findOne({
      _id: updateId,
      userDetails: userId,
    });

    if (!todo) {
      return res.send({ error: `Todo not found..!` });
    }
    if (text) {
      todo.text = text;
    }
    if (req.file) {
      // Delete the old file if exists
      if (todo.mediaUrl) {
        try {
          fs.unlinkSync(path.resolve(todo.mediaUrl)); // Ensure the correct path
        } catch (error) {
          return res.send({
            message: `Failed to delete old media file`,
            error: error,
          });
        }
      }
      // Update new file path and type
      todo.mediaUrl = req.file.path;
      if (req.file.mimetype.startsWith("image")) {
        todo.mediaType = "image";
      } else if (req.file.mimetype.startsWith("video")) {
        todo.mediaType = "video";
      }
      await todo.save();
      res.send({ message: `Todo is updated successfully.` });
    }
  } catch (error) {
    res.send({ error: error });
  }
};

// ******************************* Todo Delete controller *************************************
let deleteTodo = async (req, res) => {
  let deleteId = req.params.id;
  let userId = req.userInfo.id;
  try {
    const todo = await todoModel.findOne({
      _id: deleteId,
      userDetails: userId,
    });

    if (!todo) {
      return res.send({ error: `Todo not found..!` });
    } else {
      // return res.send(todo);
      if (todo.mediaUrl) {
        try {
          fs.unlinkSync(path.resolve(todo.mediaUrl)); // Ensure the correct path
        } catch (error) {
          return res.send({
            message: `Failed to delete media file`,
            error: error,
          });
        }
      }
      await todoModel.findByIdAndDelete(deleteId);
    }
    res.send({ message: `Todo is deleted successfully.` });
  } catch (error) {
    res.send({ error: error });
  }
};

module.exports = { createTodoController, getAllTodos, updateTodo, deleteTodo };

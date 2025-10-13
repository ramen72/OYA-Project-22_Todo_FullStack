const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  createTodoController,
  getAllTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudinary = require("../config/cloudinaryConfig");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { default: mongoose } = require("mongoose");

// ******************* Configure Routes ************************
router.get("/health", async (req, res) => {
  const health = {
    status: "Ok",
    timestamp: new Date(),
    uptime: process.uptime(),
    services: {
      mongodb: "Unknown",
      cloudanary: "Unknown",
    },
  };
  try {
    const dbState = mongoose.connection.readyState;
    health.services.mongodb = dbState === 1 ? "connected" : "Disconnected";
  } catch (error) {
    health.services.mongodb = "error";
  }
  res.send(health);
});

module.exports = router;

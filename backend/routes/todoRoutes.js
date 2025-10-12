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

// ******************* File Upload with Multer ************************
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// ******************* File Upload to cloudinary with Multer ************************
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "todo",
    resource_type: "auto",
    allowed_formats: ["jpeg", "png", "jpg", "mp4", "mov", "webm"],
  },
});
const upload = multer({ storage: storage });

// ******************* Configure Routes ************************
router.post(
  "/createTodo",
  authMiddleware,
  upload.single("todoImage"), //File upload with Multer
  createTodoController
);
router.get("/getall-todos", authMiddleware, getAllTodos);
router.put(
  "/update-todo/:id",
  authMiddleware,
  upload.single("todoImage"), //For file update
  updateTodo
);
router.delete("/delete-todo/:id", authMiddleware, deleteTodo);

module.exports = router;

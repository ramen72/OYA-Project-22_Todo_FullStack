const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  createTodoController,
  getAllTodos,
  updateTodo,
} = require("../controllers/todoController");
const authMiddleware = require("../middlewares/authMiddleware");

// ******************* File Upload with Multer ************************
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// *********************************************************************

// Configure Routes
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

module.exports = router;

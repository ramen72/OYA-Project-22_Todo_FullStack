const express = require("express");
const { createTodoController } = require("../controllers/todoController");
const router = express.Router();
// const {
//   registrationController,
//   loginController,
//   verifyTokenController,
//   refreshController,
//   forgotPasswordController,
//   resetPasswordController,
// } = require("../controllers/authController");

router.post("/createTodo", createTodoController);
// router.get("/verify/:token", verifyTokenController);
// router.post("/login", loginController);
// router.post("/refresh", refreshController);
// router.post("/forgot-password", forgotPasswordController);
// router.post("/reset-password/:token", resetPasswordController);

module.exports = router;

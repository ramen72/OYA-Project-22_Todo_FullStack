const express = require("express");
const router = express.Router();
const {
  registrationController,
  loginController,
  verifyTokenController,
  refreshController,
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/authController");

router.post("/registration", registrationController);
router.post("/verify/:token", verifyTokenController);
router.post("/login", loginController);
router.post("/refresh", refreshController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

module.exports = router;

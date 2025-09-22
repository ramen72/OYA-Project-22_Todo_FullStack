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

/**
 * @swagger
 * tags:
 * -  name: Auth Apis
 *    description: Authentication APIs
 */
/**
 * @swagger
 * /api/auth/registration:
 * post:
 *  summery: User For Register a new user
 *  tags: [Auth]
 *  request:
 *     required: true
 *     content:
 *         application/json:
 *           schema:
 *              type: object
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 * responses:
 *  200:
 *    description: Registration Successfully Done. Please check your mail for verification code.
 */

router.post("/registration", registrationController);
router.get("/verify/:token", verifyTokenController);
router.post("/login", loginController);
router.post("/refresh", refreshController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

module.exports = router;

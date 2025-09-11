const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");

// Email Configuration
const transporter = nodemailer.createTransport({
  host: "mail.devsramen.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SENDING_MAIL_ID,
    pass: process.env.SENDING_MAIL_PASSWORD,
  },
});

// const info = await transporter.sendMail({
//   from: "TODO APP",
//   to: email,
//   subject: "Verify your Email",
//   text: "Hello", // plain‑text body
//   html: `<h2>Your Verification Code is ${verificationCode}</h2> <br> <a href='#'>Click</a>`, // HTML body
// });

// **********************

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
    expiresIn: "365d",
  });
};

let registrationController = async (req, res) => {
  const { username, email, password } = req.body;
  const userExits = await User.findOne({ email: email });
  if (userExits) {
    return res.send(`"${email}" already Registered!`);
  }
  const hashed = await bcryptjs.hash(password, 10);
  const user = new User({
    username: username,
    email: email,
    password: hashed,
    isVerified: false,
  });
  try {
    await user.save();
    const verificationToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const verifyLink = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
    await transporter.sendMail({
      from: process.env.SENDING_MAIL_ID,
      to: user.email,
      subject: `${user.email} Please Verify your Email`,
      text: "Hello", // plain‑text body
      html: `<h3>click to verify your Account : <a href=${verifyLink}>Verify Your Email.</a></h3>`,
      // html: `<h2>Your Verification Code is ${verificationCode}</h2> <br> <a href='#'>Click</a>`, // HTML body
    });
    res.send({
      message: `Registration Successfully Done. Please check your mail for verification code.`,
    });
  } catch (error) {
    console.log(`While trying to save data in database: ${error}`);
  }
};

// Verify Controller for verification Code
let verifyTokenController = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    const userExists = await User.findById(decoded.id);
    if (!userExists) {
      res.send({ error: `Invalid Token` });
    } else {
      userExists.isVerified = true;
      userExists.save();
      res.send({
        message: `Congratulations! Your Email verification is Successfully Done.`,
      });
    }
  } catch (error) {
    res.send({ error: `Invalid Token or Expired.` });
  }
};

let loginController = (req, res) => {
  res.send("I am login AuthController");
};
module.exports = {
  registrationController,
  loginController,
  verifyTokenController,
};

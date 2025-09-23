const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const Queue = require("bull");

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

// Configure Email Queues
const emailQueue = new Queue("emails", {
  redis: { host: "localhost", port: 6379 },
});

// const info = await transporter.sendMail({
//   from: "TODO APP",
//   to: email,
//   subject: "Verify your Email",
//   text: "Hello", // plain‑text body
//   html: `<h2>Your Verification Code is ${verificationCode}</h2> <br> <a href='#'>Click</a>`, // HTML body
// });

// **********************
const patternForEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const patternForPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{12,64}$/;

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

// ******* Register Controller ********
let registrationController = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  const userExits = await User.findOne({ email: email });
  let errors = {
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  };
  if (userExits) {
    return res.send(`"${email}" already Registered!`);
  }

  // User Name Validation
  if (!username) {
    errors.username = "Username Required";
    return res.send(errors);
  } else if (username.length < 3 || username.length > 50) {
    errors.usernameError = `Username must be between 3 - 50 char. Your Name length : ${username.length}`;
    return res.send(errors);
  }

  // User Email Validation
  if (!email) {
    errors.emailError = "Email Required";
    return res.send(errors);
  } else if (!patternForEmail.test(email)) {
    errors.emailError = "Please enter a valid Email";
    return res.send(errors);
  }
  // Password Validation
  if (!password) {
    errors.passwordError = "Password Required";
  } else if (!patternForPassword.test(password)) {
    errors.passwordError = `Password minimum requirement Minimum length 8 characters, At least one lowercase letter, one uppercase letter, one digit, one special character among [@ $ ! % * ? &]`;
    return res.send(errors);
  }
  if (!confirmPassword) {
    errors.confirmPassword = "ConfirmPassword Required";
    return res.send(errors);
  } else if (password !== confirmPassword) {
    errors.confirmPasswordError = "ConfirmPassword Not match !";
    return res.send(errors);
  }

  const hashed = await bcryptjs.hash(password, 10);
  const user = new User({
    username: username,
    email: email,
    password: hashed,
    passwordHistory: hashed,
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
    });
    res.send({
      message: `Registration Successfully Done. Please check your mail for verification code.`,
    });

    // RollBack (if message dose not send registration will not complete.)
    // try {
    //   await transporter.sendMail({
    //     from: process.env.SENDING_MAIL_ID,
    //     to: user.email,
    //     subject: `${user.email} Please Verify your Email`,
    //     text: "Hello", // plain‑text body
    //     html: `<h3>click to verify your Account : <a href=${verifyLink}>Verify Your Email.</a></h3>`,
    //   });
    //   res.send({
    //     message: `Registration Successfully Done. Please check your mail for verification code.`,
    //   });
    // } catch (error) {
    //   await User.findOneAndDelete({ email: email });
    //   res.send({
    //     message: "Failed to send Verification mail to your mail.",
    //     message: error,
    //   });
    // }
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
      await userExists.save();
      res.send({
        message: `Congratulations! Your Email verification is Successfully Done.`,
      });
    }
  } catch (error) {
    res.send({ error: `Invalid Token or Expired.` });
  }
};

let loginController = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email: email });
  if (!userExists) {
    return res.send({ error: `Invalid Credential ` });
  } else if (!userExists.isVerified) {
    return res.send({ error: `Please verify your email for login ` });
  }

  const isPasswordMatch = await bcryptjs.compare(password, userExists.password);
  if (!isPasswordMatch) {
    return res.send({ error: `Invalid Credential` });
  }

  const accessToken = generateAccessToken(userExists);
  const refreshToken = generateRefreshToken(userExists);

  userExists.refreshToken = refreshToken;

  await userExists.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1year validation
  });

  res.send({
    message: "Login Successful",
    username: userExists.username,
    email: userExists.email,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
};

// Refresh Controller
let refreshController = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    res.status(401).json({ error: "No token found" });
  }
  const userExists = await User.findOne({ refreshToken: token });
  if (!userExists) {
    return res.send({ error: `Invalid Token` });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err) {
      return res.send({ error: `Invalid Token` });
    }
    const accessToken = generateAccessToken(userExists);
    res.send({ accessToken });
  });
};

// Forgot Password Controller
let forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email: email });
  if (!userExists) {
    return res.send({ error: `User Not Found` });
  }
  const resetToken = jwt.sign(
    { id: userExists._id },
    process.env.ACCESS_SECRET,
    {
      expiresIn: "15m",
    }
  );
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  try {
    await transporter.sendMail({
      from: process.env.SENDING_MAIL_ID,
      to: userExists.email,
      // to: user.email,
      subject: `Reset Password`,
      html: `<h3>click to Reset Password : <a href=${resetLink}>Reset Password</a></h3>`,
    });

    res.send({ message: `Please check your email for reset password.` });
  } catch (error) {
    res.send({ error: error });
  }
};

// Reset Password Controller
let resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  let errors = {
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  };

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    const userExists = await User.findById(decoded.id);
    let isPasswordUsedBefore = false;

    if (!userExists) {
      return res.send({ error: `Invalid token` });
    }

    // Password Validation
    // if (!password) {
    //   errors.passwordError = "Password Required";
    // } else if (!patternForPassword.test(password)) {
    //   errors.passwordError = `Password minimum requirement Minimum length 8 characters, At least one lowercase letter, one uppercase letter, one digit, one special character among [@ $ ! % * ? &]`;
    //   return res.send(errors);
    // }
    // if (!confirmPassword) {
    //   errors.confirmPassword = "ConfirmPassword Required";
    //   return res.send(errors);
    // } else if (password !== confirmPassword) {
    //   errors.confirmPasswordError = "ConfirmPassword Not match !";
    //   return res.send(errors);
    // }

    for (let oldPass of userExists.passwordHistory) {
      const match = await bcryptjs.compare(password, oldPass);
      if (match) {
        isPasswordUsedBefore = true;
        break;
      }
    }

    if (isPasswordUsedBefore) {
      return res.send({
        error: "Sorry! Your password should be differ than last 5 password.",
      });
    } else {
      userExists.password = await bcryptjs.hash(password, 10);
      userExists.passwordHistory.push(await bcryptjs.hash(password, 10));
    }

    if (userExists.passwordHistory.length > 5) {
      userExists.passwordHistory = userExists.passwordHistory.slice(-5);
    }

    await userExists.save();
    // return res.send(errors);
    res.send({ message: `Password reset successfully done.` });
  } catch (error) {
    // return res.send(errors);
    res.send({ error: `Token invalid or expired.` });
  }
};

module.exports = {
  registrationController,
  loginController,
  verifyTokenController,
  refreshController,
  forgotPasswordController,
  resetPasswordController,
};

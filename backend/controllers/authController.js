const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = () => {
  return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN, {
    expiresIn: "365d",
  });
};

let registrationController = async (req, res) => {
  const { username, email, password } = req.body;

  const hashed = await bcryptjs.hash(password, 10);
  res.send("hashed");
};

let loginController = (req, res) => {
  res.send("I am login AuthController");
};
module.exports = { registrationController, loginController };

require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const databaseConfig = require("./config/databaseConfig");
const authRoutes = require("./routes/authRoutes");
const authControllers = require("./controllers/authController");

const app = express();
const PORT = 3000;

// MongoDB Database Connection
databaseConfig();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

require("dotenv").config();
const express = require("express");
const databaseConfig = require("./config/databaseConfig");
const authRoutes = require("./routes/authRoutes");
const authControllers = require("./controllers/authController");

const app = express();
const PORT = 3000;

// MongoDB Database Connection
databaseConfig();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

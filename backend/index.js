require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const databaseConfig = require("./config/databaseConfig");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = 3000;

// MongoDB Database Connection
databaseConfig();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// For Read and Write JSON File/Data
app.use(express.json());

// For preview uploaded file from upload folder using browser
app.use("/uploads", express.static("uploads"));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

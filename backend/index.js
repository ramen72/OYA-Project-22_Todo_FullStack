require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const databaseConfig = require("./config/databaseConfig");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const healthRoutes = require("./routes/healthRout");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { rateLimit } = require("express-rate-limit");

const app = express();
const PORT = 3000;

// Configure limiter and use it
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: true,
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  message: { error: "Too many requests, please try again later." },
});
app.use(limiter);

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

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MERN Stack Todo app",
      version: "1.0.0",
      description: "This is the fullstack todo app",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const swaggerspec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerspec));

app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/check", healthRoutes);

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

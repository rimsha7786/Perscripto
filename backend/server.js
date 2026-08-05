import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Database connections
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/admin", adminRouter);

// Test API
app.get("/", (req, res) => {
  res.send("API WORKING hurry");
});
app.get("/test-db", (req, res) => {
  res.json({
    success: true,
    message: "Database connection working"
  });
});

// Start server
app.listen(port, () => {
  console.log("Server Started:", port);
});

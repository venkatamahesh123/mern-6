const express = require("express");
constcors = require("cors");
const mongoose = require("mongoose");
constleaveRoutes = require("./routes/leave"); // Import the leave routes
constauthRoutes = require("./routes/auth"); // Import the auth routes
require("dotenv").config();
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Register Leave Routes
app.use("/api/leave", leaveRoutes); // Register the leave routes
app.use("/api/auth", authRoutes); // Register the auth routes
// Database Connection
mongoose
.connect("mongodb://localhost:27017/attendance", {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) =>console.error("Database connection error:", err));
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
console.log(`Server running on http://localhost:${PORT}`)
);
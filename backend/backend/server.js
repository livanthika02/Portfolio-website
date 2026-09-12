require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const projectRoutes = require("./routes/projects");
const contactRoutes = require("./routes/contact");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve the frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

// API Routes
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

// Fallback: send index.html for any non-API route (so refresh works)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

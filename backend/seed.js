// Run this once with: npm run seed
// It fills your database with 4 sample projects so the site isn't empty.
// Edit the details below to match YOUR real projects, then run it again.

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Project = require("./models/Project");

const sampleProjects = [
  {
    title: "AI Chat Assistant",
    description:
      "A smart chatbot web app that answers questions in real time using an NLP API, with chat history and a typing-indicator animation.",
    techStack: ["React", "Node.js", "Express", "OpenAI API"],
    image: "🤖",
    color: "#7C3AED", // purple
  },
  {
    title: "E-Commerce Store",
    description:
      "A full online shopping platform with product filtering, cart management, secure checkout, and an admin dashboard to manage inventory.",
    techStack: ["React", "Express.js", "MongoDB", "Stripe"],
    image: "🛒",
    color: "#F97316", // orange
  },
  {
    title: "Weather Forecast App",
    description:
      "A colorful weather dashboard showing live conditions, a 5-day forecast, and animated weather icons based on live API data by city.",
    techStack: ["JavaScript", "HTML/CSS", "OpenWeather API"],
    image: "⛅",
    color: "#06B6D4", // cyan
  },
  {
    title: "Task Manager (To-Do) App",
    description:
      "A drag-and-drop Kanban-style productivity app with categories, deadlines, and progress tracking, backed by a persistent database.",
    techStack: ["React", "Node.js", "MongoDB", "JWT Auth"],
    image: "✅",
    color: "#22C55E", // green
  },
];

const importData = async () => {
  try {
    await connectDB();
    await Project.deleteMany(); // clear old data
    await Project.insertMany(sampleProjects);
    console.log("✅ Sample projects added successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();

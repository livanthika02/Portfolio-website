const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String], // e.g. ["React", "Node.js", "MongoDB"]
      default: [],
    },
    image: {
      type: String, // emoji or image URL used on the card
      default: "🚀",
    },
    color: {
      type: String, // hex color used as the card's gradient accent
      default: "#7C3AED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);

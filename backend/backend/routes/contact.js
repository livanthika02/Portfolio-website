const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// @route   POST /api/contact
// @desc    Save a message sent from the "Contact Me" form
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: "Message received! I'll get back to you soon 🚀" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/contact
// @desc    Get all messages (for your own admin viewing)
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

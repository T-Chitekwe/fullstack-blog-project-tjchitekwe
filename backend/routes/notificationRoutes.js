const express = require("express");
const router = express.Router();

const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/authMiddleware");

// GET notifications for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.id,
    })
      .populate("from", "username")
      .populate("post", "title")
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// MARK AS READ
router.put("/:id/read", authMiddleware, async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      read: true,
    });

    res.json({ message: "Marked as read" });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
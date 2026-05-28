const Notification = require("../models/Notification");

// =========================
// GET USER NOTIFICATIONS
// =========================
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.id,
    })
      .populate("sender", "username")
      .populate("post", "title")
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// =========================
// MARK AS READ (SINGLE)
// =========================
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    // ensure user only updates their own notifications
    if (notification.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    notification.read = true;
    await notification.save();

    res.json(notification);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// =========================
// MARK ALL AS READ
// =========================
const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id },
      { read: true }
    );

    res.json({
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// =========================
// DELETE NOTIFICATION
// =========================
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    if (notification.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await Notification.findByIdAndDelete(req.params.id);

    res.json({
      message: "Notification deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
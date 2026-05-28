const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // receiver (post owner)
    },

    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // person who triggered action
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },

    type: {
      type: String,
      enum: ["like", "comment"],
      required: true,
    },

    message: {
      type: String,
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
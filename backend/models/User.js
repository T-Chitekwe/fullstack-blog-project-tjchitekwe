const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    // 🔔 ADDED: notifications system
    notifications: [
      {
        type: {
          type: String,
          enum: ["like", "comment"],
        },

        message: {
          type: String,
        },

        postId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },

        fromUser: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        read: {
          type: Boolean,
          default: false,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
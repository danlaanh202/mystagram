const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema(
  {
    media_url: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    is_post: {
      type: Boolean,
      default: false,
    },
    is_story: {
      type: Boolean,
      default: false,
    },
    is_message: {
      type: Boolean,
      default: false,
    },
    is_avatar: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Media", MediaSchema);

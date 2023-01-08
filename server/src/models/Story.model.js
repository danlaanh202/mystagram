const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
  {
    poster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
    is_seen: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Story", StorySchema);

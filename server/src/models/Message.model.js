const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
const MessageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
    uuid: {
      type: String,
    },
    is_seen: {
      type: Boolean,
      default: false,
    },
    message_type: {
      type: String,
      default: "message", //message || media || annoucement
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
MessageSchema.plugin(paginate);
module.exports = mongoose.model("Message", MessageSchema);

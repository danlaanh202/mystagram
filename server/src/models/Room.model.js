const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const RoomSchema = new mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    is_group: {
      type: Boolean,
      default: false,
    },
    last_message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
RoomSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Room", RoomSchema);

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    caption: {
      type: String,
    },
    comments: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    last_comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
PostSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Post", PostSchema);

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Post",
    },
    comment: {
      type: String,
    },
    is_reply: {
      type: Boolean,
      default: false,
    },
    reply_comments: {
      type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Comment" }],
    },
    media: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Media",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
CommentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Comment", CommentSchema);

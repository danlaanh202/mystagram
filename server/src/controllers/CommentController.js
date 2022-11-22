const mongoose = require("mongoose");

const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");

class CommentController {
  async comment(req, res) {
    const newComment = new Comment({
      user: req.body.user_id,
      post: req.body.post_id,
      comment: req.body.comment,
      media: req.body.media_url,
    });
    try {
      const savedComment = await (
        await newComment.save()
      ).populate({
        path: "user",
        populate: {
          path: "avatar",
        },
      });
      //after commenting we update last_comment to post
      const updatedPost = await Post.findByIdAndUpdate(
        req.body.post_id,
        {
          last_comment: savedComment._id,
          $push: { comments: savedComment._id },
        },
        { new: true }
      ).populate([
        {
          path: "user",
          populate: {
            path: "avatar",
          },
        },
        { path: "media" },
        {
          path: "last_comment",
          populate: {
            path: "user",
          },
        },
      ]);

      return res.status(200).json({ comment: savedComment, post: updatedPost });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getComment(req, res) {
    try {
      const comments = await Comment.find({
        post: mongoose.Types.ObjectId(req.query.post_id),
        is_reply: false,
      }).populate({
        path: "user",
        populate: {
          path: "avatar",
        },
      });
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
module.exports = new CommentController();

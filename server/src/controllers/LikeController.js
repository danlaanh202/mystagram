const { default: mongoose } = require("mongoose");
const Like = require("../models/Like.model");
const Post = require("../models/Post.model");

class LikeController {
  async likePost(req, res) {
    const newLike = new Like({
      user: mongoose.Types.ObjectId(req.body.user_id),
      is_post: true,
      post: mongoose.Types.ObjectId(req.body.post_id),
    });
    try {
      const alreadyLike = await Like.find({
        user: mongoose.Types.ObjectId(req.body.user_id),
        post: mongoose.Types.ObjectId(req.body.post_id),
      });
      if (alreadyLike.length !== 0) {
        return res.status(500).json(alreadyLike);
      }
      const savedLike = await newLike.save();
      const updatedPost = await Post.findByIdAndUpdate(
        req.body.post_id,
        {
          $push: {
            likes: mongoose.Types.ObjectId(req.body.user_id),
          },
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
      return res.status(200).json({ like: savedLike, post: updatedPost });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async unLikePost(req, res) {
    try {
      const deletedLike = await Like.findOneAndDelete({
        user: mongoose.Types.ObjectId(req.query.user_id),
        post: mongoose.Types.ObjectId(req.query.post_id),
      });
      const updatedPost = await Post.findByIdAndUpdate(
        req.query.post_id,
        {
          $pull: {
            likes: mongoose.Types.ObjectId(req.query.user_id),
          },
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
      return res.status(200).json({ like: deletedLike, post: updatedPost });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getLikePostUsers(req, res) {
    try {
      const likesOfPost = await Like.find({
        post: mongoose.Types.ObjectId(req.query.post_id),
        is_post: true,
      }).populate({
        path: "user",
        populate: {
          path: "avatar",
        },
      });
      const liker = likesOfPost.map((item) => item.user);
      return res.status(200).json(liker);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new LikeController();

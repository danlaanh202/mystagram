const Post = require("../models/Post.model");
const User = require("../models/User.model");
const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
class PostController {
  async uploadPost(req, res, next) {
    const newPost = new Post({
      user: mongoose.Types.ObjectId(req.body.user_id),
      caption: req.body.caption,
      media: mongoose.Types.ObjectId(req.body.media_id),
    });

    try {
      const savedPost = await newPost.save();
      return res.status(201).json(savedPost);
    } catch (error) {
      return res.status(500).json(err);
    }
  }
  async getPostsByUsername(req, res, next) {
    try {
      const user = await User.findOne({ username: req.query.username });
      const posts = await Post.find({ user: user._id })
        .sort({ created_at: -1 })
        .populate("user media");
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getPosts(req, res) {
    try {
      const options = {
        sort: { _id: -1 },
        page: parseInt(req.query.page) | 1,
        limit: parseInt(req.query.limit) | 10,
        populate: [
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
        ],
        lean: true,
      };
      let posts = await Post.paginate(
        {
          _id: {
            $lt: mongoose.Types.ObjectId(req.query.last_post),
          },
        },
        options
      ).then((result) => result);
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getPostById(req, res) {
    try {
      const post = await Post.findById(req.query.post_id).populate([
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
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
module.exports = new PostController();

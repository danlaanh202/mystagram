const mongoose = require("mongoose");
const Follow = require("../models/Follow.model");
const User = require("../models/User.model");

class FollowController {
  async follow(req, res) {
    const newFollow = new Follow({
      user: mongoose.Types.ObjectId(req.body.user_id),
      follow_by: mongoose.Types.ObjectId(req.body.follower_id),
    });

    try {
      const savedFollow = await newFollow.save();

      return res.status(200).json(savedFollow);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async unFollow(req, res) {
    try {
      const deletedFollow = await Follow.findOneAndDelete({
        user: mongoose.Types.ObjectId(req.query.user_id),
        follow_by: mongoose.Types.ObjectId(req.query.follower_id),
      });
      return res.status(200).json(deletedFollow);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getIsFollow(req, res) {
    try {
      const savedFollow = await Follow.findOne({
        user: mongoose.Types.ObjectId(req.query.user_id),
        follow_by: mongoose.Types.ObjectId(req.query.follower_id),
      });
      return res.status(200).json(savedFollow);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getFollowing(req, res) {
    try {
      const followingList = await Follow.find({
        follow_by: mongoose.Types.ObjectId(req.query.user_id),
      }).populate({ path: "user", populate: "avatar" });
      return res.status(200).json(followingList);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getFollowers(req, res) {
    try {
      const followers = await Follow.find({
        user: mongoose.Types.ObjectId(req.query.user_id),
      }).populate({ path: "follow_by", populate: "avatar" });
      return res.status(200).json(followers);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new FollowController();

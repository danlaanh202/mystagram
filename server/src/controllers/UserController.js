const mongoose = require("mongoose");
const User = require("../models/User.model");
const UserServices = require("../services/UserServices");
class UserController {
  async getUser(req, res, next) {
    try {
      const user = await UserServices.getUser(req.query);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getUsers(req, res) {
    try {
      const users = await UserServices.getUsers(req.query);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getSuggestionUsers(req, res) {
    try {
      const docs = await UserServices.getSuggestionUsers(req.query); //with mongoose-paginate-v2
      return res.status(200).json(docs);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async editUser(req, res) {
    try {
      const updatedUser = await UserServices.editUser(req.body);
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async changeAvatar(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.body.userId,
        {
          avatar: mongoose.Types.ObjectId(req.body.media),
        },
        { new: true }
      ).populate("avatar");
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getUsersWithoutMe(req, res) {
    try {
      const users = await User.find({
        _id: { $ne: mongoose.Types.ObjectId(req.query.userId) },
      }).populate("avatar");
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async updateFollow(req, res) {
    try {
      const update1 = User.findByIdAndUpdate(
        req.body.user_id,
        {
          $push: {
            followers: mongoose.Types.ObjectId(req.body.follower_id),
          },
        },
        { new: true }
      ).populate("avatar");
      const update2 = User.findByIdAndUpdate(
        req.body.follower_id,
        {
          $push: {
            following: mongoose.Types.ObjectId(req.body.user_id),
          },
        },
        { new: true }
      ).populate("avatar");
      let [rec, follower] = await Promise.all([update1, update2]);
      return res.status(200).json({ user: rec, follower: follower });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async updateUnfollow(req, res) {
    try {
      const update1 = User.findByIdAndUpdate(
        req.body.user_id,
        {
          $pull: {
            followers: mongoose.Types.ObjectId(req.body.follower_id),
          },
        },
        { new: true }
      ).populate("avatar");
      const update2 = User.findByIdAndUpdate(
        req.body.follower_id,
        {
          $pull: {
            following: mongoose.Types.ObjectId(req.body.user_id),
          },
        },
        { new: true }
      ).populate("avatar");
      let [rec, follower] = await Promise.all([update1, update2]);
      return res.status(200).json({ user: rec, follower: follower });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getSearchUsers(req, res) {
    try {
      const searchUsers = await User.find({
        $or: [
          {
            username: {
              $regex: req.query.search_text,
              $options: "i",
            },
          },
          {
            name: {
              $regex: req.query.search_text,
              $options: "i",
            },
          },
        ],
      }).populate("avatar");
      return res.status(200).json(searchUsers);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
module.exports = new UserController();

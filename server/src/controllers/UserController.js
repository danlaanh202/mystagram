const mongoose = require("mongoose");
const User = require("../models/User.model");

class UserController {
  async getUser(req, res, next) {
    try {
      const user = await User.findOne({
        $or: [
          { username: req.query.username },
          { _id: mongoose.Types.ObjectId(req.query.user_id) },
        ],
      }).populate("avatar");
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getUsers(req, res) {
    const options = {
      sort: { _id: -1 },
      page: parseInt(req.query.page) | 1,
      limit: parseInt(req.query.limit) | 20,
      populate: [{ path: "avatar" }],
      lean: true,
    };
    try {
      const users = await User.paginate({}, options).then((res) => res);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getSuggestionUsers(req, res) {
    const options = {
      sort: { _id: -1 },
      page: parseInt(req.query.page) | 1,
      limit: parseInt(req.query.limit) | 5,
      populate: [{ path: "avatar" }],
      lean: true,
    };
    try {
      if (req.query.following?.length > 0) {
        let temp = req.query.following?.map((item) =>
          mongoose.Types.ObjectId(item)
        );

        const notInArray = [
          ...temp,
          mongoose.Types.ObjectId(req.query.user_id),
        ];

        const suggestionUsers = await User.paginate(
          { _id: { $nin: notInArray } },
          options
        );
        // console.log("cec");
        return res.status(200).json(suggestionUsers);
      }
      const suggestionUsers = await User.paginate(
        { _id: { $ne: mongoose.Types.ObjectId(req.query.user_id) } },
        options
      );
      return res.status(200).json(suggestionUsers);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async editUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.body.userId,
        {
          name: req.body.name,
          username: req.body.username,
          website: req.body.website,
          bio: req.body.bio,
          email: req.body.email,
        },
        { new: true }
      ).populate("avatar");
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

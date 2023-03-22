const mongoose = require("mongoose");
const db = require("../models");

module.exports = new (class {
  async getUser(_data) {
    try {
      return await db.User.findOne({
        $or: [
          { username: _data.username },
          { _id: mongoose.Types.ObjectId(_data.user_id) },
        ],
      }).populate("avatar");
    } catch (error) {
      throw new Error(error);
    }
  }
  async getUsers(_data) {
    // with pagination
    try {
      const options = {
        sort: { _id: -1 },
        page: parseInt(_data.page) | 1,
        limit: parseInt(_data.limit) | 20,
        populate: [{ path: "avatar" }],
        lean: true,
      };
      return await db.User.paginate({}, options).then((res) => res);
    } catch (error) {
      throw new Error(error);
    }
  }
  async getSuggestionUsers(_data) {
    try {
      const options = {
        sort: { _id: -1 },
        page: Number(_data.page) | 1,
        limit: Number(_data.limit) | 5,
        populate: [{ path: "avatar" }],
        lean: true,
      };
      if (_data.following?.length > 0) {
        let temp = _data.following?.map((item) =>
          mongoose.Types.ObjectId(item)
        );

        const notInArray = [...temp, mongoose.Types.ObjectId(_data.user_id)];

        const suggestionUsers = await db.User.paginate(
          { _id: { $nin: notInArray } },
          options
        );

        return suggestionUsers;
      }
      const suggestionUsers = await db.User.paginate(
        { _id: { $ne: mongoose.Types.ObjectId(_data.user_id) } },
        options
      );
      return suggestionUsers;
    } catch (error) {
      throw new Error(error);
    }
  }
  async editUser(_data) {
    try {
      return await User.findByIdAndUpdate(
        _data.userId,
        {
          name: _data.name,
          username: _data.username,
          website: _data.website,
          bio: _data.bio,
          email: _data.email,
        },
        { new: true }
      ).populate("avatar");
    } catch (error) {
      throw new Error(error);
    }
  }
})();

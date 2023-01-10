const Story = require("../models/Story.model");
const User = require("../models/User.model");

class StoryController {
  async createStory(req, res) {
    const newStory = new Story({
      poster: req.body.posterId,
      media: req.body.mediaId,
    });
    try {
      const savedStory = await newStory.save();
      return res.status(200).json(savedStory);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getStory(req, res) {
    try {
      const stories = await Story.find({
        poster: {
          $in: req.query.followingIds,
        },
        created_at: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      }).populate([
        {
          path: "poster",
          populate: {
            path: "avatar",
          },
        },
        {
          path: "media",
        },
      ]);
      return res.status(200).json(stories);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getStoryOfUsername(req, res) {
    try {
      const user = await User.find({
        username: req.query.username,
      });
      const stories = await Story.find({
        poster: user[0]._id,
      }).populate([
        {
          path: "poster",
          populate: {
            path: "avatar",
          },
        },
        {
          path: "media",
        },
      ]);

      return res.status(200).json(stories);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new StoryController();

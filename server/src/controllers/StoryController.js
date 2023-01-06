const Story = require("../models/Story.model");

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

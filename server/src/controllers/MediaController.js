const Media = require("../models/Media.model");
const mongoose = require("mongoose");
class MediaController {
  async uploadMedia(req, res, next) {
    const newUploadMedia = new Media({
      media_url: req.body.url,
      user: mongoose.Types.ObjectId(req.body.userId),
    });
    try {
      const savedMedia = await newUploadMedia.save();
      return res.status(201).json(savedMedia);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
module.exports = new MediaController();

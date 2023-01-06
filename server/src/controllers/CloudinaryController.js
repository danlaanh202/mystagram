const cloudinary = require("../utils/cloudinary");
const Media = require("../models/Media.model");
const mongoose = require("mongoose");
class CloudinaryController {
  async uploadImage(req, res) {
    try {
      const image = req.body.img;
      const uploadedResponse = await cloudinary.v2.uploader.upload(image, {
        upload_preset: "" || req.body.preset,
      });
      // console.log(uploadedResponse);
      const uploadedMedia = await new Media({
        media_url: uploadedResponse.url,
        user: mongoose.Types.ObjectId(req.body.userId),
        is_avatar: req.body?.is_avatar,
        is_post: req.body?.is_post,
        is_message: req.body?.is_message,
        is_story: req.body?.is_story,
      }).save();
      return res.status(200).json(uploadedMedia);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async uploadVideo(req, res) {
    try {
      const video = req.body.vid;
      const uploadedResponse = await cloudinary.v2.uploader.upload(video, {
        resource_type: "video",
      });
      return res.status(200).json(uploadedResponse);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
module.exports = new CloudinaryController();

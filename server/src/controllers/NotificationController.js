const mongoose = require("mongoose");
const Notification = require("../models/Notification.model");
class NotificationController {
  async pushNotification(req, res) {
    try {
      const newNotification = new Notification({
        notification_type: req.query.type,
        post: mongoose.Types.ObjectId(req.query.post),
        notification_from: mongoose.Types.ObjectId(req.query.notification_from),
        user: mongoose.Types.ObjectId(req.query.notification_to),
      });
      const savedNotification = await newNotification.save();
      return res.status(200).json(savedNotification);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getNotifications(req, res) {
    try {
      const myNotifications = await Notification.find({
        user: mongoose.Types.ObjectId(req.query.user_id),
      }).populate([
        {
          path: "notification_from",
          populate: {
            path: "avatar",
          },
        },
        {
          path: "post",
          populate: {
            path: "media",
          },
        },
      ]);
      return res.status(200).json(myNotifications);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new NotificationController();

const mongoose = require("mongoose");
const { findOneAndDelete } = require("../models/Notification.model");
const Notification = require("../models/Notification.model");
class NotificationController {
  async pushNotification(req, res) {
    const newNotification = new Notification({
      notification_type: req.body.type,
      post: mongoose.Types.ObjectId(req.body.post),
      notification_from: mongoose.Types.ObjectId(req.body.notification_from),
      user: mongoose.Types.ObjectId(req.body.notification_to),
    });
    try {
      const savedNotification = await (
        await newNotification.save()
      ).populate([
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
        { path: "comment" },
      ]);
      return res.status(200).json(savedNotification);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async removeNotification(req, res) {
    try {
      const removedNotification = await findOneAndDelete({
        notification_type: req.query.type,
        notification_from: mongoose.Types.ObjectId(req.query.notification_from),
        user: mongoose.Types.ObjectId(req.query.notification_to),
        post: mongoose.Types.ObjectId(req.query.post),
      });
      return res.status(200).json(removedNotification);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getNotifications(req, res) {
    try {
      const myNotifications = await Notification.find({
        user: mongoose.Types.ObjectId(req.query.user_id),
      })
        .sort({ _id: -1 })
        .populate([
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
          { path: "comment" },
        ]);

      return res.status(200).json(myNotifications);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async seenNotification(req, res) {
    try {
      const myNotification = await Notification.findByIdAndUpdate(
        req.body.noti_id,
        {
          is_seen: true,
        }
      );
      return res.status(200).json(myNotification);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async deleteLikeNotification(req, res) {
    try {
      const deletedNotification = await Notification.findOneAndDelete({
        post: mongoose.Types.ObjectId(req.query.post_id),
        notification_type: req.query.noti_type,
        notification_from: mongoose.Types.ObjectId(req.query.noti_from),
        notification_to: mongoose.Types.ObjectId(req.query.noti_to),
        // comment: mongoose.Types.ObjectId(req.query.comment_id),
      });
      return res.status(200).json(deletedNotification);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new NotificationController();

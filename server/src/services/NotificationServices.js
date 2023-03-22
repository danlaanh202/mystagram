const mongoose = require("mongoose");
const db = require("../models");

module.exports = new (class {
  async createNotification(_data) {
    try {
      const newNotification = new db.Notification({
        notification_type: _data.type,
        post: mongoose.Types.ObjectId(_data.postId),
        notification_from: mongoose.Types.ObjectId(_data.notificationFrom),
        user: mongoose.Types.ObjectId(_data.notificationTo),
        comment: mongoose.Types.ObjectId(_data.commentId),
      });
      return await (
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
      ]);
    } catch (error) {
      throw new Error("cannot create notification");
    }
  }
})();

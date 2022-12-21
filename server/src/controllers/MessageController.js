const mongoose = require("mongoose");
const Message = require("../models/Message.model");

class MessageController {
  async getMessages(req, res) {
    try {
      const options = {
        sort: {
          _id: -1,
        },
        page: parseInt(req.query.page) | 1,
        limit: parseInt(req.query.limit) | 10,
        populate: [
          {
            path: "user",
            populate: {
              path: "avatar",
            },
          },
          {
            path: "room",
            populate: {
              path: "users",
            },
          },
          {
            path: "media",
            populate: {
              path: "user",
            },
          },
        ],
        lean: true,
      };
      const messages = await Message.paginate(
        {
          room: mongoose.Types.ObjectId(req.query.room_id),
          _id: {
            $lt: mongoose.Types.ObjectId(req.query.top_message),
          },
        },
        options
      ).then((resp) => resp);
      return res.status(200).json(messages);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async sendMessage(req, res) {
    const newMessage = new Message({
      user: mongoose.Types.ObjectId(req.body.user_id),
      message: req.body.message,
      room: mongoose.Types.ObjectId(req.body.room_id),
    });
    try {
      const savedMessage = await (
        await newMessage.save()
      ).populate([
        {
          path: "user",
          populate: {
            path: "avatar",
          },
        },
        {
          path: "room",
          populate: {
            path: "users",
          },
        },
      ]);
      return res.status(200).json(savedMessage);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
module.exports = new MessageController();

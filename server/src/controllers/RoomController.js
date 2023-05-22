const mongoose = require("mongoose");
const Message = require("../models/Message.model");

const Room = require("../models/Room.model");

class RoomController {
  async getRooms(req, res) {
    try {
      const rooms = await Room.find({
        users: { $all: mongoose.Types.ObjectId(req.query?.userId) },
      })
        .sort({ updated_at: -1 })
        .populate([
          { path: "users", populate: "avatar" },
          { path: "last_message" },
        ]);

      return res.status(200).json(rooms);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getRoomById(req, res) {
    try {
      const room = await Room.findById(req.query.roomId).populate([
        {
          path: "users",
          populate: "avatar",
        },
        {
          path: "last_message",
        },
      ]);
      return res.status(200).json(room);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async createRoom(req, res) {
    const my_user = mongoose.Types.ObjectId(req.body.my_user);
    const mongoUser = mongoose.Types.ObjectId(req.body.recipient);

    try {
      const alreadyRoom = await Room.findOne({
        users: { $all: [my_user, mongoUser] },
        is_group: false,
      }).populate([
        {
          path: "users",
          populate: "avatar",
        },
        {
          path: "last_message",
        },
      ]);
      if (alreadyRoom) {
        return res.status(200).json(alreadyRoom);
      }
      // this room need 2 body : my_user and recipient
      const newRoom = new Room({
        users: [my_user, mongoUser],
      });
      const savedNewRoom = await newRoom.save();
      const newMessage = new Message({
        is_seen: false,
        user: my_user,
        room: savedNewRoom._id,
        message: "Start Conversation",
      });
      const savedLastMessage = await newMessage.save();
      const savedRoom = await Room.findOneAndUpdate(
        { _id: savedNewRoom._id },
        {
          last_message: savedLastMessage._id,
        },
        { new: true }
      ).populate([
        {
          path: "users",
          populate: "avatar",
        },
        {
          path: "last_message",
        },
      ]);
      return res.status(200).json(savedRoom);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async createGroupChat(req, res) {
    const mongoUsers = req.body.recipients.map((item, index) =>
      mongoose.Types.ObjectId(item)
    );
    const newRoom = new Room({
      users: mongoUsers,
      is_group: true,
    });
    try {
      const room = await newRoom.save().populate([
        {
          path: "users",
          populate: "avatar",
        },
        {
          path: "last_message",
        },
      ]);
      return res.status(200).json(room);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getNumberOfUnseenMessage(req, res) {
    try {
      const unSeenMessage = await Room.find({
        users: { $all: mongoose.Types.ObjectId(req.query.userId) },
      }).populate({
        path: "last_message",
      });
      const newUnSeen = unSeenMessage
        .map((item) => item.last_message)
        .filter(
          (e) =>
            e.is_seen === false &&
            !mongoose.Types.ObjectId(req.query.userId).equals(e.user)
        );

      return res.status(200).json(newUnSeen);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new RoomController();

const mongoose = require("mongoose");
const Message = require("../models/Message.model");
const Room = require("../models/Room.model");
const callSockets = {};
const sockets = {};
function chatIo(io) {
  io.on("connection", (socket) => {
    socket.on("active", ({ user }) => {
      socket.userId = user._id;
      sockets[socket.userId] = socket;
      io.sockets.emit("receive_active", "Online");
      //then update active
    });
    socket.on("rtc_active", ({ user }) => {
      socket.userId = user._id;
      callSockets[socket.userId] = socket;
    });
    socket.on("create_room", async ({ my_user, recipient }) => {
      const my_user_id = mongoose.Types.ObjectId(my_user);
      const mongoUser = mongoose.Types.ObjectId(recipient);
      const newRoom = new Room({
        users: [my_user_id, mongoUser],
      });

      const alreadyRoom = await Room.find({
        users: { $all: [my_user_id, mongoUser] },
        is_group: false,
      }).populate([
        { path: "users", populate: "avatar" },
        {
          path: "last_message",
        },
      ]);
      if (alreadyRoom.length > 0) {
        io.to(`${sockets[recipient]?.id}`).emit(
          "update_last_message_room",
          alreadyRoom
        );
      }
      const savedNewRoom = await (
        await newRoom.save()
      ).populate([
        { path: "users", populate: "avatar" },
        {
          path: "last_message",
        },
      ]);
    });
    socket.on("join_conversation", ({ room_id }) => {
      socket.join(room_id);
    });
    socket.on("send_message", async ({ user_id, message, room_id }) => {
      const savedMessage = await (
        await new Message({
          user: mongoose.Types.ObjectId(user_id),
          message: message,
          room: mongoose.Types.ObjectId(room_id),
        }).save()
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
      socket.to(room_id).emit("receive_message", savedMessage);
      const savedRoom = await Room.findByIdAndUpdate(
        room_id,
        {
          last_message: savedMessage._id,
        },
        { new: true }
      ).populate([
        { path: "users", populate: "avatar" },
        {
          path: "last_message",
        },
      ]);

      let recipientId;

      savedRoom.users.map((item) => {
        if (item._id.toString() !== user_id) {
          recipientId = item._id.toString();
        }
      });

      io.to(`${sockets[recipientId]?.id}`).emit(
        "update_last_message_room",
        savedRoom
      );
      io.to(`${sockets[recipientId]?.id}`).emit(
        "receive_message_notification",
        savedRoom.last_message
      );
    });
    socket.on("seen_last_message", async ({ last_message_id }) => {
      await Message.findByIdAndUpdate(
        last_message_id,
        {
          is_seen: true,
        },
        { new: true }
      );
    });
    socket.on("call", ({ userId, recipientId, peerId }) => {
      io.to(`${sockets[recipientId]?.id}`).emit("receive_call", {
        peer_id: peerId,
        caller: userId,
        recipient_id: recipientId,
      });
    });
    socket.on("call_answer", ({ userId, recipientId, isAnswer }) => {
      io.to(`${callSockets[userId]?.id}`)
        .to(`${callSockets[recipientId]?.id}`)
        .emit("call_answered", {
          userId,
          recipientId,
          isAnswer,
        });
    });
    socket.on("call_end", ({ userId, recipientId }) => {
      io.to(`${callSockets[userId]?.id}`)
        .to(`${callSockets[recipientId]?.id}`)
        .emit("call_ended", true);
    });
    socket.on("disconnect", () => {
      if (!socket.userId) return;
      delete callSockets[socket.userId];
      delete sockets[socket.userId];
    });
  });
}
module.exports = chatIo;

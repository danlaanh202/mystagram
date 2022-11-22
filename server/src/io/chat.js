const mongoose = require("mongoose");
const Message = require("../models/Message.model");
const Room = require("../models/Room.model");
function chatIo(io, sockets) {
  io.on("connection", (socket) => {
    socket.on("active", ({ user }) => {
      socket.userId = user._id;
      sockets[socket.userId] = socket;
      io.sockets.emit("receive_active", "Online");
      //then update active
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
    });
    socket.on("disconnect", () => {
      if (!socket.userId) return;
      delete sockets[socket.userId];
    });
  });
}
module.exports = chatIo;

const CommentModel = require("./Comment.model");
const FollowModel = require("./Follow.model");
const LikeModel = require("./Like.model");
const MediaModel = require("./Media.model");
const MessageModel = require("./Message.model");
const NotificationModel = require("./Notification.model");
const PostModel = require("./Post.model");
const RoomModel = require("./Room.model");
const StoryModel = require("./Story.model");
const UserModel = require("./User.model");

const db = {
  Follow: FollowModel,
  Like: LikeModel,
  Media: MediaModel,
  Message: MessageModel,
  Notification: NotificationModel,
  Post: PostModel,
  Room: RoomModel,
  Story: StoryModel,
  User: UserModel,
  Comment: CommentModel,
};

module.exports = db;

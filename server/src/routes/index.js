const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const mediaRouter = require("./media.route");
const postRouter = require("./post.route");
const cloudinaryRouter = require("./cloudinary.route");
const roomRouter = require("./room.route");
const messageRouter = require("./message.route");
const followRouter = require("./follow.route");
const commentRouter = require("./comment.route");
const likeRouter = require("./like.route");
const notiRouter = require("./notification.route");
const storyRouter = require("./story.route");
function route(app) {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/cloudinary", cloudinaryRouter);
  app.use("/media", mediaRouter);
  app.use("/post", postRouter);
  app.use("/comment", commentRouter);
  app.use("/like", likeRouter);
  app.use("/story", storyRouter);
  app.use("/follow", followRouter);
  app.use("/noti", notiRouter);
  app.use("/room", roomRouter);
  app.use("/message", messageRouter);
}
module.exports = route;

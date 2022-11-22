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
function route(app) {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/media", mediaRouter);
  app.use("/post", postRouter);
  app.use("/cloudinary", cloudinaryRouter);
  app.use("/room", roomRouter);
  app.use("/message", messageRouter);
  app.use("/follow", followRouter);
  app.use("/comment", commentRouter);
  app.use("/like", likeRouter);
}
module.exports = route;

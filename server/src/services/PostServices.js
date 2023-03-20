const db = require("../models");

module.exports = new (class PostServices {
  async updatedPost(post_id, saved_comment) {
    try {
      return await db.Post.findByIdAndUpdate(post_id, {
        last_comment: saved_comment._id,
        $push: { comments: saved_comment._id },
      }).populate([
        {
          path: "user",
          populate: {
            path: "avatar",
          },
        },
        { path: "media" },
        {
          path: "last_comment",
          populate: {
            path: "user",
          },
        },
      ]);
    } catch (error) {
      throw new Error("Lỗi update post");
    }
  }
})();

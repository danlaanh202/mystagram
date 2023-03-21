const db = require("../models");
const mongoose = require("mongoose");
const PostServices = require("./PostServices");

module.exports = new (class CommentServices {
  async comment(_data) {
    try {
      if (_data.comment === "") {
        throw new Error("Comment must be existed");
      }
      const newComment = new db.Comment({
        user: _data.user_id,
        post: _data.post_id,
        comment: _data.comment,
        media: _data.media_url,
      });
      const savedComment = await (
        await newComment.save()
      ).populate({
        path: "user",
        populate: {
          path: "avatar",
        },
      });
      const updatedPost = await PostServices.updatedPost(
        _data.post_id,
        savedComment
      );
      return { comment: savedComment, post: updatedPost };
    } catch (error) {
      throw new Error("lỗi ở comment services");
    }
  }
  async increaseNumberOfComment(_id, number) {
    return await db.Comment.findByIdAndUpdate(_id, {
      $inc: {
        number_of_reply: number,
      },
    });
  }
  async replyComment(_data) {
    try {
      if (_data.comment === "") {
        throw new Error("Comment must be existed");
      }
      const newReplyComment = new db.Comment({
        user: _data.user_id,
        post: _data.post_id,
        comment: _data.comment,
        reply_to: _data.comment_id,
        media: _data.media_id,
        is_reply: true,
      });
      const replyComment = await (
        await newReplyComment.save()
      ).populate({
        path: "user",
        populate: {
          path: "avatar",
        },
      });
      await this.increaseNumberOfComment(_data.comment_id, 1);
      return replyComment;
    } catch (error) {
      throw new Error("something happened in reply comment");
    }
  }
  async getComments(post_id) {
    try {
      return await db.Comment.find({
        post: mongoose.Types.ObjectId(post_id),
        is_reply: false,
      }).populate({
        path: "user",
        populate: {
          path: "avatar",
        },
      });
    } catch (error) {
      throw new Error("Something happened in comment services");
    }
  }
  async getReplyComments(comment_id, page) {
    try {
      const options = {
        limit: 3,
        offset: (page - 1) * 3,
        sort: { created_at: -1 },
        populate: {
          path: "user",
          populate: {
            path: "avatar",
          },
        },
      };
      return await db.Comment.paginate(
        {
          reply_to: mongoose.Types.ObjectId(comment_id),
          is_reply: true,
        },
        options
      );
    } catch (error) {
      throw new Error("reply comments error");
    }
  }
})();

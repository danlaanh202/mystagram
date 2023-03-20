const mongoose = require("mongoose");
const CommentServices = require("../services/CommentServices");

class CommentController {
  async comment(req, res) {
    try {
      const { comment, post } = await CommentServices.comment(req.body);
      return res.status(200).json({ comment: comment, post: post });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getComment(req, res) {
    try {
      const comments = await CommentServices.getComments(req.query.post_id);
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async replyComment(req, res) {
    try {
      const replyComment = await CommentServices.replyComment(req.body);
      return res.status(200).json(replyComment);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getReplyComments(req, res) {
    try {
      const replyComments = await CommentServices.getReplyComments(
        req.query.comment_id,
        req.query.page
      );
      return res.status(200).json(replyComments);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
module.exports = new CommentController();

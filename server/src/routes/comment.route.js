const router = require("express").Router();
const CommentController = require("../controllers/CommentController");
router.post("/comment", CommentController.comment);
router.post("/reply", CommentController.replyComment);
router.get("/get_comments", CommentController.getComment);
router.get("/get_reply_comments", CommentController.getReplyComments);
module.exports = router;

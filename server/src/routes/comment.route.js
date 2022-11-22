const router = require("express").Router();
const CommentController = require("../controllers/CommentController");
router.post("/comment", CommentController.comment);
router.get("/get_comments", CommentController.getComment);
module.exports = router;

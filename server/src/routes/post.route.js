const router = require("express").Router();
const PostController = require("../controllers/PostController");

router.post("/upload", PostController.uploadPost);
router.get("/get_posts_by_username", PostController.getPostsByUsername);
router.get("/get_posts", PostController.getPosts);
module.exports = router;

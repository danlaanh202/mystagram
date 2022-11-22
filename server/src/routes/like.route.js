const router = require("express").Router();
const LikeController = require("../controllers/LikeController");
router.post("/like_post", LikeController.likePost);
router.delete("/unlike_post", LikeController.unLikePost);
router.get("/get_like_users", LikeController.getLikePostUsers);
module.exports = router;

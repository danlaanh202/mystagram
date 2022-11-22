const router = require("express").Router();
const FollowController = require("../controllers/FollowController");
router.post("/follow", FollowController.follow);
router.delete("/unfollow", FollowController.unFollow);
router.get("/is_follow", FollowController.getIsFollow);
router.get("/get_followers", FollowController.getFollowers);
router.get("/get_following", FollowController.getFollowing);
module.exports = router;

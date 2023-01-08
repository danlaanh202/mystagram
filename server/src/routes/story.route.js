const router = require("express").Router();
const StoryController = require("../controllers/StoryController");

router.post("/create", StoryController.createStory);
router.get("/get", StoryController.getStory);
router.get("/get_stories_by_username", StoryController.getStoryOfUsername);

module.exports = router;

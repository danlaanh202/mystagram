const router = require("express").Router();
const StoryController = require("../controllers/StoryController");

router.post("/create", StoryController.createStory);
router.get("/get", StoryController.getStory);

module.exports = router;

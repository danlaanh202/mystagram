const router = require("express").Router();
const MediaController = require("../controllers/MediaController");

router.post("/upload", MediaController.uploadMedia);

module.exports = router;

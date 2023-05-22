const router = require("express").Router();
const MessageController = require("../controllers/MessageController");

router.get("/get", MessageController.getMessages);
router.post("/send", MessageController.sendMessage);

module.exports = router;

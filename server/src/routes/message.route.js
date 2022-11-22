const router = require("express").Router();
const MessageController = require("../controllers/MessageController");

router.post("/send", MessageController.sendMessage);
router.get("/get", MessageController.getMessages);

module.exports = router;

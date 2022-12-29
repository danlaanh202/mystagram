const router = require("express").Router();
const NotificationController = require("../controllers/NotificationController");

router.get("/get_notifications", NotificationController.getNotifications);
router.post("/push_notification", NotificationController.pushNotification);
router.put("/seen", NotificationController.seenNotification);
router.delete("/undo_notification", NotificationController.deleteNotification);

module.exports = router;

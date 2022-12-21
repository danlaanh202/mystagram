const router = require("express").Router();
const NotificationController = require("../controllers/NotificationController");

router.get("/get_notifications", NotificationController.getNotifications);
router.post("/push_notification", NotificationController.pushNotification);
router.put("/seen", NotificationController.seenNotification);
router.delete(
  "/undo_like_notification",
  NotificationController.deleteLikeNotification
);

module.exports = router;

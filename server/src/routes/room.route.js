const router = require("express").Router();
const RoomController = require("../controllers/RoomController");

router.get("/get_rooms", RoomController.getRooms);
router.get("/get_room_by_id", RoomController.getRoomById);
router.post("/create_room", RoomController.createRoom);
router.post("/create_group", RoomController.createGroupChat);
router.get("/unseen_number", RoomController.getNumberOfUnseenMessage);
module.exports = router;

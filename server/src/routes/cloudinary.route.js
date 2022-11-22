const router = require("express").Router();
const CloudinaryController = require("../controllers/CloudinaryController");
router.post("/upload", CloudinaryController.uploadImage);

module.exports = router;

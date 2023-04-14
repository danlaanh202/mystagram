const cloudinary = require("cloudinary");

const dotenv = require("dotenv");
dotenv.config();
cloudinary.v2.config({
  cloud_name: process.env.CLO_NAME,
  api_key: process.env.CLO_KEY,
  api_secret: process.env.CLO_SEC,
});

module.exports = cloudinary;

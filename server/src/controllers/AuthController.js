const CryptoJS = require("crypto-js");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
class AuthController {
  async register(req, res) {
    const newUser = new User({
      email: req.body.email,
      name: req.body.fullname,
      username: req.body.username,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
    try {
      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async login(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username }).populate(
        "avatar"
      );
      if (!user) return res.status(404).json("User not found");
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (originalPassword !== req.body.password)
        return res.status(401).json("Wrong password");
      const accessToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SEC
      );
      const { password, ...others } = user._doc;
      return res.status(200).json({ ...others, accessToken });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
module.exports = new AuthController();

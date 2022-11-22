const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    is_active: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    gender: {
      type: "Male" | "Female" | "Custom" | "Prefer not to say",
    },
    bio: {
      type: String,
    },
    date_of_birth: {
      type: Date,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", UserSchema);

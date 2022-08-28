const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://avatars.dicebear.com/v2/male/4367adb30bfab6459b780cb5e0671c6b.svg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const UsersModel = mongoose.model("Users", userSchema);

module.exports = UsersModel;

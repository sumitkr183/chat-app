const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  {
    timestamps: true,
  }
);

const ChatsModel = mongoose.model("Chats", chatSchema);

module.exports = ChatsModel;

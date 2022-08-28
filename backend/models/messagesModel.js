const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    content: { type: String, required: true, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chats" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  },
  {
    timestamps: true,
  }
);

const MessagesModel = mongoose.model("Messages", messageSchema);

module.exports = MessagesModel;

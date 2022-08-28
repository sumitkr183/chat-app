const asyncHandler = require("express-async-handler");
const MessagesModel = require("../models/messagesModel");
const ChatsModel = require("../models/chatsModel");
const UsersModel = require("../models/usersModel");

const fetchAllChats = asyncHandler(async (req, res) => {
  try {
    const messages = await MessagesModel.find({ chat: req.params.chatId })
      .populate("sender", "name image email")
      .populate("chats")
      .sort({ updatedAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId, authId } = req.body;

  if (!content || !chatId || !authId) {
    console.log("Missing required parameters");
    return res.status(400);
  }

  var newMessage = {
    sender: authId,
    content: content,
    chat: chatId,
  };

  try {
    var message = await MessagesModel.create(newMessage);

    message = await message.populate("sender").execPopulate();
    message = await message.populate("chats").execPopulate();
    message = await UsersModel.populate(message, {
      path: "chats.users",
      select: "name image email",
    });

    await ChatsModel.findByIdAndUpdate(req.body.chatId, {
      lastMessage: message,
    });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { fetchAllChats, sendMessage };

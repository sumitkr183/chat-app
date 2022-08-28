const asyncHandler = require("express-async-handler");
const ChatsModel = require("../models/chatsModel");
const UsersModel = require("../models/usersModel");

/**
 * @description handle create chat and fetch chat data
 */
const createChat = asyncHandler(async (req, res) => {
  const { userId, authId } = req.body;

  if (!userId | !authId)
    return res.send({ message: "Missing required parameters" });

  var chatExists = await ChatsModel.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: authId } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password -__v")
    .populate("lastMessage");

  chatExists = await UsersModel.populate(chatExists, {
    path: "lastMessage.sender",
    select: "name image email",
  });

  if (chatExists.length) {
    res.send(chatExists[0]);
  } else {
    const chatData = {
      name: "sender",
      isGroupChat: false,
      users: [userId, authId],
    };

    try {
      const chat = await ChatsModel.create(chatData);

      res.status(200).send(chat);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  }
});

/**
 * @description fetch all chat data according user id
 */
const fetchChats = asyncHandler(async (req, res) => {
  const { authId } = req.body;

  if (!authId)
    return res.send(400).send({ message: "Missing required p parameters" });

  ChatsModel.find({ users: { $elemMatch: { $eq: authId } } })
    .populate("users", "-password -__v")
    .populate("lastMessage")
    .populate("groupAdmin", "-password")
    .sort({ updatedAt: -1 })
    .then(async (results) => {
      results = await UsersModel.populate(results, {
        path: "lastMessage.sender",
        select: "name image email",
      });
      res.status(200).send(results);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

/**
 * @description handle create groups chats
 */
const createGroupChat = asyncHandler(async (req, res) => {
  const { users, name, authId } = req.body;

  if (!users || !name) {
    return res.status(400).send({ message: "Missing required parameters" });
  }

  var usersArray = JSON.parse(users);

  if (usersArray.length < 2) {
    return res.status(400).send("Please add more than 2 members fro group");
  }

  usersArray.push(authId);

  try {
    const groupChat = await ChatsModel.create({
      name: name,
      users: usersArray,
      isGroupChat: true,
      groupAdmin: authId,
    });

    const fullGroupChat = await ChatsModel.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { createChat, fetchChats, createGroupChat };

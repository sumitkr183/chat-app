const express = require("express");
const {
  createChat,
  fetchChats,
  createGroupChat,
} = require("../controllers/chatsController");

const router = express.Router();

router.route("/").post(fetchChats);
router.route("/create-chat").post(createChat);
router.route("/create-group").post(createGroupChat);

module.exports = router;

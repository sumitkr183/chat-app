const express = require("express");
const {
  sendMessage,
  fetchAllChats,
} = require("../controllers/messagesController");

const router = express.Router();

router.route("/").post(sendMessage);
router.route("/:chatId").post(fetchAllChats);

module.exports = router;

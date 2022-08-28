const express = require("express");
const {
  loginUser,
  registerUser,
  fetchUsers,
} = require("../controllers/usersController");

const router = express.Router();

router.route("/register").post(loginUser);
router.route("/login").post(registerUser);
router.route("/list").post(fetchUsers);

module.exports = router;

const asyncHandler = require("express-async-handler");
const UsersModel = require("../models/usersModel");

/**
 * @description handle login user after validating email & password
 */
const loginUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name | !email | !password) {
    return res.status(401).send({
      message: `Missing Required Parameters`,
    });
  }

  const checkEmailExists = await UsersModel.findOne({ email });

  /**
   * Check if users already exists
   * return with error message if already exists
   */
  if (checkEmailExists)
    return res.status(401).send({
      message: "User already exists. Please try with another email",
    });

  const user = await UsersModel.create({
    name,
    email,
    password,
  });

  /**
   * Sending users data after creating users account
   */
  if (user) {
    return res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin,
    });
  } else {
    return res.status(401).send({ message: "Something went wrong!" });
  }
});

/**
 * @description handle create new account by email,name & password
 */
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check email & password empty or not
  if (!email | !password)
    return res.status(400).send({ message: "Missing required parameters" });

  // check email exits in DB
  const user = await UsersModel.findOne({ email });
  if (!user) return res.status(400).send({ message: "Email not exists" });

  // Match Password
  if (password === user.password) {
    return res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin,
    });
  }

  res.status(400).send({ message: "Incorrect password. Please try again" });
});

/**
 * @description return list of app users
 */
const fetchUsers = asyncHandler(async (req, res) => {
  const { authId } = req.body;

  if (!authId)
    return res.status(400).send({ message: "Missing required parameters" });

  const users = await UsersModel.find({ _id: { $ne: authId } })
    .select("-password")
    .select("-__v");
  if (!users) return res.status(400).send({ message: "Users not exists" });

  res.status(200).send(users);
});

module.exports = { loginUser, registerUser, fetchUsers };

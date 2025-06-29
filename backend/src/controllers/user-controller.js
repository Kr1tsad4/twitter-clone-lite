const asyncHandler = require("express-async-handler");
const userService = require("../services/user-service");

const getAllUser = asyncHandler(async (req, res) => {
  const users = await userService.findAll();
  res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.findById(req.params.id);
  res.status(200).json(user);
});

const createUser = asyncHandler(async (req, res) => {
  const newUser = await userService.create(req.body);
  res.status(201).json(newUser);
});

const updateUser = asyncHandler(async (req, res) => {
  await userService.update(req.params.id, req.body);
  res.status(200).json({ message: "User information updated successfully." });
});

const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res.status(200).json({ message: "User deleted successfully." });
});

module.exports = {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

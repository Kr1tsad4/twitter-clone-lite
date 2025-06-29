const User = require("../models/user");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const login = async (user) => {
  const { name, email, password } = user;

  if (!password || (!email && !name)) {
    throw createError(400, "Please enter email and password.");
  }

  const userData = email
    ? await User.findOne({ email }).select("+password")
    : await User.findOne({ name }).select("+password");

  const isMatch = await bcrypt.compare(password, userData.password);
  if (!isMatch) {
    throw createError(401, "Invalid username or password.");
  }

  const userObj = userData.toObject();
  delete userObj.password;
  delete userObj.createdAt;
  delete userObj.updatedAt;
  delete userObj.__v;

  return userObj
};

module.exports = { login };

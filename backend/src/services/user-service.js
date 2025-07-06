const User = require("../models/user");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const findAll = async () => {
  return await User.find().select("-__v");
};

const findById = async (id) => {
  const user = await User.findById(id).select("-__v");
  if (!user) {
    throw createError(404, `User not found with id ${id}.`);
  }
  return user;
};

const create = async (userData) => {
  const { name, email, dob, password } = userData;
  const existingEmail = await User.findOne({ email: userData.email });
  if (existingEmail) {
    throw createError(400, "This email has been used.");
  }
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  if (!isEmailValid) {
    throw createError(400, "Invalid email format.");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    dob,
    password: hashPassword,
  });
  const userObj = newUser.toObject();
  delete userObj.password;
  delete userObj.__v;

  return userObj;
};

const update = async (id, userData) => {
  const existingUser = await User.findById(id).select("+password");

  if (!existingUser) {
    throw createError(404, `User not found with id ${id}.`);
  }
  const { name, email, dob, password, newPassword } = userData;
  const updateData = {};
  const existingEmail = await User.findOne({ email: email });
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  if (email && existingUser.email !== email) {
    if (!isEmailValid) {
      throw createError(400, "Invalid email format.");
    }
    if (existingEmail) {
      throw createError(400, "This email has been used.");
    }
    updateData.email = email;
  }

  if (name) updateData.name = name.trim();

  if (dob) updateData.dob = dob;

  if (password && newPassword) {
    const isSamePassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isSamePassword) {
      throw createError(400, "Current password is incorrect.");
    }

    const isNewSameAsOld = await bcrypt.compare(
      newPassword,
      existingUser.password
    );
    if (isNewSameAsOld) {
      throw createError(
        400,
        "New password must be different from the current password."
      );
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    updateData.password = hashedNewPassword;
  }

  await User.updateOne({ _id: existingUser._id }, updateData);
};

const deleteUser = async (id) => {
  const existingUser = await User.findById(id);

  if (!existingUser) {
    throw createError(404, `User not found with id ${id}.`);
  }
  await User.deleteOne(existingUser._id);
};

module.exports = { findAll, findById, create, update, deleteUser };

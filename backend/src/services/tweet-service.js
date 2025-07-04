const Tweet = require("../models/tweet");
const User = require("../models/user");
const createError = require("http-errors");

const findAll = async () => {
  return await Tweet.find().sort({ createdAt: -1 }).select("-__v");
};

const findByTweetId = async (id) => {
  const existingTweet = await Tweet.findById(id).select("-__v");
  if (!existingTweet) {
    throw createError(404, "Tweet not found.");
  }
  return existingTweet;
};

const findTweetByUserId = async (userId) => {
  const existingUser = await User.findById(userId).select("-__v");
  User.find();
  if (!existingUser) {
    throw createError(404, "User not found.");
  }
  const userTweet = Tweet.find({ authorId: existingUser._id });
  return userTweet;
};

const create = async (tweet) => {
  const { content, authorId, likes, commentCount, replyTo } = tweet;
  if (!content) {
    throw createError(400, "Content is required.");
  }
  const newTweet = await Tweet.create({
    content,
    authorId,
    likes,
    commentCount,
    replyTo,
  });
  const tweetObj = newTweet.toObject();
  delete tweetObj.__v;
  return newTweet;
};

const edit = async (id, newContent, commentCount) => {
  const tweetToEdit = await Tweet.findById(id);
  if (!tweetToEdit) {
    throw createError(404, "Tweet not found.");
  }
  if (!newContent) {
    throw createError(400, "Content is required.");
  }
  tweetToEdit.content = newContent;
  tweetToEdit.commentCount = commentCount;
  const editedTweet = await tweetToEdit.save();
  return editedTweet;
};

const deleteTweet = async (id) => {
  const existingTweet = await Tweet.findById(id);
  if (!existingTweet) {
    throw createError(404, "Tweet not found.");
  }
  await Tweet.deleteOne(existingTweet._id);
};

const like = async (tweetId, userId) => {
  const tweet = await Tweet.findById(tweetId);
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw createError(404, "User not found.");
  }
  if (!tweet) {
    throw createError(404, "Tweet not found.");
  }
  const alreadyLiked = tweet.likes.includes(userId);
  if (!alreadyLiked) {
    tweet.likes.push(userId);
  }
  const likedTweet = await tweet.save();
  return likedTweet;
};

const unlike = async (tweetId, userId) => {
  const tweet = await Tweet.findById(tweetId);
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw createError(404, "User not found.");
  }
  if (!tweet) {
    throw createError(404, "Tweet not found.");
  }
  tweet.likes = tweet.likes.filter((id) => !id.equals(existingUser._id));

  const updatedLikeTweet = await tweet.save();

  return updatedLikeTweet;
};

module.exports = {
  findAll,
  findByTweetId,
  findTweetByUserId,
  create,
  edit,
  deleteTweet,
  like,
  unlike,
};

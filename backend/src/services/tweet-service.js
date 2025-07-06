const Tweet = require("../models/tweet");
const User = require("../models/user");
const createError = require("http-errors");

const findAll = async () => {
  return await Tweet.find().sort({ createdAt: -1 }).select("-__v");
};

const findByTweetId = async (id) => {
  const existingTweet = await Tweet.findById(id).select("-__v");
  if (!existingTweet) {
    throw createError(404, `Tweet not found with id ${id}`);
  }
  return existingTweet;
};

const findTweetByUserId = async (userId) => {
  const existingUser = await User.findById(userId).select("-__v");
  if (!existingUser) {
    throw createError(404, `User not found with id ${userId}`);
  }
  const userTweet = Tweet.find({ authorId: existingUser._id });
  return userTweet;
};

const create = async (tweet) => {
  const { content, authorId, replyTo } = tweet;
  const existingAuthor = await User.findById({ _id: authorId });
  if (!existingAuthor) {
    throw createError(404, `Author not found with id ${authorId}`);
  }
  if (!content || !content.trim()) {
    throw createError(400, "Content is required.");
  }
  const newTweet = await Tweet.create({
    content,
    authorId,
    replyTo: replyTo || null,
  });
  const tweetObj = newTweet.toObject();
  delete tweetObj.__v;
  return newTweet;
};

const edit = async (id, newContent, commentCount) => {
  const tweetToEdit = await Tweet.findById(id);
  if (!tweetToEdit) {
    throw createError(404, `Tweet not found with id ${id}`);
  }
  if (!newContent || !newContent.trim()) {
    throw createError(400, "Content is required.");
  }
  tweetToEdit.content = newContent.trim();
  if (typeof commentCount === "number") {
    tweetToEdit.commentCount = commentCount;
  }
  const editedTweet = await tweetToEdit.save();
  return editedTweet;
};

const deleteTweet = async (id) => {
  const existingTweet = await Tweet.findById(id);
  if (!existingTweet) {
    throw createError(404, `Tweet not found with id ${id}`);
  }
  await Tweet.deleteOne(existingTweet._id);
};

const like = async (tweetId, userId) => {
  const tweet = await Tweet.findById(tweetId);
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw createError(404, `User not found with id ${userId}`);
  }
  if (!tweet) {
    throw createError(404, `Tweet not found with id ${tweetId}`);
  }
  const alreadyLiked = tweet.likes.some((id) => id.equals(existingUser._id));
  if (!alreadyLiked) {
    tweet.likes.push(existingUser._id);
  }
  return await tweet.save();
};

const unlike = async (tweetId, userId) => {
  const tweet = await Tweet.findById(tweetId);
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw createError(404, `User not found with id ${userId}`);
  }
  if (!tweet) {
    throw createError(404, `Tweet not found with id ${tweetId}`);
  }
  tweet.likes = tweet.likes.filter((id) => !id.equals(existingUser._id));
  return await tweet.save();
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

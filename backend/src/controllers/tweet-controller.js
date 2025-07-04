const tweetService = require("../services/tweet-service");
const asyncHandler = require("express-async-handler");

const getAllTweet = asyncHandler(async (req, res) => {
  const tweets = await tweetService.findAll();
  return res.status(200).json(tweets);
});

const getTweetById = asyncHandler(async (req, res) => {
  const tweet = await tweetService.findByTweetId(req.params.id);
  return res.status(200).json(tweet);
});

const getUserTweetByUserId = asyncHandler(async (req, res) => {
  const userTweet = await tweetService.findTweetByUserId(req.params.id);
  return res.status(200).json(userTweet);
});

const createTweet = asyncHandler(async (req, res) => {
  const newTweet = await tweetService.create(req.body);
  return res.status(201).json(newTweet);
});

const editTweet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const content = req.body.content;
  const commentCount = req.body.commentCount
  const editedTweet = await tweetService.edit(id, content,commentCount);
  return res.status(200).json(editedTweet);
});

const deleteTweet = asyncHandler(async (req, res) => {
  await tweetService.deleteTweet(req.params.id);
  return res.status(200).json({ message: "Tweet deleted successfully." });
});

const likeTweet = asyncHandler(async (req, res) => {
  const tweetId = req.params.id;
  const { userId } = req.body;
  const likedTweet = await tweetService.like(tweetId, userId);
  return res.status(200).json(likedTweet);
});

const unlikeTweet = asyncHandler(async (req, res) => {
  const tweetId = req.params.id;
  const { userId } = req.body;
  const unLikedTweet = await tweetService.unlike(tweetId, userId);
  return res.status(200).json(unLikedTweet);
});

module.exports = {
  getAllTweet,
  getTweetById,
  getUserTweetByUserId,
  createTweet,
  editTweet,
  deleteTweet,
  likeTweet,
  unlikeTweet
};
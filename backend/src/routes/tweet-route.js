const express = require("express");
const router = express.Router();
const {
  getAllTweet,
  getTweetById,
  getUserTweetByUserId,
  createTweet,
  editTweet,
  deleteTweet,
  likeTweet,
  unlikeTweet
} = require('../controllers/tweet-controller')

router.route("/").get(getAllTweet);
router.route("/:id").get(getTweetById);
router.route("/user/:id").get(getUserTweetByUserId);
router.route("/").post(createTweet);
router.route("/:id").put(editTweet);
router.route("/like/:id").put(likeTweet);
router.route("/unlike/:id").put(unlikeTweet);
router.route("/:id").delete(deleteTweet);

module.exports = router;
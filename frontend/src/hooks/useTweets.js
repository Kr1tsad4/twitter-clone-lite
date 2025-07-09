import { useState, useEffect, useCallback, useMemo } from "react";
import {
  createTweet,
  deleteTweet,
  getTweet,
  likeTweet,
  unLikeTweet,
  getTweetById,
  updateTweet,
} from "../libs/fetchTweetUtils";
import { getUserById } from "../libs/fetchUserUtils";
import { API_URL } from "../libs/api";

export const useTweets = (user) => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [isInputOnFocus, setIsInputOnFocus] = useState(false);
  const [content, setContent] = useState("");
  const [hasPopup, setHasPopup] = useState(false);
  const [replyPost, setReplyPost] = useState(null);
  const [isReply, setIsReply] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [replyToPostId, setReplyToPostId] = useState("");
  const [isViewPost, setIsViewPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const enablePostButton = useMemo(() => {
    return content.trim().length > 0;
  }, [content]);

  const handleInputOnFocus = () => {
    setIsInputOnFocus(true);
  };

  const fetchPosts = useCallback(async () => {
    try {
      const currentLoginUser = JSON.parse(sessionStorage.getItem("user"));
      const posts = await getTweet(API_URL);

      const postWithAuthors = await Promise.all(
        posts.map(async (tweet) => {
          const author = await getUserById(API_URL, tweet.authorId);
          let replyToAuthorName = null;
          if (tweet.replyTo) {
            try {
              const replyToPost = await getTweetById(API_URL, tweet.replyTo);
              if (replyToPost.authorId) {
                const replyToAuthor = await getUserById(
                  API_URL,
                  replyToPost.authorId
                );
                replyToAuthorName = replyToAuthor.name;
              }
            } catch (error) {
              console.log(error);
            }
          }
          return {
            ...tweet,
            authorName: author.name,
            replyToAuthorName: replyToAuthorName,
            likedByCurrentLoginUser: currentLoginUser
              ? tweet.likes.includes(currentLoginUser._id)
              : false,
            likeCount: tweet.likes.length,
          };
        })
      );

      setPosts(postWithAuthors);
      setLikes(
        postWithAuthors.map((post) => ({
          liked: post.likedByCurrentLoginUser,
          count: post.likeCount,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const postTweet = async () => {
    if (!content.trim() || !user) return;

    const newPost = {
      content: content.trim(),
      replyTo: isReply ? replyToPostId : null,
      authorId: user._id,
    };

    try {
      const createdPost = await createTweet(API_URL, newPost);
      if (createdPost) {
        if (isReply) {
          const post = await getTweetById(API_URL, createdPost.replyTo);
          await updateTweet(API_URL, post._id, {
            content: post.content,
            commentCount: post.commentCount + 1,
          });
        }
        setContent("");
        setIsInputOnFocus(false);
        setHasPopup(false);
        setOpenPopup(false);
        setIsReply(false);
        setReplyPost(null);
        setReplyToPostId(null);
        if (selectedPost) {
          await handleViewPost(true, selectedPost._id);
        } else {
          await fetchPosts();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const like = async (index, postId, isLike) => {
    if (!user) return;

    try {
      const post = isLike
        ? await likeTweet(API_URL, postId, user._id)
        : await unLikeTweet(API_URL, postId, user._id);

      if (post) {
        const updatedLikes = [...likes];
        updatedLikes[index] = {
          liked: isLike,
          count: post.likes.length,
        };
        setLikes(updatedLikes);

        if (selectedPost) {
          const updatedPost = { ...selectedPost };

          if (index === 0) {
            updatedPost.likes = post.likes;
            updatedPost.likedByCurrentLoginUser = isLike;
            updatedPost.likeCount = post.likes.length;
          } else if (updatedPost.comments && updatedPost.comments[index - 1]) {
            updatedPost.comments[index - 1].likes = post.likes;
            updatedPost.comments[index - 1].likedByCurrentLoginUser = isLike;
            updatedPost.comments[index - 1].likeCount = post.likes.length;
          }

          setSelectedPost(updatedPost);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewPost = async (isView, postId) => {
    setIsViewPost(isView);

    if (isView && postId) {
      try {
        const allPosts = await getTweet(API_URL);
        const post = await getTweetById(API_URL, postId);
        const currentLoginUser = JSON.parse(sessionStorage.getItem("user"));
        const author = await getUserById(API_URL, post.authorId);

        let replyToAuthorName = null;
        if (post.replyTo) {
          const replyToPost = await getTweetById(API_URL, post.replyTo);
          const replyToAuthor = await getUserById(
            API_URL,
            replyToPost.authorId
          );
          replyToAuthorName = replyToAuthor.name;
        }

        const commentContent = await Promise.all(
          allPosts
            .filter((p) => p.replyTo === postId)
            .map(async (comment) => {
              const author = await getUserById(API_URL, comment.authorId);
              return {
                ...comment,
                authorName: author.name,
                likedByCurrentLoginUser: currentLoginUser
                  ? comment.likes.includes(currentLoginUser._id)
                  : false,
                likeCount: comment.likes.length,
                commentCount: comment.commentCount || 0,
                isComment: true,
              };
            })
        );

        setSelectedPost({
          ...post,
          authorName: author?.name || "Unknown",
          likedByCurrentLoginUser: currentLoginUser
            ? post.likes.includes(currentLoginUser._id)
            : false,
          likeCount: post.likes.length,
          replyToAuthorName,
          comments: commentContent,
          commentCount: commentContent.length,
        });

        const allItems = [post, ...commentContent];
        setLikes(
          allItems.map((item) => ({
            liked: item.likes.includes(currentLoginUser._id),
            count: item.likes.length,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      setSelectedPost(null);
      await fetchPosts();
    }
  };

  const handleReplyPost = async (postId) => {
    setHasPopup(true);
    setOpenPopup(true);
    setIsReply(true);
    setReplyToPostId(postId);
    try {
      const getReplyPost = await getTweetById(API_URL, postId);
      if (getReplyPost) {
        const userData = await getUserById(API_URL, getReplyPost.authorId);
        setReplyPost({ ...getReplyPost, authorName: userData.name });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      const post = await getTweetById(API_URL, id);
      const deletedTweet = await deleteTweet(API_URL, id);

      if (deletedTweet && post.replyTo) {
        const parentPost = await getTweetById(API_URL, post.replyTo);
        await updateTweet(API_URL, parentPost._id, {
          content: parentPost.content,
          commentCount: Math.max(0, parentPost.commentCount - 1),
        });
      }

      if (selectedPost) {
        await handleViewPost(true, selectedPost._id);
      } else {
        await fetchPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closePopup = () => {
    setHasPopup(false);
    setOpenPopup(false);
    setIsReply(false);
    setReplyPost(null);
    setReplyToPostId("");
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    likes,
    isInputOnFocus,
    content,
    hasPopup,
    postTweet,
    enablePostButton,
    fetchPosts,
    deletePost,
    handleInputOnFocus,
    like,
    replyPost,
    handleReplyPost,
    isReply,
    setIsReply,
    setContent,
    setHasPopup,
    openPopup,
    setOpenPopup,
    closePopup,
    handleViewPost,
    isViewPost,
    selectedPost,
  };
};

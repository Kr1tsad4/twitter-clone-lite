import { useState, useEffect, useCallback, useMemo } from "react";
import {
  createTweet,
  deleteTweet,
  getTweet,
  likeTweet,
  unLikeTweet,
  commentTweet,
  getTweetById,
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
  const [openReplyPopup, setOpenReplyPopup] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [replyToPostId, setReplyToPostId] = useState("");

  const handleReplyPost = async (postId) => {
    setOpenReplyPopup(true);
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

  const postTweet = async () => {
    if (!content.trim() || !user) return;

    const newPost = {
      content: content.trim(),
      replyTo: isReply ? replyToPostId : null,
      authorId: user._id,
      likes: [],
      comments: [],
    };

    try {
      const createdPost = await createTweet(API_URL, newPost);
      if (createdPost) {
        if (isReply) {
          await commentTweet(API_URL, replyToPostId, user._id, content.trim());
        }

        setContent("");
        setIsInputOnFocus(false);
        setHasPopup(false);
        setOpenReplyPopup(false);
        setOpenPopup(false);
        setIsReply(false);
        setReplyPost(null);
        setReplyToPostId(null);
        await fetchPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const enablePostButton = useMemo(() => {
    return content.trim().length > 0;
  }, [content]);

  const handleInputOnFocus = () => {
    setIsInputOnFocus(true);
  };

  const fetchPosts = useCallback(async () => {
    try {
      const currentUser = JSON.parse(sessionStorage.getItem("user"));
      const getAllPost = await getTweet(API_URL);

      const postWithAuthors = await Promise.all(
        getAllPost.map(async (t) => {
          const author = await getUserById(API_URL, t.authorId);

          let replyToAuthorName = null;
          console.log(t.replyTo);
          if (t.replyTo) {
            try {
              const replyToPost = await getTweetById(API_URL, t.replyTo);
              const replyToAuthor = await getUserById(
                API_URL,
                replyToPost.authorId
              );
              replyToAuthorName = replyToAuthor.name;
            } catch (error) {
              console.log(error);
            }
          }

          return {
            ...t,
            authorName: author.name,
            replyToAuthorName: replyToAuthorName,
            likedByCurrentUser: currentUser
              ? t.likes.includes(currentUser._id)
              : false,
            likeCount: t.likes.length,
          };
        })
      );

      setPosts(postWithAuthors);
      setLikes(
        postWithAuthors.map((post) => ({
          liked: post.likedByCurrentUser,
          count: post.likeCount,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deletePost = async (id) => {
    try {
      const deletedTweet = await deleteTweet(API_URL, id);
      if (deletedTweet) {
        await fetchPosts();
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closePopup = () => {
    setHasPopup(false);
    setOpenReplyPopup(false);
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
    openReplyPopup,
    setOpenReplyPopup,
    isReply,
    setIsReply,
    setContent,
    setHasPopup,
    openPopup,
    setOpenPopup,
    closePopup,
  };
};

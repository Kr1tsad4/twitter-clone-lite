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
  const [comments, setComments] = useState([]);
  const [isInputOnFocus, setIsInputOnFocus] = useState(false);
  const [content, setContent] = useState("");
  const [hasPopup, setHasPopup] = useState(false);
  const [replyPost, setReplyPost] = useState(null);
  const [isReply, setIsReply] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [replyToPostId, setReplyToPostId] = useState("");
  const [isViewPost, setIsViewPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

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

  const handleViewPost = async (isView, postId) => {
    setIsViewPost(isView);
    if (isView && postId) {
      try {
        const post = await getTweetById(API_URL, postId);

        if (post) {
          const currentUser = JSON.parse(sessionStorage.getItem("user"));
          const author = await getUserById(API_URL, post.authorId);

          let replyToAuthorName = null;
          if (post.replyTo) {
            try {
              const replyToPost = await getTweetById(API_URL, post.replyTo);
              const replyToAuthor = await getUserById(
                API_URL,
                replyToPost.authorId
              );
              replyToAuthorName = replyToAuthor.name;
            } catch (error) {
              console.log(error);
            }
          }

          setSelectedPost({
            ...post,
            authorName: author?.name || "Unknown",
            likedByCurrentUser: currentUser
              ? post.likes.includes(currentUser._id)
              : false,
            likeCount: post.likes.length,
            commentedByCurrentUser: currentUser
              ? post.comments.some((c) => c.user === currentUser._id)
              : false,
            commentCount: post.comments.length,
            replyToAuthorName,
          });

          setLikes([
            {
              liked: post.likes.includes(currentUser._id),
              count: post.likes.length,
            },
          ]);
          setComments([
            {
              comment: post.comments.some((c) => c.user === currentUser._id),
              count: post.comments.length,
            },
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setSelectedPost(null);
      await fetchPosts();
    }
  };

  const fetchPosts = useCallback(async () => {
    try {
      const currentUser = JSON.parse(sessionStorage.getItem("user"));
      const getAllPost = await getTweet(API_URL);

      const postWithAuthors = await Promise.all(
        getAllPost.map(async (t) => {
          const author = await getUserById(API_URL, t.authorId);
          let replyToAuthorName = null;
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
            commentedByCurrentUser: currentUser
              ? t.comments.includes(currentUser._id)
              : false,
            commentCount: t.comments.length,
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
      setComments(
        postWithAuthors.map((post) => ({
          comment: post.commentedByCurrentUser,
          count: post.commentCount,
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
    comments,
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

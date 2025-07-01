import LeftSideMenu from "../components/LeftSideMenu";
import MainPost from "../components/MainPost";
import RightSideMenu from "../components/RightSideMenu";
import { useEffect, useState } from "react";
import {
  deleteTweet,
  getTweet,
  likeTweet,
  unLikeTweet,
} from "../libs/fetchTweetUtils";
import { getUserById } from "../libs/fetchUserUtils";
import { API_URL } from "../libs/api";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(posts.map(() => false));
  const navigator = useNavigate();
  const fetchPosts = async () => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const getAllPost = await getTweet(API_URL);

    const postWithAuthors = await Promise.all(
      getAllPost.map(async (t) => {
        const user = await getUserById(API_URL, t.authorId);
        return {
          ...t,
          authorName: user.name,
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
  };

  const handledDeletePost = async (id) => {
    const deletedTweet = await deleteTweet(API_URL, id);
    if (deletedTweet) {
      fetchPosts();
    }
  };

  const handleLogout = async () => {
    sessionStorage.removeItem("user");
    setUser(null);
    navigator("/login");
  };

  const handleLike = async (index, postId, isLike) => {
    let post;
    if (isLike) {
      post = await likeTweet(API_URL, postId, user._id);
    } else {
      post = await unLikeTweet(API_URL, postId, user._id);
    }
    if (post) {
      const updatedLikes = [...likes];
      updatedLikes[index] = {
        liked: isLike,
        count: post.likes.length,
      };
      setLikes(updatedLikes);
    }
  };

  useEffect(() => {
    fetchPosts();
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex">
      <LeftSideMenu user={user} logout={handleLogout} />
      <MainPost
        user={user}
        handledDeletePost={handledDeletePost}
        posts={posts}
        likes={likes}
        fetchPosts={fetchPosts}
        handleLike={handleLike}
      />
      <RightSideMenu user={user} />
    </div>
  );
}

export default HomePage;

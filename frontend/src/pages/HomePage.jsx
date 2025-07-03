import { useEffect, useState } from "react";
import LeftSideMenu from "../components/LeftSideMenu";
import MainPost from "../components/MainPost";
import RightSideMenu from "../components/RightSideMenu";
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
  const [likes, setLikes] = useState([]);
  const [hasPopup, setHasPopup] = useState(false);
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
    if (deletedTweet) fetchPosts();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    navigator("/login");
  };

  const handleLike = async (index, postId, isLike) => {
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
  };

  useEffect(() => {
    document.body.style.overflow = hasPopup ? "hidden" : "auto";
  }, [hasPopup]);

  useEffect(() => {
    fetchPosts();
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    if (currentUser) setUser(currentUser);
  }, []);

  return (
    <div className={`min-h-screen flex bg-black relative`}>
      {hasPopup && (
        <div className="fixed inset-0 z-40 bg-[rgba(49,58,69,0.6)] "></div>
      )}

      <LeftSideMenu user={user} logout={handleLogout} />
      <MainPost
        user={user}
        handledDeletePost={handledDeletePost}
        posts={posts}
        likes={likes}
        fetchPosts={fetchPosts}
        handleLike={handleLike}
        setHasPopup={setHasPopup}
        hasPopup={hasPopup}
      />
      <RightSideMenu user={user} />
    </div>
  );
}

export default HomePage;

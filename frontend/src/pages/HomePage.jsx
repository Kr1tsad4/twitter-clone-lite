import LeftSideMenu from "../components/LeftSideMenu";
import MainPost from "../components/MainPost";
import RightSideMenu from "../components/RightSideMenu";
import { useEffect, useState } from "react";
import { deleteTweet, getTweet } from "../libs/fetchTweetUtils";
import { getUserById } from "../libs/fetchUserUtils";
import { API_URL } from "../libs/api";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigator = useNavigate();
  const fetchPosts = async () => {
    const getAllPost = await getTweet(API_URL);
    const postWithAuthors = await Promise.all(
      getAllPost.map(async (t) => {
        const user = await getUserById(API_URL, t.authorId);
        return {
          ...t,
          authorName: user.name,
        };
      })
    );
    setPosts(postWithAuthors);
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
        fetchPosts={fetchPosts}
      />
      <RightSideMenu user={user} />
    </div>
  );
}

export default HomePage;

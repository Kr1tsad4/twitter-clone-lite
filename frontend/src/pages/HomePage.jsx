import { useEffect, useState } from "react";
import NavigationMenu from "../components/Home/NavigationMenu";
import MainPost from "../components/Home/MainPost";
import RightSideMenu from "../components//Home/RightSideMenu";
import { useTweets } from "../hooks/useTweets";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [user, setUser] = useState(null)  ; 
  const navigator = useNavigate();

  const tweetProps = useTweets(user);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    navigator("/login");
  };

  useEffect(() => {
    document.body.style.overflow = tweetProps.hasPopup ? "hidden" : "auto";
  }, [tweetProps.hasPopup]);

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <div className="min-h-screen flex bg-black relative">
      {tweetProps.hasPopup && (
        <div className="fixed inset-0 z-40 bg-[rgba(49,58,69,0.6)] "></div>
      )}

      <NavigationMenu user={user} logout={handleLogout} />
      <MainPost user={user} {...tweetProps} />
      <RightSideMenu user={user} />
    </div>
  );
}

export default HomePage;

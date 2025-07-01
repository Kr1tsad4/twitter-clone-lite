import { useEffect, useState } from "react";
import LeftSideMenu from "../components/LeftSideMenu";
import MainPost from "../components/MainPost";
import RightSideMenu from "../components/RightSideMenu";

function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex">
      <LeftSideMenu user={user} />
      <MainPost user={user} />
      <RightSideMenu user={user} />
    </div>
  );
}

export default HomePage;

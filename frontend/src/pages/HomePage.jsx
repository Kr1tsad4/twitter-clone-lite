import LeftSideMenu from "../components/LeftSideMenu";
import MainPost from "../components/MainPost";
import RightSideMenu from "../components/RightSideMenu";

function HomePage() {
  return (
    <div className="min-h-screen bg-black flex">
      <LeftSideMenu />
      <MainPost />
      <RightSideMenu />
    </div>
  );
}

export default HomePage;

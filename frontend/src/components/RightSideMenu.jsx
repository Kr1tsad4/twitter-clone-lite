import { useEffect } from "react";
import RightSideBox from "./RightSideBox";
import UserProfile from "./UserProfile";
import TrendItem from "./TrendItem";
import { useUsers } from "../hooks/useUsers"; 

function RightSideMenu({ user }) {
  const { randomUser, getAllUser } = useUsers();

  useEffect(() => {
    getAllUser();
  }, []);

  const userSuggestion = (
    <>
      {randomUser.map((user) => (
        <UserProfile key={user._id} user={user} x_logo={""} isSelf={false} />
      ))}
    </>
  );
  const trendItem = (
    <>
      <TrendItem topic={"หวยงวดนี้"} post_number={"11.2K"} />
      <TrendItem topic={"เนื้อของฉัน"} post_number={"9.5K"} />
      <TrendItem topic={"ละมีปัญหาไรล่ะ"} post_number={"8.6K"} />
    </>
  );

  return (
    <div className="min-h-screen border-white ml-8 w-[350px]">
      <RightSideBox user={user} header="มีอะไรเกิดขึ้นบ้าง" item={trendItem} />
      <RightSideBox user={user} header="ติดตามใครดี" item={userSuggestion} />
    </div>
  );
}

export default RightSideMenu;

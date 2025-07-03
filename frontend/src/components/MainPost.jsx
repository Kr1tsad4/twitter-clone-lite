import { useState } from "react";
import ListPost from "./ListPost";
import Post from "./Post";

function MainPost({
  user,
  handledDeletePost,
  posts,
  fetchPosts,
  handleLike,
  likes,
  setHasPopup,
  hasPopup,
}) {
  const [openReplyPopup, setOpenReplyPopup] = useState(false);

  return (
    <div className="min-h-screen border-r-1 border-gray-700 w-[600px] text-white ">
      <div
        className={`border-b border-[rgba(143,149,157,0.4)] h-13 fixed w-[598px] z-50 ${
          !hasPopup ? "bg-black" : "backdrop-blur-md text-gray-400"
        }`}
      >
        <div className="flex justify-center p-4 gap-60 ">
          <div>
            <p className="text-md font-bold cursor-pointer">สำหรับคุณ</p>
            <p className="border-b-4 border-blue-400 pt-2 "></p>
          </div>

          <p className="cursor-pointer">กำลังติดตาม</p>
        </div>
      </div>
      <Post
        fetchPosts={fetchPosts}
        user={user}
        isReply={false}
        setHasPopup={setHasPopup}
        setOpenReplyPopup={setOpenReplyPopup}
      />

      <ListPost
        user={user}
        posts={posts}
        handledDeletePost={handledDeletePost}
        handleLike={handleLike}
        likes={likes}
        setHasPopup={setHasPopup}
        openReplyPopup={openReplyPopup}
        setOpenReplyPopup={setOpenReplyPopup}
        fetchPosts={fetchPosts}
      />
    </div>
  );
}

export default MainPost;

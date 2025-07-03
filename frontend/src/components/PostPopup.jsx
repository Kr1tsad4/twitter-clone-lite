import Post from "./Post";
import { RxCross1 } from "react-icons/rx";

function PostPopup({
  openPopup,
  isPost,
  postToReply,
  user,
  setOpenReplyPopup,
  setHasPopup,
  fetchPosts
}) {
  const closePopup = () => {
    setHasPopup(false);
    setOpenReplyPopup(false);
  };
  return (
    <div>
      {openPopup && !isPost && (
        <div className="h-auto w-[590px] bg-black rounded-2xl mr-5">
          <div className="flex justify-between">
            <button
              className="p-4 text-[18px] cursor-pointer"
              onClick={closePopup}
            >
              <RxCross1 />
            </button>
            <p className="p-4 text-[15px] font-bold text-blue-400 cursor-pointer">
              แบบร่าง
            </p>
          </div>
          <div className="flex items-start gap-4 pl-4 pt-2">
            <div className="h-10 w-10 border-2 border-white rounded-full"></div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h1 className="font-semibold text-white text-[17px]">
                  {postToReply?.authorName}
                </h1>
              </div>
              <h1 className="text-white text-[17px]">{postToReply?.content}</h1>
              <p className="pt-3 text-[15px] text-gray-600">
                การตอบกลับถึง{" "}
                <span className="text-blue-500 cursor-pointer">
                  {" "}
                  @{postToReply?.authorName}
                </span>
              </p>
            </div>
          </div>
          <Post
            user={user}
            isReply={true}
            setOpenReplyPopup={setOpenReplyPopup}
            setHasPopup={setHasPopup}
            fetchPosts={fetchPosts}
          />
        </div>
      )}
    </div>
  );
}

export default PostPopup;

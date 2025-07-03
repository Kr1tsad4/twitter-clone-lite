import Post from "./Post";
import { RxCross1 } from "react-icons/rx";

function PostPopup({
  closePopup,
  openPopup,
  replyPost,
  user,
  isInputOnFocus,
  isReply,
  content,
  setContent,
  handleInputOnFocus,
  enablePostButton,
  postTweet,
}) {
  if (!openPopup) return null;

  return (
    <div className="h-auto w-[590px] bg-black rounded-2xl mr-5 border border-gray-700">
      <div className="flex justify-between">
        <button
          className="p-4 text-[18px] cursor-pointer hover:bg-gray-800 rounded"
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
              {replyPost?.authorName}
            </h1>
          </div>
          <h1 className="text-white text-[17px]">{replyPost?.content}</h1>
          <p className="pt-3 text-[15px] text-gray-600">
            การตอบกลับถึง
            <span className="text-blue-500 cursor-pointer">
              @{replyPost?.authorName}
            </span>
          </p>
        </div>
      </div>

      <Post
        user={user}
        isInputOnFocus={isInputOnFocus}
        isReply={isReply}
        content={content}
        setContent={setContent}
        handleInputOnFocus={handleInputOnFocus}
        enablePostButton={enablePostButton}
        postTweet={postTweet}
      />
    </div>
  );
}

export default PostPopup;

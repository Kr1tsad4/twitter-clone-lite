import Post from "./Post";
import { useMemo, useState } from "react";
import { createTweet } from "../libs/fetchTweetUtils";
import { API_URL } from "../libs/api";
function MainPost({ user, handledDeletePost, posts, fetchPosts }) {
  const [isInputOnFocus, setIsInputOnFocus] = useState(false);
  const [content, setContent] = useState("");
  const postTweet = async () => {
    const newPost = {
      content: content,
      authorId: user._id,
      like: [],
      comments: [],
    };
    const post = await createTweet(API_URL, newPost);
    if (post) {
      setContent("");
      setIsInputOnFocus(false);

      fetchPosts();
    }
  };
  const enablePostButton = useMemo(() => {
    return content.trim() ? true : false;
  }, [content]);

  const handleInputOnFocus = () => {
    setIsInputOnFocus(true);
  };

  return (
    <div className="min-h-screen border-r-1 border-gray-700 w-[600px] text-white ">
      <div className="border-b-1 border-[rgba(143,149,157,0.4)] h-13 fixed w-[598px] bg-black z-10">
        <div className="flex justify-center p-4 gap-60">
          <div>
            <p className="text-md font-bold cursor-pointer">สำหรับคุณ</p>
            <p className="border-b-4 border-blue-400 pt-2 "></p>
          </div>

          <p className="cursor-pointer">กำลังติดตาม</p>
        </div>
      </div>
      <div className="pt-[60px]">
        <div className="border-b-1 border-[rgba(143,149,157,0.4)] p-5">
          <div className="flex gap-4">
            <div className="h-10 w-10 border-2 border-white rounded-full "></div>
            <div className="-mb-6">
              <input
                type="text"
                className="text-xl text-[rgba(255,255,255,0.78)] outline-0 w-[490px]"
                placeholder="มีอะไรเกิดขึ้นบ้าง"
                value={content}
                onFocus={() => handleInputOnFocus()}
                onChange={(e) => setContent(e.target.value)}
              />

              {isInputOnFocus && (
                <div>
                  <p className="mt-5 text-sm text-blue-500 font-bold">
                    o ทุกคนสามารถตอบกลับ
                  </p>
                  <div className="border-b-1 border-[rgba(143,149,157,0.4)] mt-4 w-[490px]"></div>
                </div>
              )}

              <div className="flex justify-between p-3 mt-2 text-gray-400">
                <div className="flex gap-5 cursor-pointer ">
                  <p className="hover:text-white">o</p>
                  <p className="hover:text-white">o</p>
                  <p className="hover:text-white">o</p>
                  <p className="hover:text-white">o</p>
                  <p className="hover:text-white">o</p>
                  <p className="hover:text-white">o</p>
                  <p className="hover:text-white">o</p>
                </div>
                <button
                  onClick={postTweet}
                  className={`font-semibold text-black text-sm  px-5
                   rounded-4xl py-2 -mr-5  ${
                     !enablePostButton
                       ? "bg-[rgba(167,174,183,0.4)]"
                       : "bg-white cursor-pointer"
                   } `}
                  disabled={!enablePostButton}
                >
                  โพสต์
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Post user={user} posts={posts} handledDeletePost={handledDeletePost} />
    </div>
  );
}

export default MainPost;

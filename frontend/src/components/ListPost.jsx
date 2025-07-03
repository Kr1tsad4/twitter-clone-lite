import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { SiSimpleanalytics } from "react-icons/si";
import { FaHeart } from "react-icons/fa";
import PostPopup from "./PostPopup";
import { API_URL } from "../libs/api";
import { getTweetById } from "../libs/fetchTweetUtils";
import { getUserById } from "../libs/fetchUserUtils";

function ListPost({
  user,
  posts,
  handledDeletePost,
  handleLike,
  likes,
  setHasPopup,
  openReplyPopup,
  setOpenReplyPopup,
  fetchPosts
}) {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const [replyPost, setReplyPost] = useState(null);
  const handleReplyPost = async (postId) => {
    setOpenReplyPopup(true);
    setHasPopup(true);
    const getReplyPost = await getTweetById(API_URL, postId);
    if (getReplyPost) {
      const userData = await getUserById(API_URL, getReplyPost.authorId);
      setReplyPost({ ...getReplyPost, authorName: userData.name });
    }
  };

  return (
    <div className="mb-20">
      {posts.map((post, index) => (
        <div key={index} className="p-4 border-b border-gray-700">
          {openReplyPopup && (
            <div className="fixed z-50 right-108 top-10 pointer-events-auto">
              <PostPopup
                openPopup={openReplyPopup}
                isPost={false}
                postToReply={replyPost}
                user={user}
                setOpenReplyPopup={setOpenReplyPopup}
                setHasPopup={setHasPopup}
                fetchPosts={fetchPosts}
              />
            </div>
          )}

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 border-2 border-white rounded-full"></div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h1 className="font-semibold text-white">{post.authorName}</h1>

                <div
                  className="text-xl text-white cursor-pointer relative -mt-3"
                  onClick={() => toggleMenu(index)}
                >
                  ...
                  {openMenuIndex === index && (
                    <div className="bg-black shadow-white shadow-md h-100 w-85 p-3 absolute right-0 z-50">
                      {user._id === post.authorId && (
                        <button
                          onClick={() => handledDeletePost(post._id)}
                          className="text-red-500 p-2 cursor-pointer rounded w-85 text-start"
                        >
                          ลบ
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <p className=" text-gray-200">{post.content}</p>
              <div className="flex gap-26 mt-2 text-gray-400 items-center ผ">
                <button
                  onClick={() => handleReplyPost(post._id)}
                  className="cursor-pointer hover:text-white"
                >
                  <FaRegComment size={15} />
                </button>
                <p className="cursor-pointer hover:text-white">
                  <BiRepost size={20} />
                </p>
                <div className="flex gap-2 w-[18px] ">
                  {likes[index]?.liked ? (
                    <button
                      className="cursor-pointer"
                      onClick={() => handleLike(index, post._id, false)}
                    >
                      <FaHeart size={15} color="rgb(231, 84, 108)" />
                    </button>
                  ) : (
                    <button
                      className="cursor-pointer hover:text-red-400"
                      onClick={() => handleLike(index, post._id, true)}
                    >
                      <FaRegHeart size={15} />
                    </button>
                  )}
                  {likes[index]?.count > 0 && (
                    <p className="text-[12px]">{likes[index]?.count}</p>
                  )}
                </div>

                <p className="cursor-pointer hover:text-white">
                  <SiSimpleanalytics size={15} />
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListPost;

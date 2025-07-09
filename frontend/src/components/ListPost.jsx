import { useMemo, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { SiSimpleanalytics } from "react-icons/si";
import { FaHeart } from "react-icons/fa";

function ListPost({
  user,
  posts,
  selectedPost,
  likes,
  deletePost,
  like,
  handleReplyPost,
  handleViewPost,
}) {
  const [openPostMenuIndex, setOpenPostMenuIndex] = useState(null);
  const toggleMenu = (index) => {
    setOpenPostMenuIndex(openPostMenuIndex === index ? null : index);
  };

  const handledDeletePost = async (postId) => {
    await deletePost(postId);
    setOpenPostMenuIndex(null);
  };
  const handleLike = async (index, postId, isLike) => {
    await like(index, postId, isLike);
  };

  const postToList = useMemo(() => {
    if (selectedPost) {
      return [selectedPost, ...(selectedPost.comments || [])];
    }
    return posts;
  }, [selectedPost, posts]);

  const handlePostClick = (postId) => {
    if (!selectedPost) {
      handleViewPost(true, postId);
      console.log(selectedPost);
    }
  };
  return (
    <div>
      {postToList.map((post, index) => (
        <div
          key={post._id || index}
          className="p-4 border-b border-gray-700 cursor-pointer"
        >
          <div
            className="flex items-start gap-4"
            onClick={() => handlePostClick(post._id)}
          >
            <div className="h-10 w-10 border-2 border-white rounded-full"></div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className={`${posts && !selectedPost ? "flex" : ""}`}>
                  <h1 className="font-semibold text-white">
                    {post.authorName}
                  </h1>

                  <span
                    className={`text-gray-600 font-normal ${
                      !selectedPost ? "pl-2" : ""
                    }`}
                  >
                    @{post.authorName}
                  </span>
                </div>

                <div
                  className="text-xl text-white cursor-pointer relative -mt-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(index);
                  }}
                >
                  ...
                  {openPostMenuIndex === index && (
                    <div className="bg-black shadow-white shadow-md h-100 w-85 p-3 absolute right-0 z-50">
                      {user && user._id === post.authorId && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handledDeletePost(post._id);
                          }}
                          className="text-red-500 p-2 cursor-pointer rounded w-85 text-start hover:bg-gray-800"
                        >
                          ลบ
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {post.replyToAuthorName && (
                <p className="text-sm text-gray-400">
                  การตอบกลับถึง
                  <span className="text-blue-500">
                    @{post.replyToAuthorName}
                  </span>
                </p>
              )}
              <p className=" text-gray-200 mt-1">{post.content}</p>
              <div className="flex gap-26 mt-2 text-gray-400 items-center">
                <div className="flex w-[18px] gap-2 items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReplyPost(post._id);
                    }}
                    className="cursor-pointer hover:text-white"
                  >
                    <FaRegComment size={15} />
                  </button>
                  {post.commentCount > 0 && (
                    <p className="text-[12px]">{post.commentCount}</p>
                  )}
                </div>

                <p className="cursor-pointer hover:text-white">
                  <BiRepost size={20} />
                </p>

                <div className="flex gap-2 w-[18px] items-center">
                  {likes[index]?.liked ? (
                    <button
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(index, post._id, false);
                      }}
                    >
                      <FaHeart size={15} color="rgb(231, 84, 108)" />
                    </button>
                  ) : (
                    <button
                      className="cursor-pointer hover:text-red-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(index, post._id, true);
                      }}
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

      <div className="mb-96"></div>
    </div>
  );
}

export default ListPost;

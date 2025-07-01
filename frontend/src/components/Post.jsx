import { useState } from "react";

function Post({ user, posts, handledDeletePost }) {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
    <div className="mb-20">
      {posts.map((post, index) => (
        <div key={index} className="p-4 border-b border-gray-700">
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

              <div className="flex gap-25 mt-1 text-gray-400">
                <p className="cursor-pointer hover:text-white">o</p>
                <p className="cursor-pointer hover:text-white">o</p>
                <p className="cursor-pointer hover:text-white">o</p>
                <p className="cursor-pointer hover:text-white">o</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;

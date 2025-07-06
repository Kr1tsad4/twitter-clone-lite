import { IoMdArrowBack } from "react-icons/io";
import ListPost from "./ListPost";

function PostDetails({ user, ...tweetProps }) {
  const { handleViewPost } = tweetProps;
  return (
    <div>
      <div className="flex gap-10 p-4">
        <button
          onClick={() => handleViewPost(false)}
          className="cursor-pointer"
        >
          <IoMdArrowBack size={20} />
        </button>
        <p className="text-xl font-bold">โพสต์</p>
      </div>
      <ListPost user={user} {...tweetProps} />
    </div>
  );
}

export default PostDetails;

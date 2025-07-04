import ListPost from "./ListPost";
import Post from "./Post";
import PostPopup from "./PostPopup";
import PostDetails from "./PostDetails";
function MainPost({ user, ...tweetProps }) {
  return (
    <div className="min-h-screen border-r-1 border-gray-700 w-[600px] text-white">
      {!tweetProps.isViewPost && (
        <>
          <div
            className={`border-b border-[rgba(143,149,157,0.4)] h-13 fixed w-[598px] z-50 ${
              !tweetProps.hasPopup
                ? "bg-black"
                : "backdrop-blur-md text-gray-400"
            }`}
          >
            <div className="flex justify-center p-4 gap-60">
              <div>
                <p className="text-md font-bold cursor-pointer">สำหรับคุณ</p>
                <p className="border-b-4 border-blue-400 pt-2"></p>
              </div>
              <p className="cursor-pointer">กำลังติดตาม</p>
            </div>
          </div>

          <Post user={user} {...tweetProps} />

          <ListPost user={user} {...tweetProps} />
        </>
      )}
      {tweetProps.isViewPost && <PostDetails user={user} {...tweetProps} />}
      {tweetProps.hasPopup && (
        <div className="fixed z-99 right-108 top-10 pointer-events-auto">
          <PostPopup user={user} {...tweetProps} />
        </div>
      )}
    </div>
  );
}

export default MainPost;

import { CiImageOn } from "react-icons/ci";
import { MdOutlineGifBox } from "react-icons/md";

function Post({
  isInputOnFocus,
  isReply,
  content,
  setContent,
  handleInputOnFocus,
  enablePostButton,
  postTweet,
}) {
  return (
    <div className={`${!isReply ? "pt-[60px]" : ""}`}>
      <div
        className={`${
          !isReply ? "border-b-1 border-[rgba(143,149,157,0.4)] p-5" : "p-5"
        }`}
      >
        <div className="flex gap-4">
          <div className="h-10 w-10 border-2 border-white rounded-full"></div>
          <div className="-mb-6">
            <input
              type="text"
              className="text-xl text-[rgba(255,255,255,0.78)] outline-0 w-[490px] bg-transparent"
              placeholder={
                isReply ? "โพสต์การตอบกลับของคุณ" : "มีอะไรเกิดขึ้นบ้าง"
              }
              value={content}
              onFocus={handleInputOnFocus}
              onChange={(e) => setContent(e.target.value)}
            />

            {isInputOnFocus && !isReply && (
              <div>
                <p className="mt-5 text-sm text-blue-500 font-bold">
                  o ทุกคนสามารถตอบกลับ
                </p>
                <div className="border-b-1 border-[rgba(143,149,157,0.4)]  mt-4 w-[490px]"></div>
              </div>
            )}

            <div
              className={`flex justify-between p-3 text-gray-400 ${
                isReply ? "mt-20 -ml-18" : "mt-2"
              }`}
            >
              <div className="flex gap-5 cursor-pointer">
                <p className="hover:text-white">
                  <CiImageOn
                    size={20}
                    color="rgb(0, 130, 239)"
                    strokeWidth={0.8}
                  />
                </p>
                <p className="hover:text-white">
                  <MdOutlineGifBox size={20} color="rgb(0, 130, 239)" />
                </p>
                <p className="hover:text-white">o</p>
                <p className="hover:text-white">o</p>
                <p className="hover:text-white">o</p>
                <p className="hover:text-white">o</p>
                <p className="hover:text-white">o</p>
              </div>
              <button
                onClick={() => postTweet(isReply)}
                className={`font-semibold text-black text-sm  px-5
                   rounded-4xl py-2 -mr-5  ${
                     !enablePostButton
                       ? "bg-[rgba(167,174,183,0.4)] cursor-not-allowed"
                       : "bg-white cursor-pointer hover:bg-gray-200"
                   }`}
                disabled={!enablePostButton}
              >
                {isReply ? "ตอบกลับ" : "โพสต์"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;

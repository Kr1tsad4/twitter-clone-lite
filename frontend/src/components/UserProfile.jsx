import { useState } from "react";
import { MdMoreHoriz } from "react-icons/md";

export default function UserProfile({ user, x_logo, isSelf,logout }) {
  const user_name = user?.name;
  const hoverMode = isSelf ? "rounded-[70px] mr-[10px] mb-[20px] mt-auto" : "";
  const [toggleProfileMenu, setToggleProfileMenu] = useState(false);

  return (
    <div
      id="user-profile"
      className={`flex flex-row items-center  p-[12px] relative hover:bg-[rgb(10,10,10)] ${hoverMode} gap-[20px] cursor-default`}
    >
      <div className="ml-[8px]">{x_logo}</div>
      <div>
        <div className="text-white font-[700] text-[16px]">{user_name}</div>
        <div className="text-gray-400 font-[400] text-[14px]">@{user_name}</div>
      </div>
      {isSelf ? (
        <div
          className="text-white ml-auto mr-[10px] cursor-pointer "
          onClick={() => setToggleProfileMenu(!toggleProfileMenu)}
        >
          {toggleProfileMenu && (
            <div className="bg-black shadow-gray-300 shadow-sm h-32 rounded-xl w-73 absolute bottom-18 -left-5 flex flex-col gap-5 p-2">
              <p className=" pl-4 pt-2 pr-4 pb-2 hover:bg-[rgba(56,62,70,0.4)] transition-all font-bold">
                เพิ่มบัญชีที่มีอยู่แล้ว
              </p>
              <div onClick={logout} className="hover:bg-[rgba(56,62,70,0.4)] pl-4 transition-all -mt-2 font-bold">
                <p>ออกจากระบบ</p>
                <p>@{user_name}</p>
              </div>
            </div>
          )}

          {<MdMoreHoriz size={22} />}
        </div>
      ) : (
        <div className="text-black bg-white font-[600] text-[16px] text-center  pt-[5px] pb-[5px] pl-[20px] pr-[20px] ml-auto mr-[5px] hover:bg-gray-200 rounded-[70px] gap-[20px] cursor-default">
          ติดตาม
        </div>
      )}
    </div>
  );
}

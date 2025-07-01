import { MdMoreHoriz } from "react-icons/md";

export default function UserProfile({user, x_logo, isSelf}) {

  const user_name = user?.name;
  const hoverMode = isSelf ? 'rounded-[70px] mr-[10px] mb-[20px] mt-auto' : ''; 
  return (
    <div
      id="user-profile"
      className={`flex flex-row items-center  p-[12px]  hover:bg-[rgb(10,10,10)] ${hoverMode} gap-[20px] cursor-default`}
    >
      <div className="ml-[8px]">{x_logo}</div>
      <div>
        <div className="text-white font-[700] text-[16px]">{user_name}</div>
        <div className="text-gray-400 font-[400] text-[14px]">@{user_name}</div>
      </div>
      {
        isSelf ? <div className="text-white ml-auto mr-[10px]" onClick={() => {console.log('เพิ่มเติม profile')}}>{<MdMoreHoriz size={22}/>}</div> :
        <div className="text-black bg-white font-[600] text-[16px] text-center  pt-[5px] pb-[5px] pl-[20px] pr-[20px] ml-auto mr-[5px] hover:bg-gray-200 rounded-[70px] gap-[20px] cursor-default">
          ติดตาม
        </div>
      }
      
      
    </div>
  );
}

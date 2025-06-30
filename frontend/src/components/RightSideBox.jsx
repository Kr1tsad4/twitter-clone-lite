import UserProfile from "./UserProfile";

export default function RightSideBox({header, user, item}) {
  
  console.log(user);

  return (
    <div className="text-white border border-[rgb(54,54,54)] rounded-[10px] mb-[15px] mt-[10px] w-[100%] overflow-hidden">
      <div className="m-[10px] font-bold text-[20px]">{header}</div>
      {item}
    </div>

  );
}

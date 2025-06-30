import NavButton from "./NavButton";
import { GoHome } from "react-icons/go";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { GoBell } from "react-icons/go";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";

function SideMenu({user}) {
  const x_logo = (
    <svg
      aria-label="X logo"
      width="25"
      height="25"
      viewBox="0 0 300 271"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="white"
        d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"
      />
    </svg>
  );
  return (
    <div className="min-h-screen border-r-1 border-white w-[255px] ml-30 flex-col pt-[2px]">
      <NavButton icon={x_logo} context="" />
      <NavButton icon={<GoHome size={28} />} context="หน้าแรก" />
      <NavButton icon={<HiMagnifyingGlass size={28} />} context="สำรวจ" />
      <NavButton icon={<GoBell size={28} />} context="การแจ้งเตือน" />
      <NavButton icon={<HiOutlineEnvelope size={28} />} context="ข้อความ" />
      <NavButton icon={<FaRegUser size={28} />} context="ข้อมูลส่วนตัว" />
      <NavButton icon={<MdMoreHoriz size={28} />} context="เพิ่มเติม" />
    </div>
  );
}

export default SideMenu;

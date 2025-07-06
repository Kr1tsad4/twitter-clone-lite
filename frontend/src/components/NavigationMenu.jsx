import { useState, useEffect } from "react";
import NavButton from "./NavButton";
import { GoHome } from "react-icons/go";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { GoBell } from "react-icons/go";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import UserProfile from "./UserProfile";

function NavigationMenu({ user, logout }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1441px)");
    const handleResize = () => setHide(mediaQuery.matches);

    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

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
    <div className="min-h-screen border-r-1 border-gray-700 w-[255px] ml-30 flex flex-col pt-[2px] max-[1441px]:min-w-[100px]">
      <div className="fixed w-[255px] max-[1441px]:w-[100px]">
        <NavButton icon={x_logo} context="" hideContext={hide} />
        <NavButton
          icon={<GoHome size={28} />}
          context="หน้าแรก"
          hideContext={hide}
        />
        <NavButton
          icon={<HiMagnifyingGlass size={28} />}
          context="สำรวจ"
          hideContext={hide}
        />
        <NavButton
          icon={<GoBell size={28} />}
          context="การแจ้งเตือน"
          hideContext={hide}
        />
        <NavButton
          icon={<HiOutlineEnvelope size={28} />}
          context="ข้อความ"
          hideContext={hide}
        />
        <NavButton
          icon={<FaRegUser size={28} />}
          context="ข้อมูลส่วนตัว"
          hideContext={hide}
        />
        <NavButton
          icon={<MdMoreHoriz size={28} />}
          context="เพิ่มเติม"
          hideContext={hide}
        />

        <div
          className={`bg-white font-[600] text-[16px] text-center p-[15px] mr-[20px] mt-[10px] hover:bg-gray-200 rounded-[70px] gap-[20px] cursor-default  max-[1441px]:text-[12px] ${
            hide ? "w-[50px] h-[50px]" : ""
          }`}
        >
          {!hide ? "โพสต์" : ""}
        </div>

        <div className="mt-58">
          <UserProfile
            user={user}
            x_logo={x_logo}
            isSelf={true}
            logout={logout}
            hideName={hide}
          />
        </div>
      </div>
    </div>
  );
}

export default NavigationMenu;

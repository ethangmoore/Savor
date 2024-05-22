import React, { useState } from "react";
import { getInitials } from "../../utils/helper";
import close from "../../assets/images/close.svg";
import menu from "../../assets/images/menu.svg";
import { BsSun, BsMoon } from "react-icons/bs";

const ProfileInfo = ({ userInfo, onLogout, isDarkMode, toggleDarkMode }) => {
  const [toggle, setToggle] = useState(false);

  return (
    userInfo && (
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-purple-200">
          {getInitials(userInfo.fullName)}
        </div>

        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle((prev) => !prev)}
        />

        <div
          className={`${toggle ? "flex" : "hidden"} p-6 bg-white 
          absolute top-28 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            <li className="text-md font medium pb-2">{userInfo.fullName}</li>
            <li>
              <button
                className="text-sm flex items-center pb-2"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? (
                  <>
                    <BsSun className="text-yellow-500" />
                  </>
                ) : (
                  <>
                    <BsMoon className="text-gray-700" />
                  </>
                )}
              </button>
            </li>
            <li>
              <button
                className="text-sm text-slate-700 underline"
                onClick={onLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  );
};

export default ProfileInfo;

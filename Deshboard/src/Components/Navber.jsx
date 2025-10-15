import React from "react";

const Navber = () => {
  return (
    <nav className="w-full bg-white p-4 py-[20px] shadow-xl shadow-black/30">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center justify-between">
          <div className="relative h-[50px] w-[750px] rounded-full border-2 border-black/50">
            <input
              className="h-full w-full rounded-full pl-5 pr-[90px] outline-none"
              placeholder="Search Here..."
              type="text"
            />
            <span className="absolute right-[20px] top-[50%] flex translate-y-[-50%] cursor-pointer items-center justify-center rounded-full bg-blue-gray-500/20 px-[10px] py-[10px] text-[20px]">
              <i class="fa-solid fa-magnifying-glass text-black"></i>
            </span>
          </div>
          <div className="flex gap-5">
            <span className="flex cursor-pointer items-center justify-center rounded-full bg-blue-gray-500/20 px-[14px] py-[5px] text-[24px]">
              <i class="fa-light fa-bell text-black"></i>
            </span>
            <span className="flex cursor-pointer items-center justify-center rounded-full bg-blue-gray-500/20 px-[14px] py-[5px] text-[24px]">
              <i class="fa-light fa-message text-black"></i>
            </span>
            <div className="h-[50px] w-[50px] rounded-full border-2 border-red-500 p-[2px]">
              <img
                className="h-full w-full rounded-full"
                src="/mans.png"
                alt="mans"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navber;

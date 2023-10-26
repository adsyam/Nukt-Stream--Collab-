import React from "react";

export const Library = () => {
  return (
    <section className="w-full min-h-[100vh] bg-black text-white px-[3rem]">
      <div className="w-full flex justify-between items-center translate-y-[8rem]">
        <h1 className="text-[1.5rem] font-medium">Library Feed</h1>
        <button className="capitalize font-medium bg-white/20 p-[.5rem] rounded-lg hover:bg-[#389FDD]">
          manage library
        </button>
      </div>
      <hr className="border-white/20 translate-y-[10rem]" />
    </section>
  );
};

import { useState } from "react";
import { useDataContext } from "../context/DataContext";
import { VideoLibrary, SeriesLibrary, MovieLibrary } from "./index";

export const Library = () => {
  const { sidebar } = useDataContext();
  const [reload, setReload] = useState(false);

  return (
    <section
      className={`min-h-screen text-white px-[3rem] ${
        sidebar
          ? "translate-x-[14rem] origin-left duration-300 w-[89%]"
          : "w-full origin-right duration-300"
      }`}
    >
      <div className="w-full flex justify-between items-center translate-y-[8rem]">
        <h1 className="text-[1.5rem] font-medium">Library Feed</h1>
        <button className="capitalize font-medium bg-white/20 p-[.5rem] rounded-lg hover:bg-[#389FDD]">
          manage library
        </button>
      </div>
      <hr className="border-white/20 translate-y-[10rem]" />
      <div className="translate-y-[12rem] min-h-screen">
        <div className="flex items-center gap-[2rem] mb-[2rem]">
          <MovieLibrary reload={reload} />
        </div>
        <div className="flex items-center gap-[2rem] mb-[2rem]">
          <SeriesLibrary reload={reload} />
        </div>
        <div className="flex items-center gap-[2rem] mb-[2rem]">
          <VideoLibrary reload={reload} />
        </div>
      </div>
    </section>
  );
};

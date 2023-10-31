import { useState } from "react";
import { MovieWatchHistory, SeriesWatchHistory, VideoHistory } from "./index";
import { useDataContext } from "../context/DataContext";

export const History = () => {
  const [reload, setReload] = useState(false);
  const { sidebar, history, setHistory } = useDataContext();

  //clear the data of localStorage
  const handleClear = () => {
    localStorage.clear();
    setReload(true); //update reload value to rerender the component
  };

  const toggleHistory = () => {
    setHistory(!history);
  };

  return (
    <section
      className={`min-h-[100vh] text-white px-[3rem] ${
        sidebar
          ? "translate-x-[14rem] origin-left duration-300 w-[89%]"
          : "w-full origin-right duration-300"
      }`}
    >
      <div className="w-full flex justify-between items-center translate-y-[8rem]">
        <h1 className="text-[1.5rem] font-medium">History Feed</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={handleClear}
            className="capitalize font-medium bg-white/20 p-[.5rem] rounded-lg hover:bg-[#389FDD]"
          >
            clear history
          </button>
          <button
            onClick={toggleHistory}
            className="capitalize font-medium bg-white/20 p-[.5rem] rounded-lg hover:bg-[#389FDD]"
          >
            save history: {history ? "on" : "off"}
          </button>
        </div>
      </div>
      <hr className="border-white/20 translate-y-[10rem]" />
      <div className="translate-y-[12rem] flex items-center gap-[2rem] mb-[2rem]">
        <MovieWatchHistory reload={reload} />
      </div>
      <div className="translate-y-[12rem] flex items-center gap-[2rem] mb-[2rem]">
        <SeriesWatchHistory reload={reload} />
      </div>
      <div className="translate-y-[12rem] flex items-center gap-[2rem] mb-[2rem]">
        <VideoHistory reload={reload} />
      </div>
    </section>
  );
};

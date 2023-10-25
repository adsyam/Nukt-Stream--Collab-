import { useEffect, useState } from "react";
import { VideoCard, MovieWatchHistory, SeriesWatchHistory } from "./index";
import { AiOutlineClose } from "react-icons/ai";

export const History = () => {
  const [videoDetails, setVideoDetails] = useState([]);
  const [reload, setReload] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState(null);

useEffect(() => {
  const dataStore = []

  for (const key in localStorage) {
    if (key !== "movieIds" && key !== "seriesIds") {
      const value = localStorage.getItem(key)

      try {
        // Attempt to parse the value as JSON
        const parsedValue = JSON.parse(value)

        if (parsedValue !== null) {
          dataStore.push(parsedValue)
        }
      } catch (error) {
        console.error(`Error parsing JSON for key '${key}':`, error)
      }
    }
  }

  setVideoDetails(dataStore)
}, [reload])

  //clear the data of localStorage
  const handleClear = () => {
    localStorage.clear();
    setReload(true); //update reload value to rerender the component
  };

  const handleDelete = (key) => {
    localStorage.removeItem(key);

    // update the videoDetails state by filtering out the deleted item
    setVideoDetails((prevVideoDetails) =>
      prevVideoDetails.filter((videoDetail) => videoDetail.id !== key)
    );
    setKeyToDelete(null); // reset the keyToDelete state
  };

  // filter out the deleted item when rendering
  const filteredVideoDetails = videoDetails.filter(
    (videoDetail) => videoDetail?.id !== keyToDelete
  );

  return (
    <section className="w-full min-h-[100vh] bg-black text-white px-[3rem]">
      <div className="w-full flex justify-between items-center translate-y-[8rem]">
        <h1 className="text-[1.5rem] font-medium">History Feed</h1>
        <button
          onClick={handleClear}
          className="capitalize font-medium bg-white/20 p-[.5rem] rounded-lg hover:bg-[#389FDD]"
        >
          clear history
        </button>
      </div>
      <hr className="border-white/20 translate-y-[10rem]" />
      <div className="translate-y-[12rem] flex items-center gap-[2rem]">
        {filteredVideoDetails.map((videoDetail) => (
          <div key={videoDetail?.id} className="relative group">
            <button
              onClick={() => handleDelete(videoDetail?.id)}
              className="absolute right-0 bg-black/40 p-[.5rem] rounded-full
              z-50 opacity-0 group-hover:opacity-100 duration-300"
            >
              <AiOutlineClose size={25} />
            </button>
            <VideoCard item={videoDetail} />
          </div>
        ))}
      </div>
      <div className="translate-y-[12rem] flex items-center gap-[2rem] mb-[2rem]">
        <MovieWatchHistory reload={reload} />
      </div>
      <div className="translate-y-[12rem] flex items-center gap-[2rem] mb-[2rem]">
        <SeriesWatchHistory reload={reload} />
      </div>
    </section>
  );
};

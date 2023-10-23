import { VideoCard } from "./index"
import { useFetchStats } from "../Hooks/customHooks"
import { Navigate } from "react-router-dom"

export const History = () => {
  const storedVideoIds = JSON.parse(localStorage.getItem("videoIds")) || []

  const handleClearHistory = () => {
    localStorage.clear()
    return Navigate("/feed/history")
  }

  return (
    <section className="w-full min-h-[100vh] bg-black text-white px-[3rem]">
      <div className="w-full flex justify-between items-center translate-y-[8rem]">
        <h1 className="text-[1.5rem] font-medium">History Feed</h1>
        <button
          onClick={handleClearHistory}
          className="capitalize font-medium bg-white/20 p-[.5rem] rounded-lg hover:bg-[#389FDD]"
        >
          clear history
        </button>
      </div>
      <hr className="border-white/20 translate-y-[10rem]" />
      <div className="translate-y-[12rem] flex items-center gap-[2rem]">
        {storedVideoIds.map((videoId) => (
          <div key={videoId} className="">
            <VideoCard item={useFetchStats(videoId)} />
          </div>
        ))}
      </div>
    </section>
  )
}

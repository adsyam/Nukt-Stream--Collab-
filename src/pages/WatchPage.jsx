import { VideosGrid, Reviews, VideoDescriptions } from "../components/index"

import ReactPlayer from "react-player"
import { useFetchRelatedVideos, useFetchStats } from '../Hooks/customHooks'
import { useLocation } from "react-router-dom"
import { useEffect } from "react"


export const WatchPage = () => {
  const id = new URLSearchParams(window.location.search).get("v")
  const videoDetails = useFetchStats(id)
  const videos = useFetchRelatedVideos(id)
  const location = useLocation().search

  useEffect(() => {
    const storedVideoIds = JSON.parse(localStorage.getItem("videoIds")) || []

    if (!storedVideoIds.includes(id)) {
      storedVideoIds.push(id)
      localStorage.setItem("videoIds", JSON.stringify(storedVideoIds))
    }
  }, [location])

  if (!videoDetails) {
    return (
      <div className="w-full h-[100vh] bg-black grid place-items-center">
        <h1 className="text-[2rem] text-white">Loading...</h1>
      </div>
    )
  }

  return (
    <section className="min-h-[100vh] bg-black">
      <div className="flex flex-col gap-3 pt-[5rem]">
        <div className="flex-1">
          <div className="w-full p-[1rem]">
            <div className="">
                <iframe
                  key={id}
                  src={`https://www.youtube.com/embed/${id}`}
                //   className="react-player"
                  allowFullScreen
                  frameBorder={0}
                  className="aspect-video w-full h-full rounded-[10px]"
                />
            </div>
            <VideoDescriptions videoDetail={videoDetails} />
          </div>
          <Reviews />
        </div>
        <div className="px-[1rem] py-[2rem] md:py-[1rem] flex flex-col justify-start items-baseline">
          <p className="text-white text-[1.5rem] font-bold">Related Videos</p>
          <div className="">
            <VideosGrid videos={videos} />
          </div>
        </div>
      </div>
    </section>
  )
}

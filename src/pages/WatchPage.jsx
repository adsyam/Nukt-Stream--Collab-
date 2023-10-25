import { VideosGrid, Reviews, VideoDescriptions } from "../components/index";
import {
  useFetchRelatedVideos,
  useFetchStats,
  useFetchVideoComments,
} from "../Hooks/customHooks";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const WatchPage = () => {
  const id = new URLSearchParams(window.location.search).get("v");
  const videoDetails = useFetchStats(id);
  const videos = useFetchRelatedVideos(id);
  const comments = useFetchVideoComments(id);
  const location = useLocation().search;

  useEffect(() => {
    const jsonString = JSON.stringify(videoDetails);
    localStorage.setItem(videoDetails?.id, jsonString);
  }, [videoDetails]);

  if (!videoDetails) {
    return (
      <div className="w-full h-[100vh] bg-black grid place-items-center">
        <h1 className="text-[2rem] text-white">Loading...</h1>
      </div>
    );
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
                allowFullScreen
                frameBorder={0}
                className="aspect-video w-full h-full rounded-[10px]"
              />
            </div>
            <VideoDescriptions videoDetail={videoDetails} />
          </div>
        </div>
        <div className="flex flex-1 flex-col lg:flex-row items-baseline w-full">
          <Reviews comments={comments} />
          <div className="flex flex-1 flex-col">
            <p className="text-white text-center text-[1.5rem] font-medium">
              Related Videos
            </p>
            <div className="">
              <VideosGrid videos={videos} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import {
  useFetchRelatedVideos,
  useFetchStats,
  useFetchVideoComments,
} from "../Hooks/customHooks";
import { Footer, Reviews, VideoDescriptions, VideosGrid } from "../components";
import { useDataContext } from "../context/DataContext";
import { useDBContext } from "../context/DBContext";
import { useAuthContext } from "../context/AuthContext";
import { textDB } from "../config/firebase";

export default function WatchVideo() {
  const id = new URLSearchParams(window.location.search).get("v");
  const [historyToggle, setHistoryToggle] = useState(true);

  const videoDetails = useFetchStats(id);
  const videos = useFetchRelatedVideos(id);
  const comments = useFetchVideoComments(id);
  const { user } = useAuthContext();
  const { sidebar } = useDataContext();
  const { addHistoryOrLibrary } = useDBContext();
  const videoRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(textDB, "Users", user.uid), (doc) =>
      setHistoryToggle(doc.data().storeHistory)
    );
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (historyToggle) {
        addHistoryOrLibrary(user?.uid, "history", "videos", id);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [videoDetails]);

  if (!videoDetails) {
    return (
      <div className="w-full h-[100vh] bg-[#0d0d0d] grid place-items-center">
        <h1 className="text-[2rem] text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <section
        className={`min-h-[100vh] bg-[#0d0d0d] ${
          sidebar
            ? "translate-x-[15rem] origin-left duration-300 w-[87%]"
            : "w-full origin-right duration-300"
        }`}
      >
        <div className="flex flex-col gap-3 pt-[5rem]">
          <div className="flex-1">
            <div className="w-full p-[1rem]">
              <div className="">
                <iframe
                  ref={videoRef}
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
          <div className="flex flex-col items-baseline flex-1 w-full lg:flex-row">
            <Reviews comments={comments} id={id} />
            <div className="flex flex-col flex-1">
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
      <Footer />
    </>
  );
}

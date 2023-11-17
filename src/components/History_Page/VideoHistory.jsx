import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AiOutlineClose } from "react-icons/ai";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuthContext } from "../../context/AuthContext";
import VideoCard from "../Video_Section/VideoCard";
import { textDB } from "../../config/firebase";
import { useDBContext } from "../../context/DBContext";

export default function VideoHistory({ reload }) {
  const { user } = useAuthContext();
  const { updateHistoryOrLibrary } = useDBContext();
  const [videoIds, setVideoIds] = useState([]);
  const [videoDetails, setVideoDetails] = useState([]);
  const location = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(textDB, "Users", user.uid),
      { includeMetadataChanges: true },
      (doc) => setVideoIds(doc.data().history.videos)
    );
  }, []);

  useEffect(() => {
    //create an array of promises for fetching movie details
    const fetchVideoDetailsPromises = videoIds.map((videoId) => {
      const options = {
        method: "GET",
        url: "https://youtube-v31.p.rapidapi.com/videos",
        params: {
          part: "snippet",
          id: videoId,
        },
        headers: {
          "X-RapidAPI-Key":
            "e05035a5a5msheb07c768f5e3a59p16a60fjsncdc9b291ae84",
          "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
        },
      };
      return axios.request(options);
    });

    //use Promise.all to fetch all movie details in parallel
    Promise.all(fetchVideoDetailsPromises)
      .then((responses) => {
        //responses will be an array of movie details based on the movie ids
        const results = responses.map((response) => response.data);
        setVideoDetails(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reload, videoIds]);

  if (!videoDetails) return;

  const handleDelete = (idToDelete) => {
    const newIds = [...videoIds];

    const indexToRemove = newIds.indexOf(idToDelete.toString());
    if (indexToRemove !== -1) {
      newIds.splice(indexToRemove, 1);
      updateHistoryOrLibrary(user.uid, location, "videos", newIds);
    }
  };

  return (
    <section className="w-full min-h-max">
      {videoIds.length < 1 ? "" : <h2>Videos</h2>}
      <div className="w-full flex items-center gap-5 flex-wrap relative">
        {videoDetails.map((video, index) => (
          <div key={index} className="relative group">
            <VideoCard key={index} item={video.items[0]} />
            <button
              onClick={() => handleDelete(video.items[0]?.id)}
              className="absolute top-0 right-0 bg-black/40 p-[.5rem] rounded-full
              z-50 opacity-0 group-hover:opacity-100 duration-300"
            >
              <AiOutlineClose size={25} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

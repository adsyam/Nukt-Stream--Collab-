import React, { useEffect, useState } from "react";
import { VideoCard } from "./index";
import axios from "axios";
import { RAPID_API_KEY } from "../constants/apiConfig";
import { AiOutlineClose } from "react-icons/ai";

export const VideoHistory = ({ reload }) => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [itemToDelete, setItemToDelete] = useState("");

  const storedIds = localStorage.getItem("videoIds")
    ? JSON.parse(localStorage.getItem("videoIds"))
    : [];

  useEffect(() => {
    //create an array of promises for fetching movie details
    const fetchVideoDetailsPromises = storedIds.map((videoId) => {
      const options = {
        method: "GET",
        url: "https://youtube-v31.p.rapidapi.com/videos",
        params: {
          part: "snippet",
          id: videoId,
        },
        headers: {
          "X-RapidAPI-Key": RAPID_API_KEY,
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
  }, [reload]);

  if (!videoDetails) return;

  const handleDelete = (idToDelete) => {
    const videoIds = JSON.parse(localStorage.getItem("videoIds")) || [];
    const indexToRemove = videoIds.indexOf(idToDelete.toString());

    if (indexToRemove !== -1) {
      videoIds.splice(indexToRemove, 1);
      setVideoDetails((prevVideoDetails) =>
        prevVideoDetails.filter((videoDetail) => videoDetail?.id !== idToDelete)
      );
      setItemToDelete(null);
      localStorage.setItem("videoIds", JSON.stringify(videoIds));
    }
  };

  const filteredVideoDetails = videoDetails.filter(
    (videoDetail) => videoDetail?.id !== itemToDelete
  );

  return (
    <section className="w-full min-h-max">
      {storedIds.length < 1 ? "" : <h2>Videos</h2>}
      <div className="w-full flex items-center gap-5 relative">
        {filteredVideoDetails.map((video, index) => (
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
};

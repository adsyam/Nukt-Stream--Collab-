import React, { useEffect, useState } from "react";
import { VideoCard } from "./index";
import axios from "axios";
import { RAPID_API_KEY } from "../constants/apiConfig";

export const VideoHistory = ({ reload }) => {
  const [videoDetails, setVideoDetails] = useState(null);

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

  return (
    <section className="w-full min-h-max">
      <h2 className="text-lg mb-2">Videos</h2>
      <div className="w-full flex items-center gap-5">
        {videoDetails.map((video, index) => (
          <VideoCard key={index} item={video.items[0]} />
        ))}
      </div>
    </section>
  );
};

//custom hooks for fetching different kinds of video queries and parameters

import axios from "axios";
import { useFetch } from "./useFetch";
import { useEffect, useState } from "react";

//this custom hook will get video details based on the URL query paramenter
//this will be used through out the pages where we display all videos and channels
export const useFetchVideoDetails = (param) => {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    useFetch(`search?part=snippet&q=${param}`).then((data) =>
      setDetail(data.items)
    );
  }, [param]);
  return detail;
};

//this custom hook will get video details with stats based on the URL query paramenter
//this will be used in the watch page for the video description
export const useFetchStats = (param) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    useFetch(`videos?part=snippet,statistics&id=${param}`).then((data) =>
      setStats(data.items[0])
    );
  }, [param]);

  return stats;
};

//this custom hook will get related videos based on the URL query paramenter
//this will be used in the watch page for the related videos section
export const useFetchRelatedVideos = (param) => {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    useFetch(`search?part=snippet&relatedToVideoId=${param}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [param]);

  return videos;
};

//this custom hook will get channel data on the URL query paramenter
//this will be used through out the pages where we display all videos and channels
export const useFetchChannelDetails = (param) => {
  const [channelDetail, setChannelDetail] = useState(null);

  useEffect(() => {
    useFetch(`channels?part=snippet&id=${param}`).then((data) =>
      setChannelDetail(data?.items[0])
    );
  }, [param]);

  return { channelDetail };
};

//this custom hook will get channel contents on the URL query paramenter
//this will be mainly used on the profile page to generate all the video contents of that channel
export const useFetchChannelVideos = (param) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    useFetch(`search?channelId=${param}&part=snippet&order=date`).then((data) =>
      setVideos(data?.items)
    );
  }, [param]);

  return videos;
};

//this custom hook will get the user's comments based on the URL query paramenter
//this will be used in the watch page for the review section
export const useFetchVideoComments = (param) => {
  const [comments, setComments] = useState(null);
  useEffect(() => {
    useFetch(`commentThreads?part=snippet&videoId=${param}`).then((data) =>
      setComments(data?.items)
    );
  }, [param]);

  return comments;
};

export const useFetchSubsVideos = (subChannels) => {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    //create an array of promises for fetching movie details
    const fetchVideoDetailsPromises = subChannels.map((channelId) => {
      const options = {
        method: "GET",
        url: "https://youtube-v31.p.rapidapi.com/search",
        params: {
          channelId: channelId,
          part: "snippet,id",
          order: "date",
          maxResults: "10",
        },
        headers: {
          "X-RapidAPI-Key":
            "87fb168a06msh5f3e5ad900266aap1fb264jsn25b67766afd2",
          "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
        },
      };
      return axios.request(options);
    });

    //use Promise.all to fetch all movie details in parallel
    Promise.all(fetchVideoDetailsPromises)
      .then((responses) => {
        //responses will be an array of movie details based on the movie ids
        const results = responses.map((response) => response.data.items);
        setVideos(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [subChannels]);

  return videos;
};

export const useFetchSubChannels = (subChannels) => {
  const [channels, setChannels] = useState(null);

  useEffect(() => {
    //create an array of promises for fetching movie details
    const fetchVideoDetailsPromises = subChannels.map((channelId) => {
      const options = {
        method: "GET",
        url: "https://youtube-v31.p.rapidapi.com/channels",
        params: {
          id: channelId,
          part: "snippet",
        },
        headers: {
          "X-RapidAPI-Key":
            "87fb168a06msh5f3e5ad900266aap1fb264jsn25b67766afd2",
          "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
        },
      };
      return axios.request(options);
    });

    //use Promise.all to fetch all movie details in parallel
    Promise.all(fetchVideoDetailsPromises)
      .then((responses) => {
        //responses will be an array of movie details based on the movie ids
        const results = responses.map((response) => response.data.items);
        setChannels(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [subChannels]);

  return channels;
};

//custom hooks for fetching different kinds of video queries and parameters

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await useFetch(`channels?part=snippet&id=${param}`);

        if (data.items && data.items.length > 0) {
          setChannelDetail(data.items[0]);
        } else {
          setChannelDetail(null);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          subChannels.map((channelId) =>
            useFetch(
              `search?channelId=${channelId}&part=snippet,id&order=date&`
            )
          )
        );

        const flattenedData = responses.flatMap(
          (response) => response?.items || []
        );

        setData((prevData) => [...flattenedData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [subChannels]);

  return data;
};

export const useFetchSubChannels = (subChannels) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          subChannels.map((channelId) =>
            useFetch(`channels?part=snippet&id=${channelId}`)
          )
        );

        const flattenedData = responses.flatMap(
          (response) => response?.items || []
        );

        setData((prevData) => [...flattenedData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [subChannels]);

  return data;
};

export const useFetchVideoDetail = (videoIds) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          videoIds.map((videoId) =>
            useFetch(`videos?part=snippet&id=${videoId}`)
          )
        );

        const flattenedData = responses.flatMap(
          (response) => response?.items || []
        );

        setData((prevData) => [...flattenedData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [videoIds]);

  return data;
};

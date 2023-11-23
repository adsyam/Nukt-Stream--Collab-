import { useEffect, useState } from "react";

import { doc, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";
import useFetchDetails from "../Hooks/useFetchDetails";
import {
  EpisodeList,
  Footer,
  MediaDetails,
  MediaFrame,
  MediaRecommendation,
  MediaReviews,
  SeasonCards,
} from "../components";
import { textDB } from "../config/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useDBContext } from "../context/DBContext";
import { useDataContext } from "../context/DataContext";
import useResponsive from "../Hooks/useResponsive";

export default function WatchSeries() {
  const { id, season, episode, isLoading, setIsLoading, pathname, data } =
    useFetchDetails();
  const [mediaType, setMediaType] = useState();
  const [serverState, setServerState] = useState("Server1");
  const [currentServer, setCurrentServer] = useState();
  const [historyToggle, setHistoryToggle] = useState(true);

  const { user } = useAuthContext();
  const { sidebar } = useDataContext();
  const { addHistoryOrLibrary } = useDBContext();
  const { lgBelow } = useResponsive();

  const servers = {
    Server1: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`,
    Server2: `https://vidsrc.me/embed/${mediaType}?tmdb=${id}&season=${season}&episode=${episode}`,
    Server3: `https://vidsrc.to/embed/${mediaType}/${id}/${season}/${episode}/`,
    Server4: `https://2embed.org/series.php?id=${id}/${season}/${episode}/`,
    Server5: `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}/`,
  };

  //===== this code is for watch history =======
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(textDB, "Users", user.uid), (doc) =>
      setHistoryToggle(doc.data().storeHistory)
    );
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (historyToggle) {
        addHistoryOrLibrary(user?.uid, "history", "series", id);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [id]);

  useEffect(() => {
    if (serverState in servers) {
      setCurrentServer(servers[serverState]);
    }

    pathname.includes("/TVSeries") ? setMediaType("tv") : setMediaType("movie");

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [serverState, mediaType, id, season, episode, pathname, setIsLoading]);

if (lgBelow) {
  return (
    <div className="flex gap-4 mx-10 mt-20">
      <div className="flex flex-col w-full gap-4">
        <MediaFrame id={String(id)} server={String(currentServer)} />
        <div
          className={`${
            sidebar
              ? "translate-x-[15rem] origin-left duration-300 w-[85%]"
              : "w-full origin-right duration-300"
          }`}
        >
          <div className={`flex flex-col items-center justify-center gap-4`}>
            <div className="flex gap-4">
              <MediaDetails
                id={String(id)}
                Season={season}
                Episode={episode}
                mediaType={mediaType}
              />
            </div>
            <div className="flex flex-col gap-4 p-3">
              <ul className="flex flex-wrap gap-4 text-white whitespace-nowrap">
                {[...Array(5)].map((_server, i) => (
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    role="button"
                    key={i}
                    onClick={() => setServerState(`Server${i + 1}`)}
                    className={`px-2 border-2 border-[#86868680] rounded-md ${
                      serverState === Object.keys(servers)[0]
                        ? "border-[#7300FF90]"
                        : "border-[#86868680]"
                    }`}
                  >
                    {`Server ${i + 1}`}
                  </motion.li>
                ))}
              </ul>
              <EpisodeList />
              <SeasonCards id={String(id)} />
            </div>
          </div>
          <MediaRecommendation />
          <MediaReviews id={String(id)} />
        </div>
        <Footer />
      </div>
    </div>
  )
}

  return (
    <>
      <div className="flex gap-4 mx-10 mt-20">
        <div className="flex flex-col w-full gap-4">
          <MediaFrame id={String(id)} server={String(currentServer)} />
          <div className="flex flex-col gap-4 border-2 border-[#86868650] p-3 pb-4 rounded-md">
            <ul className="flex flex-wrap text-[#868686] gap-4">
              {[...Array(5)].map((_server, i) => (
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  role="button"
                  key={i}
                  onClick={() => setServerState(`Server${i + 1}`)}
                  className={`px-2 border-2 border-[#86868680] rounded-md ${
                    serverState === Object.keys(servers)[0]
                      ? "border-[#7300FF90]"
                      : "border-[#86868680]"
                  }`}
                >
                  {`Server ${i + 1}`}
                </motion.li>
              ))}
            </ul>
            <EpisodeList />
            <SeasonCards id={id || ""} />
          </div>
        </div>
        <MediaDetails
          id={id || ""}
          Season={season}
          Episode={episode}
          mediaType={mediaType}
        />
      </div>
      <MediaRecommendation />
      <MediaReviews id={String(id)} />
      <Footer />
    </>
  )
}

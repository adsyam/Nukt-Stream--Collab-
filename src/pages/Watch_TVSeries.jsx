import { Player } from "@lottiefiles/react-lottie-player"
import { useEffect, useState } from "react"
import { loader_Geometric } from "../assets"

import { motion } from "framer-motion"
import useFetchDetails from "../Hooks/useFetchDetails"
import {
  EpisodeList,
  Footer,
  MediaDetails,
  MediaFrame,
  MediaRecommendation,
  MediaReviews,
  SeasonCards,
} from "../components"
import { useDataContext } from "../context/DataContext"

export default function WatchTVSeries() {
  const { id, season, episode, isLoading, setIsLoading, pathname, data } =
    useFetchDetails()
  const [mediaType, setMediaType] = useState()
  const [server, setServer] = useState("Server1")
  const [currentServer, setCurrentServer] = useState()

  const { sidebar } = useDataContext()

  const serverLength = [
    "Server 1",
    "Server 2",
    "Server 3",
    "Server 4",
    "Server 5",
  ]

  useEffect(() => {
    const servers = {
      Server1: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`,
      Server2: `https://vidsrc.me/embed/${mediaType}?tmdb=${id}&season=${season}&episode=${episode}`,
      Server3: `https://vidsrc.to/embed/${mediaType}/${id}/${season}/${episode}/`,
      Server4: `https://2embed.org/series.php?id=${id}/${season}/${episode}/`,
      Server5: `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}/`,
    }
    if (server in servers) {
      setCurrentServer(servers[server])
    }

    //===== this code is for watch history =======
    const storedSeriesIdsJSON = localStorage.getItem("seriesIds")
    const storedSeriesIds = storedSeriesIdsJSON
      ? JSON.parse(storedSeriesIdsJSON)
      : []

    if (!storedSeriesIds.includes(id)) {
      storedSeriesIds.push(id)
      localStorage.setItem("seriesIds", JSON.stringify(storedSeriesIds))
    }

    pathname.includes("/TVSeries") ? setMediaType("tv") : setMediaType("movie")

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [server, mediaType, id, season, episode, pathname, setIsLoading])

  return (
    <>
      <MediaFrame
        id={id}
        season={season}
        episode={episode}
        server={currentServer}
        path={mediaType}
      />
      {!isLoading ? (
        <>
          <div
            className={`${
              sidebar
                ? "translate-x-[15rem] origin-left duration-300 w-[85%]"
                : "w-full origin-right duration-300"
            }`}
          >
            <div className="flex flex-col gap-4">
              <div className="flex mx-24 justify-center gap-4">
                <MediaDetails
                  id={id}
                  Season={season}
                  Episode={episode}
                  mediaType={mediaType}
                />
              </div>
              <ul className="text-white gap-4 flex flex-wrap whitespace-nowrap mx-24">
                {Array.from(serverLength).map((server, i) => (
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    role="button"
                    key={i}
                    onClick={() => setServer(`Server${i + 1}`)}
                    className="border-2 px-2 rounded-md"
                  >
                    {server}
                  </motion.li>
                ))}
              </ul>
              <EpisodeList />
              <SeasonCards id={id} />
            </div>
            <MediaRecommendation id={id} />
            <MediaReviews id={id} />
          </div>
          <Footer />
        </>
      ) : (
        <div
          className={`${
            sidebar
              ? "translate-x-[15rem] origin-left duration-300 w-[85%]"
              : "w-full origin-right duration-300"
          }`}
        >
          <Player
            autoplay
            loop
            src={loader_Geometric}
            className="h-[35vh] flex items-center justify-center"
          />
        </div>
      )}
    </>
  )
}

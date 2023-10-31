import { Player } from "@lottiefiles/react-lottie-player"
import { useEffect, useState } from "react"
import { loader_Geometric } from "../assets"

import {
  EpisodeList,
  Footer,
  MediaDetails,
  MediaFrame,
  MediaRecommendation,
  MediaReviews,
} from "../components"
import { useDataContext } from "../context/DataContext"
import useFetchDetails from "../Hooks/useFetchDetails"

export default function WatchTVSeries() {
  const { id, season, episode, isLoading, setIsLoading, pathname, data } =
    useFetchDetails()
  const [mediaType, setMediaType] = useState()
  const [server, setServer] = useState("Server1")
  const [currentServer, setCurrentServer] = useState()

  const { sidebar } = useDataContext()

//   useEffect(() => {
//     if (data && data.original_name) {
//       document.title = `Series | ${data.original_name}`
//     } else if (!pathname.includes("TVSeries") || !pathname.includes("Movie")) {
//       document.title = "Nukt"
//     }
//   }, [data, pathname])

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
            <div className="flex mx-24 justify-center gap-4">
              <EpisodeList id={id} Season={season} server={currentServer} />
              <div className="text-white border border-[#6b13d7] flex flex-col w-fit rounded-md">
                <div className="p-2 rounded-md">
                  <h2 className="bg-[#6b13d7] rounded-md px-1 text-white w-full whitespace-nowrap">
                    Server List
                  </h2>
                  <ul className="flex flex-col items-center" role="button">
                    <li
                      onClick={() => setServer("Server1")}
                      className={`px-2 my-1 rounded-md w-fit hover:bg-[#ffffff20]`}
                    >
                      Server 1
                    </li>
                    <li
                      onClick={() => setServer("Server2")}
                      className={`px-2 my-1 rounded-md w-fit hover:bg-[#ffffff20]`}
                    >
                      Server 2
                    </li>
                    <li
                      onClick={() => setServer("Server3")}
                      className={`px-2 my-1 rounded-md w-fit hover:bg-[#ffffff20]`}
                    >
                      Server 3
                    </li>
                    <li
                      onClick={() => setServer("Server4")}
                      className={`px-2 my-1 rounded-md w-fit hover:bg-[#ffffff20]`}
                    >
                      Server 4
                    </li>
                    <li
                      onClick={() => setServer("Server5")}
                      className={`px-2 my-1 rounded-md w-fit hover:bg-[#ffffff20]`}
                    >
                      Server 5
                    </li>
                  </ul>
                </div>
              </div>
              <MediaDetails
                id={id}
                Season={season}
                Episode={episode}
                path={mediaType}
              />
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

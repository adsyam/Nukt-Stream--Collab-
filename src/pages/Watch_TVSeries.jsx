import { Player } from "@lottiefiles/react-lottie-player"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router"
import { loader_Geometric } from "../assets"

import {
  EpisodeList,
  Footer,
  MediaDetails,
  MediaFrame,
  MediaRecommendation,
  MediaReviews,
} from "../components"

export default function WatchTVSeries() {
  const { id, season, episode } = useParams()
  const [loading, setLoading] = useState(true)
  const [path, setPath] = useState()
  const [server, setServer] = useState(
    `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`
  )
  const location = useLocation()
  const pathname = location.pathname

  const server1 = `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`
  const server2 = `https://vidsrc.me/embed/${path}?tmdb=${id}&season=${season}&episode=${episode}`
  const server3 = `https://vidsrc.to/embed/${path}/${id}/${season}/${episode}/`
  const server4 = `https://2embed.org/series.php?id=${id}/${season}/${episode}/`

  useEffect(() => {
    pathname.includes("/TVSeries") ? setPath("tv") : setPath("movie")
  }, [pathname])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [id])

  return (
    <>
      <MediaFrame id={id} Season={season} Episode={episode} server={server} />
      {!loading ? (
        <>
          <div className="flex mx-24 justify-center gap-4">
            <EpisodeList id={id} Season={season} />
            <div className="text-white border border-[#6b13d7] flex flex-col w-fit rounded-md">
              <div className="p-2 rounded-md">
                <h2 className="bg-[#6b13d7] rounded-md px-1 text-white w-full whitespace-nowrap">
                  Server List
                </h2>
                <ul className="flex flex-col items-center">
                  <li
                    role="button"
                    onClick={() => setServer(server1)}
                    className="px-2 my-1 rounded-md w-fit hover:bg-[#ffffff20]"
                  >
                    Server 1
                  </li>
                  <li
                    role="button"
                    onClick={() => setServer(server2)}
                    className="px-2 my-1 rounded-md w-fit hover:bg-[#ffffff20]"
                  >
                    Server 2
                  </li>
                  <li
                    role="button"
                    onClick={() => setServer(server3)}
                    className="px-2 my-1 rounded-md w-fit hover:bg-[#ffffff20]"
                  >
                    Server 3
                  </li>
                  <li
                    role="button"
                    onClick={() => setServer(server4)}
                    className="px-2 my-1 rounded-md w-fit hover:bg-[#ffffff20]"
                  >
                    Server 4
                  </li>
                </ul>
              </div>
            </div>
            <MediaDetails
              id={id}
              Season={season}
              Episode={episode}
              path={path}
            />
          </div>
          <MediaRecommendation id={id} />
          <MediaReviews id={id} />
          <Footer />
        </>
      ) : (
        <Player
          autoplay
          loop
          src={loader_Geometric}
          className="h-[35vh] flex items-center justify-center"
        />
      )}
    </>
  )
}

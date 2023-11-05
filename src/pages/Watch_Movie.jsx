import { Player } from "@lottiefiles/react-lottie-player"
import { useEffect, useState } from "react"
import useFetchDetails from "../Hooks/useFetchDetails"
import { loader_Geometric } from "../assets"
import {
  Footer,
  MediaDetails,
  MediaFrame,
  MediaRecommendation,
  MediaReviews,
} from "../components"
import { useDataContext } from "../context/DataContext"

export default function WatchMovie() {
  const { id, isLoading, setIsLoading, pathname } = useFetchDetails()
  const [path, setPath] = useState()

  const [server, setServer] = useState(
    `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`
  )
  const { sidebar } = useDataContext()

  const server1 = `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`
  const server2 = `https://vidsrc.me/embed/${path}?tmdb=${id}`
  const server3 = `https://vidsrc.to/embed/${path}/${id}/`
  const server4 = `https://2embed.org/series.php?id=${id}/`
  const server5 = `https://www.2embed.cc/embed/${id}/`

  useEffect(() => {
    //===== this code is for watch history =======
    const storedMovieIdsJSON = localStorage.getItem("movieIds")
    const storedMovieIds = storedMovieIdsJSON
      ? JSON.parse(storedMovieIdsJSON)
      : []

    if (!storedMovieIds.includes(id)) {
      storedMovieIds.push(id)
      localStorage.setItem("movieIds", JSON.stringify(storedMovieIds))
    }
    //===== this code is for watch history =======
    pathname.includes("/TVSeries") ? setPath("tv") : setPath("movie")

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [pathname, id, setIsLoading])

  return (
    <>
      <MediaFrame id={id} server={server} />
      {!isLoading ? (
        <>
          <div
            className={`${
              sidebar
                ? "translate-x-[15rem] origin-left duration-300 w-[85%]"
                : "w-full origin-right duration-300"
            }`}
          >
            <div className="flex flex-col gap-4 mx-24 max-lg:mx-20 max-sm:mx-12">
              <div className="flex gap-4">
                <MediaDetails
                  id={id}
                  path={path}
                  mediaType={pathname.includes("Movie") && "movie"}
                />
              </div>
            </div>
            <div className="p-2 rounded-md mx-24 max-lg:mx-20 max-sm:mx-12 text-white flex flex-col gap-2">
              <ul className="flex items-center gap-2 flex-wrap">
                {[
                  { name: "Server 1", url: server1 },
                  { name: "Server 2", url: server2 },
                  { name: "Server 3", url: server3 },
                  { name: "Server 4", url: server4 },
                  { name: "Server 5", url: server5 },
                ].map((server, index) => (
                  <li
                    role="button"
                    key={index}
                    onClick={() => setServer(server.url)}
                    className={`px-2 my-1 rounded-md w-fit hover:bg-[#ffffff20] border-2 ${
                      server.url === server ? "bg-[#ffffff20]" : ""
                    }`}
                  >
                    {server.name}
                  </li>
                ))}
              </ul>
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

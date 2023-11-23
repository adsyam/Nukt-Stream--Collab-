import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import useFetchDetails from "../Hooks/useFetchDetails"
import useResponsive from "../Hooks/useResponsive"
import {
  Footer,
  MediaDetails,
  MediaFrame,
  MediaRecommendation,
  MediaReviews,
} from "../components"
import { textDB } from "../config/firebase"
import { useAuthContext } from "../context/AuthContext"
import { useDBContext } from "../context/DBContext"
import { useDataContext } from "../context/DataContext"

export default function WatchMovie() {
  const { id, isLoading, setIsLoading, pathname } = useFetchDetails()
  const [path, setPath] = useState()
  const [historyToggle, setHistoryToggle] = useState(true)
  const { lgBelow } = useResponsive()

  const [servers, setServers] = useState(
    `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`
  )
  const { sidebar } = useDataContext()
  const { user } = useAuthContext()
  const { addHistoryOrLibrary } = useDBContext()

  const server1 = `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`
  const server2 = `https://vidsrc.me/embed/${path}?tmdb=${id}`
  const server3 = `https://vidsrc.to/embed/${path}/${id}/`
  const server4 = `https://2embed.org/series.php?id=${id}/`
  const server5 = `https://www.2embed.cc/embed/${id}/`

  //---this will be a listener for the toggle history
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(textDB, "Users", user.uid), (doc) =>
      setHistoryToggle(doc.data().storeHistory)
    )
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (historyToggle) {
        addHistoryOrLibrary(user?.uid, "history", "movies", id)
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [id])

  useEffect(() => {
    pathname.includes("/TVSeries") ? setPath("tv") : setPath("movie")

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [pathname, id, setIsLoading])

  if (lgBelow)
    return (
      <>
        <div className="flex gap-4 mx-10 mt-20">
          <div>
            <MediaFrame id={String(id)} server={servers} />
            <div
              className={`${
                sidebar
                  ? "translate-x-[15rem] origin-left duration-300 w-[85%]"
                  : "w-full origin-right duration-300"
              }`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <MediaDetails id={String(id)} mediaType={"movie"} />
                </div>
              </div>
              <div className="flex flex-col gap-2 p-2 mx-24 text-white rounded-md max-lg:mx-20 max-sm:mx-12">
                <ul className="flex flex-wrap items-center gap-2">
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
                      onClick={() => setServers(server.url)}
                      className={`px-2 border-2  rounded-md ${
                        servers === server.url
                          ? "border-[#7300FF90]"
                          : "border-[#86868680]"
                      }`}
                    >
                      {server.name}
                    </li>
                  ))}
                </ul>
              </div>
              <MediaRecommendation />
              <MediaReviews id={String(id)} />
            </div>
          </div>
        </div>
        <Footer />
      </>
    )

  return (
    <>
      <div className="flex gap-4 mx-10 mt-20">
        <div className="flex flex-col w-full gap-4">
          <MediaFrame id={String(id)} server={servers} />
          <div className="">
            <ul className="flex flex-wrap text-[#868686] gap-4">
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
                  onClick={() => setServers(server.url)}
                  className={`px-2 border-2  rounded-md ${
                    servers === server.url
                      ? "border-[#7300FF90]"
                      : "border-[#86868680]"
                  }`}
                >
                  {server.name}
                </li>
              ))}
            </ul>
          </div>
          <MediaRecommendation />
        </div>
        <MediaDetails id={id || ""} mediaType={"movie"} />
      </div>
      <MediaReviews id={String(id)} />
      <Footer />
    </>
  )
}

import { Player } from "@lottiefiles/react-lottie-player"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import useFetchTMDB from "../Hooks/useFetchTMDB"
import { loader_Geometric } from "../assets"
import { Carousel, CategoryCard, CategoryToggle } from "../components"
import { Footer } from "../components/Footer"
import MediaTypeButton from "../components/MediaTypeButton"
import { useDataContext } from "../context/DataContext"

export default function AllCategory() {
  const [changeCategory, setChangeCategory] = useState()
  const location = useLocation()
  const pathname = location.pathname
  const { sidebar } = useDataContext()

  const { data, mediaType, setMediaType, isloading, page, setPage, category } =
    useFetchTMDB("tv", 1, changeCategory)

  useEffect(() => {
    if (pathname.includes("home/popular")) {
      setChangeCategory("popular")
    } else if (pathname.includes("home/trending")) {
      setChangeCategory("trending")
    } else if (pathname.includes("home/toprated")) {
      setChangeCategory("top_rated")
    } else if (pathname.includes("home/airingtoday")) {
      setChangeCategory("airing_today")
    } else if (pathname.includes("home/intheatre")) {
      setChangeCategory("now_playing")
    }
  }, [pathname, changeCategory])

  return (
    <>
      <Carousel mediaType={mediaType} />
      <div
        className={`${
          sidebar
            ? "translate-x-[10rem] origin-left duration-300 w-[95%]"
            : "w-full origin-right duration-300"
        }`}
      >
        <div className="my-12 mx-32 flex flex-col items-center gap-4 justify-center text-white">
          <div className="flex items-center gap-4">
            <CategoryToggle category={category} />
          </div>
          <MediaTypeButton mediaType={mediaType} setMediaType={setMediaType} />
        </div>
        <div className="grid grid-cols-8 gap-4 mx-32 text-white mb-12">
          {!isloading
            ? data
                .filter((d) => d.poster_path && d.backdrop_path)
                .slice(0, 20)
                .map((d, index) => (
                  <CategoryCard
                    key={d.id}
                    index={index}
                    id={d.id}
                    poster={d.poster_path}
                    title={d.original_title}
                    name={d.original_name}
                    releaseDate={d.release_date}
                    firstAirDate={d.first_air_date}
                    mediaType={mediaType}
                    rating={d.vote_average.toFixed(1)}
                  />
                ))
            : data
                .filter((d) => d.poster_path && d.backdrop_path)
                .slice(0, 20)
                .map((d, index) => (
                  <Player
                    autoplay
                    loop
                    src={loader_Geometric}
                    key={index}
                    className="h-[35vh]"
                  />
                ))}
        </div>
        {isloading ? null : <div className="text-white mb-12">sdsds</div>}
      </div>
      <Footer />
    </>
  )
}

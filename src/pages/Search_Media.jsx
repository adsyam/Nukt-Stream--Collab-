import { Player } from "@lottiefiles/react-lottie-player"
import { useState } from "react"
import useSearch from "../Hooks/useSearch"
import { loader_Geometric } from "../assets"
import { CategoryCard, VideoCategories } from "../components"
import { useDataContext } from "../context/DataContext"

export default function SearchMedia() {
  const [filter, setFilter] = useState("")
  const [category, setCategory] = useState("all")
  const searchParams = new URLSearchParams(window.location.search).get("q")
  const { sidebar } = useDataContext()
  const { movieResult, seriesResult, loading } = useSearch(searchParams)

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <>
      {!loading ? (
        <>
          <section
            className={`min-h-[100vh] flex flex-col items-center pt-[7rem] text-white ${
              sidebar
                ? "translate-x-[11rem] origin-left duration-300 w-[89%]"
                : "w-full origin-right duration-300"
            }`}
          >
            <div className="flex gap-2 w-fit">
              <button
                onClick={() => setCategory("all")}
                className={`rounded-md px-2 ${
                  category === "all" && "border-2"
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => setCategory("movie")}
                className={`rounded-md px-2 ${
                  category === "movie" && "border-2"
                }`}
              >
                MOVIE
              </button>
              <button
                onClick={() => setCategory("series")}
                className={`rounded-md px-2 ${
                  category === "series" && "border-2"
                }`}
              >
                SERIES
              </button>
              <button
                onClick={() => setCategory("video")}
                className={`rounded-md px-2 ${
                  category === "video" && "border-2"
                }`}
              >
                VIDEO
              </button>
            </div>
            <p className="text-white text-center font-bold">
              Showing results for{" "}
              <span className="text-[#7300FF]">&quot;{searchParams}&quot;</span>
            </p>
            {category === "movie" || category === "all" ? (
              <section className="mb-12 mx-16">
                <h2 className="mb-1">Movie</h2>
                <div className="grid grid-cols-8 max-xl:grid-cols-7 max-lg:grid-cols-6 max-md:grid-cols-5 max-sm:grid-cols-4 max-xsm:grid-cols-3 max-xxsm:grid-cols-2 gap-4 text-white">
                  {movieResult
                    .filter((md) => md.poster_path && md.backdrop_path)
                    .map((md, index) => (
                      <CategoryCard
                        key={index}
                        id={md.id}
                        index={index}
                        poster={md.poster_path}
                        backdrop={md.backdrop_path}
                        title={md.original_title}
                        date1={md.release_date}
                        date2={md.first_air_date}
                        animation={fadeInVariants}
                        rating={md.vote_average.toFixed(1)}
                        mediaType={"movie"}
                        releaseDate={md.release_date}
                        firstAirDate={md.first_air_date}
                      />
                    ))}
                </div>
              </section>
            ) : null}
            {category === "series" || category === "all" ? (
              <section className="mb-12 mx-16">
                <h2 className="mb-1">TV Series</h2>
                <div className="grid grid-cols-8 max-xl:grid-cols-7 max-lg:grid-cols-6 max-md:grid-cols-5 max-sm:grid-cols-4 max-xsm:grid-cols-3 max-xxsm:grid-cols-2 gap-4 text-white">
                  {seriesResult
                    .filter((tv) => tv.poster_path && tv.backdrop_path)
                    .map((tv, index) => (
                      <CategoryCard
                        key={index}
                        id={tv.id}
                        index={index}
                        poster={tv.poster_path}
                        backdrop={tv.backdrop_path}
                        title={tv.original_name}
                        date1={tv.release_date}
                        date2={tv.first_air_date}
                        animation={fadeInVariants}
                        rating={tv.vote_average.toFixed(1)}
                        mediaType={"tv"}
                        releaseDate={tv.release_date}
                        firstAirDate={tv.first_air_date}
                      />
                    ))}
                </div>
              </section>
            ) : null}
            {category === "video" || category === "all" ? (
              <VideoCategories catergoryName={searchParams} />
            ) : null}
          </section>
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

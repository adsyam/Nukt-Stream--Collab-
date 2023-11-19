import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Player } from "@lottiefiles/react-lottie-player"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import useFetchTrendingTMDB from "../../Hooks/useFetchTrendingTMDB"
import useResponsive from "../../Hooks/useResponsive"
import { loader_Geometric } from "../../assets"
import { useDataContext } from "../../context/DataContext"
import CategoryCard from "../Common/CategoryCard"
import MediaTypeButton from "../Common/MediaTypeButton"

export default function Trending() {
  const { maxCards, responsiveGridCard, screen } = useResponsive()
  const { sidebar } = useDataContext()
  const { isloading, mediaType, setMediaType, data } = useFetchTrendingTMDB(
    "tv",
    1,
    "trending"
  )

  return (
    <>
      <motion.section
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.1 }}
        className={`flex justify-center`}
      >
        <div
          className={`text-white py-12 gap-1`}
        >
          {screen ? (
            <div className="mx-32 max-lg:mx-20 max-sm:mx-12">
              <h1 className="text-2xl font-medium text-center">TRENDING</h1>
              <div className="flex justify-between mb-2">
                <MediaTypeButton
                  setMediaType={setMediaType}
                  mediaType={mediaType}
                />
                <Link
                  className="flex items-center gap-1"
                  to={`/home/trending/1`}
                >
                  <p>See all </p>
                  <FontAwesomeIcon icon={faAngleRight} className="text-sm" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center px-2 justify-between mx-32 max-lg:mx-20 max-sm:mx-12">
              <div className="flex gap-2 items-center">
                <h1 className="text-2xl mb-1 font-medium">Trending</h1>
                <div className="flex gap-2 px-3 py-1 rounded-md">
                  <MediaTypeButton
                    setMediaType={setMediaType}
                    mediaType={mediaType}
                  />
                </div>
              </div>
              <Link className="flex items-center gap-1" to={`/home/trending/1`}>
                <p>See all </p>
                <FontAwesomeIcon icon={faAngleRight} className="text-sm" />
              </Link>
            </div>
          )}
          <div className={responsiveGridCard}>
            {!isloading
              ? data
                  .filter((d) => d.poster_path && d.backdrop_path)
                  .slice(0, maxCards)
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
                  .slice(0, maxCards)
                  .map((d, index) => (
                    <Player
                      autoplay
                      loop
                      src={loader_Geometric}
                      key={index}
                      className="h-[35vh]"
                    ></Player>
                  ))}
          </div>
        </div>
      </motion.section>
    </>
  )
}

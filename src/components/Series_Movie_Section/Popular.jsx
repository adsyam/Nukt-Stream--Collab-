import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Player } from "@lottiefiles/react-lottie-player"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import useFetchTMDB from "../../Hooks/useFetchTMDB"
import useResponsive from "../../Hooks/useResponsive"
import { loader_Geometric } from "../../assets"
import { useDataContext } from "../../context/DataContext"
import CategoryCard from "../Common/CategoryCard"
import MediaTypeButton from "../Common/MediaTypeButton"

export default function Popular() {
  const { maxCards, responsiveGridCard, screen } = useResponsive()
  const { sidebar } = useDataContext()
  const { data, isloading, mediaType, setMediaType } = useFetchTMDB(
    "tv",
    1,
    "popular"
  )

  return (
    <>
        <div
          className={`text-white py-12 gap-1`}
        >
          {screen ? (
            <div className="mx-32 max-lg:mx-20 max-sm:mx-12">
              <h1 className="text-2xl font-medium text-center">POPULAR</h1>
              <div className="flex justify-between mb-2">
                <MediaTypeButton
                  setMediaType={setMediaType}
                  mediaType={mediaType}
                />
                <Link
                  className="flex items-center gap-1"
                  to={`/home/popular/1`}
                >
                  <p>See all </p>
                  <FontAwesomeIcon icon={faAngleRight} className="text-sm" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between px-2 mx-32 max-lg:mx-20 max-sm:mx-12">
              <div className="flex items-center gap-2">
                <h1 className="mb-1 text-2xl font-medium">Popular</h1>
                <div className="flex gap-2 px-3 py-1 rounded-md">
                  <MediaTypeButton
                    setMediaType={setMediaType}
                    mediaType={mediaType}
                  />
                </div>
              </div>
              <Link className="flex items-center gap-1" to={`/home/popular/1`}>
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
                    />
                  ))}
          </div>
        </div>
    </>
  )
}

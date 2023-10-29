import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Player } from "@lottiefiles/react-lottie-player"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { loader_Geometric } from "../assets"
import useFetchTMDB from "../Hooks/useFetchTMDB"
import { useDataContext } from "../context/DataContext"
import CategoryCard from "./CategoryCard"
import MediaTypeButton from "./MediaTypeButton"

const Popular = () => {
  const { sidebar } = useDataContext()
  const { data, isloading, mediaType, setMediaType, page, setPage } =
    useFetchTMDB("tv", 1, "popular")

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
          className={`text-white py-12 gap-1 ${
            sidebar
              ? "translate-x-[6rem] origin-left duration-300 w-[98%]"
              : "translate-x-0 origin-right duration-300 w-full"
          }`}
        >
          <div className={`flex items-center px-2 justify-between mx-32`}>
            <div className="flex gap-2 items-center">
              <h1 className="text-2xl mb-1 font-medium">Popular</h1>
              <div className="flex gap-2 px-3 py-1 rounded-md">
                <MediaTypeButton
                  setMediaType={setMediaType}
                  mediaType={mediaType}
                />
              </div>
            </div>
            <Link className="flex items-center gap-1" to={`/home/popular`}>
              <p>See all </p>
              <FontAwesomeIcon icon={faAngleRight} className="text-sm" />
            </Link>
          </div>
          <div
            className={`grid ${
              sidebar ? "grid-cols-8" : "grid-cols-8"
            } mx-32 gap-4`}
          >
            {!isloading
              ? data
                  .filter((d) => d.poster_path && d.backdrop_path)
                  .slice(0, 16)
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
                      rating={d.vote_average}
                    />
                  ))
              : data
                  .filter((d) => d.poster_path && d.backdrop_path)
                  .slice(0, 16)
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
      </motion.section>
    </>
  )
}

export default Popular

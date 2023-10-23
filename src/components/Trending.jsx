import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { TOKEN_AUTH } from "../constants/apiConfig"
import { Player } from "@lottiefiles/react-lottie-player"
import { loader_Geometric, loader_Gradient } from "../assets"

const Trending = () => {
  const [trending, setTrending] = useState([])
  const [loading, setLoading] = useState(true)
  const [change, setChange] = useState("tv")

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/trending/${change}/day`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: TOKEN_AUTH,
      },
    }

    axios
      .request(options)
      .then(function (response) {
        setTrending(response.data.results)
        setTimeout(() => {
          setLoading(false)
        }, 1300)
      })
      .catch(function (error) {
        console.error(error)
        setLoading(false)
      })
  }, [change])

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="text-white py-12 w-full gap-1">
          <div className="flex items-center px-2 justify-between mx-12">
            <div className="flex gap-2 items-center">
              <p className="text-2xl mb-1 font-medium">Trending</p>
              <div className="flex gap-2 px-3 py-1 rounded-md">
                <button
                  onClick={() => setChange("tv")}
                  className={`${
                    change === "tv"
                      ? "bg-[#ffffff30] px-3 py-1 rounded-md"
                      : null
                  } px-3 py-1 rounded-md`}
                >
                  Series
                </button>
                <button
                  onClick={() => setChange("movie")}
                  className={`${
                    change === "movie"
                      ? "bg-[#ffffff30] px-3 py-1 rounded-md"
                      : null
                  } px-3 py-1 rounded-md`}
                >
                  Movie
                </button>
              </div>
            </div>
            <Link className="flex items-center gap-1" to={`/SearchPage`}>
              <p>See all </p>
              <FontAwesomeIcon icon={faAngleRight} className="text-sm" />
            </Link>
          </div>
          <div className="grid grid-cols-10 mx-12 gap-4">
            {!loading
              ? trending
                  .filter((trend) => trend.poster_path && trend.backdrop_path)
                  .slice(0, 20)
                  .map((trend, index) => (
                    <Link
                      href="#"
                      key={trend.id}
                      className="w-fit grid"
                      to={
                        change === "tv"
                          ? `/TVSeries/${trend.id}/1/1`
                          : `/Movie/${trend.id}`
                      }
                    >
                      <motion.div
                        variants={fadeInVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.07 }}
                      >
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                          src={`https://image.tmdb.org/t/p/original/${trend.poster_path}`}
                          alt={`${
                            trend.original_title || trend.original_name
                          } backdrop`}
                          width={215}
                          className="rounded-[5px] w-fit border-transparent box-border border-white"
                        />
                        <div>
                          <p className="word-break text-[16px] font-normal truncate-text">
                            {trend.original_title || trend.original_name}
                          </p>
                          <p>
                            {(trend.release_date &&
                              trend.release_date.split("-")[0]) ||
                              (trend.first_air_date &&
                                trend.first_air_date.split("-")[0])}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  ))
              : trending
                  .filter((trend) => trend.poster_path && trend.backdrop_path)
                  .slice(0, 20)
                  .map((trend, index) => (
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
      </div>
    </>
  )
}

export default Trending

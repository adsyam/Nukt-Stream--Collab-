import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Player } from "@lottiefiles/react-lottie-player"
import axios from "axios"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { loader_Geometric, loader_Gradient } from "../assets"
import { TOKEN_AUTH } from "../constants/apiConfig"

const Popular = () => {
  const [popular, setPopular] = useState([])
  const [loading, setLoading] = useState(true)
  const [path, setpath] = useState("tv")

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${path}/popular`,
      params: { language: "en-US", page: "1" },
      headers: {
        accept: "application/json",
        Authorization: TOKEN_AUTH,
      },
    }

    axios
      .request(options)
      .then(function (response) {
        setPopular(response.data.results)
        setTimeout(() => {
          setLoading(false)
        }, 1300)
      })
      .catch(function (error) {
        console.error(error)
        setLoading(false)
      })
  }, [path, loading])

  useEffect(() => {})

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <>
      <motion.div className="flex justify-center w-full">
        <div className="text-white py-12 w-full gap-1">
          <div className="flex items-center px-2 justify-between mx-12">
            <div className="flex gap-2 items-center">
              <p className="text-2xl mb-1 font-medium">Popular</p>
              <motion.div className="flex gap-2 px-3 py-1 rounded-md">
                <motion.button
                  onClick={() => setpath("tv")}
                  className={`${
                    path === "tv"
                      ? "bg-[#ffffff30] px-3 py-1 rounded-md"
                      : null
                  } px-3 py-1 rounded-md`}
                >
                  Series
                </motion.button>
                <motion.button
                  onClick={() => setpath("movie")}
                  className={`${
                    path === "movie"
                      ? "bg-[#ffffff30] px-3 py-1 rounded-md"
                      : null
                  } px-3 py-1 rounded-md`}
                >
                  Movie
                </motion.button>
              </motion.div>
            </div>
            <Link className="flex items-center gap-1" to={`/Search`}>
              <p>See all </p>
              <FontAwesomeIcon icon={faAngleRight} className="text-sm" />
            </Link>
          </div>
          <div className="grid grid-cols-10 mx-12 gap-4">
            {!loading
              ? popular
                  .filter((pop) => pop.poster_path && pop.backdrop_path)
                  .slice(0, 20)
                  .map((pop, index) => (
                    <Link
                      key={pop.id}
                      className="w-fit grid"
                      to={
                        path === "tv"
                          ? `/TVSeries/${pop.id}/1/1`
                          : `/Movie/${pop.id}`
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
                            stiffness: 300,
                            damping: 10,
                          }}
                          src={`https://image.tmdb.org/t/p/original/${pop.poster_path}`}
                          alt={`${
                            pop.original_title || pop.original_name
                          } backdrop`}
                          width={215}
                          className="rounded-[5px] w-fit border-transparent box-border border-white"
                        />
                        <div>
                          <p className="word-break text-[16px] font-normal truncate-text">
                            {pop.original_title || pop.original_name}
                          </p>
                          <p className="text-sm opacity-50">
                            {(pop.release_date &&
                              pop.release_date.split("-")[0]) ||
                              (pop.first_air_date &&
                                pop.first_air_date.split("-")[0])}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  ))
              : popular
                  .filter((pop) => pop.poster_path && pop.backdrop_path)
                  .slice(0, 20)
                  .map((pop, index) => (
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
      </motion.div>
    </>
  )
}

export default Popular

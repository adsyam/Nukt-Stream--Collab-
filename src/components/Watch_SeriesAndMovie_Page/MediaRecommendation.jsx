import { Player } from "@lottiefiles/react-lottie-player"
import axios from "axios"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { Link } from "react-router-dom"
import { loader_Geometric } from "../../assets"
import { TOKEN_AUTH } from "../../constants/apiConfig"

export default function MediaRecommendation({ id }) {
  const [recommend, setRecommend] = useState([])
  const [loading, setLoading] = useState(true)
  const [path, setPath] = useState()
  const location = useLocation()
  const pathname = location.pathname

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  useEffect(() => {
    if (pathname.includes("/TVSeries")) {
      setPath("tv")
    } else if (pathname.includes("/Movie")) {
      setPath("movie")
    }
  }, [pathname])

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${path}/${id}/recommendations`,
      params: { language: "en-US", page: "1" },
      headers: {
        accept: "application/json",
        Authorization: TOKEN_AUTH,
      },
    }

    axios
      .request(options)
      .then(function (response) {
        setRecommend(response.data.results)
        setTimeout(() => {
          setLoading(false)
        }, 1300)
      })
      .catch(function (error) {
        console.error(error)
        setLoading(false)
      })
  }, [id, path])

  return (
    <div className="text-white mx-24 max-lg:mx-20 max-sm:mx-12 py-12">
      <h1 className=" text-2xl mb-1 font-medium">
        Recommended {path === "tv" ? "Series" : "Movies"}
      </h1>
      <div className={`grid grid-cols-8 gap-4`}>
        {!loading
          ? recommend
              .filter((rec) => rec.poster_path && rec.backdrop_path)
              .slice(0, 16)
              .map((rec, index) => (
                <Link
                  key={index}
                  to={
                    path === "tv"
                      ? `/TVSeries/${rec.id}/1/1`
                      : `/Movie/${rec.id}`
                  }
                >
                  <motion.div
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.07 }}
                  >
                    <motion.div whileHover={{ filter: "brightness(0.8)" }}>
                      <motion.img
                        src={`https://image.tmdb.org/t/p/original/${rec.poster_path}`}
                        alt={`${
                          rec.original_title || rec.original_name
                        } backdrop`}
                        className="rounded-[5px] w-fit border-transparent box-border border-white relative"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute z-50 pt-1 ps-1 bottom-0 right-1 flex gap-1 justify-end items-end w-full h-full"
                      >
                        <div className="flex items-center gap-2 bg-[#7300FF30] border border-[#7300FF] px-2 rounded-md mb-1">
                          <p className="text-[12px] font-normal ">
                            {rec.vote_average.toFixed(1)}
                          </p>
                          <motion.img
                            src="https://img.icons8.com/?size=512&id=12246&format=png"
                            alt=""
                            width={27}
                            className="h-fit"
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                    <div>
                      <p className="word-break text-[16px] font-normal truncate-text">
                        {rec.original_title || rec.original_name}
                      </p>
                      <p className="text-sm opacity-50">
                        {(rec.release_date && rec.release_date.split("-")[0]) ||
                          (rec.first_air_date &&
                            rec.first_air_date.split("-")[0])}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))
          : recommend
              .filter((rec) => rec.poster_path && rec.backdrop_path)
              .slice(0, 20)
              .map((rec, index) => (
                <Player
                  autoplay
                  loop
                  key={index}
                  src={loader_Geometric}
                  className="h-[35vh]"
                />
              ))}
      </div>
    </div>
  )
}

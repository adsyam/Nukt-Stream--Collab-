import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useFetchRecommend from "../../Hooks/useFetchRecommend"
import useResponsive from "../../Hooks/useResponsive"

export default function MediaRecommendation({ id }) {
  const [mediaType, setMediaType] = useState()

  const { data, pathname } = useFetchRecommend()
  const { maxCards, responsiveGridCard } = useResponsive()

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  useEffect(() => {
    if (pathname.includes("/TVSeries")) {
      setMediaType("tv")
    } else if (pathname.includes("/Movie")) {
      setMediaType("movie")
    }
  }, [pathname])

  return (
    <div className="text-white mx-24 max-lg:mx-20 max-sm:mx-12 py-12 px-3">
      <h1 className=" text-2xl mb-1 font-medium">
        Recommended {mediaType === "tv" ? "Series" : "Movies"}
      </h1>
      <div
        className={`grid grid-cols-8 max-xl:grid-cols-7 max-lg:grid-cols-6 max-md:grid-cols-5 max-sm:grid-cols-4 max-xsm:grid-cols-3 max-xxsm:grid-cols-2 gap-4 text-white`}
      >
        {data
          .filter((rec) => rec.poster_path && rec.backdrop_path)
          .slice(0, maxCards)
          .map((rec, index) => (
            <Link
              key={index}
              to={
                mediaType === "tv"
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
                    alt={`${rec.original_title || rec.original_name} backdrop`}
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
                      (rec.first_air_date && rec.first_air_date.split("-")[0])}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
      </div>
    </div>
  )
}

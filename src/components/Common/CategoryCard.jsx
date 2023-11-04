import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function CategoryCard({
  mediaType,
  id,
  index,
  poster,
  title,
  name,
  releaseDate,
  firstAirDate,
  rating,
}) {

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <>
      <Link
        key={id}
        className="w-fit grid"
        to={mediaType === "tv" ? `/TVSeries/${id}/1/1` : `/Movie/${id}`}
      >
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.07 }}
          className=""
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
            }}
            className="relative"
          >
            <motion.div whileHover={{ filter: "brightness(0.8)" }}>
              <motion.img
                src={`https://image.tmdb.org/t/p/original/${poster}`}
                alt={`${title || name} backdrop`}
                width={215}
                className="rounded-[5px] w-fit border-transparent box-border border-white relative brightness-[0.85]"
              />
              {rating === 0 ? (
                ""
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute z-50 pt-1 ps-1 bottom-0 right-1 flex gap-1 justify-end items-end w-full h-full"
                >
                  <div className="flex items-center gap-2">
                    <p className="text-[12px] font-normal">{rating}</p>
                    <motion.img
                      src="https://img.icons8.com/?size=512&id=12246&format=png"
                      alt=""
                      width={27}
                      className="h-fit"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
          <div>
            <h2 className="word-break text-[16px] font-normal truncate-text">
              {title || name}
            </h2>
            <p className="text-sm opacity-50">
              {(releaseDate && releaseDate.split("-")[0]) ||
                (firstAirDate && firstAirDate.split("-")[0])}
            </p>
          </div>
        </motion.div>
      </Link>
    </>
  )
}

import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function CategoryCard({ mediaType, id, index, poster, title, name, releaseDate, firstAirDate }) {
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
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
            }}
            src={`https://image.tmdb.org/t/p/original/${poster}`}
            alt={`${title || name} backdrop`}
            width={215}
            className="rounded-[5px] w-fit border-transparent box-border border-white"
          />
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
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function SearchTVSeries({
  tvID,
  index,
  poster,
  backdrop,
  title,
  date1,
  date2,
  animation,
}) {
  return (
    <Link className="w-fit grid" to={`/TVSeries/${tvID}/1/1`}>
      <motion.div whileHover={{ scale: 1.03 }}>
        <motion.div
          variants={animation}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.07 }}
        >
          <img
            src={`https://image.tmdb.org/t/p/original/${poster}`}
            alt={`${title} backdrop`}
            width={215}
            className="rounded-[5px] w-fit border-transparent box-border border-white"
          />
          <div>
            <p className="word-break text-[16px] font-normal truncate-text">
              {title}
            </p>
            <p className="text-sm opacity-50">
              {(date1 && date1.split("-")[0]) || (date2 && date2.split("-")[0])}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  )
}

import { motion } from "framer-motion"
import { useLocation } from "react-router"

export default function MediaTypeButton({ setMediaType, mediaType, category }) {
  const location = useLocation()
  const pathname = location.pathname
  return (
    <div>
      <motion.button
        whileTap={{ scale: 1.1 }}
        onClick={() => setMediaType("tv")}
        className={`${
          mediaType === "tv" ? "bg-[#ffffff30] rounded-md" : null
        } px-3 py-1 rounded-md text-white`}
      >
        Series
      </motion.button>
      {category === "airing_today" ? (
        ""
      ) : (
        <motion.button
          whileTap={{ scale: 1.1 }}
          onClick={() => setMediaType("movie")}
          className={`${
            mediaType === "movie" ? "bg-[#ffffff30] rounded-md" : null
          } px-3 py-1 rounded-md text-white`}
        >
          Movie
        </motion.button>
      )}

      {pathname.includes("popular") ||
      pathname.includes("trending") ? (
        <motion.button
          whileTap={{ scale: 1.1 }}
          onClick={() => setMediaType("video")}
          className={`${
            mediaType === "video" ? "bg-[#ffffff30] rounded-md" : null
          } px-3 py-1 rounded-md text-white`}
        >
          Video
        </motion.button>
      ) : null}
    </div>
  )
}

import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useNavigate, useLocation } from "react-router"

export default function CategoryToggle() {
  const location = useLocation()
  const pathname = location.pathname
  const navigate = useNavigate()

  function categoryToggle() {
      if (pathname.includes("popular")) {
        navigate("/home/trending/1")
      } else if (pathname.includes("trending")) {
        navigate("/home/toprated/1")
      } else if (pathname.includes("toprated")) {
        navigate("/home/latest/1")
      } else if (pathname.includes("latest")) {
        navigate("/home/popular/1")
      } else if (pathname.includes("cinema")) {
        navigate("/home/cinema/1")
      }
  }

  return (
    <>
      <motion.button
        whileTap={{ x: -5 }}
        onClick={() => categoryToggle()}
        className="text-white px-1 py-1 text-sm"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </motion.button>
      <h2 className="text-2xl font-medium">
        {pathname.includes("popular")
          ? "POPULAR"
          : pathname.includes("trending")
          ? "TRENDING"
          : pathname.includes("toprated")
          ? "TOP RATED"
          : pathname.includes("latest")
          ? "LATEST"
          : pathname.includes("cinema")
          ? "CINEMA"
          : null}
      </h2>
      <motion.button
        whileTap={{ x: 5 }}
        onClick={() => categoryToggle()}
        className="text-white px-1 py-1 text-sm"
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </motion.button>
    </>
  )
}

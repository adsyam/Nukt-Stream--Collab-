import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useDataContext } from "../context/DataContext"
import { feedCategories } from "../utils/index"
import { VideoCategories } from "./index"

export const VideoFeed = () => {
  const { sidebar } = useDataContext()

  return (
    <motion.section
      className={`${
        sidebar ? "translate-x-[14rem]" : "translate-x-0"
      } flex flex-row w-full min-h-[100vh] p-[3rem]`}
    >
      <div className={`${sidebar ? "w-[87%]" : "w-full"}`}>
        {feedCategories.map((item, index) => (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.1 }}
            key={index}
            className="text-white pb-[3rem]"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-2xl text-[#00ffff] font-medium capitalize">
                {item.name}
                <span className="text-white"> videos</span>
              </p>
              <Link
                to={`/search?q=${item.name}`}
                className="cursor-pointer flex items-center gap-1"
              >
                {`See all`}
                <FontAwesomeIcon icon={faAngleRight} className="text-sm" />
              </Link>
            </div>
            <VideoCategories catergoryName={item.name} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

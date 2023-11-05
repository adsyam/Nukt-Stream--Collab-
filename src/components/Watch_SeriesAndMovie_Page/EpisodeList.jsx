import { motion } from "framer-motion"
import { Link, useParams } from "react-router-dom"
import useFetchDetails from "../../Hooks/useFetchDetails"
import useResponsive from "../../Hooks/useResponsive"

export default function EpisodeList() {
  const { id, season, episode } = useParams()
  const { data } = useFetchDetails()
  const { responsiveEpisodeList } = useResponsive()

  return (
    <div className="">
      <div className={responsiveEpisodeList}>
        {data.seasons &&
          data.seasons
            .filter((ep) => ep.season_number === parseInt(season))
            .map((ep, i) =>
              parseInt(season) > ep.season_number ? (
                <div key={i} className="text-white">
                  No episode available
                </div>
              ) : (
                Array.from({ length: ep.episode_count }, (_, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.05 }}>
                    <Link
                      to={`/TVSeries/${id}/${season}/${i + 1}`}
                      className={`px-2 font-thin rounded-md hover:ring-[3px] ring-[#7300FF] ${
                        parseInt(episode) === i + 1 ? "ring-[3px]" : ""
                      }`}
                    >{`EP ${i + 1}`}</Link>
                  </motion.div>
                ))
              )
            )}
      </div>
    </div>
  )
}

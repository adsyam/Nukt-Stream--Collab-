import { motion } from "framer-motion"
import { Link, useParams } from "react-router-dom"
import useFetchDetails from "../../Hooks/useFetchDetails"

export default function SeasonCards({ id }) {
  const { season } = useParams()
  const { data } = useFetchDetails()

  return (
    <div className="text-white flex flex-wrap gap-3">
      {data.seasons &&
        data.seasons
          .filter((sea) => sea.season_number > 0)
          .map((sea, i) => (
            <Link
              key={i}
              role="button"
              className={`flex relative items-center justify-center uppercase font-semibold border-2 rounded-md overflow-hidden max-w-[15%] text-lg max-md:max-w-[25%] max-lg:text-sm ${
                parseInt(season) === i + 1
                  ? "border-[2px] border-[#7300FF]"
                  : "border-[#868686]"
              }`}
              to={`/TVSeries/${id}/${i + 1}/1`}
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={`https://image.tmdb.org/t/p/original/${sea.poster_path}`}
                alt=""
                className="object-cover object-top brightness-75 h-full"
              />
              <Link
                className="absolute"
                to={`/TVSeries/${id}/${i + 1}/1`}
              >{`SEASON ${i + 1}`}</Link>
            </Link>
          ))}
    </div>
  )
}

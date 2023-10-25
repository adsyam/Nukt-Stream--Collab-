import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { API_KEY } from "../constants/apiConfig"

export default function EpisodeList({ id, Season, setSelectedServer, server, setServer }) {
  const [data, setData] = useState({})
  const defSeason = Season > 1 ? Season : "1"
  const [selectedSeason, setSelectedSeason] = useState(defSeason)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}`,
          {
            params: {
              api_key: API_KEY,
              append_to_response: "season",
            },
          }
        )

        setData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [id])

  return (
    <div className="text-white border border-[#6b13d7] flex flex-col w-fit rounded-md">
      {data.seasons ? (
        <div className="p-2 rounded-md">
          <select
            onChange={(e) => setSelectedSeason(e.target.value)}
            value={selectedSeason}
            className="bg-[#6b13d7] rounded-md px-1 text-white whitespace-nowrap"
          >
            {data.seasons.map((season) => (
              <option key={season.id} value={season.season_number}>
                Season {season.season_number}
              </option>
            ))}
          </select>
          {selectedSeason && (
            <ul>
              {data.seasons
                .filter(
                  (season) => season.season_number === Number(selectedSeason)
                )
                .map((season) => (
                  <li key={season.id}>
                    {season.episode_count > 0 && (
                      <div style={{ maxHeight: "265px", overflowY: "auto" }}>
                        <ul className="flex flex-col items-center whitespace-nowrap">
                          {Array.from(
                            { length: season.episode_count },
                            (_, index) => (
                              <Link
                                to={`/TVSeries/${id}/${selectedSeason}/${
                                  index + 1
                                }`}
                                key={index}
                                onClick={() => setServer(server)}
                                className="px-2 my-1 rounded-md w-fit hover:bg-[#ffffff20]"
                              >
                                Episode {index + 1}
                              </Link>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>
      ) : (
        <p className="bg-black">Loading...</p>
      )}
    </div>
  )
}

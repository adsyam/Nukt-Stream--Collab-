import { faBookmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useEffect, useState } from "react"
// import { useLocation } from "react-router"
import useFetchDetails from "../Hooks/useFetchDetails"
import { TOKEN_AUTH } from "../constants/apiConfig"
import TrailerModal from "./TrailerModal"

export default function MediaDetails({ Season, Episode, path }) {
  const [isOpen, setIsOpen] = useState(false)
  const [trailerData, setTrailerData] = useState([])
  const { data, id } = useFetchDetails()

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${path}/${id}/videos`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: TOKEN_AUTH,
      },
    }

    axios
      .request(options)
      .then(function (response) {
        setTrailerData(response.data.results)
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [id, path])

  return (
    <div>
      {data && (
        <div className="text-white bg-[#ffffff10] rounded-md  p-3">
          <div className="flex gap-2 items-center">
            <h2 className="text-4xl">
              {data.original_title || data.original_name}
            </h2>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-md  py-1 ">
                <div className="flex items-center gap-1 rounded-md px-3 bg-[#ffffff10]">
                  <p>{data && data.vote_average ? data.vote_average.toFixed(1) : null}</p>
                  <img
                    src="https://img.icons8.com/?size=512&id=12246&format=png"
                    alt=""
                    width={30}
                    className="h-fit"
                  />
                </div>
                {path === "movie" ? (
                  <p className="rounded-md px-3 bg-[#ffffff10]">
                    {data.runtime}min
                  </p>
                ) : (
                  <div className="flex gap-2">
                    <p className="rounded-md px-3 bg-[#ffffff10] text-[#8934f1]">
                      Season {Season}
                    </p>
                    <p className="rounded-md px-3 bg-[#ffffff10] text-[#8934f1]">
                      Episode {Episode}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <h3>Genres:</h3>
              <ul className="flex gap-2">
                {data && data.genres
                  ? data.genres.map((d) => (
                      <li key={d.id} className="rounded-md px-3 bg-[#ffffff10]">
                        {d.name}
                      </li>
                    ))
                  : null}
              </ul>
            </div>
            <div className="flex items-center gap-2">
              <h3>Language:</h3>
              <p className="rounded-md px-3 bg-[#ffffff10]">
                {data && data.original_language ? data.original_language.toUpperCase() : null}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <h3>Production:</h3>
              <ul className="flex gap-2">
                {data && data.production_companies
                  ? data.production_companies.map((pc) => (
                      <li
                        key={pc.id}
                        className="rounded-md px-3 bg-[#ffffff10]"
                      >
                        {pc.name}
                      </li>
                    ))
                  : null}
              </ul>
            </div>
            <p>SYNOPSIS:</p>
            <p>{data.overview}</p>
            <div className="flex gap-2 rounded-md">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-md px-3 py-1 bg-[#ffffff10] border border-[#ffe9e950] hover:bg-[#ffffff20] transition-all"
              >
                WATCH TRAILER
              </button>
              {trailerData
                .filter((td) => td.type === "Trailer")
                .slice(0, 1)
                .map((td, index) => (
                  <TrailerModal
                    key={index}
                    trailerKey={td.key}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                  />
                ))}
              <button className="rounded-md px-3 py-1 bg-[#ffffff10] border border-[#ffe9e950] hover:bg-[#ffffff20] transition-all text-center align-middle">
                <FontAwesomeIcon icon={faBookmark} />
                &nbsp;ADD TO THE LIBRARY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

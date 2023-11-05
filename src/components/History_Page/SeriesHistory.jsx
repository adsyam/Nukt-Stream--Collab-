import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { TOKEN_AUTH } from "../../constants/apiConfig"
import SearchTVSeries from "../Search_Page/SearchSeries"

export default function SeriesHistory({ reload }) {
  const storedSeriesIds = useMemo(() => {
    return window.localStorage.getItem("seriesIds")
      ? JSON.parse(window.localStorage.getItem("seriesIds"))
      : []
  }, [])

  const [seriesDetails, setSeriesDetails] = useState([])
  const [itemToDelete, setItemToDelete] = useState("")

  useEffect(() => {
    //create an array of promises for fetching movie details
    const fetchSeriesDetailsPromises = storedSeriesIds.map((seriesId) => {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${seriesId}`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: TOKEN_AUTH,
        },
      }
      return axios.request(options)
    })

    //use Promise.all to fetch all movie details in parallel
    Promise.all(fetchSeriesDetailsPromises)
      .then((responses) => {
        //responses will be an array of movie details based on the movie ids
        const seriesDetails = responses.map((response) => response.data)
        setSeriesDetails(seriesDetails)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [reload, storedSeriesIds])

  const handleDelete = (idToDelete) => {
    const seriesIds = JSON.parse(window.localStorage.getItem("seriesIds")) || []
    const indexToRemove = seriesIds.indexOf(idToDelete.toString())

    if (indexToRemove !== -1) {
      seriesIds.splice(indexToRemove, 1)
      setSeriesDetails((prevSeriesDetails) =>
        prevSeriesDetails.filter(
          (seriesDetail) => seriesDetail?.id !== idToDelete
        )
      )
      setItemToDelete(null)
      window.localStorage.setItem("seriesIds", JSON.stringify(seriesIds))
    }
  }

  const filteredSeriesDetails = seriesDetails.filter(
    (seriesDetail) => seriesDetail?.id !== itemToDelete
  )

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <div className="flex flex-col gap-3">
      {storedSeriesIds.length < 1 ? "" : <h2>Series</h2>}
      <div className="flex gap-5 flex-wrap">
        {filteredSeriesDetails.map((seriesDetail, index) => (
          <div key={seriesDetail?.id} className="w-[200px] relative group">
            <SearchTVSeries
              tvID={seriesDetail?.id}
              index={index}
              poster={seriesDetail?.poster_path}
              backdrop={seriesDetail?.backdrop_path}
              title={seriesDetail?.original_name}
              date1={seriesDetail?.release_date}
              date2={seriesDetail?.first_air_date}
              animation={fadeInVariants}
            />
            <button
              onClick={() => handleDelete(seriesDetail?.id)}
              className="absolute top-0 right-0 bg-[#0d0d0d]/40 p-[.5rem] rounded-full
              z-50 opacity-0 group-hover:opacity-100 duration-300"
            >
              <AiOutlineClose size={25} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

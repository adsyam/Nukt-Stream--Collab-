import axios from "axios"
import { useEffect, useState } from "react"
import { API_KEY, TMDB_BASE_URL } from "../constants/apiConfig"

export default function useFetchTrailer(mediaType, id) {
  const [getTrailer, setGetTrailer] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/${mediaType}/${id}/videos?api_key=${API_KEY}`
        )

        setGetTrailer(
          response.data.results
            .filter((td) => td.type === "Trailer")
            .slice(0, 1)
        )
      } catch (error) {
        console.error("Error Fetching Data:", error)
      }
    }
    fetchData()
  }, [id, mediaType])

  return { getTrailer }
}

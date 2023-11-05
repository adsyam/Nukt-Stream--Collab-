import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { API_KEY, TMDB_BASE_URL } from "../constants/apiConfig"

export default function useFetchRecommend() {
  const { id } = useParams()
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/3/${mediaType}/${id}/recommendations?api_key=${API_KEY}`
        )

        setData(response.data.results)
      } catch (error) {
        console.error("Error Fetching Data:", error)
      }
    }
  }, [id])

  return
}

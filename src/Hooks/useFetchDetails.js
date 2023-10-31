import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router"
import { API_KEY, TMDB_BASE_URL } from "../constants/apiConfig"

export default function useFetchDetails() {
  const { id, season, episode } = useParams()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    let mediaType

    if (pathname.includes("Movie")) {
      mediaType = "movie"
    } else {
      mediaType = "tv"
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`
        )

        setData(response.data)
        setTimeout(() => {
          setIsLoading(false)
        }, 1600)
      } catch (error) {
        console.error("Error fetching data", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id, pathname])



  return { data, isLoading, setIsLoading, id, season, episode, pathname }
}

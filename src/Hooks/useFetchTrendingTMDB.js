import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { API_KEY, TMDB_BASE_URL } from "../constants/apiConfig"

export default function useFetchTrendingTMDB(
  defMediaType = "tv",
  defPage = 1,
  category
) {
  const [data, setData] = useState([])
  const [isloading, setIsLoading] = useState(true)
  const [mediaType, setMediaType] = useState(defMediaType)
  const [page, setPage] = useState(defPage)
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/trending/${mediaType}/day?api_key=${API_KEY}&page=${page}`
        )

        setData(response.data.results)
        setTimeout(() => {
          setIsLoading(false)
        }, 1300)
      } catch (error) {
        console.error("Error fetching data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [category, mediaType, page, pathname])
  return {
    data,
    isloading,
    mediaType,
    setMediaType,
    page,
    setPage,
    category,
    pathname,
  }
}

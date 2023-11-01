import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router"
import { API_KEY, TMDB_BASE_URL } from "../constants/apiConfig"

export default function useFetchTMDB(
  defMediaType = "tv",
  defPage = 1,
  category
) {
  const { page } = useParams()
  const [data, setData] = useState([])
  const [isloading, setIsLoading] = useState(true)
  const [mediaType, setMediaType] = useState(defMediaType)
  const [pages, setPage] = useState(defPage)
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response
        if (pathname.includes("trending")) {
          response = await axios.get(
            `${TMDB_BASE_URL}/trending/${mediaType}/day?api_key=${API_KEY}&page=${pages}`
          )
        } else {
          response = await axios.get(
            `${TMDB_BASE_URL}/${mediaType}/${category}?api_key=${API_KEY}&page=${pages}`
          )
        }

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

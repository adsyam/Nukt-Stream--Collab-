import { Player } from "@lottiefiles/react-lottie-player"
import axios from "axios"
import { useEffect, useState } from "react"
import { loader_Geometric } from "../assets"
import { Footer } from "../components/Footer"
import MediaTypeButton from "../components/MediaTypeButton"
import { API_KEY, TMDB_BASE_URL } from "../constants/apiConfig"
import { Carousel, CategoryCard, CategoryToggle } from "../components"


export default function AllCategory() {
  const [data, setData] = useState([])
  const [mediaType, setMediaType] = useState("tv")
  const [isloading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/${mediaType}/popular?api_key=${API_KEY}&page=${page}`
        )

        setData(response.data.results)
        setTimeout(() => {
          setIsLoading(false)
        }, 1300)
      } catch (error) {
        console.error("Error fething data (POPULAR):", error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [mediaType, page])

  return (
    <>
      <Carousel mediaType={mediaType} />
      <div className="my-12 mx-32 flex flex-col items-center gap-4 justify-center text-white">
        <div className="flex items-center gap-4">
          <CategoryToggle />
        </div>
        <MediaTypeButton mediaType={mediaType} setMediaType={setMediaType} />
      </div>
      <div className="grid grid-cols-8 gap-4 mx-32 text-white mb-12">
        {!isloading
          ? data
              .filter((d) => d.poster_path && d.backdrop_path)
              .slice(0, 20)
              .map((d, index) => (
                <CategoryCard
                  key={d.id}
                  index={index}
                  id={d.id}
                  poster={d.poster_path}
                  title={d.original_title}
                  name={d.original_name}
                  releaseDate={d.release_date}
                  firstAirDate={d.first_air_date}
                  mediaType={mediaType}
                />
              ))
          : data
              .filter((d) => d.poster_path && d.backdrop_path)
              .slice(0, 20)
              .map((d, index) => (
                <Player
                  autoplay
                  loop
                  src={loader_Geometric}
                  key={index}
                  className="h-[35vh]"
                />
              ))}
      </div>
      {isloading ? null : <div className="text-white mb-12">sdsds</div>}
      <Footer />
    </>
  )
}

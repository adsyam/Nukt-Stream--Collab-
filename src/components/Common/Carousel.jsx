import { Player } from "@lottiefiles/react-lottie-player"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "swiper/css"
import "swiper/css/effect-fade"
import { Autoplay, EffectFade } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import useFetchTrailer from "../../Hooks/useFetchTrailer"
import { loader_Cine, loader_Peek } from "../../assets/index"
import { API_KEY, TMDB_BASE_URL } from "../../constants/apiConfig"
import { useDataContext } from "../../context/DataContext"
import TrailerModal from "../Modal/TrailerModal"
import GenreMap from "./GenreMap"

export default function Carousel({ mediaType }) {
  const [data, setData] = useState([])
  const [isloading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [getId, setGetId] = useState()
  const [url, setUrl] = useState(
    `${TMDB_BASE_URL}/trending/all/day?api_key=${API_KEY}`
  )
  const { sidebar } = useDataContext()
  const { getTrailer } = useFetchTrailer(mediaType, getId)

  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    const url = {
      url1: `${TMDB_BASE_URL}/trending/all/day?api_key=${API_KEY}`,
      url2: `${TMDB_BASE_URL}/${mediaType}/popular?api_key=${API_KEY}&page=1`,
      url3: `${TMDB_BASE_URL}/${mediaType}/top_rated?api_key=${API_KEY}&page=1`,
      url4: `${TMDB_BASE_URL}/tv/airing_today?api_key=${API_KEY}&page=1`,
      url5: `${TMDB_BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=1`,
    }
    if (pathname.includes("home/popular")) {
      setUrl(url.url2)
    } else if (pathname.includes("home/trending")) {
      setUrl(url.url1)
    } else if (pathname.includes("home/toprated")) {
      setUrl(url.url3)
    } else if (pathname.includes("home/latest")) {
      if (mediaType === "tv") setUrl(url.url4)
      else if (mediaType === "movie") setUrl(url.url5)
    } else {
      setUrl(url.url1)
    }
  }, [mediaType, pathname])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url)

        setData(response.data.results)
        setTimeout(() => {
          setIsLoading(false)
        }, 1600)
      } catch (error) {
        console.error("Error fething data (CAROUSEL):", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url])

  return (
    <>
      {/* {!isloading ? ( */}
        <Swiper
          centeredSlides={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectFade]}
          effect="fade"
          className={`mySwiper h-[70vh] max-xxsm:h-[60vh] flex justify-center ${
            sidebar
              ? "translate-x-[15rem] origin-left duration-300"
              : "translate-x-0 origin-right duration-300"
          }`}
        >
          {data
            .filter((d) => {
              if (pathname.includes("trending")) {
                if (mediaType === "tv") {
                  return d.media_type === "tv"
                } else if (mediaType === "movie") {
                  return d.media_type === "movie"
                }
              } else {
                return true
              }
              return false
            })
            .map((d) => (
              <SwiperSlide key={d.id} className="text-white">
                <img
                  className={`w-full h-[70vh] object-cover relative brightness-50 object-top ${
                    sidebar ? "top-[11.1%]" : ""
                  }`}
                  src={`https://image.tmdb.org/t/p/original/${d.backdrop_path}`}
                  alt={`${d.original_title} backdrop`}
                />
                <div className="absolute bottom-0 z-10 w-full m-10">
                  <div className="flex flex-col w-full gap-3">
                    <p className={`text-6xl font-bold break-words w-[70%] max-xsm:text-4xl }`}>
                      {d.original_title || d.original_name}
                    </p>
                    <div>
                      <p className="text-[18px] max-xsm:text-md">SYNOPSIS:</p>
                      <p className="text-[16px] max-xsm:text-sm break-words font-thin w-[60%] truncate-synopsis">
                        {d.overview}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {pathname.includes("popular") ||
                      pathname.includes("trending") ||
                      pathname.includes("toprated") ||
                      pathname.includes("latest") ? (
                        <p className="text-[18px] bg-[#DADADA40] py-1 px-2 rounded-[3px] font-medium">
                          {mediaType === "tv" ? "SERIES" : "MOVIE"}
                        </p>
                      ) : (
                        <p className="text-[18px] bg-[#DADADA40] py-1 px-2 rounded-[3px] font-medium">
                          {d.media_type === "tv" ? "SERIES" : "MOVIE"}
                        </p>
                      )}
                      <GenreMap CarouselGenre={d} />
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        className="bg-white py-2 px-4 rounded-[3px] shadow-inner font-bold cursor-pointer text-black"
                        to={
                          pathname.includes("/home") &&
                          !pathname.includes("/home/popular") &&
                          !pathname.includes("/home/trending") &&
                          !pathname.includes("/home/toprated") &&
                          !pathname.includes("/home/latest")
                            ? d.media_type === "tv"
                              ? `/TVSeries/${d.id}/1/1`
                              : `/Movie/${d.id}`
                            : mediaType === "tv"
                            ? `/TVSeries/${d.id}/1/1`
                            : `/Movie/${d.id}`
                        }
                        scroll={true}
                        onClick={() => setGetId(d.id)}
                      >
                        WATCH NOW
                      </Link>
                      <button
                        className="bg-white py-2 px-4 rounded-[3px] shadow-inner font-bold text-black"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        WATCH TRAILER
                      </button>
                      {getTrailer.map((res, i) => (
                        <TrailerModal
                          key={i}
                          trailerKey={res.key}
                          isOpen={isOpen}
                          onClose={() => setIsOpen(false)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      {/* ) : (
        <div
          className={`${
            sidebar
              ? "translate-x-[15rem] origin-left duration-300 w-[85%]"
              : "w-full origin-right duration-300"
          }`}
        >
          <Player
            autoplay
            loop
            // src={loader_Peek}
            className="flex justify-center h-[70vh] w-[40vw]"
          />
        </div>
      )} */}
    </>
  )
}

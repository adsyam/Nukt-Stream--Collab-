import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { loader_Geometric } from "../assets";
import { SearchMovie, SearchTVSeries } from "../components";
import { VideoCategories } from "../components/index";
import { TOKEN_AUTH } from "../constants/apiConfig";
import { searchFilters } from "../utils/index";
import { useDataContext } from "../context/DataContext";

export default function SearchPage() {
  const { query } = useParams();
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState([]);
  const [tvData, setTvData] = useState([]);
  const [animationKey, setAnimationKey] = useState(0);
  const [filter, setFilter] = useState("");
  const searchParams = new URLSearchParams(window.location.search).get("q");
  const { sidebar } = useDataContext();

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/multi",
      params: {
        query: `${searchParams}`,
        include_adult: "false",
        language: "en-US",
        page: "1",
      },
      headers: {
        accept: "application/json",
        Authorization: TOKEN_AUTH,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMovieData(
          response.data.results.filter((md) => md.media_type === "movie")
        );
        setTvData(response.data.results.filter((md) => md.media_type === "tv"));
        setAnimationKey((prevKey) => prevKey + 1);
        setTimeout(() => {
          setLoading(false);
        }, 1300);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false);
      });
  }, [searchParams]);

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      {/* <Navbar /> */}
      {!loading ? (
        <>
          <section
            className={`min-h-[100vh] flex flex-col pt-[7rem] px-[3rem] text-white ${
              sidebar
                ? "translate-x-[11rem] origin-left duration-300 w-[89%]"
                : "w-full origin-right duration-300"
            }`}
          >
            <div className="flex gap-[1rem] justify-center items-center">
              {searchFilters.map((item, index) => (
                <button
                  onClick={() => setFilter(item.name)}
                  key={index}
                  className={`${
                    filter === item.name ? "bg-[#FFFF]/10" : "bg-transparent"
                  } p-[.5rem] uppercase rounded-md`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <p className="text-white text-center font-bold">
              Showing results for{" "}
              <span className="text-[#7300FF]">&quot;{searchParams}&quot;</span>
            </p>
            <section className="mb-12 ">
              <h2 className="mx-12">Movie</h2>
              <div className="grid grid-cols-8 mx-12 gap-4">
                {movieData
                  .filter((md) => md.poster_path && md.backdrop_path)
                  .map((md, index) => (
                    <SearchMovie
                      key={index}
                      MovieID={md.id}
                      index={index}
                      poster={md.poster_path}
                      backdrop={md.backdrop_path}
                      title={md.original_title}
                      date1={md.release_date}
                      date2={md.first_air_date}
                      animation={fadeInVariants}
                    />
                  ))}
              </div>
            </section>
            <section className="mb-12 ">
              <h2 className="mx-12">TV Series</h2>
              <div className="grid grid-cols-8 mx-12 gap-4">
                {tvData
                  .filter((tv) => tv.poster_path && tv.backdrop_path)
                  .map((tv, index) => (
                    <SearchTVSeries
                      key={index}
                      tvID={tv.id}
                      index={index}
                      poster={tv.poster_path}
                      backdrop={tv.backdrop_path}
                      title={tv.original_name}
                      date1={tv.release_date}
                      date2={tv.first_air_date}
                      animation={fadeInVariants}
                    />
                  ))}
              </div>
            </section>
            <VideoCategories catergoryName={searchParams} />
          </section>
        </>
      ) : (
        <div key={animationKey}>
          <Player
            autoplay
            loop
            src={loader_Geometric}
            className="h-[35vh] flex items-center justify-center"
          ></Player>
        </div>
      )}
    </>
  )
}

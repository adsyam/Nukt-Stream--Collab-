import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TOKEN_AUTH } from "../../constants/apiConfig";
import SearchMovie from "../Search_Page/SearchMovie";

export default function MovieHistory({ reload }) {
  const storedMovieIds = window.localStorage.getItem("movieIds")
    ? JSON.parse(window.localStorage.getItem("movieIds"))
    : [];
  const [movieDetails, setMovieDetails] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    //create an array of promises for fetching movie details
    const fetchMovieDetailsPromises = storedMovieIds.map((movieId) => {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movieId}`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: TOKEN_AUTH,
        },
      };
      return axios.request(options);
    });

    //use Promise.all to fetch all movie details in parallel
    Promise.all(fetchMovieDetailsPromises)
      .then((responses) => {
        //responses will be an array of movie details based on the movie ids
        const movieDetails = responses.map((response) => response.data);
        setMovieDetails(movieDetails);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reload, storedMovieIds]);

  const handleDelete = (idToDelete) => {
    const movieIds = JSON.parse(window.localStorage.getItem("movieIds")) || [];
    const indexToRemove = movieIds.indexOf(idToDelete.toString());

    if (indexToRemove !== -1) {
      movieIds.splice(indexToRemove, 1);
      setMovieDetails((prevMovieDetails) =>
        prevMovieDetails.filter((movieDetail) => movieDetail?.id !== idToDelete)
      );
      setItemToDelete(null);
      window.localStorage.setItem("movieIds", JSON.stringify(movieIds));
    }
  };

  const filteredMovieDetails = movieDetails.filter(
    (movieDetail) => movieDetail?.id !== itemToDelete
  );

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="flex flex-col gap-3">
      {storedMovieIds.length < 1 ? "" : <h2>Movies</h2>}
      <div className="flex gap-5">
        {filteredMovieDetails.map((movieDetail, index) => (
          <div key={movieDetail?.id} className="w-[200px] relative group">
            <SearchMovie
              MovieID={movieDetail?.id}
              index={index}
              poster={movieDetail?.poster_path}
              backdrop={movieDetail?.backdrop_path}
              title={movieDetail?.original_title}
              date1={movieDetail?.release_date}
              date2={movieDetail?.first_air_date}
              animation={fadeInVariants}
            />
            <button
              onClick={() => handleDelete(movieDetail?.id)}
              className="absolute top-0 right-0 bg-black/40 p-[.5rem] rounded-full
              z-50 opacity-0 group-hover:opacity-100 duration-300"
            >
              <AiOutlineClose size={25} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

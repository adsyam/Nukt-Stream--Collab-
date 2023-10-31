import React, { useEffect, useState } from "react";
import { TOKEN_AUTH } from "../constants/apiConfig";
import axios from "axios";
import { SearchMovie } from "./index";

export const MovieLibrary = ({ reload }) => {
  const storedMovieIds = localStorage.getItem("movieLibrary")
    ? JSON.parse(localStorage.getItem("movieLibrary"))
    : [];

  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    //create an array of promises for fetching movie details
    const fetchSeriesDetailsPromises = storedMovieIds.map((movieId) => {
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
    Promise.all(fetchSeriesDetailsPromises)
      .then((responses) => {
        //responses will be an array of movie details based on the movie ids
        const results = responses.map((response) => response.data);
        setMovieDetails(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reload]);

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  if (!movieDetails) return;

  return (
    <section className="w-full min-h-max">
      <h2 className="text-lg mb-2">Movie Library</h2>
      <div className="w-full flex items-center gap-5">
        {movieDetails.map((movie, index) => (
          <div key={movie?.id} className="w-[200px] relative group">
            <SearchMovie
              MovieID={movie?.id}
              index={index}
              poster={movie?.poster_path}
              backdrop={movie?.backdrop_path}
              title={movie?.original_title}
              date1={movie?.release_date}
              date2={movie?.first_air_date}
              animation={fadeInVariants}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

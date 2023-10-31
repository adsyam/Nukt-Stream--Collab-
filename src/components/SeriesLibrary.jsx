import React, { useEffect, useState } from "react";
import { TOKEN_AUTH } from "../constants/apiConfig";
import axios from "axios";
import SearchTVSeries from "./SearchTVSeries";

export const SeriesLibrary = ({ reload }) => {
  const storedSeriesIds = localStorage.getItem("seriesLibrary")
    ? JSON.parse(localStorage.getItem("seriesLibrary"))
    : [];

  const [seriesDetails, setSeriesDetails] = useState(null);

  useEffect(() => {
    //create an array of promises for fetching movie details
    const fetchSeriesDetailsPromises = storedSeriesIds.map((seriesId) => {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${seriesId}`,
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
        setSeriesDetails(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reload]);

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  if (!seriesDetails) return;

  return (
    <section className="w-full min-h-max">
      <h2 className="text-lg mb-2">Series Library</h2>
      <div className="w-full flex items-center gap-5">
        {seriesDetails.map((series, index) => (
          <div key={series?.id} className="w-[200px] relative group">
            <SearchTVSeries
              tvID={series?.id}
              index={index}
              poster={series?.poster_path}
              backdrop={series?.backdrop_path}
              title={series?.original_name}
              date1={series?.release_date}
              date2={series?.first_air_date}
              animation={fadeInVariants}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AiOutlineClose } from "react-icons/ai";

import { TOKEN_AUTH } from "../../constants/apiConfig";
import CategoryCard from "../Common/CategoryCard";
import { useAuthContext } from "../../context/AuthContext";
import { useDBContext } from "../../context/DBContext";
import { textDB } from "../../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function MovieHistory({ reload }) {
  const { user } = useAuthContext();
  const { updateHistoryOrLibrary } = useDBContext();

  const [movieIds, setMovieIds] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const location = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(textDB, "Users", user.uid),
      { includeMetadataChanges: true },
      (doc) => setMovieIds(doc.data().history.movies)
    );
  }, []);

  useEffect(() => {
    //create an array of promises for fetching movie details
    const fetchMovieDetailsPromises = movieIds.map((movieId) => {
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
  }, [reload, movieIds]);

  const handleDelete = (idToDelete) => {
    const newIds = [...movieIds];

    const indexToRemove = newIds.indexOf(idToDelete.toString());
    if (indexToRemove !== -1) {
      newIds.splice(indexToRemove, 1);
      updateHistoryOrLibrary(user.uid, location, "movies", newIds);
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="flex flex-col gap-3">
      {movieIds.length < 1 ? "" : <h2>Movies</h2>}
      <div className="flex gap-5 flex-wrap">
        {movieDetails.map((movieDetail, index) => (
          <div key={movieDetail?.id} className="w-[200px] relative group">
            <CategoryCard
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
              className="absolute top-0 right-0 bg-[#0d0d0d40] p-[.5rem] rounded-full
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

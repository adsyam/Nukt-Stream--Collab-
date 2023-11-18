import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AiOutlineClose } from "react-icons/ai";

import { TOKEN_AUTH } from "../../constants/apiConfig";
import CategoryCard from "../Common/CategoryCard";
import { doc, onSnapshot } from "firebase/firestore";
import { textDB } from "../../config/firebase";
import { useDBContext } from "../../context/DBContext";
import { useAuthContext } from "../../context/AuthContext";

export default function SeriesHistory({ reload }) {
  const { user } = useAuthContext();
  const { updateHistoryOrLibrary } = useDBContext();
  const [seriesIds, setSeriesIds] = useState([]);
  const [seriesDetails, setSeriesDetails] = useState([]);
  const location = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(textDB, "Users", user.uid),
      { includeMetadataChanges: true },
      (doc) => setSeriesIds(doc.data()[location].series)
    );
  }, []);

  useEffect(() => {
    //create an array of promises for fetching movie details
    const fetchSeriesDetailsPromises = seriesIds.map((seriesId) => {
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
        const seriesDetails = responses.map((response) => response.data);
        setSeriesDetails(seriesDetails);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reload, seriesIds]);

  const handleDelete = (idToDelete) => {
    const newIds = [...seriesIds];

    const indexToRemove = newIds.indexOf(idToDelete.toString());
    if (indexToRemove !== -1) {
      newIds.splice(indexToRemove, 1);
      updateHistoryOrLibrary(user.uid, location, "series", newIds);
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="flex flex-col gap-3">
      {seriesIds.length < 1 ? "" : <h2>Series</h2>}
      <div className="flex gap-5 flex-wrap">
        {seriesDetails.map((seriesDetail, index) => (
          <div key={seriesDetail?.id} className="w-[200px] relative group">
            <CategoryCard
              key={seriesDetail.id}
              index={index}
              id={seriesDetail.id}
              poster={seriesDetail.poster_path}
              title={seriesDetail.original_title}
              name={seriesDetail.original_name}
              releaseDate={seriesDetail.release_date}
              firstAirDate={seriesDetail.first_air_date}
              mediaType={"tv"}
              rating={seriesDetail.vote_average.toFixed(1)}
            />
            <button
              onClick={() => handleDelete(seriesDetail?.id)}
              className="absolute top-0 right-0 bg-[#0d0d0d]/40 p-[.5rem] rounded-full
              z-50 opacity-0 group-hover:opacity-100 duration-300"
            >
              <AiOutlineClose size={25} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDownloadURL, listAll, ref } from "firebase/storage";

import { useFetchChannelVideos } from "../../Hooks/customHooks";
import { useAuthContext } from "../../context/AuthContext";
import VideosGrid from "../Video_Section/VideosGrid";
import UploadVideoModal from "../Modal/UploadVideoModal";
import { fileDB } from "../../config/firebase";

export default function Profile_Contents() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const listRef = ref(fileDB, `${id}/videos/`);
    listAll(listRef).then((response) => {
      getDownloadURL(response.items[0]).then((url) => {
        setVideos((prev) => [url]);
      });
    });
  }, []);
  // console.log(videos);
  const onClose = () => {
    setShowModal(false);
  };

  if (showModal === false) {
    document.body.style.overflow = "auto";
  } else {
    document.body.style.overflow = "hidden";
  }

  if (!id || !user) return;
  if (id === user.uid) {
    return (
      <div
        className="w-full min-h-[50vh] bg-[#0d0d0d] text-white text-center
        translate-y-[4rem] md:translate-y-0"
      >
        <div className="w-full flex justify-end items-center px-10">
          <UploadVideoModal showModal={showModal} onClose={onClose} />
          <button
            onClick={() => setShowModal(true)}
            className="w-max bg-white/50 px-5 py-1 rounded-md"
          >
            Upload a video
          </button>
        </div>
        {videos.length < 1 ? (
          <h2 className="text-[1.1rem]">
            You haven&#39;t uploaded any videos.
          </h2>
        ) : (
          <div>
            <h2>Your Videos</h2>
            {videos.map((video) => (
              <div>video</div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="w-full h-full bg-[#0d0d0d] text-white pb-[2rem]
     translate-y-[4rem] md:-translate-y-[4rem]"
    >
      <VideosGrid videos={useFetchChannelVideos(id)} />
    </div>
  );
}

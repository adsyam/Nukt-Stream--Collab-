import { useFetchChannelVideos } from "../Hooks/customHooks";
import { useParams } from "react-router-dom";
import { VideosGrid } from "./VideosGrid";
import { useAuthContext } from "../context/AuthContext";

export const Profile_Contents = () => {
  const { id } = useParams();
  const { user } = useAuthContext();

  if (id === user.uid) {
    return (
      <div
        className="w-full min-h-[50vh] bg-black text-white grid text-center
    translate-y-[4rem] md:translate-y-0"
      >
        <h2 className="text-[1.1rem]">You haven't uploaded any videos.</h2>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full bg-black text-white pb-[2rem]
     translate-y-[4rem] md:-translate-y-[4rem]"
    >
      <VideosGrid videos={useFetchChannelVideos(id)} />
    </div>
  );
};

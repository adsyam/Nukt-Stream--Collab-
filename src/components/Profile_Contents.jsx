import { useFetchChannelVideos } from "../Hooks/customHooks";
import { useParams } from "react-router-dom";
import { VideosGrid } from "./VideosGrid";

export const Profile_Contents = () => {
  const { id } = useParams();

  return (
    <div
      className="w-full h-full bg-black text-white pb-[2rem]
     translate-y-[4rem] md:-translate-y-[4rem]"
    >
      <VideosGrid videos={useFetchChannelVideos(id)} />
    </div>
  );
};

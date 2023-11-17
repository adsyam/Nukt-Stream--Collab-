import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { textDB } from "../config/firebase";
import { useDataContext } from "../context/DataContext";
import { useAuthContext } from "../context/AuthContext";
import VideosGrid from "../components/Video_Section/VideosGrid";
import { useFetchSubChannels, useFetchSubsVideos } from "../Hooks/customHooks";
import ChannelCard from "../components/Video_Section/ChannelCard";

export default function Subscriptions() {
  const [manage, setManage] = useState(false);
  const [subChannels, setSubChannels] = useState([]);

  const { sidebar } = useDataContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(textDB, "Users", user.uid),
      { includeMetadataChanges: true },
      (doc) => setSubChannels(doc.data()?.subscriptions?.channels)
    );
  }, []);

  const videos = useFetchSubsVideos(subChannels);
  const channels = useFetchSubChannels(subChannels);
  if (!videos) return;

  return (
    <section
      className={`min-h-[100vh] mx-[2rem] text-white translate-y-[8rem] ${
        sidebar
          ? "translate-x-[15rem] origin-left duration-300 w-[84%]"
          : "origin-right duration-300"
      }`}
    >
      <div className="flex justify-between items-center pb-2">
        <h2 className="text-xl">Latest Videos</h2>
        <button
          onClick={() => setManage(!manage)}
          className="bg-white/20 p-[.5rem] rounded-md"
        >
          {manage ? "Back" : "Manage"}
        </button>
      </div>

      <hr className="border-white/30 pb-5" />
      {subChannels.length === 0 ? (
        <p className="text-center">You are not subscribed to any channels</p>
      ) : manage ? (
        <div className="flex flex-col gap-12">
          <h2>Subscribed Channels</h2>
          <div className="flex items-center gap-5">
            {channels.map((item, index) => (
              <div key={index}>
                <ChannelCard channelDetail={item[0]} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-[1800px] mx-auto">
          {videos.map((items, index) => (
            <VideosGrid key={index} videos={items} />
          ))}
        </div>
      )}
    </section>
  );
}

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AiFillCheckCircle } from "react-icons/ai";

import { fileDB, textDB } from "../config/firebase";
import { useDataContext } from "../context/DataContext";
import { useAuthContext } from "../context/AuthContext";
import { useDBContext } from "../context/DBContext";
import VideosGrid from "../components/Video_Section/VideosGrid";
import { useFetchSubChannels, useFetchSubsVideos } from "../Hooks/customHooks";
import ChannelCard from "../components/Video_Section/ChannelCard";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { Link } from "react-router-dom";

export default function Subscriptions() {
  const [manage, setManage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subChannels, setSubChannels] = useState([]);
  const [subUsers, setSubUsers] = useState([]);
  const [userData, setUserData] = useState([]);

  const { sidebar } = useDataContext();
  const { user } = useAuthContext();
  const { getUserData } = useDBContext();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(textDB, "Users", user.uid),
      { includeMetadataChanges: true },
      (doc) => setSubChannels(doc.data()?.subscriptions?.channels)
    );
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(textDB, "Users", user.uid),
      { includeMetadataChanges: true },
      (doc) => setSubUsers(doc.data()?.subscriptions?.users)
    );

    const getData = async () => {
      try {
        const userDataPromises = subUsers.map(async (id) => {
          const result = await getUserData(id);

          const listRef = ref(fileDB, `${id}/profileImage/`);
          const response = await listAll(listRef);
          const url = await getDownloadURL(response.items[0]);

          return {
            id: result?.id,
            email: result?.email,
            subscribers: result?.subscribers?.length,
            url,
          };
        });

        const userDataArray = await Promise.all(userDataPromises);
        setUserData((prevUserData) => [...userDataArray]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [manage]);

  const videos = useFetchSubsVideos(subChannels);
  const channels = useFetchSubChannels(subChannels);
  console.log(userData);
  if (!videos || loading) return;

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
          <div className="flex flex-col gap-10">
            <h2>Subscribed Channels</h2>
            <div className="flex items-center gap-5">
              {channels.map((item, index) => (
                <div key={index}>
                  <ChannelCard channelDetail={item[0]} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <h2>Subscribed Users</h2>
            <div className="flex flex-wrap items-center gap-5">
              {userData.map((user) => (
                <Link
                  to={`/profile/${user?.id}`}
                  key={user?.id}
                  className="w-full md:w-[300px] flex flex-col gap-1 justify-center items-center"
                >
                  <div className="w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full overflow-hidden border-2">
                    <img
                      src={user?.url}
                      alt="user photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-max flex flex-col justify-center items-center">
                    <p className="flex items-center gap-1">
                      {user?.email}
                      <AiFillCheckCircle />
                    </p>
                    <p>{user?.subscribers} Subscribers</p>
                  </div>
                </Link>
              ))}
            </div>
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

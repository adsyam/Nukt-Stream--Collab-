import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AiFillCheckCircle } from "react-icons/ai";

import { fileDB, textDB } from "../config/firebase";
import { useDataContext } from "../context/DataContext";
import { useAuthContext } from "../context/AuthContext";
import { useDBContext } from "../context/DBContext";
import { useFetchSubChannels, useFetchSubsVideos } from "../Hooks/customHooks";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { Link } from "react-router-dom";
import VideoCard from "../components/Video_Section/VideoCard";

export default function Subscriptions() {
  const [manage, setManage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subChannels, setSubChannels] = useState([]);
  const [subUsers, setSubUsers] = useState([]);
  const [userData, setUserData] = useState([]);
  const [reload, setReload] = useState(false);
  const { sidebar } = useDataContext();
  const { user } = useAuthContext();
  const { getUserData, removeSubscription, removeSubscribers } = useDBContext();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(textDB, "Users", user.uid),
      { includeMetadataChanges: true },
      (doc) => setSubChannels(doc.data()?.subscriptions?.channels)
    );
  }, [reload]);

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
            username: result?.username,
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
  }, [manage, reload]);

  const toggleUnsubscribe = (e, type, id) => {
    e.preventDefault();
    try {
      removeSubscription(user?.uid, type, id);
      removeSubscribers(id, user?.uid).then(() => {
        alert("Successfully unsubscribed");
        setReload(!reload);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const videos = useFetchSubsVideos(subChannels);
  const channels = useFetchSubChannels(subChannels);

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
      {manage ? (
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-10">
            <h2>Subscribed Channels</h2>
            {subChannels.length === 0 && (
              <p className="text-center">
                You are not subscribed to any channels
              </p>
            )}{" "}
            <div className="flex flex-wrap items-center gap-5">
              {channels.map((item) => (
                <div
                  key={item?.id?.channelId || item?.id}
                  className="w-full md:w-[300px] flex flex-col gap-1 justify-center items-center"
                >
                  <div
                    className="w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full
                    overflow-hidden border-2 relative group"
                  >
                    <div
                      className="absolute w-full h-full grid place-items-center bg-black/80
                      rounded-full -translate-x-[15rem] group-hover:translate-x-0 transition-all
                      duration-300"
                    >
                      <button
                        onClick={(e) =>
                          toggleUnsubscribe(
                            e,
                            "channels",
                            item?.id?.channelId || item?.id
                          )
                        }
                        className="capitalize w-max bg-white/50 p-[.3rem] md:p-[.5rem] rounded-md
                        text-sm md:text-normal hover:scale-105 transition-all duration-200"
                      >
                        unsubscribe
                      </button>
                    </div>
                    <img
                      src={item?.snippet?.thumbnails?.high?.url}
                      alt={item?.snippet?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Link
                    to={`/profile/${item?.id?.channelId || item?.id}`}
                    className="w-max flex flex-col justify-center items-center"
                  >
                    <p className="flex items-center gap-1">
                      {item?.snippet?.title}
                      <AiFillCheckCircle />
                    </p>
                    <div>
                      {item?.statistics?.subscriberCount && (
                        <p>
                          {parseInt(
                            item?.statistics?.subscriberCount
                          ).toLocaleString()}{" "}
                          Subscribers
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <h2>Subscribed Users</h2>
            {subUsers.length === 0 && (
              <p className="text-center">You are not subscribed to any users</p>
            )}{" "}
            <div className="flex flex-wrap items-center gap-5">
              {userData.map((user) => (
                <div
                  key={user?.id}
                  className="w-full md:w-[300px] flex flex-col gap-1 justify-center items-center"
                >
                  <div
                    className="w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full
                    overflow-hidden border-2 relative group"
                  >
                    <div
                      className="absolute w-full h-full grid place-items-center bg-black/80
                      rounded-full -translate-x-[15rem] group-hover:translate-x-0 transition-all
                      duration-300"
                    >
                      <button
                        onClick={(e) => toggleUnsubscribe(e, "users", user?.id)}
                        className="capitalize w-max bg-white/50 p-[.3rem] md:p-[.5rem] rounded-md
                        text-sm md:text-normal hover:scale-105 transition-all duration-200"
                      >
                        unsubscribe
                      </button>
                    </div>
                    <img
                      src={user?.url}
                      alt="user photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Link
                    to={`/profile/${user?.id}`}
                    className="w-max flex flex-col justify-center items-center"
                  >
                    <p className="flex items-center gap-1">
                      {user?.username}
                      <AiFillCheckCircle />
                    </p>
                    <p>{user?.subscribers} Subscribers</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : subChannels.length === 0 ? (
        <p className="text-center">You are not subscribed to any channels</p>
      ) : (
        <div className="w-full flex flex-wrap justify-center items-center gap-5">
          {videos.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))}
        </div>
      )}
    </section>
  );
}

import { useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import ProfileNav from "./ProfileNav";
import { textDB } from "../../config/firebase";
import { useAuthContext } from "../../context/AuthContext";
import { useDBContext } from "../../context/DBContext";
import { AiOutlineEdit } from "react-icons/ai";

export default function ProfileDetails({ channelDetail, id }) {
  const [isUser, setIsUser] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [subscribe, setSubscribe] = useState([]);
  const { user } = useAuthContext();
  const { addSubcription, removeSubscription, addSubscribers } = useDBContext();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(textDB, "Users", user.uid),
      { includeMetadataChanges: true },
      (doc) => {
        setSubscribe(doc.data()?.subscriptions),
          setNewUsername(doc.data()?.username);
      }
    );

    return () => unsubscribe();
  }, [isEdit]);

  useEffect(() => {
    if (!channelDetail?.kind) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [channelDetail]);

  const handdleSubscriptions = () => {
    if (isUser) {
      if (subscribe["users"]?.includes(id)) {
        removeSubscription(user?.uid, "users", id);
      } else {
        addSubcription(user?.uid, "users", id);
        addSubscribers(id, user.uid);
      }
    } else {
      if (subscribe["channels"]?.includes(id)) {
        removeSubscription(user?.uid, "channels", id);
      } else {
        addSubcription(user?.uid, "channels", id);
      }
    }
  };

  const handleSave = async () => {
    const userDocRef = doc(textDB, "Users", user?.uid);

    await updateDoc(userDocRef, {
      username: newUsername,
    });
    setIsEdit(false);
  };

  return (
    <section className="px-[2rem]">
      <div
        className="w-max flex flex-col gap-2 translate-x-[11rem] md:translate-x-[18rem]
        -translate-y-[7rem] md:-translate-y-[12rem]"
      >
        <div>
          <div className="flex items-center gap-3">
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="bg-transparent outline-none border-2 rounded-md w-max px-1 py-1"
                />
                <button onClick={handleSave}>save</button>
                <button onClick={() => setIsEdit(false)}>cancel</button>
              </>
            ) : (
              <>
                <h2 className="text-[1.2rem] font-medium">
                  {isUser ? newUsername : channelDetail?.snippet?.title}
                </h2>
                {user?.uid === id && (
                  <AiOutlineEdit
                    className="cursor-pointer"
                    onClick={() => setIsEdit(true)}
                  />
                )}
              </>
            )}
          </div>
          <p className="text-white/60">
            {isUser ? channelDetail?.email : channelDetail?.snippet?.customUrl}
          </p>
        </div>
        <div className="flex gap-4">
          <p>
            <span className="font-bold">
              {isUser
                ? channelDetail?.subscribers?.length
                : parseInt(
                    channelDetail?.statistics?.subscriberCount
                  ).toLocaleString()}
            </span>{" "}
            Subscribers
          </p>
          <p>
            <span className="font-bold">
              {isUser
                ? 0
                : parseInt(
                    channelDetail?.statistics?.videoCount
                  ).toLocaleString()}
            </span>{" "}
            Videos
          </p>
        </div>
        {id !== user?.uid && (
          <div className="w-full flex justify-start items-center">
            <button
              onClick={handdleSubscriptions}
              className={`w-max px-10 py-2 capitalize rounded-md ${
                isUser
                  ? subscribe["users"]?.includes(id)
                    ? "bg-[#389FDD]"
                    : "bg-white/30"
                  : subscribe["channels"]?.includes(id)
                  ? "bg-[#389FDD]"
                  : "bg-white/30"
              }`}
            >
              {isUser
                ? subscribe["users"]?.includes(id)
                  ? "subscribed"
                  : "subscribe"
                : subscribe["channels"]?.includes(id)
                ? "subscribed"
                : "subscribe"}
            </button>
          </div>
        )}
      </div>

      <ProfileNav id={channelDetail?.id} />
    </section>
  );
}

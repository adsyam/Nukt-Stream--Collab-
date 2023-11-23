import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDownloadURL, listAll, ref } from "firebase/storage";

import { UserSidebarMenu } from "../../utils/index";
import { useAuthContext } from "../../context/AuthContext";
import { useDataContext } from "../../context/DataContext";
import { fileDB, textDB } from "../../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function UserSidebar({ showUserSidebar }) {
  const { user, logout } = useAuthContext();
  const { modal, setModal, setUserSidebar } = useDataContext();
  const [imageUrl, setImageUrl] = useState(null);
  const [reload, setReload] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReload(!reload);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const listRef = ref(fileDB, `${user?.uid}/profileImage/`);
    listAll(listRef).then((response) => {
      getDownloadURL(response.items[0]).then((url) => {
        setImageUrl(url);
      });
    });

    const unsubscribe = onSnapshot(
      doc(textDB, "Users", user.uid),
      { includeMetadataChanges: true },
      (doc) => {
        setUsername(doc.data()?.username);
      }
    );
  }, [reload]);

  const toggleModal = () => {
    setModal(!modal);
    return (document.body.style.overflow = "hidden");
  };

  useEffect(() => {
    if (logout) setUserSidebar(false);
  }, [logout, setUserSidebar]);

  return (
    <aside
      className={`absolute h-fit text-black font-medium top-[4rem] right-[2rem]  bg-[#ffffff90] p-[1rem]
    rounded-md shadow-sm border-2 border-[#ffffff30] shadow-white ${
      showUserSidebar
        ? "origin-top-right scale-1 duration-300 ease-in-out"
        : "origin-top-right scale-0 duration-300 ease-in-out"
    }`}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="w-[50px] h-[50px] rounded-full border-2 overflow-hidden">
          <img
            src={
              imageUrl || user.photoURL || "/src/assets/profile-placeholder.svg"
            }
            alt="user image"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2>{username || user?.displayName || "Guest User"}</h2>
          <p>
            {user?.auth?.currentUser?.providerData[0]?.email ||
              "sample@email.com"}
          </p>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-3 mt-[1rem]">
        {UserSidebarMenu.map((item, index) => (
          <div key={index}>
            {item.name === "sign out" || item.name === "send feedback" ? (
              <button
                onClick={item.name === "sign out" ? logout : toggleModal}
                className="uppercase hover:text-[#7300FF] hover:font-bold text-start"
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={index}
                to={
                  item.name === "my profile"
                    ? `/profile/${user?.uid}`
                    : item.url
                }
                className="uppercase hover:text-[#7300FF] hover:font-bold"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

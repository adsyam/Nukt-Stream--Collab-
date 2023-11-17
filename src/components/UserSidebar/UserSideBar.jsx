import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDownloadURL, listAll, ref } from "firebase/storage";

import { UserSidebarMenu } from "../../utils/index";
import useFetchDetails from "../../Hooks/useFetchDetails";
import { useAuthContext } from "../../context/AuthContext";
import { useDataContext } from "../../context/DataContext";
import { fileDB } from "../../config/firebase";

export default function UserSidebar({ showUserSidebar }) {
  const { user, logout } = useAuthContext();
  const { modal, setModal, setUserSidebar } = useDataContext();
  const [imageUrl, setImageUrl] = useState(null);

  const toggleModal = () => {
    setModal(!modal);
    return (document.body.style.overflow = "hidden");
  };

  useEffect(() => {
    const listRef = ref(fileDB, `${user?.uid}/profilePic/`);
    listAll(listRef).then((response) => {
      getDownloadURL(response.items[0]).then((url) => {
        setImageUrl(url);
      });
    });
  }, []);

  useEffect(() => {
    if (logout) setUserSidebar(false);
  }, [logout, setUserSidebar]);

  return (
    <aside
      className={`absolute text-black font-medium top-[4rem] right-[2rem] w-[300px]  bg-[#ffffff90] p-[1rem]
    rounded-md shadow-sm border-2 border-[#ffffff30] shadow-white ${
      showUserSidebar
        ? "origin-top-right scale-1 duration-300 ease-in-out"
        : "origin-top-right scale-0 duration-300 ease-in-out"
    }`}
    >
      <div className="flex items-center gap-4 mb-3">
        <img
          src={
            imageUrl || user.photoURL || "/src/assets/profile-placeholder.svg"
          }
          alt="user image"
          className="w-[50px] rounded-full border-2"
        />
        <div>
          <h2>{user.displayName || "Guest User"}</h2>
          <p>{user.email || "sample@email.com"}</p>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-3 mt-[1rem]">
        {UserSidebarMenu.map((item, index) => (
          <>
            {item.name === "sign out" || item.name === "send feedback" ? (
              <button
                key={index}
                onClick={item.name === "sign out" ? logout : toggleModal}
                className="uppercase hover:text-[#7300FF] hover:font-bold text-start"
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={index}
                to={
                  item.name === "my profile" ? `/profile/${user.uid}` : item.url
                }
                className="uppercase hover:text-[#7300FF] hover:font-bold"
              >
                {item.name}
              </Link>
            )}
          </>
        ))}
      </div>
    </aside>
  );
}

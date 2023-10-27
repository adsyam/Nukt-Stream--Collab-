import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { UserSidebarMenu } from "../utils/index";
import { useDataContext } from "../context/DataContext";

export const UserSidebar = ({ showUserSidebar }) => {
  const { user, logout } = useAuthContext();
  const { modal, setModal } = useDataContext();

  const toggleModal = () => {
    setModal(!modal);
    return (document.body.style.overflow = "hidden");
  };

  return (
    <aside
      className={`absolute top-[4rem] right-[2rem] w-[300px] min-h-[90vh] bg-black p-[1rem]
    rounded-md shadow-sm shadow-white ${
      showUserSidebar
        ? "origin-top-right scale-1 duration-300 ease-in-out"
        : "origin-top-right scale-0 duration-300 ease-in-out"
    }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <img
          src={user.photoURL || "https://i.pravatar.cc/40"}
          alt="user image"
          className="w-[50px] rounded-full"
        />
        <div>
          <h2>{user.displayName || "Guest User"}</h2>
          <p>{user.email || "sample@email.com"}</p>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-[1.5rem] my-[2rem]">
        {UserSidebarMenu.map((item, index) => (
          <>
            {item.name === "sign out" || item.name === "send feedback" ? (
              <button
                key={index}
                onClick={item.name === "sign out" ? logout : toggleModal}
                className="uppercase hover:text-[#389FDD] hover:font-bold text-start"
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={index}
                to={
                  item.name === "my profile" ? `/profile/${user.uid}` : item.url
                }
                className="uppercase hover:text-[#389FDD] hover:font-bold"
              >
                {item.name}
              </Link>
            )}
          </>
        ))}
      </div>
    </aside>
  );
};

import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { UserSidebarMenu } from "../utils/index";

export const UserSidebar = ({ showUserSidebar }) => {
  const { user, logout } = useAuthContext();

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
            {item.name === "sign out" ? (
              <Link
                key={index}
                onClick={logout}
                className="uppercase hover:text-[#389FDD] hover:font-bold"
              >
                {item.name}
              </Link>
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

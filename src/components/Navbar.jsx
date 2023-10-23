//import link
import { Link } from "react-router-dom"
//import components
// import logo and icons
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AiFillBell } from "react-icons/ai"
import { nukt_logo } from "../assets"
import { useAuthContext } from "../context/AuthContext"
import { useDataContext } from "../context/DataContext"
import { Searchbar } from "./SearchBar"
import { Sidebar } from "./Sidebar"
import { UserSidebar } from "./UserSideBar"

// import { Searchbar, Sidebar, UserSidebar } from "./index"

export const Navbar = () => {
  const {
    showSidebar,
    sidebar,
    userSidebar,
    showUserSidebar,
    isActive,
  } = useDataContext()
  const { user } = useAuthContext()

  return (
    <>
      <nav
        className={`${
          isActive || sidebar
            ? "bg-[#0A0E1730] backdrop-blur-[1px]"
            : "bg-transparent"
        } py-2 flex items-center justify-between px-5 fixed top-0 right-0 left-0 z-10 text-white`}
      >
        <div className="flex gap-5">
          <button
            className={`px-[.6rem] rounded-md ${user ? "" : "hidden"}`}
            onClick={showSidebar}
          >
            {sidebar ? (
              <FontAwesomeIcon
                role="button"
                icon={faXmark}
                className="text-white text-2xl"
              />
            ) : (
              <FontAwesomeIcon
                role="button"
                icon={faBars}
                className="text-white text-2xl"
              />
            )}
          </button>
          <Link to={"/home"} className="flex items-center gap-2">
            <img src={nukt_logo} alt="" width={35} height={41} />
            <p className="text-white font-bold">Nukt</p>
          </Link>
        </div>
        {!user ? "" : <Searchbar />}
        <div className="flex items-center gap-2">
          {user === null ? (
            <Link to="/login" className="bg-black/50 rounded-md p-[.5rem]">
              <span className="uppercase text-[.9rem]">sign in</span>
            </Link>
          ) : (
            <>
              <AiFillBell size={30} />
              <button
                onClick={showUserSidebar}
                className="bg-black/50 rounded-full border-[1px]"
              >
                <img
                  src={`${user ? user.photoURL : "https://i.pravatar.cc/35"}`}
                  alt=""
                  className="rounded-full"
                  width={35}
                  height={41}
                />
              </button>
              <UserSidebar showUserSidebar={userSidebar} />
            </>
          )}
        </div>
      </nav>
      <Sidebar showSidebar={sidebar} />
    </>
  )
}

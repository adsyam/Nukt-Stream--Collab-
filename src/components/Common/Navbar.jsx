import {
  faBars,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { AiFillBell } from "react-icons/ai"
import { Link } from "react-router-dom"
import useFetchDetails from "../../Hooks/useFetchDetails"
import { nukt_logo } from "../../assets"
import { useAuthContext } from "../../context/AuthContext"
import { useDataContext } from "../../context/DataContext"
import Searchbar from "../Common/SearchBar"
import Sidebar from "../LeftSidebar/Sidebar"
import FeedbackModal from "../Modal/FeedbackModal"
import UserSidebar from '../UserSidebar/UserSideBar'

export default function Navbar() {
  const { data, pathname } = useFetchDetails()
  const {
    showSidebar,
    sidebar,
    userSidebar,
    showUserSidebar,
    isActive,
    modal,
  } = useDataContext()
  const { user } = useAuthContext()
  const [searchMobile, setSearchMobile] = useState(false)
  const [showSearchbar, setShowSearchbar] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    if (
      !(
        pathname.includes("Movie") ||
        pathname.includes("TVSeries") ||
        pathname.includes("home/popular") ||
        pathname.includes("home/trending") ||
        pathname.includes("home/toprated")
      )
    ) {
      document.title = "Nukt"
      return
    }

    if (!(data && (data.original_name || data.original_title))) {
      return
    }

    if (pathname.includes("Movie")) {
      document.title = `Movie | ${data.original_title}`
    } else if (pathname.includes("TVSeries")) {
      document.title = `Series | ${data.original_name}`
    } else if (pathname.includes("/home/popular")) {
      document.title = `meow`
    } else if (pathname.includes("/home/trending")) {
      document.title = `Series | ${data.original_name}`
    } else if (pathname.includes("/home/toprated")) {
      document.title = `Series | ${data.original_name}`
    }
  }, [data, pathname])

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
      if (screenWidth < 640) {
        setSearchMobile(true)
      } else {
        setSearchMobile(false)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [screenWidth])

  const onClose = () => {
    setShowSearchbar(!showSearchbar)
  }

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
          {!showSearchbar && (
            <Link to={"/home"} className="w-max flex items-center gap-2">
              <img src={nukt_logo} alt="" width={35} height={41} />
              <p className="text-white font-bold hidden md:block">Nukt</p>
            </Link>
          )}
        </div>
        {!user ? (
          ""
        ) : (
          <Searchbar
            searchMobile={searchMobile}
            showSearchbar={showSearchbar}
            onClose={onClose}
          />
        )}
        <div className="flex items-center gap-2">
          {user === null ? (
            <Link to="/login" className="bg-[#0d0d0d50] rounded-md p-[.5rem]">
              <span className="uppercase text-[.9rem]">sign in</span>
            </Link>
          ) : (
            <>
              {screenWidth < 640 && (
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className={`${
                    showSearchbar ? "hidden" : "block"
                  } cursor-pointer`}
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="w-[22px] h-[22px]"
                    onClick={() => setShowSearchbar(!showSearchbar)}
                  />
                </motion.div>
              )}
              {!showSearchbar && <AiFillBell size={30} />}
              <button
                onClick={showUserSidebar}
                className="bg-[#0d0d0d50] rounded-full border-2 border-[#ffffff70]"
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
      <FeedbackModal active={modal} />
    </>
  )
}

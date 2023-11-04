import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { Link, useLocation, useNavigate } from "react-router-dom"

export default function Searchbar({ searchMobile, showSearchbar, onClose }) {
  const [search, setSearch] = useState("")
  const location = useLocation()
  const pathname = location.pathname

  const searchStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: "6px 8px",
    borderRadius: "5px",
    outline: "none",
    color: "white",
    border: "1px solid white",
    minWidth: "300px",
  }
  const navigate = useNavigate()

  function searchEnter(e) {
    if (search !== "") {
      if (e.key === "Enter") {
        navigate(`/search?q=${search}`)
        setSearch("")
      }
    }
  }

  return (
    <div
      className={`${
        searchMobile
          ? showSearchbar
            ? "w-full origin-center duration-500 overflow-hidden"
            : "w-0 origin-center duration-500 overflow-hidden"
          : "max-w-xl"
      } flex items-center justify-center gap-2`}
    >
      <div
        className={`relative flex items-center justify-end backdrop-blur-none group`}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Movies, TV Series, and more"
          style={searchStyle}
          onKeyDown={searchEnter}
          className="w-[300px] md:w-[400px] ps-[1rem] outline-none border-0 backdrop-blur-none"
        />
        <Link
          className="text-white absolute pr-3"
          to={search !== "" ? `/search?q=${search}` : pathname}
          onClick={() => setSearch("")}
        >
          <motion.div whileHover={{ scale: 1.15 }} className="">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </motion.div>
        </Link>
      </div>
      <AiOutlineClose
        onClick={onClose}
        className={`${
          searchMobile ? "block" : "hidden"
        } cursor-pointer w-[22px] h-[22px]`}
      />
    </div>
  )
}

import { BiSearch } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"

export const Searchbar = () => {
  const [search, setSearch] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    window.location.href = `/search?q=${search}`
  }

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
        navigate(`/search/${search}`)
      }
    }
  }

  return (
    <form
      //   onSubmit={handleSubmit}
      className="relative flex items-center justify-end"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search movies and videos"
        style={searchStyle}
        onKeyDown={searchEnter}
        className="w-full ps-[1rem] outline-none border-0"
      />
      <Link
        // to={`/search?q=${search}`}
        to={search !== "" ? `/Search/${search}` : null}
        className="px-[.5rem] py-[.5rem] group-hover:bg-[#00ffff]"
      ></Link>
      <Link
        className="text-white absolute pr-7"
        to={search !== "" ? `/Search/${search}` : null}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Link>
    </form>
  )
}

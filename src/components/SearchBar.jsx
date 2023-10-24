import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Searchbar = () => {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const pathname = location.pathname;

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/search?q=${search}`;
  };

  const searchStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: "6px 8px",
    borderRadius: "5px",
    outline: "none",
    color: "white",
    border: "1px solid white",
    minWidth: "300px",
  };
  const navigate = useNavigate();

  function searchEnter(e) {
    if (search !== "") {
      if (e.key === "Enter") {
        navigate(`/search?q=${search}`);
        setSearch("");
      }
    }
  }

  return (
    // <form
    //   //   onSubmit={handleSubmit}
    //   className="relative flex items-center justify-end"
    // >
    <div className="relative flex items-center justify-end backdrop-blur-none">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Movies, TV Series, and more"
        style={searchStyle}
        onKeyDown={searchEnter}
        className="w-full ps-[1rem] outline-none border-0 backdrop-blur-none"
      />
      {/* <Link
        // to={`/search?q=${search}`}
        to={search !== "" ? `/Search/${search}` : null}
        className="px-[.5rem] py-[.5rem]"
      ></Link> */}
      <Link
        className="text-white absolute pr-3"
        to={search !== "" ? `/search?q=${search}` : pathname}
        onClick={() => setSearch("")}
      >
        <motion.div whileHover={{ scale: 1.15 }} className="">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </motion.div>
      </Link>
      {/* </form> */}
    </div>
  );
};

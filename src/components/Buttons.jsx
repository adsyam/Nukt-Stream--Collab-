import { MdKeyboardArrowDown } from "react-icons/md"
import { Link } from "react-router-dom"
import { useDataContext } from "../context/DataContext"

//create side bar buttons
export const SidebarMenu = ({ name, icon, url, index }) => {
  const { setCategory } = useDataContext()

  return (
    <Link
      to={name === "history" ? url : `${url}?q=${name}`}
      className={`font-fig basis-1 flex items-center justify-start
          cursor-pointer outline-none border-0 py-[.5rem] px-[.9rem]
          my-[.5rem] me-[1rem] rounded-full transition-all duration-300 ease-in-out group 
          bg-transparent text-white hover:bg-[#398FDD]`}
      key={index}
      onClick={() => setCategory(name)}
    >
      <span className="me-[1rem] text-[1rem] md:text-[1.2rem]">{icon}</span>
      <span className="w-max text-[1rem] md:text-[1.2rem] group-hover:text-black capitalize">
        {name}
      </span>
    </Link>
  )
}

//create the dropdown buttons
export const DropdownBtn = ({ name, icon, list, index }) => {
  const { handleDropDown, dropDown, setCategory } = useDataContext()

  return (
    <>
      <button
        className={`font-fig flex items-center justify-between outline-none border-0
        py-[.5rem] px-[.9rem] my-[.5rem] me-[1rem] rounded-full transition-all 
        duration-300 ease-in-out group bg-transparent text-white hover:bg-[#398FDD]`}
        onClick={handleDropDown}
        key={index}
      >
        <div className="flex items-center justify-start">
          <span className="me-[1rem] text-[1rem] md:text-[1.2rem]">{icon}</span>
          <span className="w-max text-[1rem] md:text-[1.2rem] group-hover:text-black capitalize">
            {name}
          </span>
        </div>
        <MdKeyboardArrowDown size={25} />
      </button>
      {dropDown ? (
        <div className="transition-all duration-300 ease-in-out">
          {list.map((item) => (
            <Link
              onClick={() => setCategory(item.category)}
              to={`${item.url}?q=${item.category}`}
              className={`w-[180px] font-fig basis-1 flex items-center justify-start gap-3
          cursor-pointer outline-none border-0 py-[.5rem] px-[.9rem]
          my-[.5rem] mx-[1rem] rounded-full transition-all duration-300 ease-in-out group 
          bg-transparent text-white hover:bg-[#398FDD]`}
            >
              <span>{icon}</span>
              <span className="group-hover:text-black capitalize">
                {item.category}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  )
}

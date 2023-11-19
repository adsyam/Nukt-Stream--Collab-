import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useDataContext } from "../../context/DataContext";

export default function SidebarMenu({ name, icon, url, index }) {
  const { modal, setModal } = useDataContext();
  const { user } = useAuthContext();

  return (
    <>
      {name === "send feedback" ? (
        <button
          onClick={() => (
            setModal(!modal), (document.body.style.overflow = "hidden")
          )}
          className={`font-fig basis-1 flex items-center justify-start
          cursor-pointer outline-none border-0 py-[.5rem] px-[.9rem]
          my-[.5rem] me-[1rem] rounded-full transition-all duration-300 ease-in-out group 
          bg-transparent text-white hover:bg-[#582d95]`}
          key={index}
        >
          <span className="me-[1rem] text-[1rem] md:text-[1.2rem]">{icon}</span>
          <span className="w-max text-[1rem] md:text-[1.2rem] group-hover:text-black capitalize">
            {name}
          </span>
        </button>
      ) : (
        <Link
          to={
            name === "history" ||
            name === "subscriptions" ||
            name === "report" ||
            name === "library"
              ? url
              : name === "downloads" || name === "playlist"
              ? `profile/${user?.uid}/${url}`
              : `${url}`
          }
          className={`font-fig basis-1 flex items-center justify-start
          cursor-pointer outline-none border-0 py-[.5rem] px-[.9rem]
          my-[.5rem] me-[1rem] rounded-full transition-all duration-300 ease-in-out group 
          bg-transparent text-white hover:bg-[#582d95]`}
          key={index}
        >
          <span className="me-[1rem] text-[1rem] md:text-[1.2rem]">{icon}</span>
          <span className="w-max text-[1rem] md:text-[1.2rem] group-hover:text-black capitalize">
            {name}
          </span>
        </Link>
      )}
    </>
  );
}

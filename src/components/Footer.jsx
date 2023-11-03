import { BsFillSendFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import { nukt_logo } from "../assets/index"
import { useDataContext } from "../context/DataContext"
import { FooterLinks1, FooterLinks2 } from "../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faFacebook, faTiktok, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { useAuthContext } from "../context/AuthContext"
import { useLocation } from "react-router-dom"

export const Footer = () => {
  const { sidebar } = useDataContext()
  const { user } = useAuthContext()
  const location = useLocation()
  const pathname = location.pathname


  return (
    <footer
      className={`w-full text-white bg-transparent font-fig px-[2rem] ${
        pathname.includes("login") || pathname.includes("signup")
          ? "absolute bottom-0 opacity-75"
          : ""
      }`}
    >
      {(!user && pathname.includes("login")) ||
      pathname.includes("signup") ? null : (
        <section
          className={`flex flex-col xl:flex-row justify-center gap-10 items-start
        xl:items-center py-[5rem] ${
          sidebar ? "relative right-[-10.2%] mr-20" : ""
        }`}
        >
          <Link
            to="/home"
            className="flex gap-3 items-center pb-[2rem] xl:pb-0"
          >
            <img src={nukt_logo} className="w-[100px]" />
            <h2 className="uppercase font-medium text-[2.5rem]">nukt</h2>
          </Link>
          <div className="w-full xl:w-[70%] flex flex-col lg:flex-row items-center">
            <div className="flex-1 flex gap-[3rem] pb-[2rem] lg:pb-0 items-center justify-center">
              <ul className="flex flex-col gap-2">
                {FooterLinks1.map((item, index) => (
                  <li
                    key={index}
                    className="capitalize text-[1.2rem] hover:text-[#7300FF]"
                  >
                    <Link>{item.name}</Link>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-2">
                {FooterLinks2.map((item, index) => (
                  <li
                    key={index}
                    className="capitalize text-[1.2rem] hover:text-[#7300FF]"
                  >
                    <Link>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="flex-1 flex flex-col md:flex-row justify-around items-start
            md:items-center gap-[2rem]"
            >
              <div className="w-full flex flex-col md:items-center gap-2">
                <h2 className="text-[1.3rem] capitalize font-bold">
                  connect with us
                </h2>
                <ul className="flex gap-4 items-center">
                  <li>
                    <Link className="hover:text-[#7300FF] hover:scale-[1.5]">
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="text-[30px]"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-[#7300FF]">
                      <FontAwesomeIcon
                        icon={faTiktok}
                        className="text-[30px]"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-[#7300FF]">
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className="text-[30px]"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-[#7300FF]">
                      <FontAwesomeIcon
                        icon={faXTwitter}
                        className="text-[30px]"
                      />
                    </Link>
                  </li>
                </ul>
                <div className="flex flex-col items-center underline">
                  <Link className="hover:text-[#7300FF]">
                    yambaoadrianne@gmail.com
                  </Link>
                  <Link className="hover:text-[#7300FF]">
                    danemaas16@gmail.com
                  </Link>
                </div>
              </div>

              <div className="w-full flex flex-col items-start gap-2">
                <h2 className="text-[1.3rem] capitalize font-bold">
                  newsletter
                </h2>
                <p>
                  Subscribe to our newsletter to get our latest update & news.
                </p>
                <form className="bg-white/10 w-full py-2 flex gap-2 items-center rounded-md">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="w-[90%] bg-transparent outline-none border-none text-white ps-2"
                  />
                  <button className="text-white pr-2">
                    <BsFillSendFill />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="text-center">
        <span className="text-[#7300FF] font-bold">Nukt</span> © Copyright-2023
        All Rights Reserved.
      </section>
    </footer>
  )
}

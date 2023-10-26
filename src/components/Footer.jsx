import { Link } from "react-router-dom";
import { nukt_logo } from "../assets/index";
import { FooterLinks1, FooterLinks2 } from "../utils";
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from "react-icons//ai";
import { BiLogoTiktok } from "react-icons/bi";
import { BsFillSendFill } from "react-icons/bs";

export const Footer = () => {
  return (
    <footer className="w-full min-h-full text-white bg-transparent font-fig px-[2rem]">
      <section
        className="flex flex-col xl:flex-row justify-around items-start
        xl:items-center py-[5rem]"
      >
        <Link to="/home" className="flex gap-3 items-center pb-[2rem]">
          <img src={nukt_logo} className="w-[60px]" />
          <h2 className="uppercase font-medium text-[2rem]">nukt</h2>
        </Link>
        <div className="w-full xl:w-[70%] flex flex-col lg:flex-row justify-around items-center">
          <div className="flex gap-[5rem] pb-[2rem]">
            <ul className="flex flex-col gap-2">
              {FooterLinks1.map((item, index) => (
                <li key={index} className="capitalize text-[1.2rem]">
                  <Link>{item.name}</Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-2">
              {FooterLinks2.map((item, index) => (
                <li key={index} className="capitalize text-[1.2rem]">
                  <Link>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="w-full flex flex-col md:flex-row justify-around items-start
            md:items-center gap-[2rem]"
          >
            <div className="flex flex-col items-start md:items-center gap-2">
              <h2 className="text-[1.3rem] capitalize font-bold">
                connect with us
              </h2>
              <ul className="flex gap-4 items-center">
                <li>
                  <Link>
                    <AiOutlineInstagram size={40} />
                  </Link>
                </li>
                <li>
                  <Link>
                    <BiLogoTiktok size={40} />
                  </Link>
                </li>
                <li>
                  <Link>
                    <AiOutlineFacebook size={40} />
                  </Link>
                </li>
                <li>
                  <Link>
                    <AiOutlineTwitter size={40} />
                  </Link>
                </li>
              </ul>
              <div className="flex flex-col underline">
                <Link>yambaoadrianne@gmail.com</Link>
                <Link>danemaas16@gmail.com</Link>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 w-[300px]">
              <h2 className="text-[1.3rem] capitalize font-bold">newsletter</h2>
              <p>
                Subscribe to out newsletter to get our latest update & news.
              </p>
              <form className="bg-white/10 w-full py-2 flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="w-[90%] bg-transparent outline-none border-none text-white ps-2"
                />
                <button className="text-white">
                  <BsFillSendFill />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="text-center">
        <span className="text-[#389FDD] font-bold">Nukt</span> © Copyright-2023
        All Rights Reserved.
      </section>
    </footer>
  );
};

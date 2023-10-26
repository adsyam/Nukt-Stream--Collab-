import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "./Footer";

const icon =
  "https://cdn3d.iconscout.com/3d/premium/thumb/report-6073861-4996978.png";

export const ReportPage = () => {
  return (
    <>
      <section className="w-full min-h-[100vh] bg-black text-white p-[2rem]">
        <div className="translate-y-[5rem] w-full flex flex-col md:flex-row justify-around items-center">
          <div className="w-full md:max-w-[50%] order-2 mb-[2rem]">
            <h2 className="text-[2rem] font-medium mb-3">
              Thanks for reporting
            </h2>
            <p className="mb-3">
              All members of the Nukt community have the option to report
              content they believe goes against our Community Guidelines. When
              content is flagged, it doesn't get immediately removed. Flagged
              content undergoes a review process, which aligns with the
              following guidelines:
            </p>
            <ol className="list-decimal ps-[2rem] mb-3 flex flex-col gap-1">
              <li>
                Content that breaches our Community Guidelines is taken down
                from Nukt.
              </li>
              <li>
                Content that might not be suitable for all younger audiences may
                be subject to age restrictions.
              </li>
              <li>
                Reports submitted for content that has already been deleted by
                its creator cannot be displayed.
              </li>
            </ol>
            <p>
              For more information on how to report content on Nukt,{" "}
              <Link className="underline text-[#389FDD]">
                please explore our resources.
              </Link>
            </p>
          </div>
          <motion.img
            initial={{
              transform: "translateZ(8px) translateY(0px)",
            }}
            animate={{ transform: "translateZ(32px) translateY(-20px)" }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 2,
              ease: "easeInOut",
            }}
            src={icon}
            alt="report icon"
            className="w-[90px] md:w-[400px] order-1"
          />
        </div>
        <hr className="translate-y-[5rem] border-white/30 mb-[2rem]" />
        <div className="translate-y-[5rem]">
          <button className="capitalize font-medium bg-white/20 p-[.5rem] rounded-lg hover:bg-[#389FDD]">
            submit a report
          </button>
          <p className="text-center">No reports have been submitted.</p>
        </div>
      </section>
      <Footer />
    </>
  );
};

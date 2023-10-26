import { Link } from "react-router-dom";
import { VideoCategories } from "./index";
import { feedCategories } from "../utils/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const VideoFeed = () => {
  return (
    <section className={`flex flex-row w-full min-h-[100vh] p-[3rem]`}>
      <div className={`w-full`}>
        {feedCategories.map((item, index) => (
          <div key={index} className="text-white pb-[3rem]">
            <div className="flex justify-between items-center mb-2">
              <p className="text-2xl text-[#00ffff] font-medium capitalize">
                {item.name}
                <span className="text-white"> videos</span>
              </p>
              <Link
                to={`/search?q=${item.name}`}
                className="cursor-pointer flex items-center gap-1"
              >
                {`See all`}
                <FontAwesomeIcon icon={faAngleRight} className="text-sm" />
              </Link>
            </div>
            <VideoCategories catergoryName={item.name} />
          </div>
        ))}
      </div>
    </section>
  );
};

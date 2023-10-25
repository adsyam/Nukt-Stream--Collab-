import { Link } from "react-router-dom";
import { VideoCategories } from "./index";
import { useDataContext } from "../context/DataContext";
import { feedCategories } from "../utils/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const VideoFeed = () => {
  const { sidebar } = useDataContext();

  return (
    <section
      className={`${
        sidebar ? "translate-x-[14rem]" : "translate-x-0"
      } flex flex-row w-full min-h-[100vh] p-[3rem]`}
    >
      <div className={`${sidebar ? "w-[87%]" : "w-full"}`}>
        {feedCategories.map((item, index) => (
          <div key={index} className="text-white pb-[3rem]">
            <div className="flex justify-between items-center mb-2">
              <p className="text-2xl text-[#00ffff] font-medium capitalize">
                {item.name}
                <span className="text-white"> videos</span>
              </p>
              <Link to={`/search?q=${item.name}`} className="cursor-pointer">
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

import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useAuthContext } from "../../context/AuthContext";
import { useDBContext } from "../../context/DBContext";

export default function VideoCard({ video, item, index }) {
  const { user } = useAuthContext();
  const { addHistoryOrLibrary } = useDBContext();
  const location = useLocation().pathname;

  const handleAddToLibrary = (e) => {
    e.preventDefault();
    try {
      addHistoryOrLibrary(
        user?.uid,
        "library",
        "videos",
        video?.id?.videoId || item?.id
      );

      alert("Successfully added to library");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(location);
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="w-[200px] md:w-[300px] h-max group/card">
      <Link
        to={
          video?.id?.videoId
            ? `/watch?v=${video?.id?.videoId}`
            : `/watch?v=${item?.id}`
        }
      >
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.07 }}
          className="w-full h-[100px] md:h-[160px] overflow-hidden rounded-md"
        >
          <motion.img
            style={{ y: -25 }}
            whileHover={{ scale: 1.05 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
            }}
            src={
              video?.snippet?.thumbnails?.high?.url ||
              item?.snippet?.thumbnails?.high?.url
            }
            alt={video?.snippet?.title || item?.snippet?.title}
            className="text-center w-[400px] -translate-y-9"
          />
        </motion.div>
      </Link>
      <div className="h-[100px] md:h-[120px] text-wrap p-[.5rem] md:p-[1rem] flex flex-col justify-start gap-2">
        <Link to={`/watch?v=${video?.id?.videoId}` || `/watch?v=${item?.id}`}>
          <p className="text-sm md:text-[1rem] font-bold">
            {video?.snippet?.title.slice(0, 40) ||
              item?.snippet?.title.slice(0, 40)}
          </p>
        </Link>
        <Link
          to={
            `/profile/${video?.snippet?.channelId}` ||
            `/profile/${item?.snippet?.channelId}`
          }
        >
          <div className="flex justify-start items-center gap-1 bg-slate-400/30 w-max px-[.4rem] rounded-md">
            <p className="text-xs md:text-[.9rem] font-semibold text-slate-300">
              {video?.snippet?.channelTitle.slice(0, 20) ||
                item?.snippet?.channelTitle.slice(0, 20)}
            </p>
          </div>
        </Link>
      </div>
      {(location === "/home" ||
        location === "/watch" ||
        location === "/search") && (
        <div
          role="button"
          onClick={(e) => handleAddToLibrary(e)}
          className="w-[30px] h-[30px] bg-black/60 rounded-md flex items-center justify-center
        cursor-pointer opacity-0 transition-all duration-200 z-[99999] translate-x-[16.5rem]
        -translate-y-[17rem] group-hover/card:opacity-100 relative group/add"
        >
          <AiOutlinePlus size={25} className="font-bold" />
          <p
            className="absolute w-max bg-black/80 p-1 rounded-md text-sm opacity-0 group-hover/add:opacity-100
          translate-x-0 group-hover/add:-translate-x-16 transition-all ease-in-out duration-300"
          >
            Add to library
          </p>
        </div>
      )}
    </div>
  );
}

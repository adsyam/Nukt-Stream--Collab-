import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const VideoCard = ({ video, item, index }) => {
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="w-[200px] md:w-[300px] h-max">
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
        <Link
          to={
            video?.id?.videoId
              ? `/watch?v=${video?.id?.videoId}`
              : `/watch?v=${item?.id}`
          }
        >
          <p className="text-sm md:text-[1rem] font-bold">
            {video?.snippet?.title.slice(0, 40) ||
              item?.snippet?.title.slice(0, 40)}
          </p>
        </Link>
        <Link
          to={
            video?.id?.videoId
              ? `/profile/${video?.snippet?.channelId}`
              : `/profile/${item?.snippet?.channelId}`
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
    </div>
  );
};

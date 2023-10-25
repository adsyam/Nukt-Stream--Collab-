import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const VideoCard = ({ video, item, index }) => {
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="w-[300px] h-max">
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
          className="w-full h-[160px] overflow-hidden rounded-md"
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
      <div className="h-[120px] text-wrap p-[1rem] flex flex-col justify-start gap-2">
        <Link to={`/watch?v=${video?.id?.videoId}` || `/watch?v=${item?.id}`}>
          <p className="text-[1rem] font-bold">
            {video?.snippet?.title.slice(0, 50) ||
              item?.snippet?.title.slice(0, 50)}
          </p>
        </Link>
        <Link
          to={
            `/channel/${video?.snippet?.channelId}` ||
            `/channel/${item?.snippet?.channelId}`
          }
        >
          <div className="flex justify-start items-center gap-1 bg-slate-400/30 w-max px-[.4rem] rounded-md">
            <p className="text-[.9rem] font-semibold text-slate-300">
              {video?.snippet?.channelTitle.slice(0, 50) ||
                item?.snippet?.channelTitle.slice(0, 50)}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

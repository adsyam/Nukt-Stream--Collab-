import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";
import { timeFormat } from "../utils/timeFormat";

const descriptionStyles = {
  WebkitLineClamp: 5,
  WebkitBoxOrient: "vertical",
  display: "-webkit-box",
  overflow: "hidden",
};

export const VideoDescriptions = ({ videoDetail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (descriptionRef.current) {
      setReadMore(
        descriptionRef.current.scrollHeight >=
          descriptionRef.current.clientHeight
      );
    }
  }, []);

  const {
    snippet: { title, channelId, channelTitle, description, publishedAt },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <>
      <h1 className="text-white text-[1.5rem] font-bold px-[1rem] pt-[1rem]">
        {title}
      </h1>
      <div className="flex flex-col gap-3 justify-between text-white px-[1rem]">
        <div className="flex justify-between">
          <Link
            to={`/profile/${channelId}`}
            className="flex items-center gap-1"
          >
            <p className="text-slate-300">{channelTitle}</p>
            <AiFillCheckCircle size=".8rem" color="gray" />
          </Link>
          <div className="flex gap-3">
            <p className="text-slate-300">
              {parseInt(viewCount).toLocaleString() || 0} views
            </p>
            <p className="text-slate-300">
              {parseInt(likeCount).toLocaleString() || 0} likes
            </p>
          </div>
        </div>
        <hr />
        <div className="bg-white/20 rounded-md p-2">
          <div>{timeFormat(publishedAt)}</div>
          <div
            ref={descriptionRef}
            style={{
              whiteSpace: "pre-line",
              ...(!isOpen ? descriptionStyles : {}),
            }}
          >
            {description}
          </div>
          {readMore && (
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "Read less" : "Read more"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

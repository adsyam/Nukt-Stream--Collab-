import { useEffect, useRef, useState } from "react"
import { AiFillCheckCircle, AiFillLike, AiOutlineLike } from "react-icons/ai"
import { Link } from "react-router-dom"
import { timeFormat } from "../../utils/timeFormat"

const descriptionStyles = {
  WebkitLineClamp: 5,
  WebkitBoxOrient: "vertical",
  display: "-webkit-box",
  overflow: "hidden",
}

export default function VideoDescriptions({ videoDetail }) {
  const [isOpen, setIsOpen] = useState(false)
  const [readMore, setReadMore] = useState(false)
  const [subscribe, setSubscribe] = useState(false)
  const [like, setLike] = useState(false)
  const descriptionRef = useRef(null)

  useEffect(() => {
    if (descriptionRef.current) {
      setReadMore(
        descriptionRef.current.scrollHeight >=
          descriptionRef.current.clientHeight
      )
    }
  }, [])

  const {
    snippet: { title, channelId, channelTitle, description, publishedAt },
    statistics: { viewCount, likeCount },
  } = videoDetail

  return (
    <>
      <h1 className="text-white text-[1.2rem] md:text-[1.5rem] font-bold px-[1rem] py-[1rem]">
        {title}
      </h1>
      <div className="flex flex-col gap-3 justify-between text-white px-[1rem]">
        <div className="flex flex-col gap-3 md:flex-row md:justify-between">
          <div className="flex gap-4">
            <Link
              to={`/profile/${channelId}`}
              className="flex items-center gap-1"
            >
              <p className="text-slate-300">{channelTitle}</p>
              <AiFillCheckCircle size=".8rem" color="gray" />
            </Link>
            <button
              onClick={() => setSubscribe(!subscribe)}
              className={`px-2 rounded-md capitalize py-2 ${
                subscribe ? "bg-[#389FDD]" : "bg-white/50"
              }`}
            >
              {!subscribe ? "subscribe" : "subscribed"}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-slate-300 border-2 py-[.45rem] px-3 rounded-md">
              {parseInt(viewCount).toLocaleString() || 0} views
            </p>
            <div className="flex gap-3 items-center border-2 py-1 px-2 rounded-md">
              <p className="text-slate-300">
                {like
                  ? (parseInt(likeCount) + 1).toLocaleString()
                  : parseInt(likeCount).toLocaleString() || 0}
              </p>
              <hr className="h-[30px] border-[1px] border-white/20" />
              {like ? (
                <div className="text-[1.5rem]">
                  <AiFillLike
                    onClick={() => setLike(!like)}
                    className="cursor-pointer"
                  />
                </div>
              ) : (
                <div className="text-[1.5rem]">
                  <AiOutlineLike
                    onClick={() => setLike(!like)}
                    className="cursor-pointer"
                  />
                </div>
              )}
            </div>
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
  )
}

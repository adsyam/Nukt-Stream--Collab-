import { Link } from "react-router-dom"

export const VideoCard = ({ video, item }) => {
  return (
    <div className="w-[300px] h-max">
      <Link
        to={
          video?.id?.videoId
            ? `/watch?v=${video?.id?.videoId}`
            : `/watch?v=${item?.id}`
        }
      >
        <div className="w-full h-[160px] overflow-hidden rounded-md">
          <img
            src={
              video?.snippet?.thumbnails?.high?.url ||
              item?.snippet?.thumbnails?.high?.url
            }
            alt={video?.snippet?.title || item?.snippet?.title}
            className="text-center w-[400px] -translate-y-7"
          />
        </div>
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
  )
}

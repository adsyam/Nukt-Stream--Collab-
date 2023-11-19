import { AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ChannelCard({ channelDetail, marginTop }) {
  return (
    <div
      className="w-[200px] md:w-full flex justify-center items-center"
      style={{ marginTop: marginTop }}
    >
      <Link
        to={`/profile/${channelDetail?.id?.channelId || channelDetail?.id}`}
      >
        <div className="flex flex-col justify-center text-center text-white w-[400px] lg:w-[300px]">
          <img
            src={channelDetail?.snippet?.thumbnails?.high?.url}
            alt={channelDetail?.snippet?.title}
            className="rounded-full w-[130px] h-[130px] md:w-[180px] md:h-[180px] mb-2 border-2 border-[#e3e3e3] mx-auto"
          />
          <div className="flex items-center justify-center gap-1 mb-1">
            <p className="text-[1rem]">{channelDetail?.snippet?.title}</p>
            <AiFillCheckCircle size=".8rem" color="gray" />
          </div>
          <div>
            {channelDetail?.statistics?.subscriberCount && (
              <p>
                {parseInt(
                  channelDetail?.statistics?.subscriberCount
                ).toLocaleString()}{" "}
                Subscribers
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

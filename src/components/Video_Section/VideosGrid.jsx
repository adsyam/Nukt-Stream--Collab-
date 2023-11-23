import useResponsive from "../../Hooks/useResponsive"
import ChannelCard from "./ChannelCard"
import VideoCard from "./VideoCard"

export default function VideosGrid({ videos }) {
  const { lgBelow, xsm, xxsm, md } = useResponsive()

  if (!videos) {
    return (
      <section className="text-white text-[1.5rem] text-center font-medium">
        Loading...
      </section>
    )
  }

  return (
    <div
      className={`text-white w-full grid ${
        lgBelow || xxsm
          ? `grid grid-cols-3 ${xsm || md ? "" : "grid-cols-2"} gap-4 mx-10`
          : "grid"
      } justify-center items-center`}
    >
      {videos.map((item, index) => (
        <div className="flex" key={index}>
          {item.id.playlistId && <VideoCard video={item} />}
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </div>
      ))}
    </div>
  )
}

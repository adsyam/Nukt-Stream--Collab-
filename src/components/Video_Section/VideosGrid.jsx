import ChannelCard from "./ChannelCard";
import VideoCard from "./VideoCard";

export default function VideosGrid({ videos }) {
  if (!videos) {
    return (
      <section className="text-white text-[1.5rem] text-center font-medium">
        Loading...
      </section>
    );
  }

  return (
    <div
      className="text-white w-full flex flex-wrap justify-center items-center
     gap-[2rem] pt-[2rem]"
    >
      {videos.map((item, index) => (
        <div className="flex" key={index}>
          {item.id.playlistId && <VideoCard video={item} />}
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </div>
      ))}
    </div>
  );
}

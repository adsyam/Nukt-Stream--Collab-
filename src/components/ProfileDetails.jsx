import { useEffect, useState } from "react"
import { ProfileNav } from "./ProfileNav"

export const ProfileDetails = ({ channelDetail }) => {
  const [isUser, setIsUser] = useState(false)

  useEffect(() => {
    if (!channelDetail.id) {
      setIsUser(true)
    } else {
      setIsUser(false)
    }
  }, [channelDetail])

  return (
    <section className="px-[2rem]">
      <div className="w-max flex flex-col  gap-2 translate-x-[18rem] -translate-y-[12rem]">
        <div>
          <h2 className="text-[1.2rem] font-medium">
            {isUser ? channelDetail.displayName : channelDetail?.snippet?.title}
          </h2>
          <p className="text-white/60">
            {isUser ? channelDetail.email : channelDetail.snippet?.customUrl}
          </p>
        </div>

        <div className="flex gap-4">
          <p>
            <span className="font-bold">
              {isUser
                ? 0
                : parseInt(
                    channelDetail?.statistics?.subscriberCount
                  ).toLocaleString()}
            </span>{" "}
            Subscribers
          </p>
          <p>
            <span className="font-bold">
              {isUser
                ? 0
                : parseInt(
                    channelDetail?.statistics?.videoCount
                  ).toLocaleString()}
            </span>{" "}
            Videos
          </p>
        </div>
      </div>
      <ProfileNav id={isUser ? channelDetail.uid : channelDetail.id} />
    </section>
  )
}

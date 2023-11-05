import { useEffect, useRef, useState } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import ChannelCard from "./ChannelCard"
import VideoCard from "./VideoCard"

export default function VideosLinear({ videos }) {
  if (!videos?.length) {
    return <section className="text-white">Loading...</section>
  }

  const TRANSLATE_AMOUNT = 300

  const [isLeftVisible, setIsLeftVisible] = useState(false)
  const [isRightVisible, setIsRightVisible] = useState(false)
  const [move, setMove] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current === null) return

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target
      if (container === null) return

      setIsLeftVisible(move > 0)
      setIsRightVisible(move + container.clientWidth < container.scrollWidth)
    })

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [move])

  return (
    <div ref={containerRef} className="w-full overflow-x-hidden relative">
      <div
        className="flex gap-[1.5rem] w-max transition-transform"
        style={{ transform: `translateX(-${move}px)` }}
      >
        {videos.map((item, index) => (
          <div className="flex" key={index}>
            {item.id.playlistId && <VideoCard video={item} index={index} />}
            {item.id.videoId && <VideoCard video={item} index={index} />}
            {item.id.channelId && (
              <ChannelCard channelDetail={item} index={index} />
            )}
          </div>
        ))}
      </div>

      {isLeftVisible && (
        <div
          className="absolute top-0 flex justify-start items-center
          bg-gradient-to-r from-[#0d0d0d] from-50% to-transparent w-24 h-full"
        >
          <button
            className="bg-white text-black p-[.1rem] rounded-full text-[2rem]"
            onClick={() => {
              setMove((move) => {
                let newTranslate = move - TRANSLATE_AMOUNT
                if (newTranslate <= 0) return 0
                return newTranslate
              })
            }}
          >
            <BiChevronLeft />
          </button>
        </div>
      )}
      {isRightVisible && (
        <div
          className="absolute top-0 flex justify-end items-center right-0
          bg-gradient-to-l from-[#0d0d0d] from-50% to-transparent w-24 h-full"
        >
          <button
            className="bg-white text-black p-[.1rem] rounded-full text-[2rem]"
            onClick={() => {
              setMove((move) => {
                if (containerRef.current === null) return move
                const edge = containerRef.current.scrollWidth
                const width = containerRef.current.clientWidth
                const newTranslate = move + TRANSLATE_AMOUNT
                if (newTranslate + width >= edge) {
                  return edge - width
                }
                return newTranslate
              })
            }}
          >
            <BiChevronRight />
          </button>
        </div>
      )}
    </div>
  )
}

import { Ripples } from "@uiball/loaders"
import { useEffect, useState } from "react"
import { useDataContext } from "../../context/DataContext"

export default function MediaFrame({ server, id }) {
  const [isLoading, setIsLoading] = useState(false)
  const { sidebar } = useDataContext()

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [id])

  return (
    <div
      className={`pb-12 ${
        sidebar
          ? "translate-x-[15rem] origin-left duration-300 justify-center w-[75vw]"
          : "origin-right duration-300 justify-center mx-24 max-lg:mx-20 maxx-sm:mx-12"
      }`}
    >
      <div
        className={`flex items-center justify-center w-full h-[56.25%] mt-20 rounded-[10px] border-[#ffffff30] border-2`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-[100%] aspect-video">
            <Ripples size={45} speed={2} color="#7300FF" />
          </div>
        ) : (
          <iframe
            title={``}
            src={server}
            frameBorder={0}
            allowFullScreen
            className="aspect-video w-full h-[100%] rounded-[10px]"
          />
        )}
      </div>
    </div>
  )
}

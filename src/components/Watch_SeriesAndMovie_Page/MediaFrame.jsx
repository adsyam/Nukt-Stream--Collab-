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
      className={`w-full`}
    >
      <div
        className={`flex items-center justify-center rounded-md border-[#ffffff30] border-2`}
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

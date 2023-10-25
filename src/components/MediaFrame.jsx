import { Ripples } from "@uiball/loaders"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

export default function MediaFrame({ server, id }) {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [id])


  return (
    <div className="flex items-center justify-center m-10 pt-1 mt-24">
      <div className="flex items-center justify-center w-screen h-[90vh] rounded-[10px] border-[#ffffff30] border-2 ">
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <Ripples size={45} speed={2} color="#398FDD" />
          </div>
        ) : (
          <iframe
            title={``}
            src={server}
            frameBorder={0}
            allowFullScreen
            className="aspect-video w-full h-full rounded-[10px]"
          />
        )}
      </div>
    </div>
  )
}

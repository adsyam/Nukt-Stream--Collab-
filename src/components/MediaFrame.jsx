import { Ripples } from "@uiball/loaders"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useDataContext } from "../context/DataContext"

export default function MediaFrame({ server, id }) {
  const [isLoading, setIsLoading] = useState(false)
  const {sidebar} = useDataContext()

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [id])


  return (
    <div
      className={`flex items-center justify-center m-10 pt-1 mt-20 ${
        sidebar
          ? "translate-x-[15rem] origin-left duration-300 w-[80%]"
          : "origin-right duration-300"
      }`}
    >
      <div className="flex items-center justify-center w-[90vw] h-[85vh] rounded-[10px] border-[#ffffff30] border-2 ">
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <Ripples size={45} speed={2} color="#7300FF" />
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

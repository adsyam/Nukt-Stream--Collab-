//import context
import { useDataContext } from "../context/DataContext"
//import components
import { VideosGrid } from "./VideosGrid"
import { VideosLinear } from "./VideosLinear"
//import custom hook fetch
import { useFetchVideoDetails } from "../hooks/customHooks"

export const VideoCategories = ({ catergoryName }) => {
  const { location } = useDataContext()

  return (
    <>
      {location === "/search" ? (
        <VideosGrid videos={useFetchVideoDetails(catergoryName)} />
      ) : (
        <VideosLinear videos={useFetchVideoDetails(catergoryName)} />
      )}
    </>
  )
}

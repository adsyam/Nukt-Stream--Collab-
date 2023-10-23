import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Player } from "@lottiefiles/react-lottie-player"
import { loader_Geometric } from "../assets"

import {
  EpisodeList,
  Footer,
  MediaDetails,
  MediaFrame,
  MediaReviews,
  Navbar,
  ServerList,
} from "../components"

export default function WatchTVSeries() {
  const { id, season, episode } = useParams()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [id])

  return (
    <>
      {/* <Navbar /> */}
      <MediaFrame id={id} Season={season} Episode={episode} />
      {!loading ? (
        <>
          <div className="flex mx-24 justify-center gap-4">
            <EpisodeList id={id} Season={season} />
            <ServerList id={id} Season={season} />
            <MediaDetails id={id} Season={season} Episode={episode} />
          </div>
          <MediaReviews id={id} />
          <Footer />
        </>
      ) : (
        <Player
          autoplay
          loop
          src={loader_Geometric}
          className="h-[35vh] flex items-center justify-center"
        ></Player>
      )}
    </>
  )
}

import { useParams } from "react-router"
import { MediaDetails, MediaFrame, MediaReviews, Footer, Navbar } from "../components"
// import Footer from "../components/Footer"
// import Navbar from "../components/Navbar"

export default function WatchMovie() {
  const { id, season, episode } = useParams()

  return (
    <>
      {/* <Navbar /> */}
      <MediaFrame id={id} Season={season} Episode={episode} />
      <div className="mx-20">
        <MediaDetails id={id} />
      </div>
      <MediaReviews id={id} />
      <Footer />
    </>
  )
}

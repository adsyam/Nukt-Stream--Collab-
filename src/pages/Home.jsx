import {
  Carousel,
  Footer,
  Popular,
  TopRated,
  Trending,
  VideoFeed,
} from "../components"
import { useDataContext } from "../context/DataContext"

// import PopularMovie from "../components/Popular"

export default function Home() {
  const { sidebar } = useDataContext()
  return (
    <div className="overflow-x-hidden">
      <Carousel />
      <div>
        <div
          className={`${
            sidebar
              ? "translate-x-[10rem] origin-left duration-300 w-[95%]"
              : "w-full origin-right duration-300"
          }`}
        >
          <Popular />
          <Trending />
          <TopRated />
        </div>
        <VideoFeed />
      </div>
      <Footer />
    </div>
  )
}

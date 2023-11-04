import {
  Carousel,
  Footer,
  Popular,
  TopRated,
  Trending,
  VideoFeed,
} from "../components"

// import PopularMovie from "../components/Popular"

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Carousel />
      <div>
        <Popular />
        <Trending />
        <TopRated />
        <VideoFeed />
      </div>
      <Footer />
    </div>
  )
}

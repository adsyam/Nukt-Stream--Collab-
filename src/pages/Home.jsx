import {
  Carousel,
  Popular,
  Trending,
  TopRated,
  Footer,
  VideoFeed,
} from "../components"

// import PopularMovie from "../components/Popular"

export default function Home() {
  return (
    <>
      <Carousel />
      <div>
        <Popular />
        <Trending />
        <TopRated />
        <VideoFeed />
      </div>
      <Footer />
    </>
  )
}

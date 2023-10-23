import {
  Navbar,
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
      {/* <Navbar /> */}
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

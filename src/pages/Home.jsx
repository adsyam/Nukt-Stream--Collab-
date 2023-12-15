import { useEffect } from "react"
import {
  Carousel,
  Footer,
  Popular,
  TopRated,
  Trending,
  VideoFeed,
} from "../components"
import { useAuthContext } from "../context/AuthContext"
import { useDBContext } from "../context/DBContext"
import { useDataContext } from "../context/DataContext"
// import PopularMovie from "../components/Popular"

export default function Home() {
  const { sidebar } = useDataContext()
  const { user } = useAuthContext()
  const { addUser } = useDBContext()

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 1000)
  }, [])

  useEffect(() => {
    const addUserData = async () => {
      try {
        if (user?.providerData[0].providerId === "google.com") {
          await addUser(
            user?.uid,
            user?.displayName,
            user?.auth?.currentUser?.providerData[0]?.email
          )
        } else {
          await addUser(user?.uid)
        }
      } catch (err) {
        console.log("[HOME]Error adding user data: ", err)
      }
    }

    addUserData()
  }, [])

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

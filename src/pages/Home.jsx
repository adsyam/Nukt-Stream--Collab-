import { useEffect } from "react";
import {
  Carousel,
  Footer,
  Popular,
  TopRated,
  Trending,
  VideoFeed,
} from "../components";
import { useDataContext } from "../context/DataContext";
import { useAuthContext } from "../context/AuthContext";
import { useDBContext } from "../context/DBContext";
// import PopularMovie from "../components/Popular"

export default function Home() {
  const { sidebar } = useDataContext();
  const { user } = useAuthContext();
  const { addUser } = useDBContext();

  useEffect(() => {
    const addUserData = async () => {
      if (user?.providerData[0].providerId === "google.com") {
        await addUser(user?.uid, user?.displayName);
      } else {
        await addUser(user?.uid);
      }
    };

    addUserData();
  }, []);

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
  );
}

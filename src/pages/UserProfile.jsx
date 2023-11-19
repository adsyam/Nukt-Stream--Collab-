import { useEffect, useReducer, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useFetchChannelDetails } from "../Hooks/customHooks";
import { CoverPhoto, ProfileDetails, ProfilePic } from "../components";
import { useAuthContext } from "../context/AuthContext";
import { useDataContext } from "../context/DataContext";
import { useDBContext } from "../context/DBContext";

export default function UserProfile() {
  const { id } = useParams();
  const location = useLocation().pathname;
  const { channelDetail } = useFetchChannelDetails(id);
  const { user } = useAuthContext();
  const { sidebar } = useDataContext();
  const { getUserData } = useDBContext();
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(true);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (channelDetail) {
        setDetail(channelDetail);
        setIsUser(false);
        setLoading(false);
      } else {
        getUserData(id).then((res) => setDetail(res));
        setIsUser(true);
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [id, channelDetail, user, location]);

  return (
    <section
      className={`min-h-[100vh] bg-[#0d0d0d] text-white ${
        sidebar
          ? "translate-x-[14rem] origin-left duration-300 w-[88%]"
          : "w-full origin-right duration-300"
      }`}
    >
      {loading ? (
        "Loading..."
      ) : (
        <>
          <CoverPhoto isUser={isUser} />
          <ProfilePic
            image={detail?.snippet?.thumbnails?.high?.url}
            isUser={isUser}
          />
          <ProfileDetails channelDetail={detail} id={id} />
          <Outlet />
        </>
      )}
    </section>
  );
}

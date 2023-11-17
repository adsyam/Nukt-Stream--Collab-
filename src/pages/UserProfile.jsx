import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useFetchChannelDetails } from "../Hooks/customHooks";
import { CoverPhoto, ProfileDetails, ProfilePic } from "../components";
import { useAuthContext } from "../context/AuthContext";
import { useDataContext } from "../context/DataContext";

export default function UserProfile() {
  const { id } = useParams();
  const { channelDetail } = useFetchChannelDetails(id);
  const { user } = useAuthContext();
  const { sidebar } = useDataContext();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    if (channelDetail) {
      setDetail(channelDetail);
      setLoading(false);
    } else {
      setDetail(user);
      setLoading(false);
    }
  }, [id, channelDetail, user]);

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
          <CoverPhoto />
          <ProfilePic
            image={
              channelDetail?.snippet?.thumbnails?.high?.url || user.photoURL
            }
          />
          <ProfileDetails channelDetail={detail} />
          <Outlet />
        </>
      )}
    </section>
  );
}

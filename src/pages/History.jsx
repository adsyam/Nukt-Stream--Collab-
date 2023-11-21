import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { doc, onSnapshot } from "firebase/firestore";

import { MovieHistory, SeriesHistory, VideoHistory } from "../components/index";
import { useDataContext } from "../context/DataContext";
import { useDBContext } from "../context/DBContext";
import { useAuthContext } from "../context/AuthContext";
import { textDB } from "../config/firebase";

export default function History() {
  const [reload, setReload] = useState(false);
  const [historyToggle, setHistoryToggle] = useState(true);
  const location = useLocation().pathname.split("/")[2];
  const { sidebar } = useDataContext();
  const { clearHistoryOrLibrary, switchHistory } = useDBContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(textDB, "Users", user.uid), (doc) =>
      setHistoryToggle(doc.data().storeHistory)
    );
  }, []);

  //clear the data of localStorage
  const handleClear = () => {
    clearHistoryOrLibrary(user.uid, location);
    setReload(true); //update reload value to rerender the component
  };

  const handleSwitch = () => {
    switchHistory(user.uid);
  };

  return (
    <section
      className={`min-h-[100vh] bg-[#0d0d0d] text-white px-[3rem] ${
        sidebar
          ? "translate-x-[14rem] origin-left duration-300 w-[89%]"
          : "w-full origin-right duration-300"
      }`}
    >
      <div className="w-full flex justify-between items-center translate-y-[8rem]">
        <h1 className="text-[1.2rem] md:text-[1.5rem] font-medium">
          History Feed
        </h1>
        <div className="flex gap-3 items-center">
          <button
            onClick={handleSwitch}
            className="capitalize font-medium bg-white/20 p-[.4rem] md:p-[.5rem] rounded-lg hover:bg-[#7300FF]
            text-sm md:text-normal"
          >
            History: {historyToggle ? "On" : "Off"}
          </button>
          <button
            onClick={handleClear}
            className="capitalize font-medium bg-white/20 p-[.4rem] md:p-[.5rem] rounded-lg hover:bg-[#7300FF]
            text-sm md:text-normal"
          >
            clear history
          </button>
        </div>
      </div>
      <hr className="border-white/20 translate-y-[10rem]" />
      <div className="translate-y-[12rem] flex items-center gap-[2rem] mb-[2rem]">
        <MovieHistory reload={reload} />
      </div>
      <div className="translate-y-[12rem] flex items-center gap-[2rem] mb-[2rem]">
        <SeriesHistory reload={reload} />
      </div>
      <div className="translate-y-[12rem] flex items-center gap-[2rem] mb-[2rem]">
        <VideoHistory reload={reload} />
      </div>
    </section>
  );
}

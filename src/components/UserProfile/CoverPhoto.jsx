import { useEffect, useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { getDownloadURL, listAll, ref } from "firebase/storage";

import { useDBContext } from "../../context/DBContext";
import { useAuthContext } from "../../context/AuthContext";
import { fileDB } from "../../config/firebase";
import { useParams } from "react-router";

export default function CoverPhoto({ isUser }) {
  const { id } = useParams();
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [reload, setReload] = useState(false);
  const { user } = useAuthContext();
  const { addImage } = useDBContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReload(!reload);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [reload]);

  useEffect(() => {
    const listRef = ref(fileDB, `${id}/coverImage/`);
    listAll(listRef).then((response) => {
      getDownloadURL(response.items[0]).then((url) => {
        setImage(url);
      });
    });
  }, [reload, image]);

  const handleImageUpload = () => {
    inputRef.current.click();
  };

  const handleChange = (input) => {
    if (input !== null) {
      addImage(user?.uid, "coverImage", input);
      setTimeout(() => {
        setReload(!reload);
      }, 1000);
    }
  };

  return (
    <div className="w-full relative">
      <img
        src={
          isUser
            ? image || "https://source.unsplash.com/random/landscape?sunset"
            : `https://source.unsplash.com/random/landscape?sunset`
        }
        alt=""
        className="w-full h-[60vh] object-cover"
      />
      {id === user?.uid && (
        <div
          role="button"
          onClick={handleImageUpload}
          className="absolute right-5 bottom-5 flex gap-2 items-center bg-[#0d0d0d50] p-[.3rem] rounded-md cursor-pointer
         hover:bg-white hover:text-black duration-300"
        >
          <AiOutlineCamera size={30} />{" "}
          <span className="capitalize hidden md:block">
            change your cover photo
          </span>
          <input
            type="file"
            ref={inputRef}
            onChange={(e) => handleChange(e.target.files[0])}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}

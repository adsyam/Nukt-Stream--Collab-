import { useEffect, useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { getDownloadURL, listAll, ref } from "firebase/storage";

import { useDBContext } from "../../context/DBContext";
import { useAuthContext } from "../../context/AuthContext";
import { fileDB } from "../../config/firebase";

export default function CoverPhoto() {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);

  const { user } = useAuthContext();
  const { addCoverImage } = useDBContext();

  const handleImageUpload = () => {
    inputRef.current.click();
  };

  const handleChange = (input) => {
    if (input !== null) {
      addCoverImage(user?.uid, input);
    }
  };

  useEffect(() => {
    const listRef = ref(fileDB, `${user?.uid}/coverImage/`);
    listAll(listRef).then((response) => {
      getDownloadURL(response.items[0]).then((url) => {
        setImage(url);
      });
    });
  }, []);

  return (
    <div className="w-full relative">
      <img
        src={image || `https://source.unsplash.com/random/landscape?sunset`}
        alt=""
        className="w-full h-[60vh] object-cover"
      />
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
    </div>
  );
}

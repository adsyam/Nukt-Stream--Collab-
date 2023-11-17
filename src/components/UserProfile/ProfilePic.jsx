import { AiOutlineCamera } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";

import { useAuthContext } from "../../context/AuthContext";
import { useDBContext } from "../../context/DBContext";
import { fileDB } from "../../config/firebase";

export default function ProfilePic({ image }) {
  const inputRef = useRef(null);
  const { user } = useAuthContext();
  const { addProfilePic } = useDBContext();

  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = () => {
    inputRef.current.click();
  };

  const handleChange = (input) => {
    if (input !== null) {
      addProfilePic(user?.uid, input);
    }
  };

  useEffect(() => {
    const listRef = ref(fileDB, `${user?.uid}/profilePic/`)
    listAll(listRef).then((response) => {
      getDownloadURL(response.items[0]).then((url) => {
        setImageUrl(url)
      })
    })
  }, [user?.uid])

  return (
    <div
      className="rounded-full w-[130px] h-[130px] md:w-[13rem] md:h-[13rem] border-2 
      border-white relative translate-x-[3rem] -translate-y-[3rem] md:-translate-y-[7rem]"
    >
      <img
        src={imageUrl || image || "../../assets/profile-placeholder.svg"}
        alt="user profile pic"
        className="object-cover w-full h-full rounded-full"
      />
      <div
        role="button"
        onClick={handleImageUpload}
        className="absolute -right-2 md:right-0 bottom-0 md:bottom-5 bg-[#0d0d0d]/50 p-[.3rem] rounded-full cursor-pointer
         hover:bg-white hover:text-black duration-300"
      >
        <AiOutlineCamera size={30} />
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => handleChange(e.target.files[0])}
        />
      </div>
    </div>
  );
}

import { bg_url } from "../utils/index";
import { AiOutlineCamera } from "react-icons/ai";

export const CoverPhoto = () => {
  return (
    <div className="w-full relative">
      <img src={bg_url} alt="" className="w-full max-h-[500px]" />
      <div
        className="absolute right-5 bottom-5 flex gap-2 items-center bg-black/50 p-[.3rem] rounded-md cursor-pointer
         hover:bg-white hover:text-black duration-300"
      >
        <AiOutlineCamera size={30} />{" "}
        <span className="capitalize hidden md:block">
          change your cover photo
        </span>
      </div>
    </div>
  );
};

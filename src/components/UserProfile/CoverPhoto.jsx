import { AiOutlineCamera } from "react-icons/ai"
import { bg_url } from "../../utils/index"

export default function CoverPhoto() {
  return (
    <div className="w-full relative">
      <img
        src={`https://source.unsplash.com/random/landscape?sunset`}
        alt=""
        className="w-full h-[60vh] object-cover"
      />
      <div
        className="absolute right-5 bottom-5 flex gap-2 items-center bg-[#0d0d0d50] p-[.3rem] rounded-md cursor-pointer
         hover:bg-white hover:text-black duration-300"
      >
        <AiOutlineCamera size={30} />{" "}
        <span className="capitalize hidden md:block">
          change your cover photo
        </span>
      </div>
    </div>
  )
}

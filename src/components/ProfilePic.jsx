import { AiOutlineCamera } from "react-icons/ai";

export const ProfilePic = ({ image }) => {
  return (
    <div
      className="rounded-full w-max border-2 border-white relative translate-x-[3rem]
      -translate-y-[3rem] md:-translate-y-[7rem]"
    >
      <img
        src={image || "https://i.pravatar.cc/52"}
        alt="user profile pic"
        className="rounded-full w-[100px] md:w-52"
      />
      <div
        className="absolute -right-2 md:right-0 bottom-0 md:bottom-5 bg-black/50 p-[.3rem] rounded-full cursor-pointer
         hover:bg-white hover:text-black duration-300"
      >
        <AiOutlineCamera size={30} />
      </div>
    </div>
  );
};

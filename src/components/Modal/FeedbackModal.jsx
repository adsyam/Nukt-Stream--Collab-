// import { faStar } from "@fortawesome/free-regular-svg-icons"
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { nukt_logo } from "../../assets";
import { useDataContext } from "../../context/DataContext";
import { useAuthContext } from "../../context/AuthContext";
import { useDBContext } from "../../context/DBContext";

export default function FeedbackModal({ active }) {
  const { modal, setModal } = useDataContext();
  const { user } = useAuthContext();
  const { addUserFeedback } = useDBContext();

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [hover, setHover] = useState(null);
  const [sendFeedback, setSendFeedback] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    addUserFeedback(user?.uid, user?.displayName, feedback, rating);
    setSendFeedback(true);
  };

  const toggleCloseModal = () => {
    setModal(!modal);
    setSendFeedback(false);
    setRating(0);
    document.body.style.overflow = "auto";
  };

  return (
    <section
      className={`${
        active ? "block" : "hidden overflow-auto"
      } fixed top-0 left-0 z-[100] text-black bg-[#0d0d0d10] backdrop-blur-[2px]
        w-full h-full grid place-items-center`}
    >
      {!sendFeedback ? (
        <div className="bg-[#ffffff90] min-w-[400px] p-[1.5rem] flex flex-col gap-5 rounded-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={nukt_logo} className="w-[50px]" />
              <h2 className="capitalize font-semibold">
                send a feedback to us
              </h2>
            </div>
            <button
              onClick={() => (
                setModal(!modal), (document.body.style.overflow = "auto")
              )}
            >
              <AiOutlineClose size={25} />
            </button>
          </div>
          <div>
            <p className="capitalize">how was your experience?</p>
            {[...Array(5)].map((icon, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className="text-md cursor-pointer"
                color={index + 1 <= (hover || rating) ? "#7300FF" : ""}
                onMouseEnter={() => setHover(index + 1)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setRating(index + 1)}
              />
            ))}
          </div>
          <form className="flex flex-col gap-2">
            <p className="capitalize">additional comments or suggestions</p>
            <div>
              <textarea
                cols="40"
                rows="10"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="resize-none text-black px-1 rounded-md w-full"
              ></textarea>
              <p className="text-sm text-white/50">
                **do not include any sensitive information
              </p>
            </div>
            <button
              onClick={(e) => handleSubmit(e)}
              className="capitalize border-2 py-1 hover:border-[#ffffff90] hover:bg-[#ffffff90]
              rounded-md mt-[2rem]"
            >
              SUBMIT
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-[#ffffff90] min-w-[400px] p-[1.5rem] flex flex-col gap-[2rem] rounded-md">
          <img src={nukt_logo} className="w-[50px]" />
          <p className="text-[1.3rem] text-center">Thanks for the feedback!!</p>
          <button
            onClick={toggleCloseModal}
            className="capitalize border-2 py-1 hover:border-[#ffffff90] hover:bg-[#ffffff90]
              rounded-md mt-[2rem]"
          >
            back to home page
          </button>
        </div>
      )}
    </section>
  );
}

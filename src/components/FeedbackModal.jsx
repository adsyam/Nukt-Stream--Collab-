import { faStar } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { nukt_logo } from "../assets"
import { useDataContext } from "../context/DataContext"

export const FeedbackModal = ({ active }) => {
  const { modal, setModal } = useDataContext()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(null)

  return (
    <section
      className={`${
        active ? "block overflow-hidden" : "hidden overflow-auto"
      } absolute top-0 left-0 z-[100] text-white bg-black/10 backdrop-blur-[2px]
        w-full h-full grid place-items-center`}
    >
      <div className="bg-black max-w-[400px] p-[1.5rem] flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={nukt_logo} className="w-[50px]" />
            <h2 className="capitalize">send a feedback to us</h2>
          </div>
          <button onClick={() => setModal(!modal)}>
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
              color={index + 1 <= (hover || rating) ? "#389FDD" : ""}
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
              className="resize-none text-black px-1"
            ></textarea>
            <p className="text-sm text-white/50">
              **do not include any sensitive information
            </p>
          </div>
          <button
            className="capitalize border-2 py-1 hover:border-[#389FDD] hover:bg-[#389FDD]
            rounded-md mt-[2rem]"
          >
            submit
          </button>
        </form>
      </div>
    </section>
  )
}

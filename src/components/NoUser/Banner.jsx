import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useSnapshot } from "valtio"
import { user } from "../../StateStore"
import { nukt_logo } from "../../assets"
import { isValidEmail } from "../../utils/Authentication"

export default function Banner() {
  const [isEmpty, setIsEmpty] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const navigate = useNavigate()
  const userSnap = useSnapshot(user)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userSnap.email === "") return setIsEmpty(true)

    if (!isValidEmail(userSnap.email)) return setIsValid(true)

    return navigate("/signup")
  }

  return (
    <header className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center n">
        <div className="flex gap-2 items-center">
          <img src={nukt_logo} alt="" width="60px" />
          <h1 className="text-[2rem] text-center font-bold">NUKT</h1>
        </div>

        <p className="text-[1.5rem] text-center font-semibold">
          Discover blockbuster movies, series and exciting video content
        </p>
        <p className="text-[1.2rem] mb-3 text-center">
          Get Started with Streaming – Sign Up and Dive into Endless
          Entertainment!
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-[80%] flex flex-col md:flex-row justify-center items-center gap-2"
        >
          <div className="w-full group relative">
            <input
              type="text"
              value={userSnap.email}
              onChange={(e) => (user.email = e.target.value)}
              className="w-full outline-none border-2 border-[#ffffff70] p-4 rounded-md text-[#389FDD] font-semibold bg-transparent"
            />
            <label
              className={`text-[1.2rem] ml-2 absolute left-[10px] text-[#ffffff]
              transition-all duration-300 pointer-events-none leading-[1rem]
              ${
                userSnap.email ? "-top-[2px] text-xs" : "top-[17px]"
              } group-focus-within:-top-[2px] group-focus-within:text-xs bg-transparent mt-1`}
            >
              Enter your email
            </label>
            <p
              className={`text-red-500 text-[.8rem] font-bold italic absolute ${
                isEmpty || isValid ? "block" : "hidden"
              }`}
            >
              {`Please input a valid email`}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 3 }}
            transition={{ duration: 0.1 }}
            className="bg-transparent border-2 border-[#ffffff70] uppercase font-semibold
            py-4 px-[1rem] rounded-md hover:bg-[#ffffff30]
            transition-all duration-300 whitespace-nowrap tracking-[2px]"
          >
            sign up
          </motion.button>
        </form>
      </div>
    </header>
  )
}

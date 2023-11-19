import { sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useSnapshot } from "valtio"
import { user } from "../StateStore"
import { auth } from "../config/firebase"
import { Footer } from "../components"

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const userSnap = useSnapshot(user)

  const resetPassword = async () => {
    try {
      setLoading(true)
      await sendPasswordResetEmail(auth, userSnap.email)
      setMessage("Check your inbox for further instructions")
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <section className="w-full flex justify-center items-center bg-hero-pattern bg-no-repeat bg-cover relative">
      <div
        className="text-white items-center bg-[#0d0d0d]/60 backdrop-blur-sm w-full h-screen relative
        flex flex-col gap-[15rem]"
      >
        <div
          className="text-white ring-0 p-[2rem] rounded-md
          flex flex-col gap-2 justify-center items-center font-fig max-w-[350px] w-full h-screen"
        >
          <h1 className="font-bold text-[1.8rem] text-center">
            FORGOT PASSWORD
          </h1>
          <span className="text-center text-[1.2rem] font-medium">
            {message}
          </span>
          <input
            type="text"
            value={userSnap.email}
            onChange={(e) => (user.email = e.target.value)}
            placeholder="Enter your email"
            className="w-full outline-none border-2 border-[#D9D9D990] p-2 rounded-md bg-slate-50/10"
          />
          <button
            onClick={resetPassword}
            className="bg-transparent mb-[1rem] border-2 border-[#D9D9D990] uppercase
            py-[.5rem] px-[1.5rem] rounded-md hover:bg-[#D9D9D920]
            transition-all duration-300 w-full"
          >
            {loading ? "Reseting Password..." : "Reset Password"}
          </button>
          <Link
            to="/login"
            className="underline text-[#7300FF]"
          >
            GO BACK
          </Link>
        </div>
        <Footer />
      </div>
    </section>
  )
}

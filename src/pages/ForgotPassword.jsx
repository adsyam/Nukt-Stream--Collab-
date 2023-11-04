import { sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useSnapshot } from "valtio"
import { user } from "../StateStore"
import { auth } from "../config/firebase"

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
    <div className="flex flex-col gap-5 w-[400px] border-2 px-[2rem] py-[4rem]">
      <span className="text-center text-[1.2rem] font-medium">{message}</span>
      <input
        type="text"
        value={userSnap.email}
        onChange={(e) => (user.email = e.target.value)}
        placeholder="Enter your email"
        className="w-full py-[.5rem] ps-[1rem] rounded-md text-black"
      />
      <button
        onClick={resetPassword}
        className="bg-transparent border-2 border-white py-[.5rem]
        rounded-md hover:bg-[#389FDD] hover:border-[#389FDD]"
      >
        {loading ? "Reseting Password..." : "Reset Password"}
      </button>

      <Link to="/login" className="text-center uppercase underline">
        login
      </Link>
    </div>
  )
}

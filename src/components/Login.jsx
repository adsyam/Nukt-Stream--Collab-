import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import { Footer } from "./index"

export const Login = () => {
  const navigate = useNavigate()
  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
    remember: false,
  })
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const { signInUser, signInWithGoogle } = useAuthContext()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    const newValue = type === "checkbox" ? checked : value

    setLoginDetail({
      ...loginDetail,
      [name]: newValue,
    })
  }

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.log(error)
    }
    return navigate("/home")
  }

  const handleSignIn = async () => {
    try {
      setLoading(true)
      await signInUser(loginDetail.email, loginDetail.password)
      return navigate("/home")
    } catch (error) {
      setErrorMsg(error.code)
      console.log(error)
    }
    setLoading(false)
  }
  return (
    <section className="w-full flex justify-center items-center relative bg-hero-pattern bg-no-repeat bg-cover">
      <div
        className="text-white items-center bg-black/60 backdrop-blur-sm w-full h-screen relative
        flex flex-col gap-[15rem] pt-20"
      >
        <div
          className="text-white ring-0 p-[2rem] rounded-md
          flex flex-col gap-2 justify-center items-center font-fig max-w-[350px] w-full"
        >
          <h2 className="font-bold text-[1.8rem] mb-[0.2rem]">SIGN IN</h2>
          {errorMsg && (
            <div
              className="text-red-500 bg-red-500/30 border-[1px] border-red-500 font-medium
          py-[.5rem] px-[1rem] rounded-md mb-[1rem]"
            >
              {errorMsg}
            </div>
          )}
          <div className="relative w-full">
            <label className="pl-2 opacity-90 font-thin">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginDetail.email}
              onChange={handleChange}
              className="w-full outline-none border-2 border-[#D9D9D990] p-2 rounded-md bg-slate-50/10"
            />
            <p className="text-red-500 text-[.8rem] font-extralight italic hidden">
              Please input a valid email
            </p>
          </div>
          <div className="relative w-full">
            <label className="pl-2 opacity-90 font-thin">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginDetail.password}
              onChange={handleChange}
              className="w-full outline-none border-2 border-[#D9D9D990] p-2 rounded-md bg-slate-50/10"
            />
            <p className="text-red-500 text-[.8rem] font-extralight italic hidden">
              Password must be 8 to 40 characters
            </p>
          </div>
          <div className="w-full flex justify-between items-baseline mb-[1rem] px-1">
            <div className="flex justify-center items-center gap-1">
              <input
                type="checkbox"
                name="remember"
                className="cursor-pointer w-3"
                value={loginDetail.remember}
                onClick={handleChange}
              />
              <label className="text-[.9rem]">remember me</label>
            </div>
            <Link
              to="/login/forgot-password"
              className="text-[.8rem] underline text-[#389FDD]"
            >
              forgot password?
            </Link>
          </div>
          <button
            disabled={loading}
            onClick={handleSignIn}
            className="bg-transparent mb-[1rem] border-2 border-[#D9D9D990] uppercase
            py-[.5rem] px-[1.5rem] rounded-md hover:bg-[#D9D9D920]
            transition-all duration-300 w-full"
          >
            {loading ? "signing in..." : "sign in"}
          </button>
          <div className="w-full relative">
            <span
              className="absolute w-max text-center px-[.2rem]
          translate-x-[9rem] -translate-y-[.7rem]"
            >
              or
            </span>
            <hr className="border-[1px] border-black w-full" />
          </div>

          <button
            onClick={handleSignInWithGoogle}
            className="flex items-center gap-2 uppercase mb-[1rem]"
          >
            Sign In using <FcGoogle />
          </button>
          <p>
            New in Nukt?{" "}
            <Link to="/signup" className="underline text-[#389FDD]">
              Sign up
            </Link>{" "}
            now
          </p>
        </div>
        <Footer />
      </div>
    </section>
  )
}

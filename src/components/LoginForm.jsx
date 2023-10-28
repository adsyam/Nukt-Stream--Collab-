import { useNavigate } from "react-router"
import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"

export const LoginForm = () => {
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
    <div
      className="bg-white text-[#389FDD] p-[2rem] rounded-md
          flex flex-col gap-3 justify-center items-center font-fig max-w-[350px] w-full"
    >
      <h2 className="uppercase font-bold text-[1.8rem] mb-[1rem]">sign in</h2>
      {errorMsg && (
        <div
          className="text-red-500 bg-red-500/30 border-[1px] border-red-500 font-medium
          py-[.5rem] px-[1rem] rounded-md mb-[1rem]"
        >
          {errorMsg}
        </div>
      )}
      <div className="group relative w-full mb-[1rem]">
        <input
          type="email"
          name="email"
          value={loginDetail.email}
          onChange={handleChange}
          className="w-full outline-none border-2 border-[#389FDD] p-2 rounded-md"
        />
        <label
          className={`capitalize text-[1.2rem] absolute left-[10px] text-[#389FDD]
              transition-all duration-300 pointer-events-none leading-[1rem]
              ${
                loginDetail.email ? "-top-[7px] bg-white" : "top-[15px]"
              } group-focus-within:-top-[7px]
              group-focus-within:bg-white`}
        >
          email
        </label>
        <p className="text-red-500 text-[.8rem] font-extralight italic hidden">
          Please input a valid email
        </p>
      </div>
      <div className="group relative w-full mb-[1rem]">
        <input
          type="password"
          name="password"
          value={loginDetail.password}
          onChange={handleChange}
          className="w-full outline-none border-2 border-[#389FDD] p-2 rounded-md"
        />
        <label
          className={`capitalize text-[1.2rem] absolute left-[10px] text-[#389FDD]
              transition-all duration-300 pointer-events-none leading-[1rem]
              ${
                loginDetail.password ? "-top-[7px] bg-white" : "top-[15px]"
              } group-focus-within:-top-[7px]
              group-focus-within:bg-white`}
        >
          password
        </label>
        <p className="text-red-500 text-[.8rem] font-extralight italic hidden">
          Password must be 8 to 40 characters
        </p>
      </div>
      <div className="group w-full flex justify-between items-baseline mb-[1rem]">
        <div className="flex justify-center items-center gap-1">
          <input
            type="checkbox"
            name="remember"
            className="cursor-pointer"
            value={loginDetail.remember}
            onClick={handleChange}
          />
          <label className="">remember me</label>
        </div>
        <Link to="/login/forgot-password" className="text-[.8rem] underline">
          forgot password?
        </Link>
      </div>
      <button
        disabled={loading}
        onClick={handleSignIn}
        className="bg-transparent mb-[1rem] border-2 border-[#389FDD] uppercase font-semibold
            py-[.5rem] px-[1.5rem] rounded-full hover:bg-[#389FDD] hover:text-black
            transition-all duration-300"
      >
        {loading ? "signing in..." : "sign in"}
      </button>
      <div className="w-full relative">
        <span
          className="absolute w-max text-center bg-white px-[.2rem]
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
        <Link to="/signup" className="underline">
          Sign up
        </Link>{" "}
        now
      </p>
    </div>
  )
}

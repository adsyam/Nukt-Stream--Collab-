import { useAuthContext } from "../context/AuthContext"
import { useSnapshot } from "valtio"
import { useState } from "react"
import { useNavigate } from "react-router"
import {user} from '../StateStore'
import { Link } from "react-router-dom"

export const SignUpForm = () => {
  const createUser = useAuthContext()

  const userSnap = useSnapshot(user)
  const [firstName, setFirstName] = useState({
    input: "",
    isEmpty: false,
  })
  const [lastName, setLastName] = useState({
    input: "",
    isEmpty: false,
  })
  const [error, setError] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validateInput = async (e) => {
    e.preventDefault()
    if (firstName.input === "" || lastName.input === "") {
      setFirstName({
        input: firstName.input,
        isEmpty: true,
      })
      setLastName({
        input: lastName.input,
        isEmpty: true,
      })
    }

    if (userSnap.password !== userSnap.confirm) {
      setError(true)
    } else {
      setError(false)
    }

    try {
      setLoading(true)
      await createUser(userSnap.email, userSnap.password)
      return navigate("/signup/pricing")
    } catch (err) {
      setErrMsg(err.code)
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={(e) => validateInput(e)}
      className="text-white p-[2rem] ring-0 rounded-md
          flex flex-col gap-0 justify-center items-center font-fig max-w-[350px] md:max-w-[400px] w-full"
    >
      <h2 className="uppercase font-bold text-[1.8rem] mb-[1rem]">
        create an account
      </h2>
      <div className="flex gap-2">
        <div className="group relative w-full">
          <label className="pl-2 opacity-90 font-thin">First name</label>
          <input
            type="text"
            name="firstName"
            value={firstName.input}
            placeholder="Enter name"
            onChange={(e) =>
              setFirstName({ ...firstName, input: e.target.value })
            }
            className="w-full outline-none border-2 border-[#D9D9D990] p-2 rounded-md bg-slate-50/10"
          />
          <p
            className={`text-red-500 text-[.8rem] font-bold italic absolute ${
              firstName.isEmpty ? "block" : "hidden"
            }`}
          >
            input must not be empty
          </p>
        </div>
        <div className="relative w-full">
          <label className="pl-2 opacity-90 font-thin">Last name</label>
          <input
            type="text"
            name="lastName"
            value={lastName.input}
            placeholder="Enter name"
            onChange={(e) =>
              setLastName({ ...lastName, input: e.target.value })
            }
            className="w-full outline-none border-2 border-[#D9D9D990] p-2 rounded-md bg-slate-50/10"
          />
          <p
            className={`text-red-500 text-[.8rem] font-bold italic absolute ${
              lastName.isEmpty ? "block" : "hidden"
            }`}
          >
            input must not be empty
          </p>
        </div>
      </div>

      <div className="relative w-full">
        <label className="pl-2 opacity-90 font-thin">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={userSnap.email}
          onChange={(e) => (user.email = e.target.value)}
          className="w-full outline-none border-2 border-[#D9D9D990] p-2 rounded-md bg-slate-50/10"
        />
        <p
          className={`text-red-500 text-[.8rem] font-bold italic absolute ${
            errMsg.includes("email") ? "block" : "hidden"
          }`}
        >
          {errMsg}
        </p>
      </div>
      <div className="relative w-full">
        <label className="pl-2 opacity-90 font-thin">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e) => (user.password = e.target.value)}
          className="w-full outline-none border-2 border-[#D9D9D990] p-2 rounded-md bg-slate-50/10"
        />
        <p
          className={`text-red-500 text-[.8rem] font-bold italic absolute ${
            errMsg.includes("password") ? "block" : "hidden"
          }`}
        >
          {errMsg}
        </p>
      </div>
      <div className="group relative w-full mb-[1rem]">
        <label className="pl-2 opacity-90 font-thin">Confirm password</label>
        <input
          type="password"
          name="confirm"
          placeholder="Re-Enter your password"
          onChange={(e) => (user.confirm = e.target.value)}
          className="w-full outline-none border-2 border-[#D9D9D990] p-2 rounded-md bg-slate-50/10 shadow-2xl"
        />
        <p
          className={`text-red-500 text-[.8rem] font-bold italic absolute ${
            error ? "block" : "hidden"
          }`}
        >
          Invalid. Not match w/ password
        </p>
      </div>
      <button
        disabled={loading}
        className="bg-transparent mb-[1rem] border-2 border-[#D9D9D990] uppercase w-full
            py-[.5rem] px-[1.5rem] rounded-md hover:bg-[#D9D9D920] text-white
            transition-all duration-300"
      >
        continue
      </button>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="underline text-[#389FDD]">
          Sign in
        </Link>{" "}
        now
      </p>
    </form>
  )
}

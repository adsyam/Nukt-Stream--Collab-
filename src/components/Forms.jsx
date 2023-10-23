import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSnapshot } from "valtio"
import { user } from "../StateStore"
import { isValidEmail } from "../utils/Authentication"
import { auth } from "../config/firebase"
import { sendPasswordResetEmail } from "firebase/auth"
import { FcGoogle } from "react-icons/fc"
import { useAuthContext } from "../context/AuthContext"

//input field on the dashboard
export const EmailInput = () => {
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
    <form
      onSubmit={handleSubmit}
      className="w-[80%] flex flex-col md:flex-row justify-center items-center gap-2"
    >
      <div className="w-full group relative">
        <input
          type="text"
          value={userSnap.email}
          onChange={(e) => (user.email = e.target.value)}
          className="w-full outline-none border-2 border-[#389FDD] p-4 rounded-md text-[#389FDD] font-semibold"
        />
        <label
          className={`capitalize text-[1.2rem] absolute left-[10px] text-[#389FDD]
              transition-all duration-300 pointer-events-none leading-[1rem]
              ${
                userSnap.email ? "-top-[2px] text-xs" : "top-[17px]"
              } group-focus-within:-top-[2px] group-focus-within:text-xs bg-white mt-1`}
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
      <button
        className="bg-transparent border-2 border-[#389FDD] uppercase font-semibold
            py-4 px-[1rem] rounded-md hover:bg-[#389FDD] hover:text-black
            transition-all duration-300 whitespace-nowrap tracking-[2px]"
      >
        sign up
      </button>
    </form>
  )
}

//login form
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
          translate-x-[8rem] -translate-y-[.7rem]"
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

export const ResetPasswordForm = () => {
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

//signup form
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
      className="bg-white text-black p-[2rem] rounded-md
          flex flex-col gap-3 justify-center items-center font-fig max-w-[350px] md:max-w-[400px] w-full"
    >
      <h2 className="uppercase font-bold text-[1.8rem] mb-[1rem]">
        create an account
      </h2>
      <div className="flex gap-2">
        <div className="group relative w-full mb-[1rem]">
          <input
            type="text"
            name="firstName"
            value={firstName.input}
            onChange={(e) =>
              setFirstName({ ...firstName, input: e.target.value })
            }
            className="w-full outline-none border-2 border-[#389FDD] p-2 rounded-md"
          />
          <label
            className={`capitalize text-[1.2rem] absolute left-[10px] text-[#389FDD]
              transition-all duration-300 pointer-events-none leading-[1rem]
              ${
                firstName.input ? "-top-[7px] bg-white" : "top-[15px]"
              } group-focus-within:-top-[7px]
              group-focus-within:bg-white`}
          >
            first name
          </label>
          <p
            className={`text-red-500 text-[.8rem] font-bold italic absolute ${
              firstName.isEmpty ? "block" : "hidden"
            }`}
          >
            input must not be empty
          </p>
        </div>
        <div className="group relative w-full mb-[1rem]">
          <input
            type="text"
            name="lastName"
            value={lastName.input}
            onChange={(e) =>
              setLastName({ ...lastName, input: e.target.value })
            }
            className="w-full outline-none border-2 border-[#389FDD] p-2 rounded-md"
          />
          <label
            className={`capitalize text-[1.2rem] absolute left-[10px] text-[#389FDD]
              transition-all duration-300 pointer-events-none leading-[1rem]
              ${
                lastName.input ? "-top-[7px] bg-white" : "top-[15px]"
              } group-focus-within:-top-[7px]
              group-focus-within:bg-white`}
          >
            last name
          </label>
          <p
            className={`text-red-500 text-[.8rem] font-bold italic absolute ${
              lastName.isEmpty ? "block" : "hidden"
            }`}
          >
            input must not be empty
          </p>
        </div>
      </div>

      <div className="group relative w-full mb-[1rem]">
        <input
          type="text"
          name="email"
          value={userSnap.email}
          onChange={(e) => (user.email = e.target.value)}
          className="w-full outline-none border-2 border-[#389FDD] p-2 rounded-md"
        />
        <label
          className={`capitalize text-[1.2rem] absolute left-[10px] text-[#389FDD]
              transition-all duration-300 pointer-events-none leading-[1rem]
              ${
                userSnap.email ? "-top-[7px] bg-white" : "top-[15px]"
              } group-focus-within:-top-[7px]
              group-focus-within:bg-white`}
        >
          email
        </label>
        <p
          className={`text-red-500 text-[.8rem] font-bold italic absolute ${
            errMsg.includes("email") ? "block" : "hidden"
          }`}
        >
          {errMsg}
        </p>
      </div>
      <div className="group relative w-full mb-[1rem]">
        <input
          type="password"
          name="password"
          onChange={(e) => (user.password = e.target.value)}
          className="w-full outline-none border-2 border-[#389FDD] p-2 rounded-md"
        />
        <label
          className={`capitalize text-[1.2rem] absolute left-[10px] text-[#389FDD]
              transition-all duration-300 pointer-events-none leading-[1rem]
              ${
                userSnap.password ? "-top-[7px] bg-white" : "top-[15px]"
              } group-focus-within:-top-[7px]
              group-focus-within:bg-white`}
        >
          password
        </label>
        <p
          className={`text-red-500 text-[.8rem] font-bold italic absolute ${
            errMsg.includes("password") ? "block" : "hidden"
          }`}
        >
          {errMsg}
        </p>
      </div>
      <div className="group relative w-full mb-[1rem]">
        <input
          type="password"
          name="confirm"
          onChange={(e) => (user.confirm = e.target.value)}
          className="w-full outline-none border-2 border-[#389FDD] p-2 rounded-md"
        />
        <label
          className={`capitalize text-[1.2rem] absolute left-[10px] text-[#389FDD]
              transition-all duration-300 pointer-events-none leading-[1rem]
              ${
                userSnap.confirm ? "-top-[7px] bg-white" : "top-[15px]"
              } group-focus-within:-top-[7px]
              group-focus-within:bg-white`}
        >
          confirm password
        </label>
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
        className="bg-transparent mb-[1rem] border-2 border-[#389FDD] uppercase font-semibold
            py-[.5rem] px-[1.5rem] rounded-full hover:bg-[#389FDD] hover:text-black
            transition-all duration-300 text-[#389FDD]"
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

//payment form
export const PaymentForm = ({ id }) => {
  const [checked, setChecked] = useState("")
  const navigate = useNavigate()
  const isChecked = (e) => {
    checked !== e.target.value ? setChecked(e.target.value) : setChecked("")
  }

  const handlePayment = () => {
    localStorage.setItem("userData", JSON.stringify(user))
    return navigate("/login")
  }

  return (
    <>
      {id !== "basic" && (
        <form className="w-[350px] flex flex-col gap-[.5rem] font-fig">
          <h2 className="text-center text-[2rem] uppercase font-medium">
            checkout
          </h2>
          <div>
            <p className="capitalize">payment option</p>
            <div className="flex gap-5">
              <div className="flex border-[1px] p-[4px] rounded-lg overflow-hidden">
                <input
                  type="radio"
                  name="payMethod"
                  value="card"
                  onClick={isChecked}
                />
                <img src="/assets/visa.png" alt="visa" width={50} />
                <img src="/assets/mc.png" alt="mastercard" width={50} />
                <img src="/assets/amex.png" alt="amex" width={50} />
              </div>
              <div className="flex border-[1px] p-[4px] rounded-lg overflow-hidden">
                <input
                  type="radio"
                  name="payMethod"
                  value="paypal"
                  onClick={isChecked}
                />
                <img src="/assets/paypal.png" alt="paypal" width={50} />
              </div>
              <div className="flex border-[1px] p-[4px] rounded-lg overflow-hidden">
                <input
                  type="radio"
                  name="payMethod"
                  value="gcash"
                  onClick={isChecked}
                />
                <img src="/assets/gcash.png" alt="gcash" width={50} />
              </div>
            </div>
          </div>
          <div>
            <p className="capitalize">coupon</p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Discount Coupon"
                className="w-full py-[5px] rounded-md ps-3 outline-none bg-white/30 border-[1px]"
              />
              <button className="uppercase">apply</button>
            </div>
          </div>
          {checked === "card" && (
            <div className="flex flex-col">
              <p>Payment Information</p>
              <div className="flex flex-col gap-[1rem] mb-2">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full py-[5px] rounded-md ps-3 outline-none bg-white/30 border-[1px]"
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full py-[5px] rounded-md ps-3 outline-none bg-white/30 border-[1px]"
                />
                <div className="grid grid-cols-3 gap-3 w-full">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full py-[5px] rounded-md ps-3 outline-none bg-white/30 border-[1px]"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full py-[5px] rounded-md ps-3 outline-none bg-white/30 border-[1px]"
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="w-full py-[5px] rounded-md ps-3 outline-none bg-white/30 border-[1px]"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" name="" className="cursor-pointer" />
                <p>
                  Confirm payment and accept our{" "}
                  <Link to="" className="underline text-[#389FDD] font-bold">
                    Terms
                  </Link>
                </p>
              </div>
            </div>
          )}
          {checked === "paypal" && (
            <div className="flex flex-col">
              <p>Payment Information</p>
              <div className="flex flex-col gap-[1rem] mb-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full py-[5px] rounded-md ps-3 outline-none bg-white/30 border-[1px]"
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full py-[5px] rounded-md ps-3 outline-none bg-white/30 border-[1px]"
                />
                <textarea
                  type="text"
                  placeholder="Message"
                  className="w-full py-[5px] rounded-md ps-3 outline-none bg-white/30 border-[1px] resize-none"
                />
              </div>
              <div className="flex gap-2">
                <input type="checkbox" name="" className="cursor-pointer" />
                <p>
                  Confirm payment and accept our{" "}
                  <Link to="" className="underline text-[#389FDD] font-bold">
                    Terms
                  </Link>
                </p>
              </div>
            </div>
          )}
          {checked === "gcash" && (
            <div className="flex flex-col">
              <p>Payment Information</p>
              <div className="flex flex-col gap-[1rem] mb-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full py-[5px] rounded-md ps-3 outline-none bg-white/30 border-[1px]"
                />
                <input
                  type="text"
                  placeholder="GCASH Number"
                  className="w-full py-[5px] rounded-md ps-3 outline-none bg-white/30 border-[1px]"
                />
              </div>
              <div className="flex gap-2">
                <input type="checkbox" name="" className="cursor-pointer" />
                <p>
                  Confirm payment and accept our{" "}
                  <Link to="" className="underline text-[#389FDD] font-bold">
                    Terms
                  </Link>
                </p>
              </div>
            </div>
          )}
          <div className="flex gap-4">
            <button className="border-[1px] bg-transparent uppercase p-[.5rem] rounded-md">
              cancel
            </button>
            <button className="border-[1px] bg-white text-black/50 uppercase p-[.5rem] rounded-md">
              confirm subscription
            </button>
          </div>
        </form>
      )}
      <div
        className={`${
          id === "basic" ? "flex justify-center items-center gap-4" : "hidden"
        } `}
      >
        <button className="border-[1px] bg-transparent uppercase p-[.5rem] rounded-md">
          cancel
        </button>
        <button
          onClick={handlePayment}
          className="border-[1px] bg-white text-black/50 uppercase p-[.5rem] rounded-md"
        >
          confirm subscription
        </button>
      </div>
    </>
  )
}

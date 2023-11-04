import { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { user } from "../../StateStore"

export default function PaymentForm({ id }) {
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

import { useState } from "react"
import { AiFillCheckCircle } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useDataContext } from "../context//DataContext"
import { planPrices } from "../utils"
import {motion} from 'framer-motion'

export const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const { location } = useDataContext()

  return (
    <section className="font-fig w-full px-[2rem]">
      <h2 className="text-center text-[1.5rem] font-semibold">Our Pricing</h2>
      <p className="text-center text-[1rem] mb-[2rem]">
        Begin with a Basic Account or kick off your membership with a
        complimentary{" "}
        <span className="text-[#389FDD] font-semibold">7-day trial</span>.
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-[1rem]">
        {planPrices.map((item, index) => (
          <motion.div whileHover={{scale: 1.05}}
            onClick={() => setSelectedPlan(item.id)}
            key={index}
            className={`flex-1 min-w-[300px] lg:max-w-[300px] min-h-[375px]
            flex flex-col justify-between px-[1.5rem] pb-[1.5rem]
            ${
              selectedPlan === item.id ? "border-[#389FDD]" : ""
            } border-2 rounded-md cursor-pointer hover:border-[#389Fdd]`}
          >
            <div>
              <h3 className="pt-5 pb-1 text-[2rem] text-center font-medium uppercase mb-[1rem]">
                {item.name}
              </h3>
              <div className="flex flex-col gap-1">
                <p className="text-[1.5rem] uppercase pl-4">
                  &#8369;{item.price}/
                  <span className="text-[1rem] lowercase">month</span>
                </p>
                <ul className="flex flex-col gap-[.6rem] pl-6">
                  {item.benefits.map((list, i) => (
                    <li
                      key={i}
                      className="capitalize text-[.82rem] list-image-none flex items-center gap-2"
                    >
                      <AiFillCheckCircle color="gray" />
                      {list}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link
              to={location === "/" ? "/signup" : item.checkoutUrl}
              className="uppercase border-2 w-max mx-auto px-[1rem] py-[.7rem] rounded-md
              hover:bg-[#389FDD] hover:border-[#389FDD] transition-all duration-300"
            >
              {location === "/" ? "proceed sign up" : "proceed checkout"}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export const SelectedPlan = ({ id }) => {
  const selectedPlan = planPrices.find((plan) => plan.id === id)

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-[1rem]">
      <div
        className="flex-1 min-w-[300px] lg:max-w-[300px] min-h-[375px]
            flex flex-col justify-between px-[1.5rem] pb-[1.5rem] border-2 rounded-md"
      >
        <div>
          <h3 className="text-[2rem] text-center font-medium uppercase mb-[1rem]">
            {selectedPlan.name}
          </h3>
          <p className="text-[1.5rem] uppercase mb-[1rem]">
            &#8369;{selectedPlan.price}/
            <span className="text-[1rem] lowercase">month</span>
          </p>
          <ul className="flex flex-col gap-[.6rem]">
            {selectedPlan.benefits.map((list, i) => (
              <li
                key={i}
                className="capitalize text-[.82rem] list-image-none flex items-center gap-2"
              >
                <AiFillCheckCircle color="gray" />
                {list}
              </li>
            ))}
          </ul>
        </div>
        <Link
          to={`/signup/pricing`}
          className="uppercase border-2 w-max mx-auto px-[1rem] py-[.7rem] rounded-md
              hover:bg-[#389FDD] hover:border-[#389FDD] transition-all duration-300"
        >
          choose another plan
        </Link>
      </div>
    </div>
  )
}

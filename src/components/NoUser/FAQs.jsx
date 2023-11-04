import { useState } from "react"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"
import { FAQsDetails } from "../../utils"

export default function FAQs() {
  const [selected, setSelected] = useState(null)

  const toggle = (i) => {
    if (selected === i) return setSelected(null)

    setSelected(i)
  }

  return (
    <section className="w-full h-full flex flex-col justify-center items-center p-[2rem]">
      <h2 className="text-[2rem] font-bold mb-[2rem]">FAQs</h2>
      <div className="wrapper w-full md:max-w-[700px]">
        <div className="accordion flex flex-col gap-[1rem]">
          {FAQsDetails.map((item, index) => (
            <div
              key={index}
              className="bg-slate-400/30 rounded-md p-4 border-2"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggle(index)}
              >
                <h3 className="font-medium capitalize text-[1.3rem]">
                  {item.question}
                </h3>
                {selected === index ? (
                  <BiChevronUp size={30} />
                ) : (
                  <BiChevronDown size={30} />
                )}
              </div>
              <div
                className={`${
                  selected === index
                    ? "max-h-[200px] transition-all ease-in-out duration-[.4s]"
                    : "max-h-0 transition-all ease-in-out duration-[.4s]"
                } overflow-hidden`}
              >
                <p className="text-justify">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

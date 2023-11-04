import { useState } from "react"
import { Footer, VideoCategories } from "../components"
import { searchFilters } from "../utils/index"

export default function SearchPage() {
  const [filter, setFilter] = useState("")
  const searchParams = new URLSearchParams(window.location.search).get("q")

  return (
    <>
      <section className="w-full min-h-[100vh] bg-black flex flex-col pt-[7rem] px-[3rem]">
        <div className="flex gap-[1rem] justify-center items-center text-white">
          {searchFilters.map((item, index) => (
            <button
              onClick={() => setFilter(item.name)}
              key={index}
              className={`${
                filter === item.name ? "bg-[#FFFF]/10" : "bg-transparent"
              }
            p-[.5rem] uppercase rounded-md`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <p className="text-white text-center font-bold">
          Showing results for{" "}
          <span className="text-[#7300FF]">{searchParams}</span>
        </p>
        <VideoCategories catergoryName={searchParams} />
      </section>
      <Footer />
    </>
  )
}

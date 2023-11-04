import { AiFillCheckCircle } from "react-icons/ai"
import { Link } from "react-router-dom"
import { Footer } from "../components"

export default function Success() {
  return (
    <section className="w-full h-[100vh] relative bg-hero-pattern bg-no-repeat bg-cover">
      <div
        className="text-white bg-black/60 backdrop-blur-sm w-full h-full pt-[10rem]
        flex flex-col justify-between items-center gap-[15rem]"
      >
        <div className="min-w-[400px] bg-white/50 border-2 border-[#389FDD] p-[3rem] rounded-md">
          <h2 className="text-[2rem] font-medium text-center flex items-center gap-2 mb-[1rem]">
            Successful Registration <AiFillCheckCircle />
          </h2>
          <Link
            to="/login"
            className="border-white border-[1px] p-2 rounded-md uppercase hover:bg-[#389FDD]
              hover:border-[#389FDD]"
          >
            Proceed to Sign In Page
          </Link>
        </div>
        <Footer />
      </div>
    </section>
  )
}

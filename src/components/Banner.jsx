import { EmailInput } from "./Forms"
import { nukt_logo } from "../assets"

export const Banner = () => {
  return (
    <header>
      <div className="flex flex-col justify-center items-center">
        <div className="flex gap-2 items-center">
          <img src={nukt_logo} alt="" width="60px" />
          <h1 className="text-[2rem] text-center font-bold mb-1">NUKT</h1>
        </div>

        <p className="text-[1.5rem] text-center font-semibold mb-3">
          Discover blockbuster movies, series and exciting video content
        </p>
        <p className="text-[1.2rem] mb-3 text-center">
          Get Started with Streaming – Sign Up and Dive into Endless
          Entertainment!
        </p>
        <EmailInput />
      </div>
    </header>
  )
}

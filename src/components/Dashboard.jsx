import { Banner } from "./Banner"
import { FAQs } from "./FAQs"
import { Plans } from "./Plans"
import { Footer } from "./Footer"

export const Dashboard = () => {
  return (
    <main className="w-full h-full relative bg-hero-pattern bg-no-repeat bg-cover">
      <div
        className="text-white bg-black/50 backdrop-blur-sm w-full h-full pt-[10rem]
        flex flex-col justify-center items-center gap-[9rem]"
      >
        <Banner />
        <Plans />
        <FAQs />
        <Footer />
      </div>
    </main>
  )
}

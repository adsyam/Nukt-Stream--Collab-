import { Banner } from "./Banner"
import { FAQs } from "./FAQs"
import { Plans } from "./Plans"
import { Footer } from "./Footer"

export const Dashboard = () => {
  return (
    <main className="w-full h-full dashboard-bg">
      <div
        className="text-white bg-black/50 backdrop-blur-sm w-full h-full
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

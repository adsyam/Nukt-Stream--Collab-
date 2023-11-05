import { Footer, Plans } from "../index"

export default function Pricing() {
  return (
    <section className="w-full h-[100vh] relative bg-hero-pattern bg-no-repeat bg-cover">
      <div
        className="text-white bg-[#0d0d0d]/60 backdrop-blur-sm w-full h-full pt-[10rem]
        flex flex-col justify-center items-center gap-[15rem]"
      >
        <Plans />
        <Footer />
      </div>
    </section>
  )
}

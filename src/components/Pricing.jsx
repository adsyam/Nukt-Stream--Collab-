import { Footer, Plans } from "./index"

export const Pricing = () => {
  return (
    <section className="w-full h-[100vh] relative bg-hero-pattern bg-no-repeat bg-cover">
      <div
        className="text-white bg-black/60 backdrop-blur-sm w-full h-full pt-[10rem]
        flex flex-col justify-center items-center gap-[15rem]"
      >
        <Plans />
        <Footer />
      </div>
    </section>
  )
}

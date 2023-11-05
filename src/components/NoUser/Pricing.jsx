import { Footer, Plans } from "../index";

export default function Pricing() {
  return (
    <section className="w-full min-h-screen relative bg-hero-pattern bg-no-repeat bg-cover">
      <div
        className="text-white bg-black/60 backdrop-blur-sm w-full h-full pt-[10rem]
        flex flex-col justify-center items-center gap-[15rem]"
      >
        <Plans />
        <Footer />
      </div>
    </section>
  );
}

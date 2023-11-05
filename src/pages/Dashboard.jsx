import { Banner, FAQs, Footer, Plans } from "../components"

export default function Dashboard() {
  return (
    <main className="w-full h-full dashboard-bg">
      <div
        className="text-white bg-[#0d0d0d]/50 backdrop-blur-sm w-full h-full
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

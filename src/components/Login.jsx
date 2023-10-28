import { LoginForm } from "./Forms"
import { Footer } from "./index"

export const Login = () => {
  return (
    <section className="w-full flex justify-center items-center relative bg-hero-pattern bg-no-repeat bg-cover">
      <div
        className="text-white items-center bg-black/60 backdrop-blur-sm w-full h-screen relative
        flex flex-col gap-[15rem] pt-20"
      >
        <LoginForm />
        <Footer />
      </div>
    </section>
  )
}

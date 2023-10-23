import { SignUpForm } from "./Forms"
import { Footer } from "./Footer"

export const SignUp = () => {
  return (
    <section className="w-full min-h-[100vh] relative bg-hero-pattern bg-no-repeat bg-cover">
      <div
        className="text-white bg-black/60 backdrop-blur-sm w-full min-h-[100vh] pt-[10rem]
        flex flex-col justify-center items-center gap-[10rem]"
      >
        <SignUpForm />
        <Footer />
      </div>
    </section>
  )
}

import { Footer } from "./Footer"
import { SignUpForm } from "./SignUpForm"

export const SignUp = () => {
  return (
    <section className="w-full bg-hero-pattern bg-no-repeat bg-cover">
      <div
        className="text-white bg-black/60 backdrop-blur-sm w-full
        flex flex-col justify-center items-center h-screen"
      >
        <SignUpForm />
        <Footer />
      </div>
    </section>
  )
}

import { ResetPasswordForm } from "./ResetPasswordForm"


export const ForgotPassword = () => {
  return (
    <div className="w-full min-h-[100vh] bg-black text-white">
      <div className="flex flex-col h-[100vh] justify-center items-center gap-[3rem]">
        <h2 className="uppercase font-semibold text-[1.5rem]">
          Forgot Password
        </h2>
        <ResetPasswordForm />
      </div>
    </div>
  )
}

import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

function AuthForm({ formType }) {
  return (
    <div className="max-w-full flex justify-center">
      <div className="w-[600px] h-[650px] bg-black mt-14 rounded-xl text-white">
        {formType === "signup" && <SignupForm />}
        {formType === "signin" && <SigninForm />}
      </div>
    </div>
  );
}

export default AuthForm;

import { useState } from "react";
import { Link } from "react-router-dom";
function SignupForm() {
  const [isCreatingPassword, setIsCreatingPassword] = useState(false);

  const handleCreatePasswordPage = () => {
    setIsCreatingPassword((prev) => !prev);
  };

  return (
    <div className="text-white">
      {!isCreatingPassword && (
        <Link to="/">
          <button className="cursor-pointer p-3 pl-4">X</button>
        </Link>
      )}
      {isCreatingPassword && (
        <button
          onClick={handleCreatePasswordPage}
          className="cursor-pointer p-3 pl-4"
        >
          Back
        </button>
      )}

      <div className="flex justify-center mb-6 -mt-8">
        <div>
          <svg
            aria-label="X logo"
            width="30"
            height="30"
            viewBox="0 0 300 271"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"
            />
          </svg>
        </div>
      </div>

      {!isCreatingPassword && (
        <div className="mt-3 ml-20">
          <p className="font-semibold text-[34px]">Create your account</p>
          <div>
            <input
              type="text"
              placeholder="Name"
              className="pl-2 w-[450px] border-2 border-[rgba(77,86,96,0.4)] h-16 mt-7 rounded-md outline-0 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Email"
              className="pl-2 w-[450px] border-2 border-[rgba(77,86,96,0.4)] h-16 mt-7 rounded-md outline-0 focus:border-blue-500"
            />
          </div>
          <div class="mt-9 w-[450px]">
            <p class="font-semibold">Date of birth</p>
            <p class="text-[rgba(178,185,193,0.4)] text-sm mt-2">
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else
            </p>
          </div>

          <div class="flex gap-2 w-[450px]">
            <div>
              <select
                name="month"
                className="w-[220px] border-2 border-[rgba(77,86,96,0.4)] h-14 mt-7 rounded-md outline-0 focus:border-blue-500 pl-2"
              >
                <option disabled selected value="">
                  Month
                </option>
              </select>
            </div>
            <div>
              <select
                name="day"
                className="w-[100px] border-2 border-[rgba(77,86,96,0.4)] h-14 mt-7 rounded-md outline-0 focus:border-blue-500 pl-2"
              >
                <option disabled selected value="">
                  Day
                </option>
              </select>
            </div>
            <div>
              <select
                name="year"
                className="border-2 border-[rgba(77,86,96,0.4)] h-14 mt-7 rounded-md outline-0 focus:border-blue-500 w-[130px] pl-2"
              >
                <option disabled selected value="">
                  Year
                </option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCreatePasswordPage}
            className="mt-20 w-[450px] h-13 rounded-4xl flex items-center justify-center text-black font-bold bg-white cursor-pointer"
          >
            Next
          </button>
        </div>
      )}

      {isCreatingPassword && (
        <div className="ml-20">
          <p className="font-semibold text-[34px]">Create your password</p>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="pl-2 w-[450px] border-2 border-[rgba(77,86,96,0.4)] h-16 mt-7 rounded-md outline-0 focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="pl-2 w-[450px] border-2 border-[rgba(77,86,96,0.4)] h-16 mt-7 rounded-md outline-0 focus:border-blue-500"
            />

            <button className="mt-20 w-[450px] h-13 rounded-4xl flex items-center justify-center text-black font-bold bg-white cursor-pointer">
              Sign up
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignupForm;

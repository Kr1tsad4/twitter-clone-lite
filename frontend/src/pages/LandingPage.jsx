import { Link, useLocation } from "react-router-dom";

import AuthForm from "../components/Auth/AuthForm";
import { useRef, useState } from "react";

function LandingPage({ openForm }) {
  let isSignup = useRef(false);
  let isSignin = useRef(false);

  const signup = () => {
    isSignin.current = false;
    isSignup.current = true;
  };

  const signin = () => {
    isSignup.current = false;
    isSignin.current = true;
  };
  return (
    <div>
      <div
        className={`flex justify-center relative ${
          openForm ? "bg-[rgba(16,23,31,0.91)] backdrop-blur-lg " : "bg-black"
        }`}
      >
        {/* X Logo */}
        <div
          className="flex justify-center items-center min-w-1/2
         min-h-screen pr-25 pb-5"
        >
          <svg
            aria-label="X logo"
            width="270"
            height="270"
            viewBox="0 0 300 271"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="white"
              d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"
            />
          </svg>
        </div>

        {/* Signin Signup */}
        <div className={`mt-17 ${openForm ? "pointer-events-none" : ""}`}>
          <p className="font-bold text-[71px] text-white font-sans">
            Happening now
          </p>
          <p className="font-bold text-white text-[30px] pt-10">Join today.</p>
          {/* Signup option btn */}
          <div className="flex flex-col gap-4 mt-8">
            <button className="w-75 h-10 rounded-4xl flex items-center justify-center bg-white">
              <div className="flex gap-2 text-black cursor-pointer">
                <div>
                  <svg
                    aria-label="Google logo"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-gray-600">
                    Sign up with Google
                  </h1>
                </div>
              </div>
            </button>

            <button className="w-75 h-10 rounded-4xl flex items-center justify-center bg-white">
              <div className="flex gap-2 text-black cursor-pointer">
                <div>
                  <svg
                    aria-label="Apple logo"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1195 1195"
                  >
                    <path
                      fill="black"
                      d="M1006.933 812.8c-32 153.6-115.2 211.2-147.2 249.6-32 25.6-121.6 25.6-153.6 6.4-38.4-25.6-134.4-25.6-166.4 0-44.8 32-115.2 19.2-128 12.8-256-179.2-352-716.8 12.8-774.4 64-12.8 134.4 32 134.4 32 51.2 25.6 70.4 12.8 115.2-6.4 96-44.8 243.2-44.8 313.6 76.8-147.2 96-153.6 294.4 19.2 403.2zM802.133 64c12.8 70.4-64 224-204.8 230.4-12.8-38.4 32-217.6 204.8-230.4z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h1 className="text-sm font-serif pt-[2px]">
                    Sign up with Apple
                  </h1>
                </div>
              </div>
            </button>

            <div className="flex items-center w-72 -mt-1">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-4 text-white text-sm font-medium">OR</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>
            <Link to="/signup">
              <button
                onClick={signup}
                className="w-75 h-10 rounded-4xl flex items-center justify-center bg-blue-400 hover:bg-blue-500 text-base font-sans font-semibold text-white cursor-pointer"
              >
                Create account
              </button>
            </Link>
          </div>

          {/* Term of service  */}
          <div className="mt-3">
            <p className="text-[11px] mt-2 w-72 font-serif text-gray-500">
              By signing up, you agree to the
              <span className="font-sans text-blue-500 hover:underline cursor-pointer">
                Terms of Service
              </span>
              and
              <span className="font-sans text-blue-500 hover:underline cursor-pointer">
                Privacy Policy
              </span>
              , including
              <span className="font-sans text-blue-500 hover:underline cursor-pointer">
                Cookie Use.
              </span>
            </p>
          </div>

          <div className="font-bold mt-11">
            <h1 className="font-bold mt-11 text-white text-[18px]">
              Already have an account?
            </h1>
          </div>

          {/* Sign in button */}
          <Link to="/login">
            <button
              onClick={signin}
              className="w-75 h-10 rounded-4xl  mt-4 border-1 border-gray-500 text-base font-semibold text-blue-400 cursor-pointer"
            >
              Sign in
            </button>
          </Link>
        </div>
        {openForm && (isSignup || isSignin) && (
          <div className="absolute">
            <AuthForm formType={isSignup.current ? "signup" : "signin"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../libs/fetchUserUtils";
import { API_URL } from "../../libs/api";

function SigninForm() {
  const navigator = useNavigate();
  const [isUsernameFilled, setIsUsernameFilled] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameFilled = () => {
    setIsUsernameFilled((prev) => !prev);
  };

  const login = async () => {
    const user = { name: username, email: username, password: password };
    const isUserLogin = await userLogin(API_URL, user);
    if (isUserLogin) {
      navigator("/home");
    }
  };
  return (
    <div className="text-white">
      {!isUsernameFilled && (
        <Link to="/">
          <button className="cursor-pointer p-3 pl-4">X</button>
        </Link>
      )}
      {isUsernameFilled && (
        <button
          onClick={handleUsernameFilled}
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
      {/* username page */}
      {!isUsernameFilled && (
        <div className="flex flex-col items-center mr-35 gap-6">
          <p className="font-bold text-[32px]">Sign in to X</p>

          {/* sign in option btn */}
          <div className="flex flex-col gap-5 ml-35">
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
              <span className="mx-4 text-white text-md font-medium">or</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>
          </div>

          {/* username input */}
          <div className="flex flex-col gap-6 ml-35">
            <input
              type="text"
              placeholder="Phone, email, or username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-15 pl-2 -mt-4 w-[290px] border border-[rgba(178,185,193,0.4)] rounded-sm outline-0 focus:border-blue-500"
            />

            <button
              onClick={handleUsernameFilled}
              className="w-[300px] h-9 rounded-4xl flex items-center justify-center text-black font-bold bg-white cursor-pointer"
            >
              Next
            </button>
            <button className="w-75 h-8 border-1 border-gray-500 text-base font-semibold text-whit rounded-full cursor-pointer">
              Forgot password?
            </button>
            <div className="mt-9">
              <h1 className="text-gray-500">
                Don't have an account?
                <span className="text-blue-500 hover:underline cursor-pointer pl-1">
                  Sign up
                </span>
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* password page */}
      {isUsernameFilled && (
        <div class="mt-3 ml-20">
          <p className="font-bold text-[28px]">Enter your password</p>
          <div>
            <div className="flex flex-col">
              <input
                type="text"
                value={username}
                placeholder="Phone, email, or username"
                className="h-15 pl-2 w-[450px] border border-[rgba(178,185,193,0.4)] rounded-sm mt-7 outline-0 focus:border-blue-500 text-[rgba(178,185,193,0.4)]"
                disabled
              />
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-15 pl-2 w-[450px] border border-[rgba(178,185,193,0.4)] rounded-sm mt-7 outline-0 focus:border-blue-500"
            />
            <h1 className="text-[12px] text-blue-500 p-2 cursor-pointer hover:underline">
              Forgot password?
            </h1>
          </div>
          <div>
            <button
              onClick={login}
              className="mt-50 w-[430px] h-13 rounded-4xl flex items-center justify-center text-black font-bold bg-white"
            >
              Log in
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SigninForm;

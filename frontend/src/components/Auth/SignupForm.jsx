import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../libs/api";
import { createUser, getUser, userLogin } from "../../libs/fetchUserUtils";

function SignupForm() {
  const navigator = useNavigate();
  const [isCreatingPassword, setIsCreatingPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 125 }, (_, i) => currentYear - i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const getDob = useMemo(() => {
    if (!selectedYear || !selectedMonth || !selectedDay) return "";
    return `${selectedYear}-${selectedMonth}-${selectedDay}`;
  }, [selectedYear, selectedMonth, selectedDay]);

  const handleCreatePasswordPage = () => {
    setIsCreatingPassword((prev) => !prev);
  };

  const newUser = useMemo(() => {
    return {
      name: name,
      email: email,
      dob: getDob,
      password,
    };
  }, [name, email, getDob, password]);

  const usedEmail = useRef([]);

  useEffect(() => {
    const fetchUserEmails = async () => {
      const users = await getUser(API_URL);
      if (users) {
        usedEmail.current = users.map((u) => u.email);
      }
    };

    fetchUserEmails();
  }, []);

  const [requiredNameWarning, setRequiredNameWarning] = useState(false);
  const [invalidEmailWarning, setInvalidEmailWarning] = useState(false);
  const [emailHasBeenUsedWarning, setEmailHasBeenUsedWarning] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const isEmailValid = (email) => {
    return !email || (email && email.includes("@") && email.includes("."));
  };

  const checkEmailHasBeenUsed = (email) => {
    return usedEmail.current.includes(email);
  };
  const handleOnBlur = (field, value) => {
    if (field === "name") {
      setRequiredNameWarning(!value);
    }

    if (field === "email") {
      const isValid = isEmailValid(value);
      const isUsed = checkEmailHasBeenUsed(value);

      setInvalidEmailWarning(!isValid);
      setEmailHasBeenUsedWarning(isValid && isUsed);
    }

    if (field === "confirmPassword") {
      if (!password || !value.trim()) {
        setIsPasswordMatched(true);
      } else {
        setIsPasswordMatched(password.trim() === value.trim());
      }
    }
  };

  const handleOnInput = (field, value) => {
    if (field === "name" && value.trim()) {
      setRequiredNameWarning(false);
    }

    if (field === "email") {
      const isValid = isEmailValid(value);
      const isUsed = checkEmailHasBeenUsed(value);

      setInvalidEmailWarning(!isValid);
      setEmailHasBeenUsedWarning(isValid && isUsed);
    }

    if (field === "confirmPassword") {
      const isMatched = password.trim() === value.trim();
      setIsPasswordMatched(isMatched);
    }
  };

  const [enableSignupButton, setEnableSignupButton] = useState(false);
  const [enableNextButton, setEnableNextButton] = useState(false);

  useEffect(() => {
    if (password && confirmPassword) {
      setEnableSignupButton(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    const isFormFilled =
      !!name &&
      !!email &&
      isEmailValid(email) &&
      !emailHasBeenUsedWarning &&
      !!selectedDay &&
      !!selectedMonth &&
      !!selectedYear;

    setEnableNextButton(isFormFilled);
  }, [
    name,
    email,
    emailHasBeenUsedWarning,
    selectedDay,
    selectedMonth,
    selectedYear,
  ]);
  const saveUserSession = (user) => {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  };
  const createAccount = async () => {
    try {
      const newAccount = await createUser(API_URL, newUser);
      if (newAccount) {
        const user = {
          email: email,
          password: password,
        };
        const loginUser = await userLogin(API_URL, user);
        if (loginUser) {
          saveUserSession(loginUser.user);
          navigator("/home");
        }
      }
    } catch (error) {
      console.log(error);
    }
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
              className={`pl-2 w-[450px] border-2  h-16 mt-7 rounded-md outline-0  ${
                requiredNameWarning
                  ? "border-red-500 focus:border-red-500"
                  : "border-[rgba(77,86,96,0.4)] focus:border-blue-500"
              } `}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={(e) => handleOnBlur("name", e.target.value)}
              onInput={(e) => handleOnInput("name", e.target.value)}
            />
            {requiredNameWarning && (
              <p className="text-red-500 text-[12px] pt-1 pl-3 -mb-5">
                Where's your name?
              </p>
            )}
            <input
              type="text"
              placeholder="Email"
              className={`pl-2 w-[450px] border-2  h-16 mt-7 rounded-md outline-0 ${
                invalidEmailWarning || emailHasBeenUsedWarning
                  ? "border-red-500 focus:border-red-500 "
                  : "border-[rgba(77,86,96,0.4)] focus:border-blue-500 "
              } `}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => handleOnBlur("email", e.target.value)}
              onInput={(e) => handleOnInput("email", e.target.value)}
            />
            {invalidEmailWarning && (
              <p className="text-red-500 text-[12px] pt-1 pl-3 -mb-5">
                Please enter a valid email.
              </p>
            )}
            {emailHasBeenUsedWarning && (
              <p className="text-red-500 text-[12px] pt-1 pl-3 -mb-5">
                This email has been used.
              </p>
            )}
          </div>
          <div className="mt-9 w-[450px]">
            <p className="font-semibold">Date of birth</p>
            <p className="text-[rgba(178,185,193,0.4)] text-sm mt-2">
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else
            </p>
          </div>

          <div className="flex gap-2 w-[450px]">
            <div>
              <select
                name="month"
                className="w-[220px] border-2 border-[rgba(77,86,96,0.4)] h-14 mt-7 rounded-md outline-0 focus:border-blue-500 pl-2"
                onChange={(e) => setSelectedMonth(e.target.value)}
                value={selectedMonth}
              >
                <option disabled value="">
                  Month
                </option>
                {months.map((month, index) => (
                  <option
                    key={index}
                    value={index + 1}
                    className="bg-black text-white"
                  >
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                name="day"
                className="w-[100px] border-2 border-[rgba(77,86,96,0.4)] h-14 mt-7 rounded-md outline-0 focus:border-blue-500 pl-2"
                onChange={(e) => setSelectedDay(e.target.value)}
                value={selectedDay}
              >
                <option disabled value="">
                  Day
                </option>
                {days.map((day, index) => (
                  <option
                    key={index}
                    value={day}
                    className="bg-black text-white"
                  >
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                name="year"
                className="border-2 border-[rgba(77,86,96,0.4)] h-14 mt-7 rounded-md outline-0 focus:border-blue-500 w-[130px] pl-2"
                onChange={(e) => setSelectedYear(e.target.value)}
                value={selectedYear}
              >
                <option disabled value="">
                  Year
                </option>
                {years.map((year, index) => (
                  <option
                    key={index}
                    value={year}
                    className="bg-black text-white"
                  >
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleCreatePasswordPage}
            className={`mt-20 w-[450px] h-13 rounded-4xl flex items-center justify-center text-black font-bold 
                ${
                  enableNextButton
                    ? "bg-white text-black cursor-pointer"
                    : "bg-[rgba(241,243,245,0.4)] text-black"
                }`}
            disabled={!enableNextButton}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-2 w-[450px] border-2 border-[rgba(77,86,96,0.4)] h-16 mt-7 rounded-md outline-0 focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={(e) => handleOnBlur("confirmPassword", e.target.value)}
              onInput={(e) => handleOnInput("confirmPassword", e.target.value)}
              className={`pl-2 w-[450px] border-2  h-16 mt-7 rounded-md outline-0  ${
                !isPasswordMatched
                  ? "border-red-500 focus:border-red-500"
                  : "border-[rgba(77,86,96,0.4)] focus:border-blue-500"
              } `}
            />
            {!isPasswordMatched && (
              <p className="text-red-500 text-[12px] pt-1 pl-3 -mb-5">
                Passwords didn’t match.
              </p>
            )}
            <button
              onClick={createAccount}
              disabled={!enableSignupButton}
              className={`mt-20 w-[450px] h-13 rounded-4xl flex items-center justify-center font-bold 
                ${
                  enableSignupButton
                    ? "bg-white text-black cursor-pointer"
                    : "bg-[rgba(241,243,245,0.4)] text-black"
                }`}
            >
              Sign up
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignupForm;

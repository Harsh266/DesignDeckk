import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../context/ThemeContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const { theme } = useContext(ThemeContext);


  return (
    <>
      <Helmet>
        <title>DesignDeck - Change Password</title>
      </Helmet>
      <ToastContainer
        toastClassName={() => "custom-toast"}
      />
      <div
        className={`flex flex-col lg:flex-row items-center justify-center min-h-screen h-screen overflow-hidden p-6 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          }`}
      >
        {/* Left Section (Form) */}
        <div
          className={`w-full lg:w-1/2 h-full p-10 flex flex-col justify-center items-center ${theme === "dark" ? "bg-black" : "bg-white"
            }`}
        >
          {/* Logo */}
          <h1 className={`text-xl font-semibold absolute top-7 left-10 ${theme === "dark" ? "text-white" : "text-black"}`}>
            DesignDeck
          </h1>

          {/* Form Container */}
          <div className="w-full max-w-md px-6">
            {/* Lock Icon */}
            <div className="flex justify-center mb-4">
              <div
                className={`h-12 w-12 flex items-center justify-center rounded-[12px] border ${theme === "dark"
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-[#D9D9D9]"
                  }`}
              >
                <i className={`ri-lock-password-line text-2xl ${theme === "dark" ? "text-gray-300" : "text-black"}`}></i>
              </div>
            </div>

            {/* Title & Description */}
            <h2 className="text-3xl font-semibold text-center">Set New Password</h2>
            <p className={`text-center mt-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              Must be at least 8 characters
            </p>

            {/* Input Fields */}
            <form className="flex flex-col gap-4 mt-6">
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  className={`border p-3 rounded w-full mt-1 focus:outline-none focus:ring-2 ${theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-white focus:ring-blue-400"
                    : "border-gray-300 bg-white text-black focus:ring-blue-500"
                    }`}
                  minLength={8}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Confirm Password</label>
                <input
                  type="password"
                  placeholder="********"
                  className={`border p-3 rounded w-full mt-1 focus:outline-none focus:ring-2 ${theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-white focus:ring-blue-400"
                    : "border-gray-300 bg-white text-black focus:ring-blue-500"
                    }`}
                  minLength={8}
                />
              </div>
              <Link to="/signin"><button
                type="submit"
                className={`p-3 rounded w-full cursor-pointer ${theme === "dark" ? "bg-blue-500 text-white" : "bg-[#376CFF] text-white"
                  } `}
              >Reset Password
              </button></Link>
            </form>

            {/* Back to login */}
            <a href="/signin" className={`mt-4 flex items-center justify-center ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              ← Back to login
            </a>
          </div>
        </div>

        {/* Right Section (Image) - Visible Only on lg Screens */}
        <div className="hidden lg:flex w-1/2 h-full items-center justify-end p-8">
          <img src="/resetpass.png" alt="Sign in" className="w-[85%] h-[100%] rounded-lg" />
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
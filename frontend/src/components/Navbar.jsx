import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon, Menu, X } from "lucide-react";

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const popupRef = useRef(null);
  

  return (
    <nav
      className={`flex w-full justify-between items-center px-4 sm:px-6 py-3 fixed top-0 left-0 backdrop-blur-2xl z-50 ${theme === "dark" ? "bg-[#000000f3] text-white" : "bg-[#ffffffc3] text-black"
        }`}
    >
      {/* Logo */}
      <Link to="/dashboard">
        <h1 className="text-lg font-semibold">DesignDeck</h1>
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center justify-center"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4 relative">
        {(
          <>
            {/* User Profile Section */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowPopup(!showPopup)}
            >
              <img
                src={(theme === "dark"
                  ? "https://i.pinimg.com/736x/07/66/d1/0766d183119ff92920403eb7ae566a85.jpg"
                  : "https://static.thenounproject.com/png/642902-200.png")}
                alt="User"
                className="object-cover object-top w-8 h-8 md:w-10 md:h-10 rounded-full"
              />
              <div className="hidden sm:block">
                <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
                  John Doe
                </p>
                <p className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
                  johndoe@gmail.com
                </p>
              </div>
            </div>

            {/* Notification Icon */}
            <Link to="/user-notifications"><button
              className={`p-2 rounded-full cursor-pointer h-8 w-8 md:h-10 md:w-10 flex items-center justify-center transition-all duration-300 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-[#DCE6FF] text-[#9091FF]"
                }`}
            >
              <i className="ri-notification-2-line text-[16px] md:text-[20px]"></i>
            </button></Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 cursor-pointer rounded-full h-8 w-8 md:h-10 md:w-10 flex items-center justify-center transition-all duration-300 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-[#DCE6FF] text-[#9091FF]"
                }`}
            >
              {theme === "dark" ? (
                <Sun className="text-xl md:text-2xl" />
              ) : (
                <Moon className="text-xl md:text-2xl" />
              )}
            </button>

            {/* Profile Popup */}
            {showPopup && (
              <div
                ref={popupRef}
                className={`fixed top-16 right-5 w-90 shadow-xl rounded-2xl p-5 transition-all duration-200 ease-in-out z-50 ${theme === "dark" ? "bg-[#222] text-white" : "bg-white text-black"
                  }`}
              >
                {/* Close Button */}
                <button
                  className="absolute top-3 right-3 cursor-pointer"
                  onClick={() => setShowPopup(false)}
                >
                  <i className="ri-close-line text-lg"></i>
                </button>

                {/* Profile Section */}
                <div className="flex items-center gap-4">
                  <img
                    src={(theme === "dark"
                      ? "https://i.pinimg.com/736x/07/66/d1/0766d183119ff92920403eb7ae566a85.jpg"
                      : "https://static.thenounproject.com/png/642902-200.png")}
                    alt="User"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover object-top"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">John Due</h2>
                    <p className="text-sm mt-1 font-semibold">johndue@gmail.com</p>

                    {/* Social Media Links */}
                    <div className="flex flex-col mt-2 text-sm">
                      <div className="flex items-center gap-2">
                        <i className="ri-dribbble-line text-lg"></i>
                        <span className="break-words whitespace-normal max-w-[200px]">
                          { "@Dribbbleacc"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-behance-fill text-lg"></i>
                        <span className="break-words whitespace-normal max-w-[200px]">
                          {"@Behanceacc"}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Buttons */}
                <div
                  className={`flex justify-between items-center mt-4 border-t pt-3 text-sm ${theme === "dark" ? "text-white" : "text-black"
                    }`}
                >
                  <Link to="/profilepage">
                    <button
                      className={`font-medium cursor-pointer ${theme === "dark" ? "text-white" : "text-blue-600"
                        }`}
                      onClick={() => setShowPopup(false)}
                    >
                      View Profile
                    </button>
                  </Link>
                  <Link to="/landingpage"><button
                    className={`font-medium cursor-pointer ${theme === "dark" ? "text-white" : "text-red-500"
                      }`}
                  >
                    Logout
                  </button></Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden fixed top-14 right-0 backdrop-blur-2xl left-0 bottom-0 p-4 z-40 ${theme === "dark" ? "bg-[#000000c3]" : "bg-[#fffffffc3]"
          }`}>
          <div className={`flex flex-col w-full items-center gap-6 pt-8 ${theme === "dark" ? "bg-black" : "bg-white"} shadow-lg rounded-lg`}>
            { (
              <>
                {/* User Profile Info */}
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={(theme === "dark"
                      ? "https://i.pinimg.com/736x/07/66/d1/0766d183119ff92920403eb7ae566a85.jpg"
                      : "https://static.thenounproject.com/png/642902-200.png")}
                    alt="User"
                    className="w-20 h-20 rounded-full object-cover object-top"
                  />
                  <p className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
                    John Doe
                  </p>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
                    johndoe@gmail.com
                  </p>
                </div>

                {/* Social Media Links */}
                <div className="flex gap-4 mt-2">
                  {/* Instagram */}
                  <div className="relative group">
                    <div
                      className={`flex items-center cursor-pointer h-12 w-12 justify-center gap-2 rounded-full transition-all ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
                        }`}
                    >
                      <i className="ri-dribbble-fill text-2xl"></i>
                    </div>
                  </div>

                  {/* Behance */}
                  <div className="relative group">
                    <div
                      className={`flex items-center cursor-pointer h-12 w-12 justify-center gap-2 rounded-full transition-all ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
                        }`}
                    >
                      <i className="ri-behance-fill text-2xl"></i>
                    </div>
                  </div>
                </div>


                {/* Mobile Menu Actions */}
                <div className="flex items-center gap-4 mt-0">
                  {/* Notification Icon */}
                  <Link to="/user-notifications"><button
                    className={`p-3 rounded-full cursor-pointer h-12 w-12 flex items-center justify-center ${theme === "dark" ? "bg-gray-700 text-white" : "bg-[#DCE6FF] text-[#9091FF]"
                      }`}
                  >
                    <i className="ri-notification-2-line text-[22px]"></i>
                  </button></Link>

                  {/* Theme Toggle Button */}
                  <button
                    onClick={toggleTheme}
                    className={`p-3 cursor-pointer rounded-full h-12 w-12 flex items-center justify-center ${theme === "dark" ? "bg-gray-700 text-white" : "bg-[#DCE6FF] text-[#9091FF]"
                      }`}
                  >
                    {theme === "dark" ? (
                      <Sun className="text-2xl" />
                    ) : (
                      <Moon className="text-2xl" />
                    )}
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="w-full px-4 flex flex-row mb-2 justify-between items-center gap-4">
                  <Link
                    to="/profilepage">
                    <button className={`w-full text-center cursor-pointer p-3 rounded-lg ${theme === 'dark' ? ' text-white' : 'text-blue-600'
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    View Profile
                  </button></Link>
                  <Link to="/landingpage"><button
                    className={`w-full text-center cursor-pointer p-3 rounded-lg ${theme === 'dark' ? ' text-white' : ' text-red-500'
                      }`}
                  >
                    Logout
                  </button></Link>
                </div>

              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { Sun, Moon, Menu, X } from "lucide-react";

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, setUser, checkAuth } = useContext(AuthContext);
  const popupRef = useRef(null);
  const navigate = useNavigate();

  const fallbackImageUrl =
    theme === "dark"
      ? "https://i.pinimg.com/736x/07/66/d1/0766d183119ff92920403eb7ae566a85.jpg"
      : "https://static.thenounproject.com/png/642902-200.png";

  const handleLogout = async () => {
    try {
      await axios.get("https://designdeckk.onrender.com/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      navigate("/landingpage");
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav
      className={`flex w-full justify-between items-center px-4 sm:px-6 py-3 fixed top-0 left-0 backdrop-blur-2xl z-50 ${theme === "dark"
          ? "bg-[#000000f3] text-white"
          : "bg-[#ffffffc3] text-black"
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

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4 relative">
        {user && (
          <>
            {/* Profile Section */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowPopup(!showPopup)}
            >
              <img
                src={user.profileImage || fallbackImageUrl}
                alt="User"
                className="object-cover object-top w-8 h-8 md:w-10 md:h-10 rounded-full"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Notifications */}
            <Link to="/user-notifications">
              <button
                className={`p-2 rounded-full h-8 w-8 md:h-10 md:w-10 flex items-center justify-center ${theme === "dark"
                    ? "bg-gray-700 text-white"
                    : "bg-[#DCE6FF] text-[#9091FF]"
                  }`}
              >
                <i className="ri-notification-2-line text-[16px] md:text-[20px]"></i>
              </button>
            </Link>

            {/* Theme Switch */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full h-8 w-8 md:h-10 md:w-10 flex items-center justify-center ${theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-[#DCE6FF] text-[#9091FF]"
                }`}
            >
              {theme === "dark" ? (
                <Sun className="text-xl" />
              ) : (
                <Moon className="text-xl" />
              )}
            </button>

            {/* Popup Menu */}
            {showPopup && (
              <div
                ref={popupRef}
                className={`fixed top-16 right-5 w-90 shadow-xl rounded-2xl p-5 z-50 ${theme === "dark" ? "bg-[#222] text-white" : "bg-white text-black"
                  }`}
              >
                <button
                  className="absolute top-3 right-3"
                  onClick={() => setShowPopup(false)}
                >
                  <i className="ri-close-line text-lg"></i>
                </button>

                <div className="flex items-center gap-4">
                  <img
                    src={user.profileImage || fallbackImageUrl}
                    alt="User"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover object-top"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{user.name}</h2>
                    <p className="text-sm mt-1 font-semibold">{user.email}</p>
                    <div className="flex flex-col mt-2 text-sm">
                      {user.instagram && (
                        <div className="flex items-center gap-2">
                          <i className="ri-dribbble-line text-lg"></i>
                          <span>{user.instagram}</span>
                        </div>
                      )}
                      {user.behance && (
                        <div className="flex items-center gap-2">
                          <i className="ri-behance-fill text-lg"></i>
                          <span>{user.behance}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 border-t pt-3 text-sm">
                  <Link to="/profilepage">
                    <button
                      onClick={() => setShowPopup(false)}
                      className="text-blue-600"
                    >
                      View Profile
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && user && (
        <div
          className={`md:hidden fixed top-14 right-0 left-0 bottom-0 p-4 z-40 backdrop-blur-2xl ${theme === "dark" ? "bg-[#000000c3]" : "bg-[#fffffffc3]"
            }`}
        >
          <div
            className={`flex flex-col w-full items-center gap-6 pt-8 ${theme === "dark" ? "bg-black" : "bg-white"
              } shadow-lg rounded-lg`}
          >
            <div className="flex flex-col items-center gap-2">
              <img
                src={user.profileImage || fallbackImageUrl}
                alt="User"
                className="w-20 h-20 rounded-full object-cover object-top"
              />
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-2">
              {user.instagram && (
                <div className="h-12 w-12 flex items-center justify-center rounded-full cursor-pointer bg-gray-200 text-black">
                  <i className="ri-dribbble-fill text-2xl"></i>
                </div>
              )}
              {user.behance && (
                <div className="h-12 w-12 flex items-center justify-center rounded-full cursor-pointer bg-gray-200 text-black">
                  <i className="ri-behance-fill text-2xl"></i>
                </div>
              )}
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-4">
              <Link to="/user-notifications">
                <button className="p-3 h-12 w-12 rounded-full bg-[#DCE6FF] text-[#9091FF]">
                  <i className="ri-notification-2-line text-[22px]"></i>
                </button>
              </Link>
              <button onClick={toggleTheme} className="p-3 h-12 w-12 rounded-full bg-[#DCE6FF] text-[#9091FF]">
                {theme === "dark" ? <Sun className="text-2xl" /> : <Moon className="text-2xl" />}
              </button>
            </div>

            <div className="w-full px-4 flex flex-row mb-2 justify-between items-center gap-4">
              <Link to="/profilepage">
                <button onClick={() => setMobileMenuOpen(false)} className="w-full p-3 text-blue-600">View Profile</button>
              </Link>
              <button onClick={handleLogout} className="w-full p-3 text-red-500">Logout</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

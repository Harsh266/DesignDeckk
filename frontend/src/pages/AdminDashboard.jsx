import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon, Bell, Users, LogOut, Menu } from "lucide-react"; // Added Menu icon
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const users = [
        { _id: "1", name: "John Doe", email: "john@example.com", lastLogin: "2025-03-22T14:30:00Z", isLoggedIn: true },
        { _id: "2", name: "Jane Smith", email: "jane@example.com", lastLogin: "2025-03-21T09:15:00Z", isLoggedIn: false },
        { _id: "3", name: "Alice Brown", email: "alice@example.com", lastLogin: "2025-03-20T18:45:00Z", isLoggedIn: true },
        { _id: "4", name: "Michael Johnson", email: "michael@example.com", lastLogin: "2025-03-19T11:20:00Z", isLoggedIn: false },
    ];


    return (
        <>
            <ToastContainer />
            <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"} transition-colors duration-300`}>
                {/* Navbar */}
                <nav className={`flex flex-col w-full items-end px-4 sm:px-6 py-3 fixed top-0 left-0 backdrop-blur-2xl z-50 ${theme === "dark" ? "bg-[#000000f3] text-white" : "bg-[#ffffffc3] text-black"
                    }`}>
                    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                        <div className="flex justify-between h-12">
                            <div className="flex items-center">
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${theme === "dark" ? "bg-blue-600" : "bg-blue-500"} flex items-center justify-center text-white font-bold text-lg sm:text-xl`}>
                                    A
                                </div>
                                <h1 className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold tracking-tight">AdminPanel</h1>
                            </div>

                            {/* Desktop menu */}
                            <div className="hidden md:flex items-center space-x-4">

                                <button
                                    onClick={toggleTheme}
                                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors`}
                                >
                                    {theme === "dark" ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
                                    <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                                </button>

                                <Link to="/landingpage"><button
                                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-red-500 cursor-pointer ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors`}
                                >
                                    <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                                    <span>Logout</span>
                                </button></Link>
                            </div>

                            {/* Mobile menu button */}
                            <div className="flex items-center md:hidden">
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className={`p-2 rounded-md ${theme === "dark" ? "text-gray-400 hover:bg-gray-700" : "text-gray-500 hover:bg-gray-100"}`}
                                >
                                    <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden w-full">
                            <div className={`px-2 pt-2 pb-3 space-y-1 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>

                                <button
                                    onClick={toggleTheme}
                                    className={`flex w-full items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"} transition-colors`}
                                >
                                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                    <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                                </button>

                                <Link to="/landingpage"><button
                                    className={`flex w-full items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-red-500 ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors`}
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span>Logout</span>
                                </button></Link>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Main content */}
                <div className="pt-20 sm:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Header */}
                    <div className={`mb-6 sm:mb-8 pb-4 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                        <p className={`mt-2 text-sm sm:text-base ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Welcome to your control center</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        <div className={`p-4 sm:p-6 rounded-xl shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                            <h3 className={`text-base sm:text-lg font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Total Users</h3>
                            <p className="text-2xl sm:text-3xl font-bold mt-2">{users.length}</p>
                        </div>
                        <div className={`p-4 sm:p-6 rounded-xl shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                            <h3 className={`text-base sm:text-lg font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Active Users</h3>
                            <p className="text-2xl sm:text-3xl font-bold mt-2">{users.filter(user => user.isLoggedIn).length}</p>
                        </div>
                        <div className={`p-4 sm:p-6 rounded-xl shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                            <h3 className={`text-base sm:text-lg font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Offline Users</h3>
                            <p className="text-2xl sm:text-3xl font-bold mt-2">{users.filter(user => !user.isLoggedIn).length}</p>
                        </div>
                    </div>

                    {/* Notification Section */}
                    <div className={`mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <Bell className={`h-4 w-4 sm:h-5 sm:w-5 ${theme === "dark" ? "text-blue-400" : "text-blue-500"}`} />
                            <h2 className="text-lg sm:text-xl font-semibold">Send Notification</h2>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                            <input
                                type="text"
                                placeholder="Enter notification message"
                                className={`w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${theme === "dark"
                                    ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                                    : "border-gray-300 bg-white text-gray-800 placeholder-gray-400"
                                    } transition-colors`}
                            />
                            <button
                                className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 mt-3 sm:mt-0 rounded-lg cursor-pointer ${theme === "dark"
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-blue-500 hover:bg-blue-600"
                                    } text-white font-medium transition-colors whitespace-nowrap flex-shrink-0`}
                            >
                                Send Notification
                            </button>
                        </div>
                    </div>

                    {/* Users Table */}
                    <div className={`rounded-xl shadow-md overflow-hidden ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                        <div className="p-4 sm:p-6 pb-3 sm:pb-4">
                            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                                <Users className={`h-4 w-4 sm:h-5 sm:w-5 ${theme === "dark" ? "text-blue-400" : "text-blue-500"}`} />
                                <h2 className="text-lg sm:text-xl font-semibold">User Management</h2>
                            </div>
                            <p className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                All registered users and their current status
                            </p>
                        </div>
                        <div className="overflow-x-auto">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead>
                                            <tr className={`text-left ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                                                <th className="px-3 py-3 sm:px-4 md:px-6 text-xs sm:text-sm font-medium">Name</th>
                                                <th className="px-3 py-3 sm:px-4 md:px-6 text-xs sm:text-sm font-medium">Email</th>
                                                <th className="px-3 py-3 sm:px-4 md:px-6 text-xs sm:text-sm font-medium hidden sm:table-cell">Last Login</th>
                                                <th className="px-3 py-3 sm:px-4 md:px-6 text-xs sm:text-sm font-medium">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {users.map(({ _id, name, email, lastLogin, isLoggedIn }) => (
                                                <tr key={_id} className={`${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"} transition-colors`}>
                                                    <td className="px-3 py-3 sm:px-4 md:px-6 text-xs sm:text-sm font-medium">{name}</td>
                                                    <td className="px-3 py-3 sm:px-4 md:px-6 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[180px] md:max-w-none">{email}</td>
                                                    <td className="px-3 py-3 sm:px-4 md:px-6 text-xs sm:text-sm hidden sm:table-cell">
                                                        {lastLogin ? new Date(lastLogin).toLocaleString() : "Never"}
                                                    </td>
                                                    <td className="px-3 py-3 sm:px-4 md:px-6 text-xs sm:text-sm">
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${isLoggedIn
                                                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}>
                                                            {isLoggedIn ? "Online" : "Offline"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
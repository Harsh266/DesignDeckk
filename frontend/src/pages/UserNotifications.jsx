import { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { ThemeContext } from "../context/ThemeContext";
import moment from "moment"; // For formatting timestamps

function UserNotifications() {
    const { theme } = useContext(ThemeContext);

    // ✅ Initial notifications array
    const [notifications, setNotifications] = useState([
        { message: "New message from John!", createdAt: new Date() },
        { message: "Your profile was viewed 10 times today!", createdAt: new Date() },
        { message: "Reminder: Your appointment is tomorrow at 10 AM", createdAt: new Date() },
        { message: "New friend request from Alice", createdAt: new Date() },
        { message: "System update completed successfully", createdAt: new Date() },
        { message: "Flash sale on your favorite items!", createdAt: new Date() }
    ]);

    // ✅ Clear all notifications
    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <>
            <Navbar />
            <div className={`min-h-screen px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-16 lg:py-12 mt-10 transition-all 
                ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">🔔 User Notifications</h2>

                    {notifications.length === 0 ? (
                        <p className="text-center mt-6 text-md sm:text-lg text-gray-500">No new notifications</p>
                    ) : (
                        <>
                            <ul className="mt-6 space-y-4">
                                {notifications.map((notif, index) => (
                                    <li 
                                        key={index} 
                                        className={`p-4 sm:p-5 md:p-6 rounded-lg shadow-md border-l-4 transition-all 
                                            ${theme === "dark" ? "bg-gray-800 border-blue-400" : "bg-white border-blue-500"}`}
                                    >
                                        <p className="text-md sm:text-lg font-medium">{notif.message}</p>
                                        <span className="text-xs sm:text-sm text-gray-500">
                                            {moment(notif.createdAt).fromNow()}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* ✅ Clear Notifications Button */}
                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={clearNotifications}
                                    className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-red-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-red-600 transition-all cursor-pointer"
                                >
                                    Clear Notifications
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserNotifications;

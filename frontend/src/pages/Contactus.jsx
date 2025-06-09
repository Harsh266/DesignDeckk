import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../context/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/toastStyles.css";

const Contactus = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <Helmet>
                <title>DesignDeck - Contact Us</title>
            </Helmet> 
            <ToastContainer toastClassName={() => "custom-toast"} 
            progressClassName="custom-toast-progress" />
            <div className={`flex flex-col lg:flex-row items-center justify-between min-h-screen h-screen p-6 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
                <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center p-10">
                    <Link to="/logout">
                        <h1 className="text-xl font-semibold absolute top-7 left-10">DesignDeck</h1>
                    </Link>
                    <div className="px-8 md:px-16 flex flex-col justify-center">
                        <h2 className="text-3xl font-semibold mb-3">Get in Touch</h2>
                        <p className={`text-sm mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            We will get back to you as soon as possible
                        </p>
                        <form className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className={`w-full border rounded-full px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300 border-2 
                                    ${theme === "dark" ? "bg-black border-gray-800 text-white focus:ring-[#0099FF]" : "bg-white border-gray-100 text-black focus:ring-[#376CFF]"}`}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your E-Mail ID"
                                className={`w-full border rounded-full px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300 border-2 
                                    ${theme === "dark" ? "bg-black border-gray-800 text-white focus:ring-[#0099FF]" : "bg-white border-gray-100 text-black focus:ring-[#376CFF]"}`}
                            />
                            <textarea
                                name="message"
                                placeholder="Message"
                                rows="5"
                                className={`w-full border rounded-[20px] px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300 border-2 
                                    ${theme === "dark" ? "bg-black border-gray-800 text-white focus:ring-[#0099FF]" : "bg-white border-gray-100 text-black focus:ring-[#376CFF]"}`}
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full bg-[#376CFF] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300 cursor-pointer flex items-center justify-center"
                            >Send Message
                            </button>
                        </form>
                    </div>
                </div>
                <div className="hidden lg:flex w-1/2 h-screen items-center justify-end p-8">
                    <img src="/Contactus.png" alt="Contact Us" className="w-[85%] h-full rounded-lg" />
                </div>
            </div>
        </>
    );
};

export default Contactus;

import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/one-piece-logo.jpg";
import bgvideo from "../assets/bgvideo.mp4";
import bg2Video from "../assets/bg2video.mp4";
import { Link } from "react-router-dom";

function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-4">
      {/* Background Video */}
      <video
        key={isDarkMode ? "dark" : "light"}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={isDarkMode ? bg2Video : bgvideo} type="video/mp4" />
      </video>

      {/* Clickable Overlay (behind the card) */}
      <div
        className="absolute inset-0 z-10"
        onClick={() => setIsDarkMode((prev) => !prev)}
      ></div>

      {/* Animated Card */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={`relative z-20 ${
          isDarkMode ? "bg-white/40 border-yellow-500" : "bg-black/40 border-white"
        } border-2 rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.5)] 
        backdrop-blur-md p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center 
        w-11/12 sm:w-4/5 md:w-3/4 lg:w-1/2`}
      >
        {/* Logo */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 group overflow-hidden rounded-full mb-6">
            <div className="absolute inset-0 bg-yellow-300/40 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>

            <img
                src={logo}
                alt="One Piece Logo"
                className="relative z-10 w-full h-full object-contain"
            />

            {/* ✨ Hover shimmer loop */}
            <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-yellow-200/70 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer-loop z-20"></div>
        </div>

        {/* Title */}
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide 
          ${isDarkMode ? "text-black" : "text-[#FFD700]"} 
          drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)] 
          font-pirate mb-4 animate-fade-in`}
        >
          Sail to Innovation
        </h1>

        {/* Subtitle */}
        <p
          className={`text-base sm:text-lg md:text-xl lg:text-2xl font-pirate font-bold 
          ${isDarkMode ? "text-black" : "text-[#fff5cc]"} 
          drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] 
          mb-6 md:mb-8 animate-wave-slow`}
        >
          ⚓ Embark on a hackathon adventure with the spirit of the Grand Line! 🏴‍☠️
        </p>

        {/* Button */}
       <Link to='/register'>
            <button
                className="bg-[#f3490b] text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full 
                            shadow-lg hover:shadow-[0_0_20px_#FFD700] 
                            transition-transform transform hover:scale-105 
                            hover:bg-[#FFD166] hover:text-[#5c2b00] 
                            focus:outline-none focus:ring-4 focus:ring-[#FFD166] 
                            animate-fade-in delay-400 font-pirate text-base sm:text-lg md:text-xl"
                >
                Join the Crew
            </button>
        </Link> 
      </motion.div>
    </div>
  );
}

export default LandingPage;

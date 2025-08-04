import React, { useState, useEffect } from "react";
import logo from '../assets/logo.png';
import kareLogo from "../assets/klulogo.png";
import cbLogo from "../assets/codingBlocks.png";
import bgimg from "../assets/bg.jpg";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";


function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);

  useEffect(() => {
    const images = [
      logo,
      kareLogo,
      cbLogo,
      bgimg,
    ];

    let loadedCount = 0;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setIsLoaded(true);
          setTimeout(() => setHideLoader(true), 500); // delay to allow fade-out
        }
      };
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0f2c] via-[#13233f] to-[#0a0f2c]">

      {/* 🚢 Boat Loader */}
      {!hideLoader && (
        <div
          className={`fixed inset-0 bg-gradient-to-b from-[#0a0f2c] via-[#13233f] to-[#0a0f2c] 
          flex items-center justify-center z-50 transition-opacity duration-500
          ${isLoaded ? "opacity-0" : "opacity-100"}`}
        >
          <div className="relative flex flex-col items-center">
            <Loader2 className="w-16 h-16 text-[#FFD700] animate-spin" />
          </div>

        </div>
      )}

      {/* 🌍 Background */}
      <div className="absolute inset-0 z-0">
        <div
          className={`w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-2000 ${
            isLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
          style={{
            backgroundImage: `url('https://preview.redd.it/w6fgwb1gmu481.png?width=3282&format=png&auto=webp&s=35baacf18504c303c58b4c9f3db5000325179e70')`,
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        {/* Floating Treasure Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#FFD700] rounded-full opacity-60 animate-bounce"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* 📦 Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div
          className={`relative max-w-4xl w-full transition-all duration-1500 delay-300 ${
            isLoaded
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-10 opacity-0 scale-95"
          }`}
        >
          {/* Glow Frame */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#FFD700] via-[#FFB800] to-[#FFD700] rounded-3xl opacity-20 blur-sm" />
          <div className="absolute -inset-2 bg-gradient-to-r from-[#FFD700]/40 to-[#FFB800]/40 rounded-2xl opacity-30" />

          {/* Main Box */}
          <div className="relative bg-gradient-to-br from-[#1b2a49]/70 to-[#13233f]/80 backdrop-blur-xl rounded-2xl border-2 border-[#FFD700]/40 shadow-[0_0_40px_rgba(255,215,0,0.15)] overflow-hidden">
            {/* Decorative Corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-[#FFD700] rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-[#FFD700] rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-[#FFD700] rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-[#FFD700] rounded-br-lg" />

            <div className="p-8 sm:p-12 text-center">
              {/* Logos */}
              <div
                className={`relative mb-8 flex justify-center items-center transition-all duration-1000 delay-600 ${
                  isLoaded
                    ? "scale-100 opacity-100 rotate-0"
                    : "scale-0 opacity-0 rotate-12"
                }`}
              >
                <div className="relative flex justify-between w-full">
                  {/* Glow */}
                  <div className="absolute inset-0 bg-[#e5ee66] rounded-full blur-xl opacity-30 animate-pulse" />

                  {/* Logo 1 */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full border border-[#f1e187] bg-gradient-to-br from-[#FFD700]/20 to-[#FF4500]/20 backdrop-blur-sm overflow-hidden">
                    <img src={kareLogo} alt="KARE" className="w-full h-full object-contain rounded-full" />
                    <div className="absolute inset-0 border border-dashed border-[#FFD700]/40 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
                  </div>

                  {/* Logo 2 */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full border border-[#FFD700] bg-gradient-to-br from-[#FFD700]/20 to-[#FF4500]/20 backdrop-blur-sm overflow-hidden">
                    <img src={logo} alt="Logo" className="w-full h-full object-contain rounded-full" />
                    <div className="absolute inset-0 border border-dashed border-[#FFD700]/40 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
                  </div>

                  {/* Logo 3 */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full border border-[#FFD700] bg-black backdrop-blur-sm overflow-hidden">
                    <img src={cbLogo} alt="CB" className="w-full h-full object-contain rounded-full" />
                    <div className="absolute inset-0 border border-dashed border-[#FFD700]/40 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className={`mb-6 transition-all duration-1000 delay-800 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFB800] to-[#FF4500] mb-2 tracking-wide">
                  SAIL TO INNOVATION
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mb-4" />
                <p className="text-[#FFD700] text-lg sm:text-xl font-medium">⚔️ Grand Line Hackathon 2025 ⚔️</p>
              </div>

              {/* Description */}
              <div className={`mb-8 transition-all duration-1000 delay-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                <p className="text-white/90 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                  Embark on an epic coding adventure across the digital seas!
                  <br />
                  <span className="text-[#FFD700] font-semibold">Join crews, conquer challenges, and claim your treasure!</span>
                </p>
              </div>

              {/* Stats */}
              <div className={`grid grid-cols-3 gap-4 mb-8 transition-all duration-1000 delay-1200 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                {[
                  { value: "24h", label: "Adventure Time" },
                  { value: "₹15k+", label: "Treasure Pool" },
                  { value: "50+", label: "Pirates" },
                ].map((stat, i) => (
                  <div key={i} className="bg-[#0d1628]/60 backdrop-blur-sm rounded-lg p-4 border border-[#FFD700]/30 shadow-lg w-full">
                    <div className="text-2xl font-bold text-[#FFD700]">{stat.value}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Button */}
                <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-1400 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                  <Link to="/register">
                    <button className="group relative px-8 py-4 bg-gradient-to-r from-[#b71c1c] to-[#d32f2f] text-white font-bold text-lg rounded-full border-2 border-[#FFD700] shadow-lg hover:shadow-[#FFD700]/30 transition-all duration-300 hover:scale-105 hover:from-[#c62828] hover:to-[#e53935]">
                        <span className="relative z-10 flex items-center gap-2">
                          ⚓ Join the Crew
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 to-[#FF4500]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </Link>
                </div>

              {/* Timer */}
              <div className={`mt-8 transition-all duration-1000 delay-1600 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                <div className="text-white/60 text-sm mb-2">⏰ Registration Ends In:</div>
                <div className="flex justify-center gap-2 text-[#FFD700] font-mono text-xl">
                  <span className="bg-black/30 px-3 py-1 rounded">15</span>
                  <span>:</span>
                  <span className="bg-black/30 px-3 py-1 rounded">23</span>
                  <span>:</span>
                  <span className="bg-black/30 px-3 py-1 rounded">45</span>
                  <span>:</span>
                  <span className="bg-black/30 px-3 py-1 rounded">12</span>
                </div>
                <div className="flex justify-center gap-8 text-white/40 text-xs mt-1">
                  <span>DAYS</span>
                  <span>HRS</span>
                  <span>MIN</span>
                  <span>SEC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-blue-600/30 via-blue-500/30 to-blue-600/30 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0 w-4 h-4 bg-blue-400/20 rounded-full animate-bounce"
                style={{
                  left: `${20 + i * 15}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "2s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

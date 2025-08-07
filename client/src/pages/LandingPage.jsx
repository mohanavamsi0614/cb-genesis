import React, { useState, useEffect } from "react";
import logo from '../assets/logo.png';
import kareLogo from "../assets/klulogo.png";
import cbLogo from "../assets/codingBlocks.png";
import bgimg from "../assets/bg.jpg";
import { Link } from "react-router-dom";
import one from "../assets/one.jpg";
import title from "../assets/title.png";
import oda from "../assets/oda.png";
import loadingImg1 from "../assets/loading.gif";
import loadingImg2 from "../assets/load2.gif";
import loadingImg3 from "../assets/load3.gif";
import loadingImg4 from "../assets/load4.gif";
import loadingImg5 from "../assets/load5.gif";
import loadingImg6 from "../assets/load6.jpg";
import loadingImg7 from "../assets/load7.gif";
import loadingImg8 from "../assets/load8.gif";
import loadingImg9 from "../assets/load9.gif";
import loadingImg10 from "../assets/load10.gif";
import loadingImg11 from "../assets/load11.gif";

function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);
  const [randomLoaderImage, setRandomLoaderImage] = useState("");

  useEffect(() => {
    const loaderImages = [
      loadingImg1,
      loadingImg2,
      loadingImg3,
      loadingImg4,
      loadingImg5,
      loadingImg6,
      loadingImg7,
      loadingImg8,
      loadingImg9,
      loadingImg10,
      loadingImg11
    ];

    const randomIndex = Math.floor(Math.random() * loaderImages.length);
    setRandomLoaderImage(loaderImages[randomIndex]);

    const images = [
      logo,
      kareLogo,
      cbLogo,
      bgimg,
      one,
      title,
      oda,
      ...loaderImages,
    ];

    let loadedCount = 0;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setIsLoaded(true);
          setTimeout(() => setHideLoader(true), 500);
        }
      };
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0f2c] via-[#13233f] to-[#0a0f2c]">

      {/* Random Image Loader */}
      {!hideLoader && (
        <div
          className={`fixed inset-0 bg-gradient-to-b from-[#0a0f2c] via-[#13233f] to-[#0a0f2c] 
          flex flex-col items-center justify-center z-50 transition-opacity duration-500
          ${isLoaded ? "opacity-0" : "opacity-100"}`}
        >
          <div className="relative flex flex-col items-center">
            {randomLoaderImage && (
              <img 
                src={randomLoaderImage} 
                alt="Loading" 
                className="w-64 h-64 object-contain animate-pulse" 
              />
            )}
            <p className="text-[#FFD700] mt-6 text-xl font-bold animate-pulse">
              Charting the course to adventure...
            </p>
            <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mt-4 opacity-70"></div>
          </div>
        </div>
      )}

      {/* Background */}
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

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div
          className={`relative max-w-3xl w-full transition-all duration-1500 delay-300 ${
            isLoaded
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-10 opacity-0 scale-95"
          }`}
        >
          {/* Main Box */}
          <div 
            className="relative bg-gradient-to-br from-[#1b2a49]/70 to-[#13233f]/80 backdrop-blur-xl rounded-2xl border-2 border-[#362F1C]/40 shadow-[0_0_40px_rgba(255,215,0,0.15)] overflow-hidden"
            style={{ backgroundImage: `url(${one})` }}>
            
            {/* Decorative Corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-[#362F1C] rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-[#362F1C] rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-[#362F1C] rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-[#362F1C] rounded-br-lg" />

            <div className="p-8 sm:p-12 text-center">
              {/* Logos */}
              <div
                className={`relative mb-1 flex justify-center items-center transition-all duration-1000 delay-600 ${
                  isLoaded
                    ? "scale-100 opacity-100 rotate-0"
                    : "scale-0 opacity-0 rotate-12"
                }`}
              >
                <div className="relative flex justify-between items-center w-full">
                  <div className="absolute inset-0 animate-pulse" />

                  {/* Logo 1 */}
                  <div className="relative w-20 h-20 sm:w-20 sm:h-20 mx-auto">
                    <img src={kareLogo} alt="KARE" className="w-full h-full object-contain" />
                  </div>

                  {/* Logo 2 */}
                  <div className="relative w-22 h-22 sm:w-22 sm:h-22 mx-auto">
                    <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                  </div>

                  {/* Logo 3 */}
                  <div className="relative w-20 h-20 sm:w-20 sm:h-20 mx-auto rounded-full bg-black">
                    <img src={cbLogo} alt="CB" className="w-full h-full object-contain rounded-full" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className={`mb-6 transition-all duration-1000 delay-800 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                <div className="flex items-center justify-center">
                  <img className="w-1/2" src={title} alt="title_img" />
                </div>                  
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mb-4" />
                <p className="text-[#362F1C] text-2xl sm:text-3xl font-medium">Grand Line AI Hackathon 2025</p>
              </div>

              {/* Description */}
              <div className={`mb-8 transition-all duration-1000 delay-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                <p className="font-[poppins] font-semibold text-[#362F1C] text-xl sm:text-xl leading-relaxed max-w-2xl mx-auto">
                  Embark on an epic coding adventure across the digital seas!
                  <br />
                  <span className="text-[#362F1C] font-semibold">Join crews, conquer challenges, and claim your treasure!</span>
                </p>
              </div>

              {/* Stats */}
              <div
                className={`flex flex-wrap justify-center gap-4 mb-8 font-[poppins] transition-all duration-1000 delay-1200 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              >  
              {[
                { value: "24h", label: "Adventure Time" },
                { value: "₹15k+", label: "Treasure Pool" },
                { value: "50+", label: "Pirates" },
              ].map((stat, i) => (
              <div
              key={i}
              className="bg-[#0d1628]/60 backdrop-blur-sm rounded-md p-4 border border-[#FFD700]/30 shadow-md w-[140px] text-center"
              >
                <div className="text-xl font-bold text-[#FFD700]">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
                ))}
              </div>

              {/* Button - Centered Registration */}
              <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-1400 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                <Link to="/register">
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-[#b71c1c] to-[#d32f2f] text-white font-bold text-lg rounded-full border-2 border-[#FFD700] shadow-lg hover:shadow-[#FFD700]/30 transition-all duration-300 hover:scale-105 hover:from-[#c62828] hover:to-[#e53935] w-full sm:w-auto">
                    <span className="relative z-10 flex justify-center items-center gap-2 w-full">
                      Register
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 to-[#FF4500]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </Link>
              </div>

              {/* Timer */}
              <div className={`mt-8 mb-20 sm:mb-8 transition-all duration-1000 delay-1600 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                <div className="text-[#362F1C] text-2xl mb-2">⏰ Registration Ends In:</div>
                <div className="flex justify-center gap-2 text-[#FFD700] font-mono text-xl">
                  <span className="bg-black/30 px-3 py-1 rounded">15</span>
                  <span>:</span>
                  <span className="bg-black/30 px-3 py-1 rounded">23</span>
                  <span>:</span>
                  <span className="bg-black/30 px-3 py-1 rounded">45</span>
                  <span>:</span>
                  <span className="bg-black/30 px-3 py-1 rounded">12</span>
                </div>
                <div className="flex justify-center gap-8 text-[#362F1C] text-xs mt-1">
                  <span>DAYS</span>
                  <span>HRS</span>
                  <span>MIN</span>
                  <span>SEC</span>
                </div>
              </div>
            </div>
            {/* Oda Image */}
            <div
              className={`absolute bottom-4 right-4 w-24 sm:w-32 transform transition-all duration-1000 ease-out delay-1000
              ${isLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4"}`}
            >
              <img src={oda} alt="oda" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
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
// import loadingImg2 from "../assets/load2.gif";
// import loadingImg3 from "../assets/load3.gif";
// import loadingImg4 from "../assets/load4.gif";
// import loadingImg5 from "../assets/load5.gif";
// import loadingImg6 from "../assets/load6.jpg";
// import loadingImg7 from "../assets/load7.gif";
// import loadingImg8 from "../assets/load8.gif";
// import loadingImg9 from "../assets/load9.gif";
// import loadingImg10 from "../assets/load10.gif";
// import loadingImg11 from "../assets/load11.gif";

function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);
  const [randomLoaderImage, setRandomLoaderImage] = useState("");

  useEffect(() => {
    const loaderImages = [
      loadingImg1,
      // loadingImg2
      // loadingImg3,
      // loadingImg4,
      // loadingImg5,
      // loadingImg6,
      // loadingImg7,
      // loadingImg8,
      // loadingImg9,
      // loadingImg10,
      // loadingImg11
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
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
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
      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Main Hero Section */}
          <div
            className={`relative transition-all duration-1500 delay-300 ${
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

              <div className="p-6 sm:p-12 text-center">
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
                    <div className="relative w-16 h-16 sm:w-25 sm:h-25 mx-auto">
                      <img src={kareLogo} alt="KARE" className="w-full h-full object-contain" />
                    </div>

                    {/* Logo 2 */}
                    <div className="relative w-18 h-18 sm:w-24 sm:h-24 mx-auto">
                      <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                    </div>

                    {/* Logo 3 */}
                    <div className="relative w-16 h-16 sm:w-25 sm:h-25 mx-auto rounded-full bg-black">
                      <img src={cbLogo} alt="CB" className="w-full h-full object-contain rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className={`mb-6 transition-all duration-1000 delay-800 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                  <div className="flex items-center justify-center">
                    <img className="w-1/2 sm:w-1/3" src={title} alt="title_img" />
                  </div>                  
                  <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mb-4" />
                  <p className="text-[#362F1C] text-xl sm:text-3xl font-medium">Grand Line AI Hackathon 2025</p>
                </div>

                {/* Description */}
                <div className={`mb-8 transition-all duration-1000 delay-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                  <p className="font-[poppins] font-semibold text-[#362F1C] text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                    Embark on an epic coding adventure across the digital seas!
                    <br />
                    <span className="text-[#362F1C] font-semibold">Join crews, conquer challenges, and claim your treasure!</span>
                  </p>
                </div>

                {/* Stats */}
                <div
                  className={`flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 font-[poppins] transition-all duration-1000 delay-1200 ${
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
                className="bg-[#0d1628]/60 backdrop-blur-sm rounded-md p-3 sm:p-4 border border-[#FFD700]/30 shadow-md w-[120px] sm:w-[140px] text-center"
                >
                  <div className="text-lg sm:text-xl font-bold text-[#FFFFFF]">{stat.value}</div>
                  <div className="text-white/60 text-xs sm:text-sm">{stat.label}</div>
                  </div>
                  ))}
                </div>

                {/* Enhanced Register Button */}
                <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 transition-all duration-1000 delay-1400 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                  <div onClick={() => console.log('Register clicked')} className="w-full sm:w-auto cursor-pointer">
                    <Link to="/register">
                      <button className="group relative px-10 py-5 bg-gradient-to-r from-[#b71c1c] to-[#d32f2f] text-white font-bold text-xl sm:text-2xl rounded-full border-2 border-[#FFD700] shadow-lg w-full sm:w-auto">
                        <span className="relative z-10 flex justify-center items-center gap-3 w-full cursor-pointer">
                          REGISTER NOW
                          {/* <span className="group-hover:translate-x-1 transition-transform text-2xl">→</span> */}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 to-[#FF4500]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </Link>
                  </div>
                </div>


                {/* Timer */}
                <div className={`transition-all duration-1000 delay-1600 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                  <div className="text-[#362F1C] text-xl sm:text-2xl mb-2">Registration Ends In:</div>
                  <div className="flex justify-center gap-2 text-[#FFFFFF] font-mono text-lg sm:text-xl">
                    <span className="bg-black/30 px-2 sm:px-3 py-1 rounded text-sm sm:text-xl">15</span>
                    <span>:</span>
                    <span className="bg-black/30 px-2 sm:px-3 py-1 rounded text-sm sm:text-xl">23</span>
                    <span>:</span>
                    <span className="bg-black/30 px-2 sm:px-3 py-1 rounded text-sm sm:text-xl">45</span>
                    <span>:</span>
                    <span className="bg-black/30 px-2 sm:px-3 py-1 rounded text-sm sm:text-xl">12</span>
                  </div>
                </div>
              </div>
              
              {/* Oda Image */}
              <div
                className={`absolute bottom-4 right-4 w-16 sm:w-24 md:w-32 transform transition-all duration-1000 ease-out delay-1000
                ${isLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4"}`}
              >
                <img src={oda} alt="oda" className="w-full h-auto" />
              </div>
            </div>
          </div>

          {/* About the Event Section */}
          <div 
            className={`bg-gradient-to-br from-[#0b3075] to-[#dfc48f] backdrop-blur-xl rounded-2xl border-2 border-[#fefefe]/40 shadow-[0_0_40px_rgba(255,215,0,0.15)] p-6 sm:p-8 transition-all duration-1500 delay-500 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FFD700] mb-6 text-center flex items-center justify-center gap-3">
              🏴‍☠️ About the Event
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Participants receive a random domain",
                "Identify a real-world problem in the assigned domain related to KARE", 
                "Develop innovative solutions to address the challenge",
                "Fosters critical thinking, problem-solving, and creativity",
                "Empowers contributions toward meaningful advancements in KARE",
                "Intense, collaborative, and exciting innovation experience"
              ].map((item, i) => (
                <div key={i} className="bg-[#0d1628]/60 backdrop-blur-sm rounded-lg p-4 border border-[#FFD700]/20">
                  <div className="flex items-start gap-3">
                    <span className="text-[#FFD700] font-bold text-lg">{i + 1}.</span>
                    <p className="text-white text-sm sm:text-base leading-relaxed font-[pirates]">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Structure Section */}
          <div 
            className={`bg-gradient-to-br from-[#0b3075] to-[#dfc48f] backdrop-blur-xl rounded-2xl border-2 border-[#362F1C]/40 shadow-[0_0_40px_rgba(255,215,0,0.15)] p-6 sm:p-8 transition-all duration-1500 delay-700 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FFD700] mb-6 text-center flex items-center justify-center gap-3">
              ⚡ Event Structure
            </h2>
            <div className="space-y-4">
              {[
                "Register for the event",
                "participants will take a domain to work on",
                "They will define a problem statement and work towards building a project that provides an effective solution within the given timeframe",
                "Participants will present their projects to a panel of judges",
                "The top winners will be announced and awarded prizes"
              ].map((step, i) => (
                <div key={i} className="bg-[#0d1628]/60 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-[#FFD700]/20  transition-colors">
                  <div className="flex items-start gap-4 cursor-pointer">
                    <div className="bg-[#FFD700] text-black font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-white text-base sm:text-lg leading-relaxed font-[poppins]">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prizes & Rewards Section */}
          <div 
            className={`bg-gradient-to-br from-[#0b3075] to-[#dfc48f] backdrop-blur-xl rounded-2xl border-2 border-[#362F1C]/40 shadow-[0_0_40px_rgba(255,215,0,0.15)] p-6 sm:p-8 transition-all duration-1500 delay-900 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FFD700] mb-6 text-center flex items-center justify-center gap-3">
              💰 Prizes & Rewards
            </h2>
            <p className="text-white text-center text-base sm:text-lg mb-8 leading-relaxed font-[poppins]">
              We value innovation and hard work. The top winners will receive cash prizes along with additional credits, and all participants will get certificates of participation.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { emoji: "🏆", title: "1st Prize", prize: "₹7000 + 2 credits", gradient: "from-yellow-500 to-yellow-600" },
                { emoji: "🥈", title: "2nd Prize", prize: "₹5000 + 2 credits", gradient: "from-gray-400 to-gray-500" },
                { emoji: "🥉", title: "3rd Prize", prize: "₹3000 + 2 credits", gradient: "from-orange-500 to-orange-600" },
                { emoji: "📜", title: "Participation", prize: "Certificate + 2 credits", gradient: "from-blue-500 to-blue-600" }
              ].map((award, i) => (
                <div key={i} className="bg-[#0d1628]/60 backdrop-blur-sm rounded-xl p-6 border border-[#FFD700]/20 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl sm:text-5xl mb-3">{award.emoji}</div>
                  <h3 className="text-white font-bold text-lg sm:text-xl mb-2">{award.title}</h3>
                  <div className={`bg-gradient-to-r ${award.gradient} text-white font-semibold py-2 px-4 rounded-lg text-sm sm:text-base`}>
                    {award.prize}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LandingPage;
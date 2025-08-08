import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/bg.jpg";
import one from "../assets/one.jpg";
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

function Registration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([
    { name: "", email: "", role: "", image: null },
    { name: "", email: "", role: "", image: null },
    { name: "", email: "", role: "", image: null },
    { name: "", email: "", role: "", image: null },
    { name: "", email: "", role: "", image: null }, // Added 5th member
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);
  const [randomLoaderImage, setRandomLoaderImage] = useState("");
  const [hoveredInput, setHoveredInput] = useState("");
  const [focusedInput, setFocusedInput] = useState("");
  const [buttonHovered, setButtonHovered] = useState(false);

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

    const images = [bgImg, one];
    
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

  const handleMemberChange = (field, value) => {
    const updatedMembers = [...members];
    updatedMembers[step - 1][field] = value;
    setMembers(updatedMembers);
  };

  const handleImageUpload = (file) => {
    if (file) {
      setIsUploading(true);
      const imageUrl = URL.createObjectURL(file);
      setTimeout(() => {
        handleMemberChange("image", imageUrl);
        setIsUploading(false);
      }, 1000);
    }
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      const registrationData = {
        teamName,
        members,
        registeredAt: new Date().toISOString()
      };
      
      const existingRegistrations = JSON.parse(localStorage.getItem('teamRegistrations') || '[]');
      const updatedRegistrations = [...existingRegistrations, registrationData];
      localStorage.setItem('teamRegistrations', JSON.stringify(updatedRegistrations));
      
      navigate('/payment', { state: { registrationData } });
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {!hideLoader && (
        <div
          className={`fixed inset-0 bg-gradient-to-br from-[#0a0f2c] via-[#13233f] to-[#1a0a2e] 
          flex flex-col items-center justify-center z-50 transition-all duration-700
          ${isLoaded ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        >
          <div className="relative flex flex-col items-center">
            <div className="absolute inset-0 w-80 h-80 rounded-full bg-gradient-to-r from-[#FFD700]/20 via-[#FF6B6B]/20 to-[#4ECDC4]/20 animate-spin blur-2xl"></div>
            
            {randomLoaderImage && (
              <div className="relative">
                <img 
                  src={randomLoaderImage} 
                  alt="Loading" 
                  className="w-64 h-64 object-contain animate-pulse drop-shadow-2xl" 
                />
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-[#FFD700] rounded-full animate-ping"
                      style={{
                        left: `${10 + i * 15}%`,
                        top: `${10 + (i % 4) * 20}%`,
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: `${2 + i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="relative mt-8">
              <p className="text-[#FFD700] text-xl font-bold animate-pulse drop-shadow-lg">
                Preparing your registration...
              </p>
              <div className="w-56 h-1 bg-gray-800 rounded-full mt-6 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FFD700] via-[#FF6B6B] to-[#4ECDC4] rounded-full animate-pulse transform translate-x-[-100%] animate-[loadingBar_2s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="absolute inset-0 z-0">
        <div
          className={`w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-2000 ${
            isLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
          style={{ backgroundImage: `url(${bgImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/60" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#FFD700]/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="min-h-screen w-full flex items-center justify-center px-4 py-12 relative z-10">
        <div
          className={`relative w-full max-w-4xl transition-all duration-1000 delay-300 ${
            isLoaded
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-10 opacity-0 scale-95"
          }`}
        >
          <div
            className="rounded-3xl border-2 border-yellow-500/40 shadow-2xl shadow-yellow-500/20 p-8 sm:p-12 flex flex-col gap-8 relative overflow-hidden backdrop-blur-sm"
            style={{ backgroundImage: `url(${one})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 rounded-3xl" />

            <div className="absolute top-6 left-6 w-8 h-8 border-l-3 border-t-3 border-[#FFD700] rounded-tl-2xl animate-pulse" />
            <div className="absolute top-6 right-6 w-8 h-8 border-r-3 border-t-3 border-[#FFD700] rounded-tr-2xl animate-pulse" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-l-3 border-b-3 border-[#FFD700] rounded-bl-2xl animate-pulse" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-r-3 border-b-3 border-[#FFD700] rounded-br-2xl animate-pulse" />

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full opacity-70 animate-bounce shadow-lg"
                  style={{
                    left: `${5 + i * 12}%`,
                    top: `${15 + (i % 4) * 20}%`,
                    animationDelay: `${i * 0.4}s`,
                    animationDuration: `${3 + i * 0.3}s`,
                    filter: 'drop-shadow(0 0 6px rgba(255, 215, 0, 0.6))',
                  }}
                />
              ))}
            </div>

            <div className="relative">
              <h1
                className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#362F1C] via-[#4A3F2A] to-[#362F1C] bg-clip-text text-transparent text-center transition-all duration-1000 delay-500 drop-shadow-lg ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ textShadow: '2px 2px 4px rgba(54, 47, 28, 0.3)' }}
              >
                {step === 0 ? "⚔️ Team Registration ⚔️" : `🏴‍☠️ Member ${step} Details 🏴‍☠️`}
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent rounded-full"></div>
            </div>

            {step > 0 && (
              <div className="flex justify-center mb-4">
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div
                      key={num}
                      className={`w-3 h-3 rounded-full transition-all duration-500 ${
                        num <= step
                          ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] shadow-lg shadow-yellow-500/50 scale-110'
                          : 'bg-gray-400/50 border border-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {step > 0 && (
              <div
                className={`relative mx-auto w-full max-w-sm transition-all duration-1000 delay-600 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] via-[#FF6B6B] to-[#4ECDC4] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                  <div className="relative border-2 border-yellow-500 overflow-hidden rounded-lg shadow-xl bg-black/30 w-full h-64 flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-105">
                    {isUploading ? (
                      <div className="flex flex-col items-center space-y-2">
                        <Loader2 className="text-yellow-400 animate-spin" size={32} />
                        <p className="text-yellow-400 text-sm font-medium">Uploading...</p>
                      </div>
                    ) : members[step - 1]?.image ? (
                      <img
                        src={members[step - 1].image}
                        alt="Crew Member"
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="text-center text-yellow-400">
                        <div className="text-4xl mb-2">📸</div>
                        <span className="text-sm font-medium">Upload Photo</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
              className="space-y-8 relative z-10"
            >
              <div
                className={`transition-all duration-1000 delay-${700 + step * 100} ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                {step === 0 ? (
                  <div className="pb-4">
                    <label className="block font-[poppins] text-[#362F1C] text-xl mb-3 font-bold tracking-wide">
                      🏴‍☠️ TEAM NAME
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Enter your crew's legendary name..."
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        onFocus={() => setFocusedInput("teamName")}
                        onBlur={() => setFocusedInput("")}
                        onMouseEnter={() => setHoveredInput("teamName")}
                        onMouseLeave={() => setHoveredInput("")}
                        className={`w-full px-2 py-3 font-[poppins] text-lg rounded-none bg-transparent text-[#362F1C] border-0 border-b-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
                          focusedInput === "teamName" || hoveredInput === "teamName"
                            ? "border-[#FFD700] shadow-lg shadow-yellow-500/30 transform scale-105"
                            : "border-[#362F1C] hover:border-yellow-400"
                        }`}
                        required
                      />
                      <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] transition-all duration-300 ${
                        focusedInput === "teamName" ? "w-full" : "w-0"
                      }`}></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="pb-4">
                      <label className="block font-[poppins] text-[#362F1C] text-xl font-bold mb-3 tracking-wide">
                        👤 FULL NAME
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          value={members[step - 1].name}
                          onChange={(e) => handleMemberChange("name", e.target.value)}
                          placeholder="Enter the pirate's full name..."
                          onFocus={() => setFocusedInput("name")}
                          onBlur={() => setFocusedInput("")}
                          onMouseEnter={() => setHoveredInput("name")}
                          onMouseLeave={() => setHoveredInput("")}
                          className={`w-full font-[poppins] px-2 py-3 text-lg rounded-none bg-transparent text-[#362F1C] border-0 border-b-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
                            focusedInput === "name" || hoveredInput === "name"
                              ? "border-[#FFD700] shadow-lg shadow-yellow-500/30 transform scale-105"
                              : "border-[#362F1C] hover:border-yellow-400"
                          }`}
                          required
                        />
                        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] transition-all duration-300 ${
                          focusedInput === "name" ? "w-full" : "w-0"
                        }`}></div>
                      </div>
                    </div>

                    <div className="pb-4">
                      <label className="block font-[poppins] text-[#362F1C] text-xl mb-3 font-bold tracking-wide">
                        📧 EMAIL
                      </label>
                      <div className="relative group">
                        <input
                          type="email"
                          value={members[step - 1].email}
                          onChange={(e) => handleMemberChange("email", e.target.value)}
                          placeholder="Enter the pirate's email..."
                          onFocus={() => setFocusedInput("email")}
                          onBlur={() => setFocusedInput("")}
                          onMouseEnter={() => setHoveredInput("email")}
                          onMouseLeave={() => setHoveredInput("")}
                          className={`w-full font-[poppins] px-2 py-3 text-lg rounded-none bg-transparent text-[#362F1C] border-0 border-b-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
                            focusedInput === "email" || hoveredInput === "email"
                              ? "border-[#FFD700] shadow-lg shadow-yellow-500/30 transform scale-105"
                              : "border-[#362F1C] hover:border-yellow-400"
                          }`}
                          required
                        />
                        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] transition-all duration-300 ${
                          focusedInput === "email" ? "w-full" : "w-0"
                        }`}></div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <label className="block font-[poppins] text-[#362F1C] text-xl mb-3 font-bold tracking-wide">
                        📷 UPLOAD PHOTO (OPTIONAL)
                      </label>
                      <div className="relative group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files[0])}
                          onFocus={() => setFocusedInput("photo")}
                          onBlur={() => setFocusedInput("")}
                          onMouseEnter={() => setHoveredInput("photo")}
                          onMouseLeave={() => setHoveredInput("")}
                          className={`w-full px-2 font-[poppins] py-3 text-lg rounded-lg bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 text-[#362F1C] border-2 transition-all duration-300 focus:outline-none focus:ring-2 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-gradient-to-r file:from-[#FFD700] file:to-[#FFA500] file:text-[#362F1C] hover:file:shadow-lg file:transition-all file:duration-300 hover:file:scale-105 ${
                            focusedInput === "photo" || hoveredInput === "photo"
                              ? "border-[#FFD700] shadow-xl shadow-yellow-500/40 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20"
                              : "border-[#362F1C] hover:border-yellow-400"
                          }`}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div
                className={`transition-all duration-1000 delay-${800 + step * 100} ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <div className="relative group">
                  <div className={`absolute -inset-1 bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl blur opacity-75 transition-all duration-500 ${
                    buttonHovered ? "opacity-100 scale-110" : "opacity-75"
                  }`}></div>
                  <button
                    type="submit"
                    disabled={isUploading}
                    onMouseEnter={() => setButtonHovered(true)}
                    onMouseLeave={() => setButtonHovered(false)}
                    className={`relative w-full font-[poppins] py-4 bg-gradient-to-r from-red-700 to-red-900 text-white text-xl font-bold rounded-xl border-2 border-yellow-500 shadow-2xl transition-all duration-300 hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform ${
                      buttonHovered && !isUploading ? "scale-105 hover:from-red-800 hover:to-red-950" : ""
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>
                        {step === 0
                          ? "🚀 Add First Crew Member"
                          : step < 5
                          ? `⚡ Add Member ${step + 1}`
                          : "🏆 Submit Complete Crew"}
                      </span>
                      {!isUploading && (
                        <span className={`transform transition-transform duration-300 ${
                          buttonHovered ? "translate-x-1" : ""
                        }`}>
                          →
                        </span>
                      )}
                    </span>
                    {buttonHovered && !isUploading && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/10 to-[#FF4500]/10 rounded-xl transition-opacity duration-300" />
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Registration;
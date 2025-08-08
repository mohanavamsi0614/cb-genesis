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
    if (step < 5) { // Changed from 4 to 5
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
              Preparing your registration...
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
          style={{ backgroundImage: `url(${bgImg})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main Content */}
      <div
        className="min-h-screen w-full flex items-center justify-center px-4 py-12 relative z-10"
      >
        <div
          className={`relative w-full max-w-4xl transition-all duration-1000 delay-300 ${
            isLoaded
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-10 opacity-0 scale-95"
          }`}
        >
          <div
            className="rounded-2xl border border-yellow-500/30 shadow-xl p-6 sm:p-10 flex flex-col gap-8 relative overflow-hidden"
            style={{ backgroundImage: `url(${one})` }}
          >
            {/* Decorative Corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-[#362F1C] rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-[#362F1C] rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-[#362F1C] rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-[#362F1C] rounded-br-lg" />

            {/* Floating Treasure Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-[#FFD700] rounded-full opacity-60 animate-bounce"
                  style={{
                    left: `${10 + i * 25}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + i * 0.5}s`,
                  }}
                />
              ))}
            </div>

            <h1
              className={`text-3xl sm:text-4xl font-bold text-[#362F1C] text-center transition-all duration-1000 delay-500 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {step === 0 ? "Team Registration" : `Member ${step} Details`}
            </h1>

            {step > 0 && (
              <div
                className={`relative mx-auto w-full max-w-sm transition-all duration-1000 delay-600 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <div className="relative border-2 border-yellow-500 overflow-hidden rounded-md shadow-md bg-black/20 w-full h-64 flex items-center justify-center">
                  {isUploading ? (
                    <Loader2 className="text-yellow-400 animate-spin" size={28} />
                  ) : members[step - 1]?.image ? (
                    <img
                      src={members[step - 1].image}
                      alt="Crew Member"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <span className="text-yellow-400 text-xs sm:text-sm flex items-center justify-center">
                      Upload Photo
                    </span>
                  )}
                </div>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
              className="space-y-8"
            >
              <div
                className={`transition-all duration-1000 delay-${700 + step * 100} ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                {step === 0 ? (
                  <div className="pb-2">
                    <label className="block font-[poppins] text-[#362F1C] text-xl mb-1 font-semibold">
                      TEAM NAME
                    </label>
                    <input
                      type="text"
                      placeholder="Enter team name"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full px-0 py-2 font-[poppins] text-medium rounded-none bg-transparent text-[#362F1C] border-0 border-b border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-300 transition-colors duration-300"
                      required
                    />
                  </div>
                ) : (
                  <>
                    <div className="pb-2">
                      <label className="block font-[poppins] text-[#362F1C] text-xl font-semibold mb-1">
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        value={members[step - 1].name}
                        onChange={(e) => handleMemberChange("name", e.target.value)}
                        placeholder="Enter full name"
                        className="w-full font-[poppins] px-0 py-2 text-medium rounded-none bg-transparent text-[#362F1C] border-0 border-b border-[#362F1C] focus:outline-none focus:ring-0 focus:border-yellow-300 transition-colors duration-300"
                        required
                      />
                    </div>

                    <div className="pb-2">
                      <label className="block font-[poppins] text-[#362F1C] text-xl mb-1 font-semibold">
                        EMAIL
                      </label>
                      <input
                        type="email"
                        value={members[step - 1].email}
                        onChange={(e) => handleMemberChange("email", e.target.value)}
                        placeholder="Enter email"
                        className="w-full font-[poppins] px-0 py-2 text-medium rounded-none bg-transparent text-[#362F1C] border-0 border-b border-[#362F1C] focus:outline-none focus:ring-0 focus:border-yellow-300 transition-colors duration-300"
                        required
                      />
                    </div>

                    <div className="pt-4">
                      <label className="block font-[poppins] text-[#362F1C] text-xl mb-1 font-semibold">
                        UPLOAD PHOTO (OPTIONAL)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files[0])}
                        className="w-full px-0 font-[poppins] py-2 text-medium rounded-none bg-transparent text-[#362F1C] border-0 border-b border-[#362F1C] focus:outline-none focus:ring-0 focus:border-yellow-300 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-500/20 file:text-[#362F1C] hover:file:bg-yellow-500/30 transition-all duration-300"
                      />
                    </div>
                  </>
                )}
              </div>

              <div
                className={`transition-all duration-1000 delay-${800 + step * 100} ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <button
                  type="submit"
                  disabled={isUploading}
                  className="group relative w-full font-[poppins] mt-8 py-3 bg-gradient-to-r from-red-700 to-red-900 text-white text-lg rounded-lg border-2 border-yellow-500 shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 hover:scale-105 hover:from-red-800 hover:to-red-950 disabled:opacity-50"
                >
                  <span className="relative z-10">
                    {step === 0
                      ? "Member 1"
                      : step < 5 // Changed from 4 to 5
                      ? `Member ${step + 1}`
                      : "Submit Crew"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/10 to-[#FF4500]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
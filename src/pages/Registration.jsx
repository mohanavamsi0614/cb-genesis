import React, { useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import bgImg from "../assets/bg.jpg";
import one from "../assets/one.jpg";

function Registration() {
  const teamData=JSON.parse(localStorage.getItem("teamRegistrations")) || {teamName:"", lead:{}, members:[{ name: "", email: "", role: "", image: null, accommodationType: "", hostelName: "", roomNumber: "" },
    { name: "", email: "", role: "", image: null, accommodationType: "", hostelName: "", roomNumber: "" },
    { name: "", email: "", role: "", image: null, accommodationType: "", hostelName: "", roomNumber: "" },
    { name: "", email: "", role: "", image: null, accommodationType: "", hostelName: "", roomNumber: "" },
    { name: "", email: "", role: "", image: null, accommodationType: "", hostelName: "", roomNumber: "" },
  ]}
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [step, setStep] = useState(0);
  const [teamName, setTeamName] = useState(teamData.teamName);
  const [members, setMembers] = useState([
    { name: teamData.lead.name, email: teamData.lead.email, role: teamData.lead.role, image: teamData.lead.image, accommodationType: teamData.lead.accommodationType, hostelName: teamData.lead.hostelName, roomNumber: teamData.lead.roomNumber },
    { name: teamData.members[0].name, email: teamData.members[0].email, role: teamData.members[0].role, image: teamData.members[0].image, accommodationType: teamData.members[0].accommodationType, hostelName: teamData.members[0].hostelName, roomNumber: teamData.members[0].roomNumber },
    { name: teamData.members[1].name, email: teamData.members[1].email, role: teamData.members[1].role, image: teamData.members[1].image, accommodationType: teamData.members[1].accommodationType, hostelName: teamData.members[1].hostelName, roomNumber: teamData.members[1].roomNumber },
    { name: teamData.members[2].name, email: teamData.members[2].email, role: teamData.members[2].role, image: teamData.members[2].image, accommodationType: teamData.members[2].accommodationType, hostelName: teamData.members[2].hostelName, roomNumber: teamData.members[2].roomNumber },
    { name: teamData.members[3].name, email: teamData.members[3].email, role: teamData.members[3].role, image: teamData.members[3].image, accommodationType: teamData.members[3].accommodationType, hostelName: teamData.members[3].hostelName, roomNumber: teamData.members[3].roomNumber },
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  const hostelOptions = [
    "MH1", "MH2", "MH3", "MH4", "MH5", "MH6", "MH7",
    "LH1", "LH2", "LH3", "LH4"
  ];

  const handleMemberChange = (field, value) => {
    const updatedMembers = [...members];
    updatedMembers[step - 1][field] = value;
    
    // Reset hostel name when accommodation type changes
    if (field === "accommodationType" && value === "dayscholar") {
      updatedMembers[step - 1].hostelName = "";
    }
    localStorage.setItem("teamRegistrations",JSON.stringify({...teamData,lead:updatedMembers[0],members:updatedMembers.slice(1)}))
    setMembers(updatedMembers);
  };

  const handleImageUpload = (file) => {
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB", {
          duration: 4000,
          position: 'top-center',
          style: {
            background: '#dc2626',
            color: 'white',
            fontWeight: 'bold',
          },
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file", {
          duration: 4000,
          position: 'top-center',
          style: {
            background: '#dc2626',
            color: 'white',
            fontWeight: 'bold',
          },
        });
        return;
      }

      setIsUploading(true);
      const imageUrl = URL.createObjectURL(file);
      
      // Simulate upload delay
      setTimeout(() => {
        handleMemberChange("image", imageUrl);
        setIsUploading(false);
        
        toast.success(`Photo uploaded for Member ${step}!`, {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#16a34a',
            color: 'white',
            fontWeight: 'bold',
          },
          icon: '🎉',
        });
      }, 1000);
    }
  };

  // Clear file input when moving to next member
  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNext = () => {
    if (step < 5) {
      if (step > 0) {
        const currentMember = members[step - 1];
        if (currentMember.name && currentMember.email && currentMember.accommodationType) {
          // Check if hosteler is selected but no hostel name is provided
          if (currentMember.accommodationType === "hosteler" && !currentMember.hostelName) {
            toast.error("Please select a hostel name", {
              duration: 3000,
              position: 'top-center',
              style: {
                background: '#dc2626',
                color: 'white',
                fontWeight: 'bold',
              },
            });
            return;
          }
          
          toast.success(`Member ${step} added successfully!`, {
            duration: 3000,
            position: 'top-center',
            style: {
              background: '#16a34a',
              color: 'white',
              fontWeight: 'bold',
            },
          });
        } else {
          toast.error("Please fill in all required fields", {
            duration: 3000,
            position: 'top-center',
            style: {
              background: '#dc2626',
              color: 'white',
              fontWeight: 'bold',
            },
          });
          return;
        }
      } else if (step === 0) {
        if (!teamName.trim()) {
          toast.error("Please enter a team name", {
            duration: 3000,
            position: 'top-center',
            style: {
              background: '#dc2626',
              color: 'white',
              fontWeight: 'bold',
            },
          });
          return;
        }
        toast.success("Team name set! Let's add your crew members", {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#16a34a',
            color: 'white',
            fontWeight: 'bold',
          },
        });
      }
      
      setStep(step + 1);
      // Clear file input when moving to next member
      clearFileInput();
    } else {
      // Validate at least one member
      const validMembers = members.filter(member => 
        member.name && member.email && member.accommodationType &&
        (member.accommodationType === "dayscholar" || 
         (member.accommodationType === "hosteler" && member.hostelName))
      );
      
      if (validMembers.length === 0) {
        toast.error("Please add at least one team member with complete details", {
          duration: 4000,
          position: 'top-center',
          style: {
            background: '#dc2626',
            color: 'white',
            fontWeight: 'bold',
          },
        });
        return;
      }

      const registrationData = {
        teamName,
        lead: validMembers[0],
        members: validMembers.slice(1),
        registeredAt: new Date().toISOString()
      };
      
      
      toast.success(`Team "${teamName}" registration completed! Redirecting to payment...`, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#16a34a',
          color: 'white',
          fontWeight: 'bold',
        },
        icon: '🎊',
      });

      setTimeout(() => {
        navigate('/payment', { state: { registrationData } });
      }, 2000);
    }
  };

  const currentMember = step > 0 ? members[step - 1] : null;

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* React Hot Toast Container */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{
          top: 20,
          left: 20,
          bottom: 20,
          right: 20,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            fontSize: '12px',
            maxWidth: '350px',
            padding: '12px 16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            fontFamily: 'Poppins, sans-serif',
            zIndex: 9999,
          },
          success: {
            iconTheme: {
              primary: '#16a34a',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#dc2626',
              secondary: 'white',
            },
          },
        }}
      />
      
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
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

      <div className="min-h-screen w-full flex items-center justify-center px-2 sm:px-4 py-4 sm:py-12 relative z-10">
        <div className="relative w-full max-w-4xl">
          <div
            className="rounded-2xl sm:rounded-3xl border-2 border-yellow-500/40 shadow-2xl shadow-yellow-500/20 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col gap-4 sm:gap-6 lg:gap-8 relative overflow-hidden backdrop-blur-sm"
            style={{ backgroundImage: `url(${one})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 rounded-2xl sm:rounded-3xl" />

            {/* Corner decorations - hidden on small mobile */}
            <div className="hidden sm:block absolute top-6 left-6 w-8 h-8 border-l-3 border-t-3 border-[#FFD700] rounded-tl-2xl animate-pulse" />
            <div className="hidden sm:block absolute top-6 right-6 w-8 h-8 border-r-3 border-t-3 border-[#FFD700] rounded-tr-2xl animate-pulse" />
            <div className="hidden sm:block absolute bottom-6 left-6 w-8 h-8 border-l-3 border-b-3 border-[#FFD700] rounded-bl-2xl animate-pulse" />
            <div className="hidden sm:block absolute bottom-6 right-6 w-8 h-8 border-r-3 border-b-3 border-[#FFD700] rounded-br-2xl animate-pulse" />

            {/* Floating elements - reduced for mobile */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full opacity-70 animate-bounce shadow-lg"
                  style={{
                    left: `${10 + i * 20}%`,
                    top: `${20 + (i % 2) * 40}%`,
                    animationDelay: `${i * 0.4}s`,
                    animationDuration: `${3 + i * 0.3}s`,
                    filter: 'drop-shadow(0 0 6px rgba(255, 215, 0, 0.6))',
                  }}
                />
              ))}
            </div>

            <div className="relative">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#362F1C] via-[#4A3F2A] to-[#362F1C] bg-clip-text text-center drop-shadow-lg"
                style={{ textShadow: '2px 2px 4px rgba(54, 47, 28, 0.3)' }}
              >
                {step === 0 ? "⚔️ Team Registration ⚔️" : `🏴‍☠️ Member ${step} Details 🏴‍☠️`}
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent rounded-full"></div>
            </div>

            {/* Progress indicator */}
            {step > 0 && (
              <div className="flex justify-center mb-2 sm:mb-4">
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div
                      key={num}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-500 ${
                        num <= step
                          ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] shadow-lg shadow-yellow-500/50 scale-110'
                          : 'bg-gray-400/50 border border-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Conditional Image Display - Show only if image exists */}
            {step > 0 && currentMember?.image && (
              <div className="relative mx-auto w-full max-w-xs sm:max-w-sm mb-4 sm:mb-6">
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-lg blur opacity-75 transition bg-gradient-to-r from-[#FFD700] to-[#FFA500]"></div>
                  <div className="relative border-2 border-yellow-500/40 overflow-hidden rounded-lg shadow-xl bg-black/30 w-full h-48 sm:h-64 flex items-center justify-center backdrop-blur-sm transition-all duration-300">
                    <img
                      src={currentMember.image}
                      alt="Crew Member"
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
              className="space-y-4 sm:space-y-6 lg:space-y-8 relative z-10"
            >
              <div>
                {step === 0 ? (
                  <div className="pb-2 sm:pb-4">
                    <label className="block font-[poppins] text-[#362F1C] text-lg sm:text-xl mb-2 sm:mb-3 font-bold tracking-wide">
                      TEAM NAME
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Enter your crew's legendary name..."
                        value={teamName}
                        onChange={(e) =>{ 
                          localStorage.setItem("teamRegistrations",JSON.stringify({...teamData,teamName:e.target.value}))
                          setTeamName(e.target.value)}}
                        onFocus={() => setFocusedInput("teamName")}
                        onBlur={() => setFocusedInput("")}
                        onMouseEnter={() => setHoveredInput("teamName")}
                        onMouseLeave={() => setHoveredInput("")}
                        className="w-full px-2 py-2 sm:py-3 font-[poppins] text-base sm:text-lg rounded-none bg-transparent text-[#362F1C] border-0 border-b-2 border-[#362F1C]/40 transition-all duration-300 focus:outline-none focus:ring-0 focus:border-[#FFD700] placeholder:text-[#362F1C]/60"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Upload Photo Section */}
                    <div className="pb-4 sm:pb-6">
                      <label className="block font-[poppins] text-[#362F1C] text-lg sm:text-xl mb-2 sm:mb-3 font-bold tracking-wide">
                        UPLOAD PHOTO (OPTIONAL)
                      </label>
                      <div className="relative group">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files[0])}
                          onFocus={() => setFocusedInput("photo")}
                          onBlur={() => setFocusedInput("")}
                          onMouseEnter={() => setHoveredInput("photo")}
                          onMouseLeave={() => setHoveredInput("")}
                          className="w-full px-2 font-[poppins] py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 text-[#362F1C] border-2 border-[#362F1C]/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700] file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-bold file:bg-gradient-to-r file:from-[#FFD700] file:to-[#FFA500] file:text-[#362F1C] hover:file:shadow-lg file:transition-all file:duration-300 hover:file:scale-105"
                        />
                      </div>
                      {isUploading && (
                        <div className="flex items-center justify-center mt-2">
                          <Loader2 className="text-yellow-400 animate-spin mr-2" size={20} />
                          <span className="text-yellow-400 text-sm font-medium">Uploading...</span>
                        </div>
                      )}
                    </div>

                    {/* Full Name */}
                    <div className="pb-2 sm:pb-4">
                      <label className="block font-[poppins] text-[#362F1C] text-lg sm:text-xl font-bold mb-2 sm:mb-3 tracking-wide">
                        FULL NAME *
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          value={currentMember?.name || ""}
                          onChange={(e) => handleMemberChange("name", e.target.value)}
                          placeholder="Enter the pirate's full name..."
                          onFocus={() => setFocusedInput("name")}
                          onBlur={() => setFocusedInput("")}
                          onMouseEnter={() => setHoveredInput("name")}
                          onMouseLeave={() => setHoveredInput("")}
                          className="w-full font-[poppins] px-2 py-2 sm:py-3 text-base sm:text-lg rounded-none bg-transparent text-[#362F1C] border-0 border-b-2 border-[#362F1C]/40 transition-all duration-300 focus:outline-none focus:ring-0 focus:border-[#FFD700] placeholder:text-[#362F1C]/60"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="pb-2 sm:pb-4">
                      <label className="block font-[poppins] text-[#362F1C] text-lg sm:text-xl mb-2 sm:mb-3 font-bold tracking-wide">
                        EMAIL *
                      </label>
                      <div className="relative group">
                        <input
                          type="email"
                          value={currentMember?.email || ""}
                          onChange={(e) => handleMemberChange("email", e.target.value)}
                          placeholder="Enter the pirate's email..."
                          onFocus={() => setFocusedInput("email")}
                          onBlur={() => setFocusedInput("")}
                          onMouseEnter={() => setHoveredInput("email")}
                          onMouseLeave={() => setHoveredInput("")}
                          className="w-full font-[poppins] px-2 py-2 sm:py-3 text-base sm:text-lg rounded-none bg-transparent text-[#362F1C] border-0 border-b-2 border-[#362F1C]/40 transition-all duration-300 focus:outline-none focus:ring-0 focus:border-[#FFD700] placeholder:text-[#362F1C]/60"
                          required
                        />
                      </div>
                    </div>

                    {/* Accommodation Type */}
                    <div className="pb-2 sm:pb-4">
                      <label className="block font-[poppins] text-[#362F1C] text-lg sm:text-xl mb-2 sm:mb-3 font-bold tracking-wide">
                        ACCOMMODATION TYPE *
                      </label>
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <button
                          type="button"
                          onClick={() => handleMemberChange("accommodationType", "dayscholar")}
                          className={`py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-[poppins] font-bold text-sm sm:text-base transition-all duration-300 ${
                            currentMember?.accommodationType === "dayscholar"
                              ? "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#362F1C] shadow-lg transform scale-105"
                              : "bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-[#362F1C] border-2 border-[#362F1C]/20 hover:border-[#FFD700] hover:scale-102"
                          }`}
                        >
                           Day Scholar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMemberChange("accommodationType", "hosteler")}
                          className={`py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-[poppins] font-bold text-sm sm:text-base transition-all duration-300 ${
                            currentMember?.accommodationType === "hosteler"
                              ? "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#362F1C] shadow-lg transform scale-105"
                              : "bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-[#362F1C] border-2 border-[#362F1C]/20 hover:border-[#FFD700] hover:scale-102"
                          }`}
                        >
                           Hosteler
                        </button>
                      </div>
                    </div>

                    {/* Hostel Selection - Only show for hostelers */}
                    {currentMember?.accommodationType === "hosteler" && (
                      <div className="pb-2 sm:pb-4">
                        <label className="block font-[poppins] text-[#362F1C] text-lg sm:text-xl mb-2 sm:mb-3 font-bold tracking-wide">
                          🏢 SELECT HOSTEL *
                        </label>
                        <div className="relative">
                          <select
                            value={currentMember?.hostelName || ""}
                            onChange={(e) => handleMemberChange("hostelName", e.target.value)}
                            className="w-full px-2 py-2 sm:py-3 font-[poppins] text-base sm:text-lg rounded-lg bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 text-[#362F1C] border-2 border-[#362F1C]/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700] appearance-none cursor-pointer"
                            required
                          >
                            <option value="" disabled>Select your hostel...</option>
                            {hostelOptions.map((hostel) => (
                              <option key={hostel} value={hostel} className="bg-white text-[#362F1C]">
                                {hostel}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#362F1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Room Number - Show for both but required validation handled above */}
                    {currentMember?.accommodationType && currentMember?.accommodationType === "hosteler" && (
                      <div className="pb-2 sm:pb-4">
                        <label className="block font-[poppins] text-[#362F1C] text-lg sm:text-xl mb-2 sm:mb-3 font-bold tracking-wide">
                           ROOM NUMBER (OPTIONAL)
                        </label>
                        <div className="relative group">
                          <input
                            type="text"
                            value={currentMember?.roomNumber || ""}
                            onChange={(e) => handleMemberChange("roomNumber", e.target.value)}
                            placeholder={currentMember?.accommodationType === "dayscholar" ? "N/A for Day Scholars" : "Enter room number..."}
                            onFocus={() => setFocusedInput("roomNumber")}
                            onBlur={() => setFocusedInput("")}
                            onMouseEnter={() => setHoveredInput("roomNumber")}
                            onMouseLeave={() => setHoveredInput("")}
                            className="w-full font-[poppins] px-2 py-2 sm:py-3 text-base sm:text-lg rounded-none bg-transparent text-[#362F1C] border-0 border-b-2 border-[#362F1C]/40 transition-all duration-300 focus:outline-none focus:ring-0 focus:border-[#FFD700] placeholder:text-[#362F1C]/60"
                            disabled={currentMember?.accommodationType === "dayscholar"}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="pt-2 sm:pt-4">
                <div className="relative group">
                  <div className="absolute -inset-1 border-2 border-amber-300 bg-red-700 rounded-xl opacity-75 transition-all duration-500"></div>
                  <button
                    type="submit"
                    disabled={isUploading}
                    onMouseEnter={() => setButtonHovered(true)}
                    onMouseLeave={() => setButtonHovered(false)}
                    className="relative w-full font-[poppins] py-3 sm:py-4 text-white text-base sm:text-xl font-bold rounded-xl shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-95"
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
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
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

        /* Mobile-specific styles */
        @media (max-width: 640px) {
          .font-[poppins] {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}

export default Registration;
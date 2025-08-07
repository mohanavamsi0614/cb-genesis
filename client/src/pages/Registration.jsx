import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import bgImg from "../assets/bg.jpg";
import one from "../assets/one.jpg";

const roles = ["Captain", "Navigator", "Fighter", "Developer"];

function Registration() {
  const [step, setStep] = useState(0);
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([
    { name: "", email: "", role: "", image: null },
    { name: "", email: "", role: "", image: null },
    { name: "", email: "", role: "", image: null },
    { name: "", email: "", role: "", image: null },
  ]);
  const [isUploading, setIsUploading] = useState(false);

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
      }, 1000); // simulate upload delay
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      alert("Crew registered successfully!");
      console.log({ teamName, members });
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center px-4 py-12"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div
        className="w-full max-w-4xl rounded-2xl border border-yellow-500/30 shadow-xl p-6 sm:p-10 flex flex-col gap-8 
        "
        style={{ backgroundImage: `url(${one})` }}
      >
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#362F1C] text-center">
          {step === 0 ? "Team Registration" : `Member ${step} Details`}
        </h1>

        {/* Poster */}
        {step > 0 && (
          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative border-2 border-yellow-500 overflow-hidden rounded-md shadow-md bg-black/20 w-full h-64 flex items-center justify-center">
              {isUploading ? (
                <Loader2 className="text-yellow-400 animate-spin" size={28} />
              ) : members[step - 1]?.image ? (
                <img
                  src={members[step - 1].image}
                  alt="Crew Member"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-yellow-400 text-xs sm:text-sm flex items-center justify-center">
                  Upload Photo
                </span>
              )}
            </div>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
          className="space-y-8"
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
                className="w-full px-0 py-2 font-[poppins] text-medium rounded-none bg-transparent text-[#362F1C] border-0 border-b border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-300"
                required
              />
            </div>
          ) : (
            <>
              <div className="pb-2">
                <label className="block font-[poppins] text-[#362F1C] text-xl font-semibold mb-1 ">
                  FULL NAME
                </label>
                <input
                  type="text"
                  value={members[step - 1].name}
                  onChange={(e) => handleMemberChange("name", e.target.value)}
                  placeholder="Enter full name"
                  className="w-full font-[poppins] px-0 py-2 text-medium rounded-none bg-transparent text-[#362F1C] border-0 border-b border-[#362F1C] focus:outline-none focus:ring-0 focus:border-yellow-300"
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
                  className="w-full font-[poppins] px-0 py-2 text-medium rounded-none bg-transparent text-[#362F1C] border-0 border-b border-[#362F1C] focus:outline-none focus:ring-0 focus:border-yellow-300"
                  required
                />
              </div>

              {/* Upload photo at bottom */}
              <div className="pt-4">
                <label className="block font-[poppins] text-[#362F1C] text-xl mb-1 font-semibold">
                  UPLOAD PHOTO (OPTIONAL)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  className="w-full px-0 font-[poppins] py-2 text-medium rounded-none bg-transparent text-[#362F1C] border-0 border-b border-[#362F1C] focus:outline-none focus:ring-0 focus:border-yellow-300 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-500/20 file:text-[#362F1C] hover:file:bg-yellow-500/30"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isUploading}
            className="w-full font-[poppins] mt-8 py-3 bg-gradient-to-r from-red-700 to-red-900 text-white text-lg rounded-lg border-2 border-yellow-500 shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 hover:scale-105 hover:from-red-800 hover:to-red-950 disabled:opacity-50"
          >
            {step === 0
              ? "Member 1"
              : step < 4
              ? `Member ${step + 1}`
              : "Submit Crew"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;

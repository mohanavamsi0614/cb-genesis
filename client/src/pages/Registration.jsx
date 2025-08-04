import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import bgImg from "../assets/bg.jpg";

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
      <div className="w-full max-w-4xl bg-black/60 backdrop-blur-md rounded-2xl border border-yellow-500/30 shadow-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 📜 Left Side (Poster / Team Image) */}
        <div className="flex justify-center items-center relative">
          {/* Show team image when registering team */}
          {step === 0 ? (
            <img
              src="https://m.media-amazon.com/images/I/71FBjNccCML.jpg"
              alt="Team Registration"
              className="w-64 sm:w-80 md:w-full max-h-[600px] rounded-lg shadow-lg"
            />
          ) : (
            <>
              <img
                src="https://claystage.com/wp-content/uploads/one-piece-wanted-poster-template-a3-150dpi.png"
                alt="Wanted Poster"
                className="w-64 sm:w-80 md:w-full max-h-[600px] rounded-lg shadow-lg"
              />
              <div className="absolute w-[40%] h-[32%] top-[24%] left-1/2 -translate-x-1/2 border-2 border-yellow-500 overflow-hidden rounded-md shadow-md bg-black/20 flex items-center justify-center">
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
              <div className="absolute bottom-4 text-yellow-400 text-lg font-bold bg-black/50 px-3 py-1 rounded-lg">
                {members[step - 1]?.name || `Member ${step}`}
              </div>
            </>
          )}
        </div>

        {/* 📝 Right Side (Form) */}
        <div className="flex flex-col justify-center text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-6">
            ⚓ {step === 0 ? "Team Registration" : `Member ${step} Details`}
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className="space-y-6"
          >
            {/* Team Name */}
            {step === 0 && (
              <div>
                <label className="block text-white text-sm mb-2">Team Name</label>
                <input
                  type="text"
                  placeholder="Enter team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 text-white border border-yellow-500/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
            )}

            {/* Member Inputs */}
            {step > 0 && (
              <>
                <div>
                  <label className="block text-white text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    value={members[step - 1].name}
                    onChange={(e) => handleMemberChange("name", e.target.value)}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 rounded-lg bg-black/50 text-white border border-yellow-500/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white text-sm mb-2">Email</label>
                  <input
                    type="email"
                    value={members[step - 1].email}
                    onChange={(e) => handleMemberChange("email", e.target.value)}
                    placeholder="Enter email"
                    className="w-full px-4 py-3 rounded-lg bg-black/50 text-white border border-yellow-500/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white text-sm mb-2">Pirate Role</label>
                  <select
                    value={members[step - 1].role}
                    onChange={(e) => handleMemberChange("role", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-black/50 text-white border border-yellow-500/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  >
                    <option value="">Select role</option>
                    {roles.map((role) => (
                      <option key={role} value={role.toLowerCase()}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm mb-2">Upload Photo (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    className="w-full px-4 py-2 rounded-lg bg-black/50 text-yellow-400 border border-yellow-500/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </>
            )}

            {/* Buttons */}
            <button
              type="submit"
              disabled={isUploading}
              className="w-full py-3 bg-gradient-to-r from-red-700 to-red-900 text-white font-bold text-lg rounded-lg border-2 border-yellow-500 shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 hover:scale-105 hover:from-red-800 hover:to-red-950 disabled:opacity-50"
            >
              {step === 0
                ? "Next → Member 1"
                : step < 4
                ? `Next → Member ${step + 1}`
                : "🏴 Submit Crew"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import bgImg from "../assets/bg.jpg";
import one from "../assets/one.jpg";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { registrationData } = location.state || {};
  const [isUploading, setIsUploading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [preview, setPreview] = useState(null);

  const totalAmount = registrationData ? registrationData.members.length * 350 : 0;

  useEffect(() => {
    const images = [bgImg, one];
    let loaded = 0;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === images.length) {
          setIsLoaded(true);
        }
      };
    });
  }, []);

  const handleImageUpload = (file) => {
    if (file) {
      setPreview(URL.createObjectURL(file)); // Show preview
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Transition */}
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
      <div className="min-h-screen w-full flex items-center justify-center px-4 py-12 relative z-10">
        <div
          className={`relative w-full max-w-xl transition-all duration-1000 delay-300 ${
            isLoaded
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-10 opacity-0 scale-95"
          }`}
        >
          <div
            className="rounded-2xl border border-yellow-500/30 shadow-xl p-6 sm:p-10 relative overflow-hidden"
            style={{
              backgroundImage: `url(${one})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Decorative Corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-[#362F1C] rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-[#362F1C] rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-[#362F1C] rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-[#362F1C] rounded-br-lg" />

            <h2 className="text-4xl text-[#362F1C] font-bold flex items-center justify-center gap-2 mb-4 text-center font-[poppins]">
              Payment
            </h2>

            {registrationData ? (
              <>
                <p className="text-medium font-[poppins] text-[#362F1C] mb-4 text-center">
                  <strong>Info:</strong> Please scan the QR code below to make a payment for:
                </p>

                <div className="text-[#362F1C] font-[poppins] border p-4 rounded-md text-sm mb-4">
                  <p>
                    <strong>Team Name:</strong> {registrationData.teamName}
                  </p>
                  {registrationData.members.map((member, index) => (
                    <p key={index}>
                      <strong>Member {index + 1}:</strong> {member.name || `Member ${index + 1}`} x 350
                    </p>
                  ))}
                  <p className="mt-2 font-bold text-red-600">Total: ₹{totalAmount}</p>
                </div>

                <p className="text-sm font-[poppins] mb-4 text-center">
                  Pay a total of <strong className="text-red-600">₹{totalAmount}</strong> using any UPI app.
                  Provide your UPI ID and Transaction Number for our reference.
                </p>

                {/* QR Section */}
                <div className="font-[poppins] text-center max-w-sm mx-auto p-4 rounded-2xl shadow-lg bg-gradient-to-b from-yellow-50 to-orange-100 border-2 border-yellow-400">
                  <p className="mb-3 text-lg font-bold text-yellow-900">🏴‍☠️ Scan Here To Pay</p>

                  <div className="p-3 rounded-xl bg-white shadow-inner border-4 border-yellow-500 hover:scale-105 transition-transform duration-300">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/8/89/UPI-QR-Code-Example.svg"
                      alt="QR Code"
                      className="w-44 mx-auto rounded-lg"
                    />
                  </div>

                  <p className="mt-3 text-sm text-red-600 font-semibold">⚠ Use Only GPay</p>

                  <button className="mt-3 px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-300">
                    📥 Download QR
                  </button>
                </div>
                <br/>

                {/* Payment Form */}
                <form className="font-[poppins] space-y-6">
                  <div>
                    <label className="block text-sm font-medium">
                      Your UPI ID: <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your UPI ID"
                      className="w-full mt-1 px-2 py-1 border-b border-black bg-transparent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Transaction Number: <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter transaction number"
                      className="w-full mt-1 px-2 py-1 border-b border-black bg-transparent focus:outline-none"
                    />
                  </div>

                  {/* File Upload with Preview */}
                  <div className="pt-4">
                    <label className="block text-sm font-semibold text-[#362F1C] mb-1">
                      TRANSACTION SCREENSHOT: <span className="text-red-600">*</span>
                    </label>
                    {isUploading ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="animate-spin text-yellow-500" size={24} />
                      </div>
                    ) : (
                      <input
                        type="file"
                        required
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files[0])}
                        className="w-full px-0 py-2 border-0 border-b border-[#362F1C] bg-transparent focus:outline-none file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-500/20 file:text-[#362F1C] hover:file:bg-yellow-500/30"
                      />
                    )}

                    {preview && (
                      <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600 mb-2">Preview:</p>
                        <img
                          src={preview}
                          alt="Transaction Preview"
                          className="w-48 mx-auto rounded-lg shadow-md border border-yellow-400"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-8 py-3 bg-gradient-to-r from-red-700 to-red-900 text-white text-lg rounded-lg border-2 border-yellow-500 shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 hover:scale-105 hover:from-red-800 hover:to-red-950 disabled:opacity-50"
                  >
                    Submit Payment
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-red-500">No registration data found.</p>
                <button
                  onClick={() => navigate("/")}
                  className="mt-4 px-4 py-2 bg-black text-white rounded-md"
                >
                  Go to Home
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

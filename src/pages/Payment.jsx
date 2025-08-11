import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bgImg from "../assets/bg.jpg";
import one from "../assets/one.jpg";
import { io } from "socket.io-client";
import axios from "axios";
import Modal from "../Model";
import loadingGif from "../assets/loading.gif";
import doneImg from "/public/1cbd3594bb5e8d90924a105d4aae924c.gif";
import qr1 from "/public/qr1.jpg"
import qr2 from "/public/qr2.jpg"

const socket=io("https://cb-kare-server.onrender.com")
function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { registrationData } = location.state || {};
  const wid = useRef();
  const [imgUrl, setImgUrl] = useState("");
  const [qr,setqr]=useState(qr1)
  const [isLoaded, setIsLoaded] = useState(false);
  const [tran,settran]=useState("")
  const [upiid,setupiid]=useState("")
  const [done,setDone]=useState(false);
  const [isDone, setIsDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = registrationData ? registrationData.members.length * 350 + 350 : 0;

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
   
    let myWidget = cloudinary.createUploadWidget(
          {
            cloudName: "dfseckyjx",
            uploadPreset: "qbvu3y5j",
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Done! Here is the image info: ", result.info);
              setImgUrl(result.info.secure_url);
            } else if (error) {
              console.error("Error during Cloudinary upload:", error);
              alert("here at image " + error);
            }
          }
        );
        wid.current = myWidget;

        socket.emit("check")
        socket.on("see",(res)=>{
          console.log(res)
          if (res=="yes"){
            setDone(true)
          }
        })
  }, []);

    if (done){
    return (
      <div>
        Sorry registration are completed the slots are filled 😓 we hope you will understand 🥺 thanks a lot for your intrest we will get back to you with an update.If your payment was done Please contact this number <b className=" text-red-400">6281605767</b>
      </div>
    )
  }

   function handlesubmit(){
    setLoading(true);
    const teamdata=JSON.parse(localStorage.getItem("teamRegistrations"))
    const data={...teamdata,transactionId:tran,imgUrl:imgUrl,upiId:upiid}
    axios.post("https://cb-kare-server.onrender.com/event/gen/register",data).then((res)=>{
      console.log(res)
      setIsDone(true)
    }).catch((err)=>{
      console.log(err)
      setError("Registration failed. Please try again.")
    }).finally(() => {
      setLoading(false);
    });
    }
  
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
                  {registrationData.lead && (
                    <p>
                      <strong>Lead:</strong> {registrationData.lead.name || "Lead"} x 350
                    </p>
                  )}
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
                  <p className="mb-3 text-lg font-bold text-yellow-900"> Scan Here To Pay</p>

                  <div className="p-3 rounded-xl bg-white shadow-inner border-4 border-yellow-500 hover:scale-105 transition-transform duration-300">
                    <img
                      src={qr}
                      alt="QR Code"
                      className="w-44 mx-auto rounded-lg"
                    />
                  </div>


                  <a href={qr} download><button className="mt-3 px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-300">
                    📥 Download QR
                  </button></a>
                  <button onClick={()=>{
                    if (qr === qr1) {
                      setqr(qr2)
                    }
                    else if (qr === qr2) {
                      setqr(qr1)
                    }
                  }} className="mt-3 px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-300">Try Another QR</button>
                </div>
                <br/>

                {/* Payment Form */}
                  <div>
                    <label className="block text-xl font-medium">
                      Your UPI ID: <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                                            onChange={(e)=>{setupiid(e.target.value)}}
                        value={upiid}
                      placeholder="Enter your UPI ID"
                      className="w-full mt-1 px-2 py-1 border-b border-black bg-transparent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xl">
                      Transaction Number: <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={tran}
                      onChange={(e)=>{settran(e.target.value)}}
                      placeholder="Enter transaction number"
                      className="w-full mt-1 px-2 py-1 border-b border-black bg-transparent focus:outline-none"
                    />
                  </div>

                  {/* File Upload with Preview */}
                  <div className="pt-4">
                    <label className="block text-xl font-semibold text-[#362F1C] mb-1">
                      TRANSACTION SCREENSHOT: <span className="text-red-600">*</span>
                    </label>
                    <div className=" w-full flex justify-center">
                    {imgUrl ? (
                      <button className=" p-3.5  rounded-xl shadow font-semibold bg-yellow-500 text-white font-sans" onClick={() => wid.current.open()}>Re-Upload</button>
                    ) : (
                      <button className=" p-3.5  rounded-xl shadow font-semibold bg-yellow-500 text-white font-sans" onClick={() => wid.current.open()}>Upload</button>
                    )}
                    </div>
                    {imgUrl && (
                      <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600 mb-2">Preview:</p>
                        <img
                          src={imgUrl}
                          alt="Transaction Preview"
                          className="w-48 mx-auto rounded-lg shadow-md border border-yellow-400"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    className="w-full mt-8 py-3 bg-gradient-to-r from-red-700 to-red-900 text-white text-lg rounded-lg border-2 border-yellow-500 shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 hover:scale-105 hover:from-red-800 hover:to-red-950 disabled:opacity-50"
                  onClick={handlesubmit}
                  >
                    Submit Payment
                  </button>
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
      {(loading || isDone || error) && (
        <Modal isLoading={loading}>
          {loading && (
            <div className="flex flex-col items-center justify-center py-8">
              <img src={loadingGif} alt="Loading..." className="w-24 h-24 mb-4 animate-spin" />
              <p className="text-xl font-bold text-yellow-700">Processing Payment...</p>
            </div>
          )}
          {isDone && (
            <div className="modal-content flex flex-col items-center justify-center py-8">
              <img src={doneImg} alt="Success" className="w-24 h-24 mb-4" />
              <p className="text-xl font-bold text-green-700">Registration successful!</p>
              <p className="font-mono w-full text-center mb-2">
                Please check your inbox for the confirmation mail.<br />Thank you!
              </p>
              <Link to="/">
                <button className="bg-[#E16254] w-24 p-4 text-white rounded mt-5">Home</button>
              </Link>
            </div>
          )}
          {error && (
            <div className="modal-content flex flex-col items-center justify-center py-8">
              <p className="text-xl font-bold text-red-500 mb-2">Error</p>
              <p className="w-full font-serif text-center mb-2">Registration failed. Please Contact <b>6281605767</b>.</p>
              <button
                onClick={() => setError("")}
                className="bg-[#E16254] w-24 p-4 text-white rounded mt-5"
              >
                Close
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

export default Payment;

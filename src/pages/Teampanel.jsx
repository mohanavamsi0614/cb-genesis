import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { api } from "../api";
import Webcam from "react-webcam";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import member from "../assets/members.png";
import atte from "../assets/atten.png";
import prob from "../assets/probl.png";
import lead from "../assets/leader.png";
import upd from "../assets/problem.png"
import NoNotification from '../assets/notificationzero.webp'
import toast from "react-hot-toast";
import { CheckCircle, XCircle, LogOut, Loader2 } from "lucide-react";

const socket = io(api);

function Teampanel() {
  const webcamRef = useRef(null);
  const [auth, setAuth] = useState(sessionStorage.getItem("pass") || false);
  const [pass, setPass] = useState(sessionStorage.getItem("pass") || "");
  const [leaderboard, setLeaderboard] = useState([]);
  const [team, setTeam] = useState({ lead: {}, members: [], problem: null });
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState({});
  const [currAttd, setCurrAttd] = useState(3);
  const [loading, setLoading] = useState(true);
  const [groupPhoto, setGroupPhoto] = useState("");
  const groupWebcamRef = useRef(null);
  const [problems, setProblems] = useState([]);
  const [problemModal, setProblemModal] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [hasNewUpdate, setHasNewUpdate] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [EventUp, setEventUp] = useState("");

  useEffect(() => {
    Promise.all([check(), getLeaderboard(), getProblems()]).finally(() =>
      setLoading(false)
    );

    socket.on("eventupdates", (text) => {
      if (text != "") {
        setEventUp(text);
        setHasNewUpdate(true);
        setNotificationVisible(true);
        try {
          new Notification("Event Update", {
            body: "Check your teampanel",
            icon: "./KARE(latest).png",
          });
        } catch {
          console.log("not supported");
        }
        setTimeout(() => {
          setNotificationVisible(false);
        }, 10000);
      }
    });

    socket.on("team", (team) => setTeam(team));
    socket.on("currAttd", (num) => setCurrAttd(num));
    socket.on("leaderboard", (data) => setLeaderboard(data));
    socket.emit("getCurrAttd");
  }, []);

  const getLeaderboard = async () => {
    try {
      const res = await axios.get(`${api}/event/teams`);
      const data = res.data;
      setLeaderboard(
        data.sort((a, b) => b.HuntScore - a.HuntScore).slice(0, 10)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getProblems = async () => {
    try {
      const res = await axios.get(`https://cb-kare-server-1.onrender.com/event/problems`);
      setProblems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const check = async () => {
    if (!pass) return;
    try {
      const res = await axios.get(`${api}/genisis/${pass}`);
      setAuth(true);
      setTeam(res.data);
      socket.emit("join", res.data.teamName);
      sessionStorage.setItem("pass", pass);
    } catch (err) {
      alert("Wrong Password");
    }
  };

  const confirmProblem = async () => {
    try {
      const res = await axios.post(
        `https://cb-kare-server-1.onrender.com/event/problems/select/${team._id}/${selectedProblem._id}`
      );
      setTeam(res.data);
      setProblemModal(false);

      toast.success("Problem selected successfully!", {
        icon: <CheckCircle className="text-green-500" size={24} />,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong", {
        icon: <XCircle className="text-red-500" size={24} />,
      });
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      if (sectionId === "event-updates") {
        setHasNewUpdate(false);
        setNotificationVisible(false);
      }
    }
  };

  const NotificationBell = () => (
    <div
      className={`fixed bottom-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black 
                      p-4 rounded-lg shadow-lg z-50 flex items-center gap-3 cursor-pointer
                      transform transition-all duration-300 ${
                        notificationVisible
                          ? "translate-x-0 opacity-100"
                          : "translate-x-full opacity-0"
                      }`}
      onClick={() => scrollToSection("event-updates")}
    >
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 animate-swing"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
          1
        </span>
      </div>
      <div>
        <p className="font-bold">New Update!</p>
        <p className="text-sm">Click to view</p>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      await check();        
      await getLeaderboard(); 
      await getProblems();    

      // Fetch selected problem for the team
      if (team._id) {
        try {
          const res = await axios.get(`https://cb-kare-server-1.onrender.com/event/problems/team/${team._id}`);
          if (res.data.problem) {
            setTeam((prev) => ({
              ...prev,
              problem: { title: res.data.problem},
            }));
          }
        } catch (err) {
          console.error("Error fetching team problem:", err);
        }
      }
    };

    fetchData();
  }, [team._id]);

  if (loading) return <LoadingPage />;
  if (!auth) return <LoginPage pass={pass} setPass={setPass} check={check} />;


  return (
    <div className="bg-gradient-to-br text-amber-50">
      {/* Header with Logo and Logout */}
      <div className="bg-black border-b-3  p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              style={{display:"none"}}
              src="./KARE(latest).png"
              className="w-16 h-16 rounded-full border-4 border-yellow-400 shadow-lg"
              alt="KARE Logo"
            />
            <div>
              <img
                src="./title.png"
                className="w-36 h-12 object-contain mb-2"
                alt="Title"
              />
              <h1 className="text-2xl text-yellow-400 font-extrabold tracking-wider">
                {/* Crew Dashboard */}
              </h1>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-orange-500 text-black font-extrabold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[url('./assets/latest.png')] bg-[#FFF7E6]/90 p-6 space-y-8">
        {/* Team Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl text-[#1A1A1A] font-extrabold">
            {team.teamName}
          </h1>
          <span className="bg-yellow-400 font-semibold text-black px-4 py-2 rounded-full shadow-md">
            Current Attendance: {currAttd}
          </span>
        </div>

        {/* Team Members */}
        <motion.div
          id="team"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#e3ba82] rounded-2xl p-6 border-2 border-yellow-500 font-[poppins]"
        >
          <h2 className="text-xl text-[#34211A] font-bold mb-4 flex items-center gap-2">
            <img src={member} className="w-14" alt="Team" /> Team Members
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {team.lead?.name && <MemberCard member={team.lead} role="Lead" />}
            {team.members?.map((m, idx) => (
              <MemberCard key={idx} member={m} />
            ))}
          </div>
        </motion.div>

        {/* Attendance */}
        <motion.div
          id="attendance"
          className="bg-[#e3ba82] rounded-2xl p-6 border-2 border-yellow-500 font-[poppins]"
        >
          <h2 className="text-xl text-[#34211A] font-bold mb-4 flex items-center gap-2">
            <img src={atte} className="w-14" alt="Attendance" /> Attendance
          </h2>
          <AttendanceTable
            team={team}
            currAttd={currAttd}
            setOpen={setOpen}
            setNow={setNow}
          />
        </motion.div>

        {/* Problem Section */}
        <motion.div
          id="problem"
          className="bg-[#e3ba82] rounded-2xl p-6 border-2 border-yellow-500 font-[poppins] max-h-[90vh] overflow-y-auto"
        >
          <h2 className="text-xl text-[#34211A] font-bold mb-4 flex items-center gap-2">
            <img src={prob} className="w-14" alt="Problem" /> Problem Statement
          </h2>

          {team.problem ? (
            <div>
              <h3 className="text-[#34211A] font-semibold">
                Selected: {team?.problem?.title?.title}
              </h3>
              <p className="text-gray-600">{team?.problem?.title?.description}</p>
            </div>
          ) : (
            <div className="space-y-4 font-black text-2xl">
              Loading...
            </div>
          )}
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          id="leaderboard"
          className="bg-[#e3ba82] text-[#34211A] rounded-2xl p-6 border-2 border-yellow-500 font-[poppins]"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <img src={lead} className="w-14" alt="Leaderboard" /> Leaderboard
          </h2>
          <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leaderboard}>
                <XAxis 
                  dataKey="teamName" 
                  stroke="#92400e"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#92400e" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#451a03',
                    color: '#fbbf24',
                    border: '2px solid #eab308',
                    borderRadius: '12px',
                    fontWeight: '600'
                  }}
                  cursor={{ fill: 'rgba(251, 191, 36, 0.1)' }}
                />
                <Bar 
                  dataKey="HuntScore" 
                  fill="#fbbf24"
                  radius={[6, 6, 0, 0]}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              </BarChart>
            </ResponsiveContainer>
        </motion.div>

        {/* Event Updates Section */}
        <motion.div
          id="event-updates"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#e3ba82] bg-blend-overlay rounded-2xl p-6 border border-yellow-500/20 font-[poppins]"
        >
              <h2 className="text-xl text-[#34211A] font-semibold mb-4">
              <img src={upd} className="w-16 inline" alt="Event Updates" />{" "}
                EVENT UPDATES
                {hasNewUpdate && (
                  <span className="inline-block ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                    New!
                  </span>
                )}
              </h2>
            <div className="h-full md:h-64 overflow-y-auto rounded-lg p-4 bg-black/10 text-[#1A1A1A] flex items-center justify-center">
            {EventUp && EventUp.trim() ? (
              <div dangerouslySetInnerHTML={{ __html: EventUp }} className="w-full" />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-600">
                <img
                  src={NoNotification}
                  alt="No Updates"
                  className="w-52 h-42 opacity-80 mb-2"
                />
                <p className="font-medium">No new updates</p>
              </div>
            )}
          </div>

        </motion.div>

        {/* Notification Bell */}
        <NotificationBell />
      </div>


      {/* Webcam Modal */}
      <Model open={open} mem={now} setOpen={setOpen} setTeam={setTeam} />

      {/* Problem Confirmation Modal */}
      {problemModal && selectedProblem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-[#FFF7E6] p-6 rounded-2xl shadow-2xl w-[400px] text-center border-2 border-yellow-500">
            <h1 className="text-xl font-bold mb-4 text-[#1A1A1A]">
              Are you sure you want to select?
            </h1>
            <p className="mb-4">
              Problem:{" "}
              <span className="font-semibold">{selectedProblem.title}</span>
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={confirmProblem}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
              >
                Confirm
              </button>
              <button
                onClick={() => setProblemModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MemberCard({ member = {}, role }) {
  if (!member?.name) return null; 
  
  const emailNumber = member.email?.split("@")[0] || "";

  return (
    <div className="bg-[#2E1807] rounded-xl p-4 shadow-lg flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold">
        {member.name[0]}
      </div>
      <div>
        <h3 className="font-semibold">{member.name}</h3>
        <p className="text-sm text-gray-400">{role || "Member"} - {emailNumber||member.email}</p>
      </div>
    </div>
  );
}

function AttendanceTable({ team, currAttd, setOpen, setNow }) {
  const [attendances] = useState([
    "firstAttd",
    "secondAttd",
    "thirdAttd",
    "fourthAttd",
  ]);

  return (
    <table className="min-w-full divide-y text-[#1A1A1A] text-sm">
      <thead>
        <tr className="bg-yellow-400 border-1 text-black font-semibold">
          <th className="px-4 py-2">Name</th>
          {[1, 2, 3, 4].map((n) => {
            let suffix;
            if (n === 1) suffix = "st";
            else if (n === 2) suffix = "nd";
            else if (n === 3) suffix = "rd";
            else suffix = "th";

            return (
              <th key={n} className="px-4 py-2">
                {n}{suffix} Attd
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {[team.lead, ...(Array.isArray(team.members) ? team.members : [])].map(
        (m, idx) => (
          <tr key={idx} className="bg-[#FFF7E6]/70">
            <td className="border px-4 py-2 font-medium">{m?.name || "N/A"}</td>
            {[1, 2, 3, 4].map((n) => (
              <td key={n} className="border px-4 py-2 text-center">
                {m?.[attendances[n - 1] + "Status"] ? (
  m[attendances[n - 1] + "Status"] === "present" ? (
    <CheckCircle className="text-green-600 mx-auto" size={22} />
  ) : (
    <XCircle className="text-red-500 mx-auto" size={22} />
  )
                ) : m?.[attendances[n - 1] + "Img"] ? (
                  <p className="text-yellow-600 font-semibold">Pending...</p>
                ) : currAttd === n ? (
                  <button
                    onClick={() => {
                      setNow({
                        ...m,
                        id: team._id,
                        type: attendances[n - 1] + "Img",
                      });
                      setOpen(true);
                    }}
                    className="bg-[#E63946] px-3 py-1 rounded-lg text-white font-semibold hover:bg-[#C53030] transition"
                  >
                    Open
                  </button>
                ) : (
                  <span className="text-gray-600">Closed</span>
                )}
              </td>
            ))}
          </tr>
        )
      )}
      </tbody>
    </table>
  );
}

function Model({ mem, open, setOpen, setTeam }) {
  const webcamRef = useRef(null);

  const attdCapture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const formData = new FormData();
    formData.append("file", imageSrc);
    formData.append("upload_preset", "qbvu3y5j");

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dfseckyjx/image/upload`,
      formData
    );

    let data = await axios.post(`${api}/genisis/attd/${mem.id}/${mem.name}`, {
      img: res.data.secure_url,
      type: mem.type,
    });
    data = data.data;
    setTeam(data);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-[400px] text-center">
        <h1 className="text-xl font-bold mb-4 text-white">
          Mark Attendance: {mem.name}
        </h1>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-xl mb-4"
        />
        <div className="flex gap-3 justify-center">
          <button
            onClick={attdCapture}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
          >
            Capture & Upload
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function LoginPage({ pass, setPass, check }) {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-[#0a0f2c] via-[#13233f] to-[#0a0f2c]">
      <div className="bg-[#1b2a49]/90 rounded-2xl p-10 shadow-2xl border-2 border-yellow-500 w-[420px] h-[400px] flex flex-col justify-center">
        <h1 className="text-4xl text-yellow-400 mb-8 font-bold text-center">
          Crew Login
        </h1>
        <input
          type="text"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Enter password..."
          className="w-full p-4 mb-6 rounded-lg bg-[#13233f] text-white border border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={check}
          className="w-full bg-[#E63946] hover:bg-[#C53030] text-white font-bold py-3 rounded-xl transition text-lg"
        >
          Enter
        </button>
      </div>
    </div>
  );
}


function LoadingPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
      <Loader2/>
      <h1 className="text-2xl text-yellow-400 font-bold">Loading...</h1>
    </div>
  );
}

export default Teampanel;

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { api } from "../api";
import Webcam from "react-webcam";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const socket = io(api);

function Teampanel() {
  const webcamRef = useRef(null);
  const [auth, setAuth] = useState(sessionStorage.getItem("pass") || false);
  const [pass, setPass] = useState(sessionStorage.getItem("pass") || "");
  const [leaderboard, setLeaderboard] = useState([]);
  const [team, setTeam] = useState([]);
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState({});
  const [currAttd, setCurrAttd] = useState(3);
  const [loading, setLoading] = useState(true);
    // Group photo state
  const [groupPhoto, setGroupPhoto] = useState("");
  const groupWebcamRef = useRef(null);



  useEffect(() => {
    Promise.all([check(), getLeaderboard()]).finally(() => setLoading(false));

    socket.on("team", (team) => setTeam(team));
    socket.on("currAttd", (num) => setCurrAttd(num));
    socket.on("leaderboard", (data) => setLeaderboard(data));
  }, []);

  const getLeaderboard = async () => {
    try {
      const res = await axios.get(`${api}/event/teams`);
      const data = res.data;
      setLeaderboard(data.sort((a, b) => b.HuntScore - a.HuntScore).slice(0, 10));
    } catch (err) {
      console.log(err);
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
      console.log(err);
      alert("Wrong Password");
    }
  };

  if (loading) return <LoadingPage />;
  if (!auth) return <LoginPage pass={pass} setPass={setPass} check={check} />;

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0a0f2c] via-[#13233f] to-[#0a0f2c] text-white">
      {/* Sidebar */}
      <div className="w-72 bg-black/80 p-8 border-r-2 border-yellow-500/30 flex flex-col justify-between shadow-2xl rounded-r-3xl">
        <div>
          <div className="flex flex-col items-center mb-6">
            <img src="./KARE(latest).png" className="w-20 h-20 rounded-full border-4 border-yellow-400 shadow-lg mb-2" alt="KARE Logo" />
            <img src="./title.png" className="w-40 h-14 object-contain" alt="Title" />
          </div>
          <h1 className="text-3xl font-pirates text-yellow-400 mb-8 text-center drop-shadow-lg tracking-wide">Crew Dashboard</h1>
          <nav className="space-y-6">
            <a href="#team" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 hover:bg-yellow-400 hover:text-black transition-all">
              <img src="./team.png" className="w-8 h-6" alt="Team" /> <span className="font-bold">Team</span>
            </a>
            <a href="#attendance" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 hover:bg-yellow-400 hover:text-black transition-all">
              <img src="./attd.png" className="w-6 h-6" alt="Attendance" /> <span className="font-bold">Attendance</span>
            </a>
            <a href="#leaderboard" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 hover:bg-yellow-400 hover:text-black transition-all">
              <span className="text-2xl">🏆</span> <span className="font-bold">Leaderboard</span>
            </a>
            <a href="#problem" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 hover:bg-yellow-400 hover:text-black transition-all">
              <span className="text-2xl">📜</span> <span className="font-bold">Problem</span>
            </a>
          </nav>
        </div>
        <button onClick={() => { sessionStorage.clear(); window.location.reload(); }} className="bg-gradient-to-r from-red-600 to-yellow-400 text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all mt-8">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{team.teamName}</h1>
          <span className="bg-yellow-400 text-black px-4 py-2 rounded-full">
            Current Attendance: {currAttd}
          </span>
        </div>

    

        <motion.div id="team" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-black/40 rounded-2xl p-6 border border-yellow-500/20">
          <h2 className="text-xl font-bold mb-4"><img src="./team.png" className="w-8 h-8 inline" alt="Team" /> Team Members</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <MemberCard member={team.lead} role="Lead" />
            {team.members.map((m, idx) => <MemberCard key={idx} member={m} />)}
          </div>
        </motion.div>

        {/* Attendance */}
        <motion.div id="attendance" className="bg-black/40 rounded-2xl p-6 border border-yellow-500/20">
          <h2 className="text-xl font-bold mb-4"><img src="./attd.png" className="w-8 h-8 inline" alt="Attendance" /> Attendance</h2>
          <AttendanceTable team={team} currAttd={currAttd} setOpen={setOpen} setNow={setNow} />
        </motion.div>

        {/* Problem Statement */}
        <motion.div id="problem" className="bg-black/40 rounded-2xl p-6 border border-yellow-500/20">
          <h2 className="text-xl font-bold mb-4">📜 Problem Statement</h2>
          <p>{team.problem || "No problem statement assigned yet."}</p>
        </motion.div>

        {/* Leaderboard */}
        <motion.div id="leaderboard" className="bg-black/40 rounded-2xl p-6 border border-yellow-500/20">
          <h2 className="text-xl font-bold mb-6">🏆 Leaderboard</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leaderboard}>
              <XAxis dataKey="teamName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="HuntScore" fill="#FFD700" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Webcam Modal */}
      <Model open={open} mem={now} setOpen={setOpen} setTeam={setTeam} />
    </div>
  );
}

function MemberCard({ member, role }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-lg flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold">
        {member.name?.[0]}
      </div>
      <div>
        <h3 className="font-bold">{member.name}</h3>
        <p className="text-sm text-gray-300">{role || "Member"}</p>
      </div>
    </div>
  );
}

function AttendanceTable({ team, currAttd, setOpen, setNow }) {
    const [attendances, setAttendances] = useState(["firstAttd", "secondAttd", "thirdAttd", "fourthAttd"]);

  return (
    <table className="min-w-full divide-y divide-gray-700 text-sm">
      <thead>
        <tr className="bg-yellow-400 text-black">
          <th className="px-4 py-2">Name</th>
          {[1, 2, 3, 4].map((n) => (
            <th key={n} className="px-4 py-2">{n}st Attd</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[team.lead, ...team.members].map((m, idx) => (
          <tr key={idx}>
            <td className="border px-4 py-2">{m.name}</td>
            {[1, 2, 3, 4].map((n) => (
              <td key={n} className="border px-4 py-2 text-center">
              {m[attendances[n-1]+"Status"] ? (<span className={`${m[attendances[n-1]+"Status"  ]=='present' ? "text-green-500" : "text-red-400"}`}>{m[attendances[n-1]+"Status"]}</span>)
               : m[attendances[n-1]+"Img"] ? (<p>Pending...</p>)
                : (currAttd === n
                  ? <button onClick={() => { setNow({ ...m, id: team._id, type: attendances[n-1]+"Img" }); setOpen(true); }} className="bg-green-600 px-2 py-1 rounded hover:bg-green-700">Open</button>
                  : <span className="text-gray-400">Closed</span>)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Model({ mem, open, setOpen,setTeam }) {
  const webcamRef = useRef(null);

  const attdCapture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const formData = new FormData();
    formData.append("file", imageSrc);
    formData.append("upload_preset", "qbvu3y5j");

    const res = await axios.post(`https://api.cloudinary.com/v1_1/dfseckyjx/image/upload`, formData);

   let data= await axios.post(`${api}/genisis/attd/${mem.id}/${mem.name}`, { img: res.data.secure_url,type:mem.type });
   data=data.data
   setTeam(data)
   setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-[400px] text-center">
        <h1 className="text-xl font-bold mb-4 text-white">Mark Attendance: {mem.name}</h1>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="rounded-xl mb-4" />
        <div className="flex gap-3 justify-center">
          <button onClick={attdCapture} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white">Capture & Upload</button>
          <button onClick={() => setOpen(false)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function LoginPage({ pass, setPass, check }) {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-[#0a0f2c] via-[#13233f] to-[#0a0f2c]">
      <div className="bg-[#1b2a49]/80 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-pirates text-yellow-400 mb-6">Crew Login</h1>
        <input type="text" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter password..."
          className="w-full p-3 mb-4 rounded bg-[#13233f] text-white border border-yellow-400/40" />
        <button onClick={check} className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg">Enter</button>
      </div>
    </div>
  );
}

function LoadingPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
      <img src="./loading.gif" alt="Loading" className="w-24 h-24 mb-6 animate-spin" />
      <h1 className="text-2xl text-yellow-400 font-bold">Loading...</h1>
    </div>
  );
}

export default Teampanel;
import axios from "axios";
import { useEffect, useState } from "react";
import PaymentCard from "../../comp/verify";

function Admin(){
    const [teams,setteams]=useState([])
    const [auth,setauth]=useState(false)
    const [pass,setpass]=useState("")
    useEffect(()=>{
        axios.get("https://cb-kare-server.onrender.com/event/teams").then((res)=>{setteams(res.data)})
    },[])
        if (!auth){
            return(
                <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0f2c] via-[#13233f] to-[#0a0f2c]">
                    <div className="bg-[#1b2a49]/80 rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-xs border-2 border-[#FFD700]/30">
                        <h2 className="text-2xl font-bold text-[#FFD700] mb-6 drop-shadow">Admin Login</h2>
                        <input 
                            type="text" 
                            placeholder="Enter password"  
                            onChange={(e)=>setpass(e.target.value)} 
                            className="w-full p-3 mb-4 rounded-lg border-2 border-[#FFD700]/40 bg-[#13233f] text-white focus:outline-none focus:border-[#FFD700] transition-all"/>
                        <button 
                            onClick={()=>{if(pass=="cbkluit"){setauth(true)}}} 
                            className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFB300] text-[#0a0f2c] font-bold py-2.5 rounded-lg shadow-lg hover:scale-105 transition-all">
                            Login
                        </button>
                    </div>
                </div>
            )
        }
    return(
        <div className="w-full min-h-screen bg-gradient-to-b font-sans from-[#0a0f2c] via-[#13233f] to-[#0a0f2c] flex flex-col items-center py-8 px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#FFD700] mb-8 text-center drop-shadow-lg">Welcome to Genesis Admin Portal</h1>
            <h1 className=" text-white text-2xl text-left">count:{teams.length}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
                
                {teams.map((team,index)=>{
                    return(
                        <PaymentCard key={index} team={team}/>
                    )
                })}
            </div>
        </div>
    )
        return(
            <div className="w-full min-h-screen bg-gradient-to-b font-sans from-[#0a0f2c] via-[#13233f] to-[#0a0f2c] flex flex-col items-center py-8 px-4">
                <div className="w-full max-w-5xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-bold text-[#FFD700] mb-8 text-center drop-shadow-lg tracking-wide">Welcome to Genesis Admin Portal</h1>
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-white text-xl sm:text-2xl font-semibold">Total Teams: <span className="text-[#FFD700]">{teams.length}</span></span>
                        <span className="text-white text-lg">{new Date().toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
                        {teams.map((team,index)=>{
                            return(
                                <div className="transition-transform duration-300 hover:scale-105">
                                    <PaymentCard key={index} team={team}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
}
export default Admin;
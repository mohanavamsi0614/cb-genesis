import axios from "axios";
import { useEffect, useState } from "react";
import PaymentCard from "../../comp/verify";

function Admin(){
    const [teams,setteams]=useState([])
    useEffect(()=>{
        axios.get("https://cb-kare-server.onrender.com/event/teams").then((res)=>{setteams(res.data)})
    },[])
    return(
        <div className="w-full min-h-screen bg-gradient-to-b from-[#0a0f2c] via-[#13233f] to-[#0a0f2c] flex flex-col items-center py-8 px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#FFD700] mb-8 text-center drop-shadow-lg">Welcome to Genesis Admin Portal</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {teams.map((team,index)=>{
                    return(
                        <PaymentCard key={index} team={team}/>
                    )
                })}
            </div>
        </div>
    )
}
export default Admin;
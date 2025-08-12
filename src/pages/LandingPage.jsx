  const formatCountdown = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };
import React from "react";
import logo from '../assets/logo.png';
import { useState, useEffect } from "react";
import kareLogo from "../assets/klulogo.png";
import cbLogo from "../assets/codingBlocks.png";
import { Link } from "react-router-dom";
import one from "../assets/one.jpg";
import title from "../assets/title.png";
import oda from "../assets/oda.png";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Registration logic
  const [showRegister, setShowRegister] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Set target time to today at 6 PM
    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 0, 0, 0);
    const updateCountdown = () => {
      const diff = target - new Date();
      if (diff > 0) {
        setCountdown(diff);
        setShowRegister(false);
      } else {
        setCountdown(0);
        setShowRegister(true);
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const bounceVariants = {
    bounce: {
      y: [0, -20, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f2c]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Loader2 className="animate-spin w-12 h-12 text-yellow-400" />
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div 
        className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0f2c] via-[#13233f] to-[#0a0f2c]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        
        {/* Background */}
        <div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://preview.redd.it/w6fgwb1gmu481.png?width=3282&format=png&auto=webp&s=35baacf18504c303c58b4c9f3db5000325179e70')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Animated Floating Treasure Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#FFD700] rounded-full opacity-60"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.5, 1], 
                  opacity: [0.6, 1, 0.6],
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen px-4 py-8">
          <motion.div 
            className="max-w-6xl mx-auto space-y-8"
            variants={containerVariants}
          >
            
            {/* Main Hero Section */}
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              {/* Main Box */}
              <div 
                className="relative bg-gradient-to-br from-[#1b2a49]/70 to-[#13233f]/80 backdrop-blur-xl rounded-2xl border-2 border-[#362F1C]/40 shadow-[0_0_40px_rgba(255,215,0,0.15)] overflow-hidden"
                style={{ backgroundImage: `url(${one})` }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 60px rgba(255,215,0,0.25)"
                }}
                transition={{ duration: 0.3 }}
              >
                
                {/* Animated Decorative Corners */}
                {[
                  { position: "top-4 left-4", borders: "border-l-2 border-t-2", corners: "rounded-tl-lg" },
                  { position: "top-4 right-4", borders: "border-r-2 border-t-2", corners: "rounded-tr-lg" },
                  { position: "bottom-4 left-4", borders: "border-l-2 border-b-2", corners: "rounded-bl-lg" },
                  { position: "bottom-4 right-4", borders: "border-r-2 border-b-2", corners: "rounded-br-lg" }
                ].map((corner, i) => (
                  <motion.div 
                    key={i}
                    className={`absolute ${corner.position} w-6 h-6 ${corner.borders} border-[#362F1C] ${corner.corners}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  />
                ))}

                <div className="p-6 sm:p-12 text-center">
                  {/* Logos */}
                  <motion.div 
                    className="relative mb-1 flex justify-center items-center"
                    variants={itemVariants}
                  >
                    <div className="relative flex justify-between items-center w-full">
                      <div 
                        className="relative w-16 h-16 sm:w-25 sm:h-25 mx-auto"
                        variants={floatVariants}
                        animate="float"
                      >
                        <img src={kareLogo} alt="KARE" className="w-full h-full object-contain" />
                      </div>
                      <div 
                        className="relative w-18 h-18 sm:w-24 sm:h-24 mx-auto"
                        variants={pulseVariants}
                        animate="pulse"
                      >
                        <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                      </div>
                      <div 
                        className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-black"
                        variants={floatVariants}
                        animate="float"
                      >
                        <img src={cbLogo} alt="CB" className="w-full h-full object-contain rounded-full" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.div 
                    className="mb-6"
                    variants={itemVariants}
                  >
                    <motion.div 
                      className="flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8, duration: 0.8, type: "spring", bounce: 0.4 }}
                    >
                      <img className="w-1/2 sm:w-1/3" src={title} alt="title_img" />
                    </motion.div>                  
                    <motion.div 
                      className="w-32 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mb-4"
                      initial={{ width: 0 }}
                      animate={{ width: 128 }}
                      transition={{ delay: 1, duration: 1 }}
                    />
                    <motion.p 
                      className="text-[#362F1C] text-xl sm:text-3xl font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                    >
                      Grand Line AI Hackathon 2025
                    </motion.p>
                  </motion.div>

                  {/* Description */}
                  <motion.div 
                    className="mb-8"
                    variants={itemVariants}
                  >
                    <motion.p 
                      className="font-[poppins] font-semibold text-[#362F1C] text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                    >
                      Embark on an epic coding adventure across the digital seas!
                      <br />
                      <span className="text-[#362F1C] font-semibold">Join crews, conquer challenges, and claim your treasure!</span>
                    </motion.p>
                  </motion.div>

                  {/* Stats */}
                  <motion.div 
                    className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 font-[poppins]"
                    variants={itemVariants}
                  >  
                    {[
                      { value: "24h", label: "Adventure Time" },
                      { value: "₹15k+", label: "Treasure Pool" },
                      { value: "50+", label: "Pirates Team" },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        className="bg-[#0d1628]/60 backdrop-blur-sm rounded-md p-3 sm:p-4 border border-[#FFD700]/30 shadow-md w-[120px] sm:w-[140px] text-center"
                        initial={{ scale: 0, rotateY: 90 }}
                        animate={{ scale: 1, rotateY: 0 }}
                        transition={{ 
                          delay: 1.6 + i * 0.2, 
                          duration: 0.6,
                          type: "spring",
                          bounce: 0.4
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 0 20px rgba(255,215,0,0.3)"
                        }}
                      >
                        <div className="text-lg sm:text-xl font-bold text-[#FFFFFF]">{stat.value}</div>
                        <div className="text-white/60 text-xs sm:text-sm">{stat.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Register Button or Countdown Timer */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
                    variants={itemVariants}
                  >
                    {showRegister ? (
                      <Link to="/register">
                        <motion.button 
                          className="group relative px-10 py-5 bg-gradient-to-r from-[#b71c1c] to-[#d32f2f] text-white font-bold text-xl sm:text-2xl rounded-full border-2 border-[#FFD700] shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            delay: 2.2, 
                            duration: 0.8,
                            type: "spring",
                            bounce: 0.5
                          }}
                          whileHover={{ 
                            scale: 1.1,
                            boxShadow: "0 0 30px rgba(255,215,0,0.5)"
                          }}
                          whileTap={{ scale: 0.95 }}
                          variants={bounceVariants}
                        >
                          <span className="z-10 flex justify-center items-center gap-3 w-full cursor-pointer">
                            REGISTER NOW
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 to-[#FF4500]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.button>
                      </Link>
                    ) : (
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-[poppins] sm:text-2xl   text-[#362f1c] mb-2">Registration opens at 1:00 PM</span>
                        <span className="text-xl font-[poppins] sm:text-2xl text-white bg-[#0d1628]/60 px-6 py-2 rounded-full border border-[#FFD700]/30 shadow-md">Countdown: {formatCountdown(countdown)}</span>
                      </div>
                    )}
                  </motion.div>
                  <div className=" w-full flex justify-center"><p className=" border w-26 font-sans p-2 text-center font-bold">Only For IT</p></div>
                </div>
                
                {/* Oda Image */}
                <motion.div 
                  className="absolute bottom-4 right-4 w-16 sm:w-24 md:w-32"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 3, duration: 1, type: "spring" }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <img src={oda} alt="oda" className="w-full h-auto" />
                </motion.div>
              </div>
            </motion.div>

            {/* About the Event Section */}
            <div 
              className="bg-gradient-to-br from-[#0b3075] to-[#dfc48f] backdrop-blur-xl rounded-2xl border-2 border-[#fefefe]/40 shadow-[0_0_40px_rgba(255,215,0,0.15)] p-6 sm:p-8"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2 
                className="text-2xl sm:text-3xl font-bold text-[#FFD700] mb-6 text-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              >
                 About the Event
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
  "Choose Your Domain: Pick from a curated set of domains revealed at the event",
  "Identify a Real-World Problem: Find a challenge worth solving in your chosen domain",
  "Integrate Generative AI: Use cutting-edge AI tools to power your solution",
  "Innovate & Build: Turn your ideas into impactful, working prototypes",
  "Collaborate & Compete: Team up, share ideas, and push creative boundaries",
  "Showcase Your Impact: Present your AI-powered creation to judges and peers"
]

.map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="bg-[#0d1628]/60 backdrop-blur-sm rounded-lg p-4 border border-[#FFD700]/20"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(13, 22, 40, 0.8)"
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <motion.span 
                        className="text-[#FFD700] font-bold text-lg"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                      >
                        {i + 1}.
                      </motion.span>
                      <p className="text-white font-[poppins] text-sm sm:text-base leading-relaxed">{item}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Event Structure Section */}
            <div 
              className="bg-gradient-to-br from-[#0b3075] to-[#dfc48f] backdrop-blur-xl rounded-2xl border-2 border-[#362F1C]/40 p-6 sm:p-8"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2 
                className="text-2xl sm:text-3xl font-bold text-[#FFD700] mb-6 text-center"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Event Structure
              </motion.h2>
              <div className="space-y-4">
                {[
                  "Register for the event",
                  "participants will take a domain to work on",
                  "They will define a problem statement and work towards building a project that provides an effective solution within the given timeframe",
                  "Participants will present their projects to a panel of judges",
                  "The top winners will be announced and awarded prizes"
                ].map((step, i) => (
                  <motion.div 
                    key={i} 
                    className="bg-[#0d1628]/60 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-[#FFD700]/20"
                    initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.8 }}
                    whileHover={{ 
                      scale: 1.02,
                      x: 10,
                      boxShadow: "0 0 20px rgba(255,215,0,0.2)"
                    }}
                  >
                    <div className="flex items-start">
                     <motion.div
                      className="bg-[#FFD700] text-black font-bold rounded-full aspect-square w-8 sm:w-10 flex items-center justify-center text-xs sm:text-sm leading-none fixed"
                      initial={{ scale: 0, rotate: 180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 + 0.4, duration: 0.6 }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                    >
                      {i + 1}
                    </motion.div>
                      <p className="text-white text-base sm:text-lg leading-relaxed font-[poppins] ml-15">{step}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Prizes & Rewards Section */}
            <div 
              className="bg-gradient-to-br from-[#0b3075] to-[#dfc48f] backdrop-blur-xl rounded-2xl border-2 border-[#362F1C]/40 p-6 sm:p-8"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h2 
                className="text-2xl sm:text-3xl font-bold text-[#FFD700] mb-6 text-center"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, type: "spring", bounce: 0.6 }}
              >
                Prizes & Rewards
              </h2>
              <motion.p 
                className="text-white text-center text-base sm:text-lg mb-8 font-[poppins]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                We value innovation and hard work. The top winners will receive cash prizes along with additional credits, and all participants will get certificates of participation.
              </motion.p>
              
              <div className="grid font-[poppins] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { emoji: "🏆", title: "1st Prize", prize: "₹7000 + 2 credits", gradient: "from-yellow-500 to-yellow-600" },
                  { emoji: "🥈", title: "2nd Prize", prize: "₹5000 + 2 credits", gradient: "from-gray-400 to-gray-500" },
                  { emoji: "🥉", title: "3rd Prize", prize: "₹3000 + 2 credits", gradient: "from-orange-500 to-orange-600" },
                  { emoji: "📜", title: "Participation", prize: "Certificate + 2 credits", gradient: "from-blue-500 to-blue-600" }
                ].map((award, i) => (
                  <div 
                    key={i} 
                    className="bg-[#0d1628]/60 backdrop-blur-sm rounded-xl p-6 border border-[#FFD700]/20 text-center cursor-pointer"
                    initial={{ 
                      opacity: 0, 
                      y: 100,
                      rotateY: 90 
                    }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      rotateY: 0 
                    }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: i * 0.2, 
                      duration: 0.8,
                      type: "spring",
                      bounce: 0.4
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotateY: 5,
                      boxShadow: "0 0 30px rgba(255,215,0,0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div 
                      className="text-4xl sm:text-5xl mb-3"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                    >
                      {award.emoji}
                    </div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">{award.title}</h3>
                    <motion.div 
                      className={`bg-gradient-to-r ${award.gradient} text-white font-semibold py-2 px-4 rounded-lg text-sm sm:text-base`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {award.prize}
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

export default LandingPage;
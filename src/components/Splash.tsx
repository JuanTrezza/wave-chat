import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface SplashProps {
  onComplete: () => void;
}

export default function Splash({ onComplete }: SplashProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400); // Small transition delay
          return 100;
        }
        // Non-linear realistic progress
        const increment = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div id="splash-view" className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F0F14] text-[#e4e1e9] overflow-hidden select-none">
      {/* Dynamic Ambient Blur Lights */}
      <div className="absolute -top-[10%] -left-[20%] w-[80%] h-[60%] bg-[#a078ff]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[20%] w-[80%] h-[60%] bg-[#ffb0cd]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Content Canvas */}
      <div className="relative flex flex-col items-center justify-center w-full px-4 max-w-md">
        {/* Logo Container with Pulse and Float */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Decorative Rings */}
          <motion.div
            animate={{ scale: [0.85, 1.05, 0.85], opacity: [0.3, 0.15, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-44 h-44 rounded-full border-2 border-[#d0bcff]/20 pointer-events-none"
          />
          <motion.div
            animate={{ scale: [0.8, 1.15, 0.8], opacity: [0.2, 0.1, 0.2] }}
            transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-60 h-60 rounded-full border border-[#aa0266]/15 pointer-events-none"
          />

          {/* WAVE Logo */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center z-10"
          >
            <h1 className="font-sans font-extrabold text-5xl tracking-tighter bg-gradient-to-r from-[#d0bcff] to-[#aa0266] bg-clip-text text-transparent select-none">
              WAVE
            </h1>
            
            {/* Abstract Audio Wave Bars */}
            <div className="mt-2 flex gap-1 items-center justify-center h-8">
              <motion.div
                animate={{ height: [8, 16, 8] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                className="w-1.5 bg-[#d0bcff]/40 rounded-full"
              />
              <motion.div
                animate={{ height: [12, 24, 12] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="w-1.5 bg-[#d0bcff]/70 rounded-full"
              />
              <motion.div
                animate={{ height: [16, 32, 16] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="w-1.5 bg-[#d0bcff] rounded-full animate-pulse"
              />
              <motion.div
                animate={{ height: [12, 24, 12] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="w-1.5 bg-[#d0bcff]/70 rounded-full"
              />
              <motion.div
                animate={{ height: [8, 16, 8] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="w-1.5 bg-[#d0bcff]/40 rounded-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Identity & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center space-y-4"
        >
          <p className="font-sans font-semibold text-lg text-[#e4e1e9]">
            Conéctate al ritmo de tus conversaciones.
          </p>
        </motion.div>

        {/* Loading Progress System */}
        <div className="mt-16 w-full max-w-xs space-y-3">
          {/* Progress Bar Track */}
          <div className="h-1.5 w-full bg-[#35343a]/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[#d0bcff] to-[#aa0266] rounded-full"
            />
          </div>
          
          <div className="flex justify-between items-center px-1 font-mono text-sm text-[#958ea0]">
            <span>Iniciando WAVE...</span>
            <span id="percentage" className="text-[#d0bcff] font-bold">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-center w-full">
        <p className="font-sans text-xs text-[#958ea0]/40 uppercase tracking-widest">
          Privacy Protected • Fast Delivery
        </p>
      </div>
    </div>
  );
}

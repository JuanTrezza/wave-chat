import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Phone, Shield, ChevronRight } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    title: "Mensajes al instante",
    description: "Experimenta la velocidad real con una infraestructura optimizada para latencia cero.",
    icon: MessageSquare,
    iconColor: "text-[#d0bcff]",
    bgColor: "bg-[#a078ff]/10 border-[#d0bcff]/20",
    badge: "BAJO LATENCIA",
    badgeColor: "bg-[#4edea3] text-[#003824]",
  },
  {
    title: "Llamadas cristalinas",
    description: "Audio de alta fidelidad que te hace sentir en la misma habitación, sin importar la distancia.",
    icon: Phone,
    iconColor: "text-[#4edea3]",
    bgColor: "bg-[#4edea3]/10 border-[#4edea3]/20",
    badge: "ALTA FIDELIDAD",
    badgeColor: "bg-[#a078ff] text-white",
  },
  {
    title: "Privacidad ante todo",
    description: "Tus conversaciones están protegidas por cifrado de extremo a extremo de grado militar.",
    icon: Shield,
    iconColor: "text-[#ffb0cd]",
    bgColor: "bg-[#ffb0cd]/10 border-[#ffb0cd]/20",
    badge: "CIFRADO E2EE",
    badgeColor: "bg-[#93000a] text-[#ffdad6]",
  },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const activeSlide = slides[current];
  const IconComponent = activeSlide.icon;

  return (
    <div id="onboarding-view" className="fixed inset-0 z-50 flex flex-col justify-between bg-[#131318] text-[#e4e1e9] px-6 py-12 select-none overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[180px] h-[180px] bg-[#a078ff]/10 blur-[90px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[180px] h-[180px] bg-[#4edea3]/5 blur-[90px] rounded-full" />
      </div>

      {/* Top Header Branding */}
      <header className="w-full flex items-center justify-center h-16">
        <h1 className="font-sans font-extrabold text-3xl tracking-tighter text-[#d0bcff]">
          WAVE
        </h1>
      </header>

      {/* Slide Content with Slide Animation */}
      <main className="relative flex-grow flex flex-col items-center justify-center max-w-sm mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col items-center text-center w-full"
          >
            {/* Slide Visual Icon Circle */}
            <div className="relative w-64 h-64 flex items-center justify-center mb-8">
              <motion.div
                animate={{ scale: [0.92, 1.05, 0.92] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-tr from-[#d0bcff]/10 to-[#aa0266]/10 rounded-full blur-2xl"
              />

              {/* Glassmorphic Panel Icon */}
              <div className={`relative w-44 h-44 ${activeSlide.bgColor} backdrop-blur-xl border rounded-3xl flex items-center justify-center shadow-xl rotate-6`}>
                <IconComponent className={`w-20 h-20 ${activeSlide.iconColor}`} />

                {/* Micro-badge */}
                <div className={`absolute -top-3 -right-3 px-3 py-1 ${activeSlide.badgeColor} rounded-full text-xs font-bold shadow-md tracking-wider flex items-center gap-1`}>
                  <span>{activeSlide.badge}</span>
                </div>
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-4 max-w-[290px]">
              <h2 className="font-sans font-bold text-2xl text-[#e4e1e9]">
                {activeSlide.title}
              </h2>
              <p className="font-sans text-[#cbc3d7] text-[15px] leading-relaxed">
                {activeSlide.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Controls */}
      <footer className="w-full max-w-sm mx-auto flex flex-col items-center gap-6">
        {/* Pagination Dots */}
        <div className="flex gap-2" id="pagination">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-[#d0bcff]" : "w-1.5 bg-[#494454]"
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          id="nextBtn"
          onClick={handleNext}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#a078ff] to-[#d0bcff] font-semibold text-[#340080] hover:brightness-110 active:scale-[0.98] transition-all duration-200 uppercase tracking-widest text-sm shadow-lg shadow-[#a078ff]/20 flex items-center justify-center gap-2"
        >
          <span>{current === slides.length - 1 ? "Comenzar" : "Siguiente"}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
}

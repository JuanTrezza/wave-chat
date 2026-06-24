import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, Sparkles } from "lucide-react";

interface LoginProps {
  onLoginSuccess: (phoneNumber: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+54");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const countryCodes = [
    { code: "+54", name: "Argentina" },
    { code: "+34", name: "España" },
    { code: "+1", name: "USA / Canada" },
    { code: "+52", name: "México" },
    { code: "+56", name: "Chile" },
    { code: "+57", name: "Colombia" },
  ];

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedPhone = `${countryCode} ${phone || "000 000 0000"}`;
    onLoginSuccess(formattedPhone);
  };

  return (
    <div id="login-view" className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#0F0F14] text-[#e4e1e9] px-6 py-12 select-none overflow-y-auto">
      {/* Decorative ambient blobs */}
      <div className="fixed top-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#a078ff]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#aa0266]/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Spacer for vertical balance */}
      <div className="h-4" />

      {/* Header Branding */}
      <header className="w-full max-w-sm flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="font-sans font-extrabold text-4xl tracking-tighter text-[#d0bcff]">
            WAVE
          </h1>
        </motion.div>
        <h2 className="font-sans font-bold text-2xl text-[#e4e1e9] mb-2">
          Bienvenido a Wave
        </h2>
        <p className="font-sans text-sm text-[#cbc3d7] px-4">
          Conéctate con tus contactos de forma rápida y segura.
        </p>
      </header>

      {/* Login Card Form */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-sm bg-[#1b1b20]/60 border border-white/5 backdrop-blur-2xl p-6 rounded-2xl flex flex-col gap-6 shadow-2xl relative z-10"
      >
        <form onSubmit={handleContinue} className="flex flex-col gap-6">
          {/* Phone Input Cluster */}
          <div className="flex flex-col gap-2">
            <label className="font-sans font-semibold text-xs text-[#cbc3d7] ml-1">
              Número de teléfono
            </label>
            <div className="flex items-center bg-[#131318] border border-white/10 rounded-xl overflow-hidden focus-within:border-[#d0bcff]/50 transition-all duration-300">
              {/* Country Code Selector dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="px-4 py-4 border-r border-white/5 flex items-center gap-1 text-[#e4e1e9] font-semibold text-sm hover:bg-white/5 transition-colors"
                >
                  <span className="text-[#cbc3d7]">{countryCode}</span>
                  <ChevronDown className="w-4 h-4 text-[#958ea0]" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-16 left-0 z-50 w-44 bg-[#1b1b20] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                    {countryCodes.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setCountryCode(item.code);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-[#e4e1e9] hover:bg-white/5 border-b border-white/5 last:border-b-0 transition-colors"
                      >
                        <span className="font-bold mr-2 text-[#d0bcff]">{item.code}</span>
                        <span className="text-xs text-[#958ea0]">{item.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input Field */}
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="flex-grow bg-transparent border-none focus:ring-0 text-[#e4e1e9] font-sans text-base px-4 py-4 placeholder-[#958ea0]/50 outline-none"
                placeholder="000 000 0000"
                required
              />
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#a078ff] to-[#d0bcff] text-[#340080] font-bold py-4 rounded-xl shadow-lg shadow-[#a078ff]/10 active:scale-[0.98] hover:brightness-105 transition-all duration-200"
          >
            Continuar
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 py-2">
          <div className="h-[1px] flex-grow bg-white/10" />
          <span className="font-sans text-xs text-[#958ea0]">O continuá con</span>
          <div className="h-[1px] flex-grow bg-white/10" />
        </div>

        {/* Social Authentication Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onLoginSuccess("+54 911 555 1234")}
            className="bg-[#131318] border border-white/5 py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] hover:bg-white/5 transition-all"
          >
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img
                className="w-3.5 h-3.5 object-contain"
                alt="Google"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoEhR2tUcGHMqQZG1baTEcXjYd_YCbLrhS4IqSfXhbAYxs9xZtXqTB2koSUN_zW_vgm2y8x_DfCdPP3RMF9rr0D6SfWU5p9NgbiPiLlCOBoBGpepD7GGbnhZuCNCoWlxNVNRAKJ10-NRrsuun9pyhHMG31lQoDst-sOJVzEAYRS3BNxsUf1V0xtZfVf2ojdDViAf8zo0PXrmY7s-7EdJqDu9vhLk-CwX1fmaqi2kPLATxTOQ8diTK-80poUY3peBvVuKJkqOeBSrw"
              />
            </div>
            <span className="font-sans font-semibold text-sm text-[#e4e1e9]">Google</span>
          </button>

          <button
            onClick={() => onLoginSuccess("+34 612 345 678")}
            className="bg-[#131318] border border-white/5 py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] hover:bg-white/5 transition-all"
          >
            <Sparkles className="w-5 h-5 text-[#d0bcff]" />
            <span className="font-sans font-semibold text-sm text-[#e4e1e9]">Apple</span>
          </button>
        </div>
      </motion.div>

      {/* Footer Legal Policy */}
      <footer className="w-full max-w-sm text-center mt-6">
        <p className="font-sans text-xs text-[#958ea0] leading-relaxed px-4">
          Al continuar, aceptas nuestros{" "}
          <a className="text-[#d0bcff] hover:underline" href="#terms">
            Términos de Servicio
          </a>{" "}
          y la{" "}
          <a className="text-[#d0bcff] hover:underline" href="#privacy">
            Política de Privacidad
          </a>
          .
        </p>
      </footer>
    </div>
  );
}

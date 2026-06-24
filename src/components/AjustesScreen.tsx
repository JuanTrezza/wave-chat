import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, User, MessageCircle, Bell, Database, Palette, Lock, LogOut, ChevronRight, X, Save, Sparkles, ShieldCheck } from "lucide-react";
import { Screen, UserProfile } from "../types";
import { BottomNavigation } from "./ChatsScreen";

interface AjustesScreenProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onNavigateTo: (screen: Screen) => void;
  onLogout: () => void;
}

export default function AjustesScreen({ userProfile, onUpdateProfile, onNavigateTo, onLogout }: AjustesScreenProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(userProfile.name);
  const [editedPhone, setEditedPhone] = useState(userProfile.phone);
  const [editedBio, setEditedBio] = useState(userProfile.bio);
  const [editedAvatar, setEditedBioAvatar] = useState(userProfile.avatar);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: editedName,
      phone: editedPhone,
      bio: editedBio,
      avatar: editedAvatar,
      isOnline: userProfile.isOnline,
    });
    setIsEditModalOpen(false);
  };

  const premiumAvatars = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAhv7LXbpJ4_GVvw5Sfkq85toGxN5YMK8daamVeZbP0KRCn_DFYAGYiRa9FuC-7FoxnZt4yLp8eZjK0BcZzEnetCwU8pyfn32hdowpNEeNjZ1pLyuh6ul5-evMi0KJHjo35E9tH0Ida_fVUrCz03KlK6VFjObLXv6uyuBT0iVxADPNot-828QMVxWvSGj90QpIVSKc2w27-Y1xlS9ChHNhs9s7bj1SrQDES1F6nihcsoDlXOlTmqJVuNLpcBFp8aqYvtKd6_-OZRE0",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDVXqoawz3CxW92t0DSgnvHbV01bJAw5-9FahPJvuUrfUM4JNm7f8G5lNfmK0of8z5P97ZT6PkPFgob_odMhUpsz_OR631qwanCzAMD54BoLyitg7b_NkKnL14bekDMXbeOjPk-vyenuq6OtHNGCZuqKlndVW5rRnhgEPEuf98WwzQw9rN5j3QQL5y9-1usLLdQMGmIxTDR-5u1El1VpardvqK2A8oLoyp-y44d1EKLGRZnDrZ0I5S5qS66xEvsMmkuFQZBfyK8l9w",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBsFf9YJ6JGW6cyD5PUxEpEi4-ZcOorwiFfYLwpXE7I6V3joBNL4jvdMewmH3l7CHnX3rvU6v6OCNAFIuJKU4tGhECVd_Qzhn2qwyXTJXCiGKnjIpYb6RcS7-B80ORXCvEvKS59sIp0f-d92UJbYvMHAg0_v8QeBNXVvxAai6AbSbiERt68q55R0P840SesSaPJJGVDI4BKGiczcBgwqdTnxMeAIMQ95ciLr5s9BSWAdxlQhoh6Ee8AUgXv8n3gi_vUa97crM80J4g",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCiZOgFzVLua6904LvRRvixdp5u4Hm7-xbtBlfyLGxnV20DgZJbCncAzIEMwSYNjAgN-zL4_jKKql5MdcFTCeDr4rXMQhpeKNvj1WYMJxAXGg6ej0RYfnp48xELzFJZ-wak-qvhOOWafLHdplRUlNwj9DBTE4X3nnGjul_TX6mFjknURczSAM4K27ZO1Q-ulKwWFNU96xX19fwJcO_08xn8sYtoA3AuPJ8rL4v5B5g60VJWOdtI_qyOTQe2-iwGkSdpOiX3crAf-8s",
  ];

  return (
    <div className="min-h-screen bg-[#0F0F14] text-[#e4e1e9] pb-32 select-none overflow-x-hidden">
      {/* Top Header App Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#131318]/70 backdrop-blur-xl border-b border-white/5 h-16 flex items-center justify-between px-4 max-w-none">
        <h1 className="font-sans font-extrabold text-xl text-[#d0bcff] tracking-tight">WAVE</h1>
        <div className="flex items-center gap-3">
          <button className="hover:opacity-85 active:scale-95 duration-200">
            <Search className="w-5 h-5 text-[#cbc3d7]" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#1b1b20] border border-white/10 overflow-hidden shrink-0">
            <img className="w-full h-full object-cover" src={userProfile.avatar} alt={userProfile.name} />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="pt-20 px-4 max-w-md mx-auto space-y-6">
        {/* Profile details Card */}
        <section className="bg-[#1b1b20]/60 border border-white/5 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
          {/* Decorative design orb */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#a078ff]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full border-2 border-[#d0bcff]/30 p-1">
              <img className="w-full h-full rounded-full object-cover" src={userProfile.avatar} alt="Avatar de perfil" />
            </div>
            {userProfile.isOnline && (
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#4edea3] rounded-full border-2 border-[#1b1b20] shadow-lg" />
            )}
          </div>
          
          <h2 className="font-sans font-bold text-xl text-[#e4e1e9]">{userProfile.name}</h2>
          <p className="font-mono text-xs text-[#cbc3d7] mb-1">{userProfile.phone}</p>
          <p className="font-sans text-sm text-[#958ea0] italic mb-6">"{userProfile.bio}"</p>
          
          {/* Action trigger */}
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="bg-gradient-to-r from-[#a078ff] to-[#d0bcff] text-[#340080] font-bold px-8 py-2.5 rounded-full text-xs uppercase tracking-widest hover:brightness-105 active:scale-95 transition-all duration-200 shadow-md shadow-[#a078ff]/10"
          >
            Editar Perfil
          </button>
        </section>

        {/* Options list group */}
        <section className="space-y-2">
          {/* Account */}
          <div className="bg-[#1b1b20]/60 border border-white/5 backdrop-blur-xl rounded-xl px-4 py-3 flex items-center justify-between active:bg-[#2a292f] transition-all duration-150 cursor-pointer group shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#a078ff]/10 flex items-center justify-center text-[#d0bcff]">
                <User className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-semibold text-sm text-[#e4e1e9]">Cuenta</span>
                <span className="font-sans text-xs text-[#958ea0]">privacidad, seguridad</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#958ea0] group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Chats */}
          <div className="bg-[#1b1b20]/60 border border-white/5 backdrop-blur-xl rounded-xl px-4 py-3 flex items-center justify-between active:bg-[#2a292f] transition-all duration-150 cursor-pointer group shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#ffb0cd]/10 flex items-center justify-center text-[#ffb0cd]">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-semibold text-sm text-[#e4e1e9]">Chats</span>
                <span className="font-sans text-xs text-[#958ea0]">fondo, backup</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#958ea0] group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Notifications */}
          <div className="bg-[#1b1b20]/60 border border-white/5 backdrop-blur-xl rounded-xl px-4 py-3 flex items-center justify-between active:bg-[#2a292f] transition-all duration-150 cursor-pointer group shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#4edea3]/10 flex items-center justify-center text-[#4edea3]">
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-semibold text-sm text-[#e4e1e9]">Notificaciones</span>
                <span className="font-sans text-xs text-[#958ea0]">sonidos, vibración</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#958ea0] group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Data */}
          <div className="bg-[#1b1b20]/60 border border-white/5 backdrop-blur-xl rounded-xl px-4 py-3 flex items-center justify-between active:bg-[#2a292f] transition-all duration-150 cursor-pointer group shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#a078ff]/10 flex items-center justify-center text-[#d0bcff]">
                <Database className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-semibold text-sm text-[#e4e1e9]">Datos</span>
                <span className="font-sans text-xs text-[#958ea0]">uso de datos</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#958ea0] group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Appearance */}
          <div className="bg-[#1b1b20]/60 border border-white/5 backdrop-blur-xl rounded-xl px-4 py-3 flex items-center justify-between active:bg-[#2a292f] transition-all duration-150 cursor-pointer group shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#ffb0cd]/10 flex items-center justify-center text-[#ffb0cd]">
                <Palette className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-semibold text-sm text-[#e4e1e9]">Apariencia</span>
                <span className="font-sans text-xs text-[#958ea0]">tema, color de acento</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#958ea0] group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Privacy */}
          <div className="bg-[#1b1b20]/60 border border-white/5 backdrop-blur-xl rounded-xl px-4 py-3 flex items-center justify-between active:bg-[#2a292f] transition-all duration-150 cursor-pointer group shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#ffb4ab]/10 flex items-center justify-center text-[#ffb4ab]">
                <Lock className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-semibold text-sm text-[#e4e1e9]">Privacidad</span>
                <span className="font-sans text-xs text-[#958ea0]">bloqueados</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#958ea0] group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Logout Action Card */}
          <div 
            onClick={onLogout}
            className="bg-[#1b1b20]/60 border border-white/5 backdrop-blur-xl rounded-xl p-4 flex items-center justify-center active:bg-[#93000a]/20 transition-all duration-150 cursor-pointer mt-6 shadow-md border-red-500/10"
          >
            <div className="flex items-center gap-2 text-[#ffb4ab]">
              <LogOut className="w-5 h-5" />
              <span className="font-sans font-bold text-sm uppercase tracking-wider">Cerrar Sesión</span>
            </div>
          </div>
        </section>

        {/* Decorative divider dot indicators */}
        <div className="py-4 w-full flex justify-center items-center gap-2 pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-[#cbc3d7]/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#cbc3d7]/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#cbc3d7]/20" />
        </div>
      </main>

      {/* Navigation footer */}
      <BottomNavigation activeTab="ajustes" onNavigateTo={onNavigateTo} />

      {/* Edit Profile Dialog Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0F0F14]/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-sm bg-[#1b1b20] border border-white/10 p-6 rounded-3xl flex flex-col gap-5 shadow-2xl relative"
            >
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-[#cbc3d7]" />
              </button>

              <h2 className="font-sans font-bold text-lg text-[#e4e1e9]">Editar Perfil</h2>
              
              <form onSubmit={handleSave} className="flex flex-col gap-4">
                {/* Choose premium avatar */}
                <div className="space-y-2">
                  <label className="text-xs text-[#958ea0] font-sans">Elige tu Avatar Premium</label>
                  <div className="flex gap-3 justify-center items-center">
                    {premiumAvatars.map((avUrl, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setEditedBioAvatar(avUrl)}
                        className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                          editedAvatar === avUrl ? "border-[#d0bcff] scale-110" : "border-transparent opacity-60"
                        }`}
                      >
                        <img className="w-full h-full object-cover" src={avUrl} alt="Premium Avatar option" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#958ea0] font-sans">Nombre</label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="bg-[#131318] border border-white/5 rounded-xl p-3 text-sm text-[#e4e1e9] focus:border-[#d0bcff]/40 outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#958ea0] font-sans">Número de Teléfono</label>
                  <input
                    type="text"
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                    className="bg-[#131318] border border-white/5 rounded-xl p-3 text-sm text-[#e4e1e9] focus:border-[#d0bcff]/40 outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#958ea0] font-sans">Estado / Biografía</label>
                  <input
                    type="text"
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    className="bg-[#131318] border border-white/5 rounded-xl p-3 text-sm text-[#e4e1e9] focus:border-[#d0bcff]/40 outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#a078ff] to-[#d0bcff] text-[#340080] font-bold flex items-center justify-center gap-2 active:scale-95 transition-all duration-150"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Cambios</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

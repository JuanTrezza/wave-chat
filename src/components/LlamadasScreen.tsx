import React, { useState } from "react";
import { Search, MoreVertical, Phone, Video, PhoneCall, PhoneIncoming, PhoneMissed, Users, Plus } from "lucide-react";
import { Call, Screen, UserProfile } from "../types";
import { BottomNavigation } from "./ChatsScreen";

interface LlamadasScreenProps {
  calls: Call[];
  userProfile: UserProfile;
  onNavigateTo: (screen: Screen) => void;
}

export default function LlamadasScreen({ calls, userProfile, onNavigateTo }: LlamadasScreenProps) {
  const [activeSegment, setActiveSegment] = useState<"todas" | "perdidas">("todas");

  const displayedCalls = calls.filter((call) => {
    if (activeSegment === "perdidas") return call.isMissed;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0F0F14] text-[#e4e1e9] pb-32 select-none">
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#131318]/70 backdrop-blur-xl border-b border-white/5 h-16 flex items-center justify-between px-4 max-w-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 active:scale-95 duration-200">
            <img className="w-full h-full object-cover" src={userProfile.avatar} alt={userProfile.name} />
          </div>
          <h1 className="font-sans font-bold text-xl text-[#d0bcff] tracking-tight">WAVE</h1>
        </div>
        <div className="flex items-center gap-3 text-[#cbc3d7]">
          <button className="hover:opacity-85 active:scale-95 duration-200">
            <Search className="w-5 h-5" />
          </button>
          <button className="hover:opacity-85 active:scale-95 duration-200">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Body Column */}
      <main className="pt-20 px-4 max-w-md mx-auto">
        {/* Screen Title and Segmented Switcher */}
        <section className="mb-6">
          <h2 className="font-sans font-bold text-2xl text-[#e4e1e9] mb-4">Llamadas</h2>
          
          {/* Segmented slider bar */}
          <div className="flex p-1 bg-[#1b1b20] rounded-xl border border-white/5">
            <button 
              onClick={() => setActiveSegment("todas")}
              className={`flex-grow py-2.5 font-sans font-semibold text-xs rounded-lg transition-all ${
                activeSegment === "todas" 
                  ? "bg-[#2a292f] text-[#d0bcff] shadow-sm" 
                  : "text-[#958ea0] hover:text-[#cbc3d7]"
              }`}
            >
              Todas
            </button>
            <button 
              onClick={() => setActiveSegment("perdidas")}
              className={`flex-grow py-2.5 font-sans font-semibold text-xs rounded-lg transition-all ${
                activeSegment === "perdidas" 
                  ? "bg-[#2a292f] text-[#d0bcff] shadow-sm" 
                  : "text-[#958ea0] hover:text-[#cbc3d7]"
              }`}
            >
              Perdidas
            </button>
          </div>
        </section>

        {/* Calls Log List */}
        <section className="space-y-1">
          {displayedCalls.length === 0 ? (
            <p className="text-center font-sans text-xs text-[#958ea0] py-12">
              No hay llamadas para mostrar.
            </p>
          ) : (
            displayedCalls.map((call) => (
              <div 
                key={call.id}
                className="flex items-center justify-between p-3 hover:bg-white/5 rounded-2xl cursor-pointer transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {call.isGroup ? (
                      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#35343a] border border-white/5 text-[#d0bcff]">
                        <Users className="w-8 h-8" />
                      </div>
                    ) : call.userAvatar ? (
                      <div className="w-14 h-14 rounded-full overflow-hidden border border-white/5 bg-[#1b1b20]">
                        <img className="w-full h-full object-cover" src={call.userAvatar} alt={call.userName} />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-[#aa0266]/30 text-[#ffb0cd] flex items-center justify-center font-sans font-bold text-lg">
                        {call.userName.charAt(0)}
                      </div>
                    )}
                    {!call.isMissed && !call.isGroup && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#4edea3] border-2 border-[#131318] rounded-full" />
                    )}
                  </div>
                  
                  <div className="flex flex-col">
                    <span className={`font-sans font-bold text-base ${call.isMissed ? "text-[#ffb4ab]" : "text-[#e4e1e9]"}`}>
                      {call.userName}
                    </span>
                    <div className="flex items-center gap-1 text-[#958ea0]">
                      {call.isMissed ? (
                        <PhoneMissed className="w-4 h-4 text-[#ffb4ab]" />
                      ) : call.isOutgoing ? (
                        <PhoneCall className="w-4 h-4 text-[#4edea3]" />
                      ) : (
                        <PhoneIncoming className="w-4 h-4 text-[#d0bcff]" />
                      )}
                      <span className="font-sans text-xs">{call.timeAgo}</span>
                    </div>
                  </div>
                </div>

                {/* Trailing call triggers */}
                <button className="w-11 h-11 flex items-center justify-center bg-white/5 hover:bg-white/10 text-[#d0bcff] rounded-full active:scale-90 transition-transform">
                  {call.isVideo ? <Video className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
                </button>
              </div>
            ))
          )}
        </section>

        {/* Ambient Glass suggestion card */}
        <section className="mt-8">
          <div className="p-6 rounded-2xl bg-[#1b1b20]/60 border border-white/5 relative overflow-hidden shadow-2xl">
            {/* Background blur orb */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#a078ff]/10 blur-[40px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 space-y-4">
              <div className="space-y-1">
                <h3 className="font-sans font-bold text-base text-[#d0bcff]">Empieza una nueva llamada</h3>
                <p className="font-sans text-xs text-[#cbc3d7]">Conéctate con tus contactos favoritos al instante.</p>
              </div>
              
              {/* Stacked overlapping avatars */}
              <div className="flex -space-x-3 items-center">
                <div className="w-10 h-10 rounded-full border-2 border-[#1b1b20] overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4J9MxixdGYsawy_hmiNGsEsrsTgLoD6jbnE9b667gL63BsBudWmOglwPOHUf3fzfcLsMP5UBd70tTmRxtuXLBkWIguyheqryIAVBvlCC-EEnr0RfP7OnY17g_QWFbvMcKAEsUr9lUDJ5TIK6kJtOBtBklwjwOmj1q1pH0NT-5AVrt9mafQLytoTOfKHi-RB0N6AHEFB6wFbSDnh4eSBZIKYruDK8UPl8V0vKttm1epIxD8XAz92VtYzBGg5IJCvoBhCxUPh-c0M0" alt="Avatar" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#1b1b20] overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAriDRiLbDlv9fuLKXVw-QOJWpF_WOEDhkpQp08DCjXYhykC0uR9l0oLgBkojRxX53bwSD7HRAXdSZMbqfKjC6zHMxpmksJ2fKH-hykSE-duaMZ3Lpee8EuY2nocYWULbLrd9sR-I5Ozhrrb_sl8kn9lTZWIqHFeVSSKB4M0s1eSn2is18Als5qbOEWQ2nPVS42YNNjELeGGiU7ibB_FwAqzFVIwcZr0n-qlzCjvF2U9mPG2_iR2JlGoMLGE_GBrDPIGUYFh5YKjPs" alt="Avatar" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#1b1b20] overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5K-FoXVcGDCRA_aIaAmENAXc0SZMORb4IFLaLhPd47Ay3CSW06NRimh5uVY0zCqmhRbYTDFRq5jYyzI-Je_3q7d6ejknlzuld9nH0PRUJ3XDPVm74gV2NzV4R09wfG4zBR7JmF66NKiGDKm5SFR8bbEL8PA3fBHJXdYW9qi-5MOm5E8KE2Pcw53rzbuZ-mTvdT6mIUTfvyyvz-jbk_hNUuzhnC5JtBawNDA002PTIDFqYccqn_EU6ng3ctBHCFCrWvT1BsfypCpc" alt="Avatar" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#1b1b20] bg-[#35343a] flex items-center justify-center text-[10px] font-bold text-[#d0bcff] shrink-0">
                  +12
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-28 right-4 w-14 h-14 bg-[#a078ff] text-[#340080] rounded-full flex items-center justify-center shadow-2xl hover:brightness-105 active:scale-90 transition-transform z-40">
        <Plus className="w-8 h-8" />
      </button>

      {/* Nav tab */}
      <BottomNavigation activeTab="llamadas" onNavigateTo={onNavigateTo} />
    </div>
  );
}

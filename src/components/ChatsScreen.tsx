import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Edit, Plus, MessageCircle, Phone, CircleDot, Settings, Pin, Mic, Terminal, CheckCheck, X } from "lucide-react";
import { Chat, Story, Screen, UserProfile } from "../types";

interface ChatsScreenProps {
  chats: Chat[];
  stories: Story[];
  userProfile: UserProfile;
  onSelectChat: (chat: Chat) => void;
  onNavigateTo: (screen: Screen) => void;
}

export default function ChatsScreen({ chats, stories, userProfile, onSelectChat, onNavigateTo }: ChatsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  // Filter chats by query
  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedChats = filteredChats.filter((c) => c.isPinned);
  const recentChats = filteredChats.filter((c) => !c.isPinned);

  return (
    <div className="min-h-screen bg-[#131318] text-[#e4e1e9] pb-32">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#131318]/70 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 h-16 max-w-none">
        <div className="flex items-center gap-3">
          <div 
            onClick={() => onNavigateTo(Screen.AJUSTES)}
            className="relative active:scale-95 duration-200 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
              <img className="w-full h-full object-cover" src={userProfile.avatar} alt={userProfile.name} />
            </div>
            {userProfile.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#4edea3] border-2 border-[#131318] rounded-full" />
            )}
          </div>
          <h1 className="font-sans font-bold text-2xl tracking-tighter text-[#d0bcff]">Chats</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1b1b20] border border-white/5 rounded-full py-1.5 pl-8 pr-4 text-xs text-[#e4e1e9] focus:outline-none focus:ring-1 focus:ring-[#d0bcff]/50 w-36 sm:w-48 transition-all"
            />
            <Search className="w-3.5 h-3.5 text-[#958ea0] absolute left-3 pointer-events-none" />
          </div>
          <button 
            onClick={() => onNavigateTo(Screen.NUEVO_CHAT)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 active:scale-95 transition-all text-[#cbc3d7]"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="pt-20 px-4">
        {/* Stories Horizontal Row */}
        <section className="mb-6">
          <div className="flex gap-4 overflow-x-auto py-2 scrollbar-none">
            {/* My Story */}
            <div 
              onClick={() => onNavigateTo(Screen.ESTADOS)}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer active:scale-95 transition-transform"
            >
              <div className="relative w-16 h-16 p-[2px] rounded-full border-2 border-dashed border-[#494454] flex items-center justify-center">
                <img 
                  className="w-14 h-14 rounded-full object-cover opacity-55" 
                  src={userProfile.avatar} 
                  alt="Tu historia" 
                />
                <div className="absolute bottom-0 right-0 bg-[#d0bcff] text-[#3c0091] rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#131318]">
                  <Plus className="w-3.5 h-3.5 font-bold" />
                </div>
              </div>
              <span className="font-sans text-xs text-[#cbc3d7] font-medium">Tu historia</span>
            </div>

            {/* Friend Stories */}
            {stories.map((story) => (
              <div 
                key={story.id}
                onClick={() => setActiveStory(story)}
                className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer active:scale-95 transition-transform"
              >
                <div className={`p-[2px] rounded-full ${story.isViewed ? "bg-[#35343a]" : "bg-gradient-to-tr from-[#a078ff] to-[#4edea3]"}`}>
                  <div className="w-15 h-15 p-[2px] bg-[#131318] rounded-full">
                    <img 
                      className="w-full h-full rounded-full object-cover" 
                      src={story.userAvatar} 
                      alt={story.userName} 
                    />
                  </div>
                </div>
                <span className="font-sans text-xs text-[#e4e1e9] font-medium">{story.userName}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pinned Chats Section */}
        {pinnedChats.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-1.5 mb-3 px-1 text-[#958ea0]">
              <Pin className="w-4 h-4" />
              <h2 className="font-sans font-bold text-xs uppercase tracking-widest">Anclados</h2>
            </div>
            
            <div className="space-y-1">
              {pinnedChats.map((chat) => (
                <ChatRow key={chat.id} chat={chat} onClick={onSelectChat} />
              ))}
            </div>
          </section>
        )}

        {/* Recent Chats Section */}
        <section>
          <div className="flex items-center gap-1.5 mb-3 px-1 text-[#958ea0] pt-2">
            <h2 className="font-sans font-bold text-xs uppercase tracking-widest">Recientes</h2>
          </div>
          
          <div className="space-y-1">
            {recentChats.map((chat) => (
              <ChatRow key={chat.id} chat={chat} onClick={onSelectChat} />
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <button 
        onClick={() => onNavigateTo(Screen.NUEVO_CHAT)}
        className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] text-white rounded-2xl shadow-2xl shadow-[#a078ff]/20 flex items-center justify-center active:scale-90 duration-200 z-40"
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* Shared Bottom Nav Bar */}
      <BottomNavigation activeTab="chats" onNavigateTo={onNavigateTo} />

      {/* Full-Screen Story Viewer Modal */}
      <AnimatePresence>
        {activeStory && (
          <StoryViewer story={activeStory} onClose={() => setActiveStory(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-component: ChatRow
interface ChatRowProps {
  key?: string;
  chat: Chat;
  onClick: (chat: Chat) => void;
}

function ChatRow({ chat, onClick }: ChatRowProps) {
  // Determine standard message format
  const isVoice = chat.lastMessage === "Mensaje de voz (0:45)";

  return (
    <div 
      onClick={() => onClick(chat)}
      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-colors cursor-pointer group"
    >
      <div className="relative shrink-0">
        {chat.id === "trabajo-frontend" ? (
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#a078ff]/10 flex items-center justify-center text-[#a078ff]">
            <Terminal className="w-8 h-8" />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-full overflow-hidden border border-white/5">
            <img className="w-full h-full object-cover" src={chat.avatar} alt={chat.name} />
          </div>
        )}
        {chat.isOnline && (
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#4edea3] border-2 border-[#131318] rounded-full" />
        )}
      </div>

      <div className="flex-grow min-w-0 border-b border-white/5 pb-3 group-last:border-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-sans font-bold text-[#e4e1e9] text-base truncate pr-2">
            {chat.name}
          </h3>
          <span className={`font-sans text-xs ${chat.unreadCount > 0 ? "text-[#d0bcff] font-bold" : "text-[#958ea0]"}`}>
            {chat.time}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          {chat.isTyping ? (
            <p className="font-sans text-[#4edea3] italic text-sm flex items-center gap-1">
              <span className="flex gap-0.5 items-center">
                <span className="w-1.5 h-1.5 bg-[#4edea3] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#4edea3] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-[#4edea3] rounded-full animate-bounce [animation-delay:0.4s]" />
              </span>
              escribiendo...
            </p>
          ) : isVoice ? (
            <p className="font-sans text-[#958ea0] text-sm flex items-center gap-1">
              <Mic className="w-4 h-4 text-[#4edea3]" />
              <span>Mensaje de voz (0:45)</span>
            </p>
          ) : (
            <p className="font-sans text-[#cbc3d7] text-sm truncate mr-4">
              {chat.lastMessage}
            </p>
          )}

          {chat.unreadCount > 0 && (
            <span className="bg-[#a078ff] text-[#340080] text-[11px] font-bold h-5 min-w-[20px] px-1.5 flex items-center justify-center rounded-full">
              {chat.unreadCount}
            </span>
          )}

          {!chat.isTyping && chat.unreadCount === 0 && chat.id === "sofia" && (
            <CheckCheck className="w-4 h-4 text-[#d0bcff]" />
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-component: BottomNavigation (Shared)
export function BottomNavigation({ activeTab, onNavigateTo }: { activeTab: string; onNavigateTo: (screen: Screen) => void }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-[#1b1b20]/75 backdrop-blur-2xl border-t border-white/5 flex justify-around items-center h-20 px-4">
      <button 
        onClick={() => onNavigateTo(Screen.CHATS)}
        className={`flex flex-col items-center justify-center transition-all ${
          activeTab === "chats" 
            ? "text-[#d0bcff] font-bold drop-shadow-[0_0_8px_rgba(208,188,255,0.4)] scale-105" 
            : "text-[#958ea0] hover:text-[#cbc3d7]"
        }`}
      >
        <MessageCircle className={`w-6 h-6 mb-1 ${activeTab === "chats" ? "fill-current" : ""}`} />
        <span className="font-sans text-xs">Chats</span>
      </button>

      <button 
        onClick={() => onNavigateTo(Screen.LLAMADAS)}
        className={`flex flex-col items-center justify-center transition-all ${
          activeTab === "llamadas" 
            ? "text-[#d0bcff] font-bold drop-shadow-[0_0_8px_rgba(208,188,255,0.4)] scale-105" 
            : "text-[#958ea0] hover:text-[#cbc3d7]"
        }`}
      >
        <Phone className={`w-6 h-6 mb-1 ${activeTab === "llamadas" ? "fill-current" : ""}`} />
        <span className="font-sans text-xs">Llamadas</span>
      </button>

      <button 
        onClick={() => onNavigateTo(Screen.ESTADOS)}
        className={`flex flex-col items-center justify-center transition-all ${
          activeTab === "estados" 
            ? "text-[#d0bcff] font-bold drop-shadow-[0_0_8px_rgba(208,188,255,0.4)] scale-105" 
            : "text-[#958ea0] hover:text-[#cbc3d7]"
        }`}
      >
        <CircleDot className="w-6 h-6 mb-1" />
        <span className="font-sans text-xs">Estados</span>
      </button>

      <button 
        onClick={() => onNavigateTo(Screen.AJUSTES)}
        className={`flex flex-col items-center justify-center transition-all ${
          activeTab === "ajustes" 
            ? "text-[#d0bcff] font-bold drop-shadow-[0_0_8px_rgba(208,188,255,0.4)] scale-105" 
            : "text-[#958ea0] hover:text-[#cbc3d7]"
        }`}
      >
        <Settings className={`w-6 h-6 mb-1 ${activeTab === "ajustes" ? "fill-current" : ""}`} />
        <span className="font-sans text-xs">Ajustes</span>
      </button>
    </nav>
  );
}

// Sub-component: StoryViewer
function StoryViewer({ story, onClose }: { story: Story; onClose: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          onClose();
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-4"
    >
      {/* Top Indicators */}
      <div className="w-full flex flex-col gap-3">
        {/* Progress bar */}
        <div className="h-1 bg-white/20 rounded-full overflow-hidden w-full">
          <div className="bg-[#d0bcff] h-full" style={{ width: `${progress}%` }} />
        </div>

        {/* User Info */}
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <img className="w-10 h-10 rounded-full object-cover border border-white/20" src={story.userAvatar} alt={story.userName} />
            <div>
              <p className="font-sans font-bold text-sm">{story.userName}</p>
              <p className="font-sans text-xs text-white/60">{story.timeAgo}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Story Media / Content Card */}
      <div className="flex-grow flex items-center justify-center max-w-md mx-auto w-full p-6 text-center">
        <div className="w-full max-w-xs bg-gradient-to-br from-[#1b1b20] to-[#21212c] border border-white/5 p-8 rounded-3xl flex flex-col justify-center items-center gap-6 shadow-2xl relative overflow-hidden">
          {/* Abstract Glow */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#a078ff]/10 rounded-full blur-2xl" />
          
          <img className="w-24 h-24 rounded-full object-cover border-2 border-[#d0bcff]" src={story.userAvatar} alt={story.userName} />
          
          <div className="space-y-2">
            <p className="font-sans font-extrabold text-xl bg-gradient-to-r from-[#d0bcff] to-[#4edea3] bg-clip-text text-transparent">
              {story.userName} actualizó su estado:
            </p>
            <p className="font-sans text-white text-lg font-medium italic">
              "{story.lastUpdateText}"
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer message block */}
      <div className="text-center pb-8">
        <p className="font-mono text-xs text-white/30 uppercase tracking-widest">
          Desliza para responder • WAVE STORIES
        </p>
      </div>
    </motion.div>
  );
}

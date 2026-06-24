import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, MoreVertical, Plus, Edit2, Camera, Circle, CheckCheck, X, Send } from "lucide-react";
import { Story, Screen, UserProfile } from "../types";
import { BottomNavigation } from "./ChatsScreen";

interface EstadosScreenProps {
  stories: Story[];
  userProfile: UserProfile;
  onNavigateTo: (screen: Screen) => void;
  onAddStory: (newStory: Story) => void;
}

export default function EstadosScreen({ stories, userProfile, onNavigateTo, onAddStory }: EstadosScreenProps) {
  const [isNewStatusOpen, setIsNewStatusOpen] = useState(false);
  const [newStatusText, setNewStatusText] = useState("");
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  // Group into viewed and unviewed
  const unviewedStories = stories.filter((s) => !s.isViewed);
  const viewedStories = stories.filter((s) => s.isViewed);

  const handlePostStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatusText.trim()) return;

    const newStory: Story = {
      id: `story-${Date.now()}`,
      userName: userProfile.name,
      userAvatar: userProfile.avatar,
      lastUpdateText: newStatusText.trim(),
      timeAgo: "hace un momento",
      isViewed: false,
    };

    onAddStory(newStory);
    setNewStatusText("");
    setIsNewStatusOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0F0F14] text-[#e4e1e9] pb-32">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#131318]/70 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 h-16 max-w-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 active:scale-95 duration-200 cursor-pointer">
            <img className="w-full h-full object-cover" src={userProfile.avatar} alt={userProfile.name} />
          </div>
          <h1 className="font-sans font-bold text-xl text-[#d0bcff] tracking-tight">Estados</h1>
        </div>
        <div className="flex items-center gap-2 text-[#d0bcff]">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:opacity-80 transition-opacity active:scale-95 duration-200">
            <Search className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:opacity-80 transition-opacity active:scale-95 duration-200">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="pt-20 px-4 max-w-md mx-auto">
        {/* Mi Estado card */}
        <section className="mb-8">
          <div 
            onClick={() => setIsNewStatusOpen(true)}
            className="bg-[#1b1b20]/60 border border-white/5 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-xl"
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#2a292f]">
                <img className="w-full h-full object-cover" src={userProfile.avatar} alt="Mi avatar" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#d0bcff] rounded-full flex items-center justify-center border-2 border-[#131318]">
                <Plus className="w-4 h-4 text-[#340080] font-bold" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-sans font-bold text-base text-[#e4e1e9]">Mi estado</span>
              <span className="font-sans text-xs text-[#cbc3d7]">Toca para añadir una actualización</span>
            </div>
          </div>
        </section>

        {/* Section title */}
        <section className="mb-4">
          <h2 className="font-sans font-bold text-xs text-[#958ea0] uppercase tracking-wider px-1">
            Actualizaciones recientes
          </h2>
        </section>

        {/* Friend Status Stories list */}
        <div className="space-y-4">
          {/* Unviewed Stories */}
          {unviewedStories.map((story) => (
            <div 
              key={story.id}
              onClick={() => setActiveStory(story)}
              className="flex items-center gap-4 py-2 px-1 hover:bg-white/5 rounded-xl transition-all cursor-pointer group"
            >
              <div className="p-[2.5px] bg-gradient-to-tr from-[#a078ff] to-[#ffb0cd] rounded-full shrink-0">
                <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-[#0F0F14]">
                  <img className="w-full h-full object-cover" src={story.userAvatar} alt={story.userName} />
                </div>
              </div>

              <div className="flex flex-col flex-grow border-b border-white/5 pb-3 group-last:border-none">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-sans font-bold text-[#e4e1e9] text-base">{story.userName}</span>
                  <span className="font-sans text-[11px] text-[#958ea0]">{story.timeAgo}</span>
                </div>
                <span className="font-sans text-sm text-[#cbc3d7] italic">
                  {story.lastUpdateText}
                </span>
              </div>
            </div>
          ))}

          {/* Viewed Stories section separator */}
          {viewedStories.length > 0 && (
            <div className="pt-4 border-t border-white/5">
              <h3 className="font-sans font-bold text-xs text-[#958ea0] uppercase tracking-wider px-1 mb-4">Vistas</h3>
              {viewedStories.map((story) => (
                <div 
                  key={story.id}
                  onClick={() => setActiveStory(story)}
                  className="flex items-center gap-4 py-2 px-1 hover:bg-white/5 rounded-xl transition-all cursor-pointer group opacity-65"
                >
                  <div className="p-[2.5px] bg-[#35343a] rounded-full shrink-0">
                    <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-[#0F0F14]">
                      <img className="w-full h-full object-cover" src={story.userAvatar} alt={story.userName} />
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow border-b border-white/5 pb-3 group-last:border-none">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-sans font-bold text-[#e4e1e9] text-base">{story.userName}</span>
                      <span className="font-sans text-[11px] text-[#958ea0]">{story.timeAgo}</span>
                    </div>
                    <span className="font-sans text-sm text-[#958ea0] italic">
                      {story.lastUpdateText}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 right-4 flex flex-col gap-4 items-center">
        <button 
          onClick={() => setIsNewStatusOpen(true)}
          className="w-12 h-12 bg-[#2a292f] text-[#cbc3d7] rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform duration-200"
        >
          <Edit2 className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setIsNewStatusOpen(true)}
          className="w-14 h-14 bg-[#d0bcff] text-[#340080] rounded-2xl shadow-2xl flex items-center justify-center active:scale-90 transition-transform duration-200 shadow-[#d0bcff]/20"
        >
          <Camera className="w-6 h-6 fill-current" />
        </button>
      </div>

      {/* Nav bar */}
      <BottomNavigation activeTab="estados" onNavigateTo={onNavigateTo} />

      {/* Modal for creating a new status */}
      <AnimatePresence>
        {isNewStatusOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0F0F14]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
          >
            <div className="w-full max-w-sm bg-[#1b1b20] border border-white/10 p-6 rounded-3xl flex flex-col gap-6 shadow-2xl relative">
              <button 
                onClick={() => setIsNewStatusOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-[#cbc3d7]" />
              </button>

              <h2 className="font-sans font-bold text-lg text-[#e4e1e9]">
                Nueva Actualización
              </h2>
              
              <form onSubmit={handlePostStatus} className="flex flex-col gap-4">
                <textarea
                  value={newStatusText}
                  onChange={(e) => setNewStatusText(e.target.value)}
                  placeholder="¿Qué estás pensando?"
                  maxLength={100}
                  className="w-full h-32 bg-[#131318] border border-white/5 rounded-2xl p-4 text-[#e4e1e9] placeholder-[#958ea0]/50 resize-none outline-none focus:border-[#d0bcff]/40 font-sans"
                  required
                />
                
                <div className="flex justify-between items-center text-xs text-[#958ea0] px-1">
                  <span>Máx 100 caracteres</span>
                  <span>{newStatusText.length}/100</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#a078ff] to-[#d0bcff] text-[#340080] font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <Send className="w-4 h-4 fill-current" />
                  <span>Publicar Estado</span>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Story Viewer */}
      <AnimatePresence>
        {activeStory && (
          <StoryViewerModal story={activeStory} onClose={() => setActiveStory(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-component: StoryViewerModal
function StoryViewerModal({ story, onClose }: { story: Story; onClose: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          onClose();
          return 100;
        }
        return prev + 2.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#0F0F14] flex flex-col justify-between p-4"
    >
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

      {/* Main Story Content */}
      <div className="flex-grow flex items-center justify-center p-6 text-center max-w-sm mx-auto w-full">
        <div className="w-full bg-[#1b1b20] border border-white/5 p-8 rounded-3xl flex flex-col justify-center items-center gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#a078ff]/10 rounded-full blur-2xl" />
          
          <img className="w-24 h-24 rounded-full object-cover border-2 border-[#d0bcff]" src={story.userAvatar} alt={story.userName} />
          
          <div className="space-y-3">
            <p className="font-sans font-extrabold text-xl bg-gradient-to-r from-[#d0bcff] to-[#4edea3] bg-clip-text text-transparent">
              {story.userName}
            </p>
            <p className="font-sans text-[#e4e1e9] text-xl font-semibold leading-relaxed">
              "{story.lastUpdateText}"
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pb-8">
        <p className="font-mono text-xs text-[#958ea0]/40 uppercase tracking-widest">
          WAVE STORIES • RECIENTES
        </p>
      </div>
    </motion.div>
  );
}

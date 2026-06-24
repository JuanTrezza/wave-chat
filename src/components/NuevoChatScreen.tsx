import React, { useState } from "react";
import { ChevronLeft, Search, Users, Megaphone, Sparkles, Check } from "lucide-react";
import { Contact, Screen, Chat } from "../types";

interface NuevoChatScreenProps {
  contacts: Contact[];
  chats: Chat[];
  onGoBack: () => void;
  onSelectChat: (chat: Chat) => void;
  onNavigateTo: (screen: Screen) => void;
}

export default function NuevoChatScreen({ contacts, chats, onGoBack, onSelectChat, onNavigateTo }: NuevoChatScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.statusText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectContact = (contact: Contact) => {
    // Find if we already have an active chat with this person
    const existing = chats.find((c) => c.name.toLowerCase().includes(contact.name.toLowerCase()));
    if (existing) {
      onSelectChat(existing);
    } else {
      // If none exists, create a new mock chat
      const newChat: Chat = {
        id: contact.id,
        name: contact.name,
        avatar: contact.avatar,
        lastMessage: "Iniciaste un nuevo chat.",
        time: "Ahora",
        unreadCount: 0,
        isOnline: contact.isOnline,
        messages: [
          {
            id: `m-new-${Date.now()}`,
            text: `¡Hola! Iniciaste un nuevo chat con ${contact.name}.`,
            sender: "them",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ],
      };
      // Insert to list and open
      chats.push(newChat);
      onSelectChat(newChat);
    }
  };

  const handleSelectWaveAssistant = () => {
    const assistantChat = chats.find((c) => c.id === "wave-assistant");
    if (assistantChat) {
      onSelectChat(assistantChat);
    }
  };

  // Group contacts by alphabetical initials
  const initials = Array.from(new Set(filteredContacts.map((c) => c.initial))).sort();

  return (
    <div id="new-chat-view" className="fixed inset-0 z-50 bg-[#131318] text-[#e4e1e9] h-screen flex flex-col select-none overflow-hidden">
      {/* Top AppBar (Modal Style) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#131318]/80 backdrop-blur-xl border-b border-white/5 h-16 flex items-center justify-between px-4">
        <button 
          onClick={onGoBack}
          className="flex items-center text-[#d0bcff] hover:opacity-85 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-5 h-5 mr-0.5" />
          <span className="font-sans font-semibold text-sm">Atrás</span>
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 font-sans font-bold text-base text-[#e4e1e9]">
          Nuevo chat
        </h1>
        <div className="w-12" /> {/* Visual Balance spacer */}
      </header>

      {/* Main Column */}
      <main className="pt-20 pb-12 px-4 h-full flex flex-col">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#958ea0]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar contacto..."
            className="w-full bg-[#1b1b20] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[#e4e1e9] placeholder-[#958ea0]/50 outline-none focus:ring-1 focus:ring-[#d0bcff]/50 transition-all font-sans text-sm"
          />
        </div>

        {/* Quick Options Section */}
        <section className="mb-6">
          <h2 className="text-[10px] font-sans font-bold text-[#958ea0] uppercase tracking-widest mb-3 ml-1">
            Opciones rápidas
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {/* Nuevo Grupo */}
            <button className="flex items-center p-4 bg-[#1b1b20] rounded-2xl border border-white/5 hover:bg-[#1f1f24] active:scale-[0.98] transition-all group w-full text-left">
              <div className="w-12 h-12 rounded-full bg-[#a078ff]/10 flex items-center justify-center mr-4 group-hover:bg-[#a078ff]/20 transition-colors shrink-0">
                <Users className="w-6 h-6 text-[#d0bcff]" />
              </div>
              <p className="font-sans font-semibold text-sm text-[#e4e1e9]">Nuevo grupo</p>
            </button>

            {/* Nueva Difusión */}
            <button className="flex items-center p-4 bg-[#1b1b20] rounded-2xl border border-white/5 hover:bg-[#1f1f24] active:scale-[0.98] transition-all group w-full text-left">
              <div className="w-12 h-12 rounded-full bg-[#4edea3]/10 flex items-center justify-center mr-4 group-hover:bg-[#4edea3]/20 transition-colors shrink-0">
                <Megaphone className="w-6 h-6 text-[#4edea3]" />
              </div>
              <p className="font-sans font-semibold text-sm text-[#e4e1e9]">Nueva difusión</p>
            </button>

            {/* Asistente Wave (Highlighted) */}
            <button 
              onClick={handleSelectWaveAssistant}
              className="flex items-center p-4 bg-[#a078ff]/10 rounded-2xl border border-[#a078ff]/30 hover:bg-[#a078ff]/15 active:scale-[0.98] transition-all group w-full text-left shadow-[0_0_15px_rgba(208,188,255,0.15)]"
            >
              <div className="w-12 h-12 rounded-full bg-[#a078ff] flex items-center justify-center mr-4 shrink-0">
                <Sparkles className="w-6 h-6 text-[#3c0091] fill-current animate-pulse" />
              </div>
              <div className="flex flex-col">
                <p className="font-sans font-bold text-sm text-[#d0bcff]">Asistente Wave</p>
                <p className="text-xs text-[#d0bcff]/70">Inteligencia Artificial para tus chats</p>
              </div>
            </button>
          </div>
        </section>

        {/* Contacts list section */}
        <section className="flex-grow flex flex-col min-h-0 overflow-y-auto pr-1">
          <h2 className="text-[10px] font-sans font-bold text-[#958ea0] uppercase tracking-widest mb-3 ml-1 shrink-0">
            Contactos
          </h2>

          <div className="flex-grow overflow-y-auto space-y-4">
            {initials.length === 0 ? (
              <p className="text-center font-sans text-xs text-[#958ea0] py-6">
                No se encontraron contactos coincidentes.
              </p>
            ) : (
              initials.map((initial) => (
                <div key={initial} className="space-y-2">
                  <div className="sticky top-0 bg-[#131318]/95 backdrop-blur-sm py-1 z-10">
                    <p className="text-[#d0bcff] font-sans font-bold text-xs ml-1">{initial}</p>
                  </div>

                  <div className="space-y-1">
                    {filteredContacts
                      .filter((c) => c.initial === initial)
                      .map((contact) => (
                        <div 
                          key={contact.id}
                          onClick={() => handleSelectContact(contact)}
                          className="flex items-center p-3 hover:bg-[#1b1b20] rounded-2xl transition-colors cursor-pointer group"
                        >
                          <div className="relative shrink-0">
                            <img className="w-12 h-12 rounded-full object-cover" src={contact.avatar} alt={contact.name} />
                            {contact.isOnline && (
                              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#4edea3] rounded-full border-2 border-[#131318]" />
                            )}
                          </div>
                          
                          <div className="ml-4 flex-grow min-w-0">
                            <p className="font-sans font-semibold text-sm text-[#e4e1e9] truncate">{contact.name}</p>
                            <p className="text-xs text-[#958ea0] truncate">{contact.statusText}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

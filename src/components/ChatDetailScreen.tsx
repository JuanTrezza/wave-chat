import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Video, Phone, MoreVertical, Smile, Paperclip, Send, Mic, Play, Pause, CheckCheck, Check, Bot, Terminal } from "lucide-react";
import { Chat, Message, Screen } from "../types";

interface ChatDetailScreenProps {
  chat: Chat;
  onGoBack: () => void;
  onSendMessage: (chatId: string, text: string) => void;
  onReceiveMessage: (chatId: string, message: Message) => void;
}

export default function ChatDetailScreen({ chat, onGoBack, onSendMessage, onReceiveMessage }: ChatDetailScreenProps) {
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of thread
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat.messages, isTyping, isAiGenerating]);

  // Handle typing simulation or Gemini API calls on message send
  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText("");
    setShowEmojiPicker(false);

    // 1. Send the user message
    onSendMessage(chat.id, userText);

    // 2. If it's the AI Assistant Wave
    if (chat.isAi) {
      setIsAiGenerating(true);
      try {
        const response = await fetch("/api/wave-assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...chat.messages, { id: "temp", text: userText, sender: "me", time: "" }],
          }),
        });
        const data = await response.json();
        
        setIsAiGenerating(false);
        const aiMsg: Message = {
          id: `m-ai-${Date.now()}`,
          text: data.text || "¡Hola! Estoy listo para ayudarte con lo que necesites.",
          sender: "them",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        onReceiveMessage(chat.id, aiMsg);
      } catch (err) {
        console.error(err);
        setIsAiGenerating(false);
        const errMsg: Message = {
          id: `m-ai-err-${Date.now()}`,
          text: "Lo siento, tuve un problema para conectarme al servidor. Asegúrate de que el servidor dev se esté ejecutando correctamente.",
          sender: "them",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        onReceiveMessage(chat.id, errMsg);
      }
    } else {
      // Regular contact auto-response simulator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replyText = getMockReply(chat.name, userText);
        const replyMsg: Message = {
          id: `m-reply-${Date.now()}`,
          text: replyText,
          sender: "them",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        onReceiveMessage(chat.id, replyMsg);
      }, 1500);
    }
  };

  const getMockReply = (name: string, query: string): string => {
    const lowercase = query.toLowerCase();
    if (lowercase.includes("hola") || lowercase.includes("buen")) {
      return `¡Hola! ¿Cómo vas? Me alegra escucharte.`;
    }
    if (lowercase.includes("hora") || lowercase.includes("cuándo")) {
      return `¡Me queda perfecto a las 20:30 hs! ¿Te parece bien?`;
    }
    if (lowercase.includes("dónde") || lowercase.includes("cenar")) {
      return `Sí, el lugar italiano nuevo de pastas que abrieron en la esquina es espectacular.`;
    }
    return `¡Dale! Excelente idea, sigamos coordinando.`;
  };

  const emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💅", "🤳", "💪", "🦾", "🦾", "💪", "💄", "💋", "👄", "🦷", "👅", "👂", "👃", "👣", "👁️", "👀", "🧠", "🗣️", "👤", "👥", "🫂", "👶", "👧", "🧒", "👦", "👩", "🧑", "👨", "👩‍🦱", "👩‍🦰", "👩‍🦳", "👩‍🦲", "🧑‍🦱", "🧑‍🦰", "🧑‍🦳", "🧑‍🦲", "👨", "👨‍🦱", "👨‍🦰", "👨‍🦳", "👨‍🦲", "👵", "🧓", "👴", "👲", "🧕", "🧑‍🍳", "👨‍🍳", "👩‍🍳", "🧑‍🎓", "👨‍🎓", "👩‍🎓", "🧑‍🏫", "👨‍🏫", "👩‍🏫", "🧑‍⚖️", "👨‍⚖️", "👩‍⚖️", "🧑‍🌾", "👨‍🌾", "👩‍🌾", "🧑‍🔬", "👨‍🔬", "👩‍🔬", "🧑‍⚕️", "👨‍⚕️", "👩‍⚕️", "🧑‍🔧", "👨‍🔧", "👩‍🔧", "🧑‍🏭", "👨‍🏭", "👩‍🏭", "🧑‍💼", "👨‍💼", "👩‍💼", "🧑‍💻", "👨‍💻", "👩‍💻", "🧑‍🎤", "👨‍🎤", "👩‍🎤", "🧑‍🎨", "👨‍🎨", "👩‍🎨", "🧑‍✈️", "👨‍✈️", "👩‍🎨", "🧑‍🚀", "👨‍🚀", "👩‍🚀", "🧑‍🚒", "👨‍🚒", "👩‍🚒", "👮", "👮‍♂️", "👮‍♀️", "🕵️", "🕵️‍♂️", "🕵️‍♀️", "💂", "💂‍♂️", "💂‍♀️", "🧲", "🪵", "🪵", "🔥", "💧", "💦", "🌊", "🍝", "🍕", "🍔", "🍟", "🌮", "🍿", "☕", "🍺", "🥂", "🧉", "⚽", "🏀", "🏈", "🚀", "🛸", "👾", "✨", "🎉", "🔥", "💖", "❤️", "👍"];

  return (
    <div id="chat-detail-view" className="fixed inset-0 z-50 flex flex-col bg-[#131318] text-[#e4e1e9] h-screen w-screen overflow-hidden">
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1b1b20]/90 backdrop-blur-xl border-b border-white/5 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={onGoBack} 
            className="p-2 hover:bg-white/5 rounded-full transition-colors active:scale-90"
          >
            <ArrowLeft className="w-5 h-5 text-[#e4e1e9]" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              {chat.id === "trabajo-frontend" ? (
                <div className="w-10 h-10 rounded-2xl overflow-hidden bg-[#a078ff]/10 flex items-center justify-center text-[#a078ff]">
                  <Terminal className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                  <img className="w-full h-full object-cover" src={chat.avatar} alt={chat.name} />
                </div>
              )}
              {chat.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#4edea3] rounded-full border-2 border-[#131318]" />
              )}
            </div>
            
            <div className="flex flex-col">
              <h1 className="font-sans font-bold text-sm text-[#e4e1e9] leading-tight flex items-center gap-1">
                {chat.name}
                {chat.isAi && <Bot className="w-3.5 h-3.5 text-[#d0bcff]" />}
              </h1>
              <span className="font-sans text-[11px] text-[#4edea3]">
                {chat.isAi ? "IA Conectada" : chat.isOnline ? "en línea" : "visto recientemente"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 text-[#d0bcff] hover:bg-[#d0bcff]/10 rounded-full transition-colors active:scale-95">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 text-[#d0bcff] hover:bg-[#d0bcff]/10 rounded-full transition-colors active:scale-95">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-[#cbc3d7] hover:bg-white/5 rounded-full transition-colors active:scale-95">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Messages Canvas */}
      <main 
        ref={scrollRef}
        className="flex-grow mt-16 mb-20 overflow-y-auto px-4 py-4 flex flex-col gap-3 scrollbar-none"
      >
        {/* Date Sep */}
        <div className="flex justify-center my-4">
          <span className="px-3.5 py-1 rounded-full bg-[#35343a]/40 text-[#cbc3d7] font-mono text-[10px] uppercase tracking-wider">
            Hoy
          </span>
        </div>

        {/* Existing Messages list */}
        {chat.messages.map((msg) => {
          const isMe = msg.sender === "me";
          return (
            <div 
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${isMe ? "self-end items-end" : "self-start items-start"}`}
            >
              {msg.isVoice ? (
                // Voice message layout
                <div className="bg-[#1f1f24] border border-white/5 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-3">
                  <button 
                    onClick={() => setIsPlayingVoice(!isPlayingVoice)}
                    className="w-10 h-10 rounded-full bg-[#4edea3] flex items-center justify-center text-[#003824] hover:brightness-105 active:scale-90 transition-transform"
                  >
                    {isPlayingVoice ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>
                  <div className="flex flex-col">
                    <div className="flex gap-0.5 items-center justify-start h-5 w-32 px-1">
                      {/* Fake audio waveforms */}
                      {[12, 16, 24, 8, 20, 28, 14, 10, 18, 6].map((h, i) => (
                        <div 
                          key={i} 
                          className={`w-1 bg-[#4edea3] rounded-full transition-all ${isPlayingVoice ? "animate-pulse" : "opacity-60"}`} 
                          style={{ height: isPlayingVoice ? `${Math.floor(Math.random() * 20) + 8}px` : `${h}px` }} 
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] text-[#958ea0] mt-1">{msg.voiceDuration || "0:00"}</span>
                  </div>
                </div>
              ) : (
                // Standard text bubble
                <div 
                  className={`px-4 py-2.5 rounded-2xl flex flex-col gap-1 ${
                    isMe 
                      ? "bg-gradient-to-tr from-[#a078ff] to-[#6d3bd7] text-white rounded-br-sm shadow-md" 
                      : "bg-[#1f1f24] border border-white/5 text-[#e4e1e9] rounded-bl-sm"
                  }`}
                >
                  <p className="font-sans text-sm select-text selection:bg-white/20 whitespace-pre-line">{msg.text}</p>
                  
                  <div className="flex items-center gap-1 self-end">
                    <span className={`font-mono text-[9px] ${isMe ? "text-white/60" : "text-[#958ea0]"}`}>
                      {msg.time}
                    </span>
                    {isMe && (
                      <CheckCheck className="w-3.5 h-3.5 text-white/95" />
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Dynamic Typist / Blinker loader */}
        <AnimatePresence>
          {(isTyping || isAiGenerating) && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-2 mt-2"
            >
              <div className="bg-[#1f1f24] border border-white/5 px-4 py-3.5 rounded-full flex gap-1.5 items-center shadow-lg">
                {chat.isAi && <span className="font-sans text-xs text-[#d0bcff] mr-1 animate-pulse">Asistente pensando...</span>}
                <div className="w-1.5 h-1.5 bg-[#4edea3] rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-[#4edea3] rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-[#4edea3] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Emoji Picker Drawer */}
      <AnimatePresence>
        {showEmojiPicker && (
          <motion.div 
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            className="absolute bottom-20 left-0 right-0 z-40 bg-[#1b1b20] border-t border-white/5 max-h-56 overflow-y-auto p-4 grid grid-cols-8 gap-3 scrollbar-none"
          >
            {emojis.map((emoji, index) => (
              <button 
                key={index} 
                onClick={() => setInputText((prev) => prev + emoji)}
                className="text-2xl hover:scale-125 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Message Input Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#1b1b20]/90 backdrop-blur-xl border-t border-white/5 px-4 py-2 pb-safe flex items-center gap-2">
        <button 
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className={`p-2 transition-colors ${showEmojiPicker ? "text-[#d0bcff]" : "text-[#958ea0] hover:text-white"}`}
        >
          <Smile className="w-6 h-6" />
        </button>
        
        <button className="p-2 text-[#958ea0] hover:text-white transition-colors">
          <Paperclip className="w-6 h-6" />
        </button>
        
        <div className="flex-grow bg-[#131318] border border-white/5 rounded-full px-4 py-2.5 flex items-center focus-within:border-[#d0bcff]/50 transition-all duration-300">
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Mensaje"
            className="bg-transparent border-none outline-none focus:ring-0 w-full text-sm text-[#e4e1e9] placeholder-[#958ea0]/50"
          />
        </div>
        
        <button 
          onClick={handleSend}
          className="bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] w-11 h-11 rounded-full flex items-center justify-center text-white shadow-xl hover:brightness-105 active:scale-90 transition-all duration-150 shrink-0"
        >
          <Send className="w-5 h-5 fill-current ml-0.5" />
        </button>
      </footer>
    </div>
  );
}

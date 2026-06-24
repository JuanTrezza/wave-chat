import React, { useState } from "react";
import { Screen, Chat, Story, Call, Contact, UserProfile, Message } from "./types";
import { initialProfile, initialChats, initialStories, initialCalls, initialContacts } from "./data";
import Splash from "./components/Splash";
import Onboarding from "./components/Onboarding";
import Login from "./components/Login";
import ChatsScreen from "./components/ChatsScreen";
import ChatDetailScreen from "./components/ChatDetailScreen";
import EstadosScreen from "./components/EstadosScreen";
import NuevoChatScreen from "./components/NuevoChatScreen";
import LlamadasScreen from "./components/LlamadasScreen";
import AjustesScreen from "./components/AjustesScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.SPLASH);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile);
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [calls, setCalls] = useState<Call[]>(initialCalls);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  // Flow State Transitions
  const handleSplashComplete = () => {
    setCurrentScreen(Screen.ONBOARDING);
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen(Screen.LOGIN);
  };

  const handleLoginSuccess = (phoneNumber: string) => {
    setUserProfile((prev) => ({
      ...prev,
      phone: phoneNumber,
    }));
    setCurrentScreen(Screen.CHATS);
  };

  const handleLogout = () => {
    setCurrentScreen(Screen.LOGIN);
  };

  const handleNavigateTo = (targetScreen: Screen) => {
    setCurrentScreen(targetScreen);
  };

  // Chat message managers
  const handleSelectChat = (chat: Chat) => {
    // Clear unread counts upon opening
    setChats((prevChats) =>
      prevChats.map((c) => (c.id === chat.id ? { ...c, unreadCount: 0 } : c))
    );
    setSelectedChat(chat);
    setCurrentScreen(Screen.CHAT_DETAIL);
  };

  const handleSendMessage = (chatId: string, text: string) => {
    const newMsg: Message = {
      id: `m-sent-${Date.now()}`,
      text,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };

    setChats((prevChats) =>
      prevChats.map((c) => {
        if (c.id === chatId) {
          return {
            ...c,
            lastMessage: text,
            time: newMsg.time,
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );

    // Sync selectedChat reference if it's currently open
    if (selectedChat && selectedChat.id === chatId) {
      setSelectedChat((prev) =>
        prev
          ? {
              ...prev,
              lastMessage: text,
              time: newMsg.time,
              messages: [...prev.messages, newMsg],
            }
          : null
      );
    }
  };

  const handleReceiveMessage = (chatId: string, message: Message) => {
    setChats((prevChats) =>
      prevChats.map((c) => {
        if (c.id === chatId) {
          return {
            ...c,
            lastMessage: message.isVoice ? "Mensaje de voz (0:45)" : message.text,
            time: message.time,
            messages: [...c.messages, message],
          };
        }
        return c;
      })
    );

    // Sync selectedChat reference if open
    if (selectedChat && selectedChat.id === chatId) {
      setSelectedChat((prev) =>
        prev
          ? {
              ...prev,
              lastMessage: message.isVoice ? "Mensaje de voz (0:45)" : message.text,
              time: message.time,
              messages: [...prev.messages, message],
            }
          : null
      );
    }
  };

  // Status Story manager
  const handleAddStory = (newStory: Story) => {
    setStories((prev) => [newStory, ...prev]);
  };

  // Profile manager
  const handleUpdateProfile = (updated: UserProfile) => {
    setUserProfile(updated);
  };

  // Safe navigation fallback or back buttons
  const handleGoBackFromChatDetail = () => {
    setSelectedChat(null);
    setCurrentScreen(Screen.CHATS);
  };

  const handleGoBackFromNewChat = () => {
    setCurrentScreen(Screen.CHATS);
  };

  // Router Engine Switch
  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.SPLASH:
        return <Splash onComplete={handleSplashComplete} />;
      case Screen.ONBOARDING:
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case Screen.LOGIN:
        return <Login onLoginSuccess={handleLoginSuccess} />;
      case Screen.CHATS:
        return (
          <ChatsScreen
            chats={chats}
            stories={stories}
            userProfile={userProfile}
            onSelectChat={handleSelectChat}
            onNavigateTo={handleNavigateTo}
          />
        );
      case Screen.CHAT_DETAIL:
        if (!selectedChat) {
          setCurrentScreen(Screen.CHATS);
          return null;
        }
        return (
          <ChatDetailScreen
            chat={selectedChat}
            onGoBack={handleGoBackFromChatDetail}
            onSendMessage={handleSendMessage}
            onReceiveMessage={handleReceiveMessage}
          />
        );
      case Screen.ESTADOS:
        return (
          <EstadosScreen
            stories={stories}
            userProfile={userProfile}
            onNavigateTo={handleNavigateTo}
            onAddStory={handleAddStory}
          />
        );
      case Screen.NUEVO_CHAT:
        return (
          <NuevoChatScreen
            contacts={initialContacts}
            chats={chats}
            onGoBack={handleGoBackFromNewChat}
            onSelectChat={handleSelectChat}
            onNavigateTo={handleNavigateTo}
          />
        );
      case Screen.LLAMADAS:
        return (
          <LlamadasScreen
            calls={calls}
            userProfile={userProfile}
            onNavigateTo={handleNavigateTo}
          />
        );
      case Screen.AJUSTES:
        return (
          <AjustesScreen
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onNavigateTo={handleNavigateTo}
            onLogout={handleLogout}
          />
        );
      default:
        return <Splash onComplete={handleSplashComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F14] text-[#e4e1e9] font-sans selection:bg-[#d0bcff]/30">
      {renderScreen()}
    </div>
  );
}

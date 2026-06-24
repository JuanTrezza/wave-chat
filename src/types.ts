export enum Screen {
  SPLASH = "SPLASH",
  ONBOARDING = "ONBOARDING",
  LOGIN = "LOGIN",
  CHATS = "CHATS",
  CHAT_DETAIL = "CHAT_DETAIL",
  ESTADOS = "ESTADOS",
  NUEVO_CHAT = "NUEVO_CHAT",
  LLAMADAS = "LLAMADAS",
  AJUSTES = "AJUSTES",
}

export interface Message {
  id: string;
  text: string;
  sender: "me" | "them";
  time: string;
  status?: "sent" | "delivered" | "read";
  isVoice?: boolean;
  voiceDuration?: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isGroup?: boolean;
  isPinned?: boolean;
  statusText?: string;
  isOnline?: boolean;
  isTyping?: boolean;
  messages: Message[];
  isAi?: boolean; // If this is the Asistente Wave
}

export interface Story {
  id: string;
  userName: string;
  userAvatar: string;
  lastUpdateText: string;
  timeAgo: string;
  isViewed: boolean;
  contentImage?: string;
}

export interface Call {
  id: string;
  userName: string;
  userAvatar: string;
  timeAgo: string;
  isMissed: boolean;
  isVideo: boolean;
  isOutgoing: boolean;
  isGroup?: boolean;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  statusText: string;
  isOnline: boolean;
  initial: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  bio: string;
  avatar: string;
  isOnline: boolean;
}

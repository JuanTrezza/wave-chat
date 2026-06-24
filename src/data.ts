import { Chat, Story, Call, Contact, UserProfile } from "./types";

export const initialProfile: UserProfile = {
  name: "Juan Perez",
  phone: "+34 612 345 678",
  bio: "Explorando el futuro de la mensajería fluida.",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhv7LXbpJ4_GVvw5Sfkq85toGxN5YMK8daamVeZbP0KRCn_DFYAGYiRa9FuC-7FoxnZt4yLp8eZjK0BcZzEnetCwU8pyfn32hdowpNEeNjZ1pLyuh6ul5-evMi0KJHjo35E9tH0Ida_fVUrCz03KlK6VFjObLXv6uyuBT0iVxADPNot-828QMVxWvSGj90QpIVSKc2w27-Y1xlS9ChHNhs9s7bj1SrQDES1F6nihcsoDlXOlTmqJVuNLpcBFp8aqYvtKd6_-OZRE0",
  isOnline: true,
};

export const initialChats: Chat[] = [
  {
    id: "wave-assistant",
    name: "Asistente Wave",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVXqoawz3CxW92t0DSgnvHbV01bJAw5-9FahPJvuUrfUM4JNm7f8G5lNfmK0of8z5P97ZT6PkPFgob_odMhUpsz_OR631qwanCzAMD54BoLyitg7b_NkKnL14bekDMXbeOjPk-vyenuq6OtHNGCZuqKlndVW5rRnhgEPEuf98WwzQw9rN5j3QQL5y9-1usLLdQMGmIxTDR-5u1El1VpardvqK2A8oLoyp-y44d1EKLGRZnDrZ0I5S5qS66xEvsMmkuFQZBfyK8l9w",
    lastMessage: "¡Hola! Soy tu Asistente Wave con Inteligencia Artificial. ¿En qué puedo ayudarte hoy?",
    time: "Ahora",
    unreadCount: 0,
    isOnline: true,
    isAi: true,
    messages: [
      {
        id: "m-ai-1",
        text: "¡Hola! Soy el Asistente Wave, un compañero inteligente potenciado por el modelo Gemini de Google. Estoy integrado directamente en tu chat para ayudarte a redactar mensajes, responder preguntas o planear tu día. ¡Pregúntame lo que quieras!",
        sender: "them",
        time: "12:00",
      },
    ],
  },
  {
    id: "familia",
    name: "Familia ❤️",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0oLpaghcU_hf1wzukVHJX0ezkStbwMw29wjqaew2IGXzEvbb--YZj62gCZMfkoPsDcQyXUlV80UarCAg5IwIBzb6TnNJsp6hlvIW6REAgE0GEsLWrSkA7YNQ4GnOM9HLFV8uWbxoohXFMid0eDAfbhb8gFg_5E6HKbg0zJGgoA-HTLEQiMNGZU5G26zumCoC8iVaWt9HZX7vDgeaceOqwEnIJayPN-pCJZgnIB5GZITmKmWJWj4pwVZovJu72925K1SBhRDVaXOg",
    lastMessage: "Tío Juan: ¡Ya estamos saliendo!",
    time: "14:20",
    unreadCount: 3,
    isGroup: true,
    isPinned: true,
    messages: [
      { id: "m-fam-1", text: "Hola a todos, ¿se cancela la reunión?", sender: "them", time: "14:10" },
      { id: "m-fam-2", text: "No, sigue en pie en lo de la abuela.", sender: "them", time: "14:15" },
      { id: "m-fam-3", text: "Tío Juan: ¡Ya estamos saliendo!", sender: "them", time: "14:20" },
    ],
  },
  {
    id: "sofia",
    name: "Sofía Martínez",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEvWjrAM36n4UFypfF-86tOstVJwBmLAZdMUbK8SHT82RMdECy-nF1RQgGprpQ2cZDRHcM2Y70vR44MwaqVL97MpEBXJyNYVF5v3aIduEyBD4wtNKwf-W3NKJ0DVf_vx9kfGSep8vFY0fvLYXUYGwalRA2I8EkyfCNRuUbUgKA4M6TIHzrbVNUlbewdz4XMc9H1Yg2njqkiZHCGVddZ9q0T3XUVJ86e-0w8kNJ1b0aGAJ4eRkW6vRYjfSPpCBi0wpl_Q5-P0-_LU4",
    lastMessage: "Dale! A qué hora?",
    time: "12:05",
    unreadCount: 0,
    isOnline: true,
    isPinned: true,
    messages: [
      { id: "m-sof-1", text: "Hola! Cómo estás?", sender: "them", time: "14:23", status: "read" },
      { id: "m-sof-2", text: "Todo bien, gracias! Y vos?", sender: "me", time: "14:24", status: "read" },
      { id: "m-sof-3", text: "Genial! Querés salir a cenar esta noche?", sender: "them", time: "14:25", status: "read" },
      { id: "m-sof-4", text: "Conozco un lugar nuevo 🍝", sender: "them", time: "14:25", status: "read" },
      { id: "m-sof-5", text: "Dale! A qué hora?", sender: "me", time: "14:26", status: "read" },
    ],
  },
  {
    id: "trabajo-frontend",
    name: "Trabajo Frontend",
    avatar: "", // Styled specially with terminal icon in the screen
    lastMessage: "Carlos: Revisen el nuevo PR de UI...",
    time: "Ayer",
    unreadCount: 7,
    isGroup: true,
    messages: [
      { id: "m-work-1", text: "Subí los cambios de Tailwind v4", sender: "them", time: "Ayer 15:00" },
      { id: "m-work-2", text: "Carlos: Revisen el nuevo PR de UI...", sender: "them", time: "Ayer 15:30" },
    ],
  },
  {
    id: "mateo",
    name: "Mateo Rodriguez",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRNwivRswkXtj3Q_v425zDDQNZMxyd2a5dMe2g7su0RrxWf9OiTumoqDNCAkHcdxLLGBSsKD6mIiZpSw6cPGtPhZ3q_jFXpLiMfuT6dAC_05eMVndgW-y_mr9qIgw4f7hVW_yt0exZb-5Z-EtNtRRsRKMcPjwBTw5MiyEldiOTsFRbzLrsWHyxpf8CZrz0ZK4aTpeNsaLO3GYW09u3r4lrmq32PESxfDyrHOi4wLLWj6yDxw4xvo7tMRydOdz8dJJg7S3tsNHEozw",
    lastMessage: "¿Nos vemos mañana para el café?",
    time: "Lun",
    unreadCount: 0,
    messages: [
      { id: "m-mat-1", text: "¿Nos vemos mañana para el café?", sender: "them", time: "Lun 10:00", status: "read" },
    ],
  },
  {
    id: "mama",
    name: "Mamá ❤️",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiR3fUZZ1YfsUkbcqhrBzTi4Ad_rs2iSSC9mBMNXqqX7FQvZGvt6fgfn7BRoKVsF-9FUqNjS_tLhgJRdO1zV-MbIaGpLNsK3TAUV5O41ZZ4uFqSIep6Lu8AUGKRmxbP3JIO5_k2GwYHfYCQl30j9av-VGYFEuIEDv4YPgyVgjRYZoS_Sq2oZdveMT9tY1MUHqL1CK_4Q9VQVBxbbAX6hVWCjSNY7abcwqNaEE9yB54ZjX6kkuIPZxB8b22sxb7j9f3LkpI5lQ6YTc",
    lastMessage: "Mensaje de voz (0:45)",
    time: "Dom",
    unreadCount: 0,
    messages: [
      { id: "m-mom-1", text: "Hola hijo, te dejé comida en el horno.", sender: "them", time: "Dom 12:00", status: "read" },
      { id: "m-mom-2", text: "Mensaje de voz", sender: "them", time: "Dom 12:05", isVoice: true, voiceDuration: "0:45" },
    ],
  },
  {
    id: "lucia",
    name: "Lucía Fernández",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5K-FoXVcGDCRA_aIaAmENAXc0SZMORb4IFLaLhPd47Ay3CSW06NRimh5uVY0zCqmhRbYTDFRq5jYyzI-Je_3q7d6ejknlzuld9nH0PRUJ3XDPVm74gV2NzV4R09wfG4zBR7JmF66NKiGDKm5SFR8bbEL8PA3fBHJXdYW9qi-5MOm5E8KE2Pcw53rzbuZ-mTvdT6mIUTfvyyvz-jbk_hNUuzhnC5JtBawNDA002PTIDFqYccqn_EU6ng3ctBHCFCrWvT1BsfypCpc",
    lastMessage: "¡Hablamos luego!",
    time: "15/05",
    unreadCount: 0,
    isOnline: true,
    messages: [
      { id: "m-luc-1", text: "¡Hablamos luego!", sender: "them", time: "15/05 11:00", status: "read" },
    ],
  },
];

export const initialStories: Story[] = [
  {
    id: "story-sofia",
    userName: "Sofía",
    userAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAK_IR0P9ds_T4-AFGm0swk4VkHVx6_g-8pNJtP5nE0ItabbPpWHsa6Of7eBF5TSKwn_uPC3a44szrRX69lHmGH97lfNBHGF6RId-4X0LzMXgNbNXT-2zkcWiqqJTV-Yc7jLqPeiK1a773R7RvLJi_Yz-38iZoLJzhwuudFzCbPpD86a1gWjjEvQtH-aGv1JEI_EGfoAHo14Oam_qCr3wAA0-Q2qPeP8dZfHPVh-0wKl-PcTU9j1aYqueOMr11wSzN0P3XKSoDop6c",
    lastUpdateText: "Ayer fue increíble ✨",
    timeAgo: "hace 10 min",
    isViewed: false,
  },
  {
    id: "story-mateo",
    userName: "Mateo",
    userAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAriDRiLbDlv9fuLKXVw-QOJWpF_WOEDhkpQp08DCjXYhykC0uR9l0oLgBkojRxX53bwSD7HRAXdSZMbqfKjC6zHMxpmksJ2fKH-hykSE-duaMZ3Lpee8EuY2nocYWULbLrd9sR-I5Ozhrrb_sl8kn9lTZWIqHFeVSSKB4M0s1eSn2is18Als5qbOEWQ2nPVS42YNNjELeGGiU7ibB_FwAqzFVIwcZr0n-qlzCjvF2U9mPG2_iR2JlGoMLGE_GBrDPIGUYFh5YKjPs",
    lastUpdateText: "Trabajando en algo nuevo...",
    timeAgo: "hace 2h",
    isViewed: false,
  },
  {
    id: "story-familia",
    userName: "Familia",
    userAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcuNRtW6SLbB_5OZb9nFpKOXGbpEMIbSPIfJm_RkOzaakZZPFqVZJcBnrkRjnnJBSmNYz0NsMtHaDTzNr2cFynkGhs41dXdFtjYzTaMCf2DIy4XEd1_q99vHTqDq01TE_y5aGvQ_FgaqQx7LNXW1CQOg8abd5ha8FazG3GMIrT7OxkqPZ7WBFiIyNPZKSUYsejUW6yaIzO1K2lEfwR6Rb_YnDWrDarpeYrvpI-BJg1hssYx0yvR59XV5FcMBjxZkI8kg9yHy9fK9E",
    lastUpdateText: "Reunión familiar de domingo 🪵",
    timeAgo: "hace 4h",
    isViewed: false,
  },
  {
    id: "story-lucia",
    userName: "Lucía",
    userAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoNCpQeJZt5SLvY7b7-aMPuHS3JiXu5ugdXainNBH2DmxghjIxApUIjy0lKh6KDUrNi_tBqW6Mr6rMOxiOst-GQeK7_9EseAqGS97fSyIxJG7OQ1xXdJkWz-5zwWk0n1kVdFyVVAs7qRdUSIFL8I2LZ27_e3C3ArTVkFmK7Ui1yaYMM06Ga5YAyePo4z9pBBQA23g70PJr5cseJxGpWFPxiS6s5VpYwz2XbjP38T4pj4zyrLyLMohRsG0CPBwcxFZwcNa0Mjx2TNE",
    lastUpdateText: "¡Vacaciones! 🌊",
    timeAgo: "hace 5h",
    isViewed: false,
  },
  {
    id: "story-carlos",
    userName: "Carlos",
    userAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTMl3cCVoVN9uZHB3wiGGP6iWT7LBKqWkkHr-LtdZvH8-9PZ2YCBkIhG1OrjUKb8aPnCyp-bxnkkWHwHztNUz2krDF9403dCdXKEMfDBMwSM6cqs-E-XBsP-SmdTW7LqV0OAjwAH2ApyCovGkDMqDUGUtKqeE6SpR0GaNhX1BHzDOvBnVVq_Ruc_5GKqdTVe7uehIsW45vH4_uvEYfDWAUD4G011KDsCX-_EfqJiCY5MeJkI0YVuPWjgMwNu6qpc8h5ioHyT6hg6c",
    lastUpdateText: "Visto hace poco",
    timeAgo: "hace 8h",
    isViewed: true,
  },
];

export const initialCalls: Call[] = [
  {
    id: "c-sofia",
    userName: "Sofía Martínez",
    userAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKgsE19FzpcWMCFGK1M0TKmHeQu_FMKZJxSPnd8mqdEfJSHXPzJHBFjoSjT9wt1foLghJMkqPQUXLRV3UtFAbj8Ko6EylhylfmAi-tV0VAl5XtMwSDKj-dSm5XVe013UMg78HjQZkFt5jiowkJUoJ4XD7cX0kvunsJc5SmkUdmgRH05TesE68wjnTiLSryTEl7d7f_-q5veaXs4VKicqdS4vZ4TwLl05mCisCFjVbppaEmyZMqpoeUQjXDEVn4WenwvSx9RZgLg6E",
    timeAgo: "hace 2 horas",
    isMissed: false,
    isVideo: true,
    isOutgoing: true,
  },
  {
    id: "c-mama",
    userName: "Mamá",
    userAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiR3fUZZ1YfsUkbcqhrBzTi4Ad_rs2iSSC9mBMNXqqX7FQvZGvt6fgfn7BRoKVsF-9FUqNjS_tLhgJRdO1zV-MbIaGpLNsK3TAUV5O41ZZ4uFqSIep6Lu8AUGKRmxbP3JIO5_k2GwYHfYCQl30j9av-VGYFEuIEDv4YPgyVgjRYZoS_Sq2oZdveMT9tY1MUHqL1CK_4Q9VQVBxbbAX6hVWCjSNY7abcwqNaEE9yB54ZjX6kkuIPZxB8b22sxb7j9f3LkpI5lQ6YTc",
    timeAgo: "ayer",
    isMissed: false,
    isVideo: false,
    isOutgoing: false,
  },
  {
    id: "c-diego",
    userName: "Diego Pérez",
    userAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDi8h13vGpN7-sP_8k8v1YAo2mxCPcTjwKWIPtFHTxVJDloLPXm1hzc7BLxmF_vM77euv4Xo_hwJzKI6V7CTHYpuLKJBk2VgrRqJA7JodQ1pNQF7cCkG3KY_wb3eypFH1mwvjXo9xbpix3YRhRLlKVOu5aUlKI7ijszd9DZ4JNWXEK8T3i_Qks-hhv1URh2w4eiFCGxkMsJX4avho-9u-muHVZ5ZClwqrzj9vOJbV5J-hRnv3nDkrkLu9hNcB_Wk0UGc-rMnzwtuKU",
    timeAgo: "hace 3 días",
    isMissed: true,
    isVideo: false,
    isOutgoing: false,
  },
  {
    id: "c-eq-front",
    userName: "Equipo Frontend",
    userAvatar: "", // Use dynamic placeholder
    timeAgo: "hace 1 semana",
    isMissed: false,
    isVideo: false,
    isOutgoing: true,
    isGroup: true,
  },
];

export const initialContacts: Contact[] = [
  {
    id: "c-andres",
    name: "Andrés López",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuArCp9zl1VrgvXlwXK57DkVYMzxx7BLm8PI4iQLYCszv2pCFWBgSwesbdH-46DJoYt_Bhi6LdW27bvBOGa1t0l2WUaKc5gpotzAEFuiX72W3HVaLnn4ivONBEAZSWtnrXI_-l3HgyvHBVw4gfaZw5dAc4y-KJ_80uZJviWr0xk41gVrigG79zpBV8HNWYLQ5eoIGIaSixZiWYjNS-bnDhKRyMsYyiX8c87NwCdM4Z1IHdTkzMtF4xCsZOHiFPGFZlto3A-8GFhpJ10",
    statusText: "En el trabajo",
    isOnline: true,
    initial: "A",
  },
  {
    id: "c-camila",
    name: "Camila García",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGIc_-uagyfcWSjIKM4KVguJ1ufhaoQv1T8jkSzInm-EQdxoV_qXzc1OccwXRoIsNTcRzkGYIHB5n1Zjfo5eEyYzhaaudQ8RHEnYK1_m_iUaUuvGzzGRp1_WXTTpgly8c_qDHvxRXRN9V5BLY81DA7NIAjxfxEQuf8zZAL-SF2n5WpD_K0TJxAioc7IpTUQg8puAtI7VeaW8ypzyEpNwIfqfpeAVZGpy4Jmtzw4mYEW0GH8cpRAFV7179k6ccj4j-rmdiRJABjIYQ",
    statusText: "¡Hola! Estoy usando WAVE",
    isOnline: false,
    initial: "C",
  },
  {
    id: "c-diego",
    name: "Diego Pérez",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAl-YbqfQlw4EG7g9KsWkIndzALJO2Cp9bHfoNb_qUg9IUXMaqbgh7LPCY28EElY41Frw-ub5ia3zvxEPBdi4121NPNBrhMh_e9iLIbyTjZGLFePLFdbPPJGQKc1z1mPOnKOCO2Y4zAIqyPEJRL5dkm4l65FJZLGEupsmQfGt27zgh5bc-sTlslLmz2wBnl0gwzPG4EE2yQLPcZl9fcr3f7hwFdzzp0XHzQlZG3w70pw1dAPTtuT3UNaP8mlRgroyNhLpbFbKb8jQk",
    statusText: "Ocupado",
    isOnline: false,
    initial: "D",
  },
  {
    id: "c-valentina",
    name: "Valentina Ruiz",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8IBr3TwbIDgTPGqVcwbXIVVgqIJ5Q-98ub6UiwFVYcOZvwtH1KquIP8PstzXQnGtQeyAsc_FP2avBHsHVzBhLh_oB-3VHd3NVgZpz8Q2VVK0GVNA8-6B_KOBPHZ1xtR1EarY5qPbl9gkz1ZXJGHfDTPBjNcx-YbNzNNxzUMfsTJAyPnw3U22O7In2bJ1eITrUhbP9zU9r-IHvG5r2iox1EtafwL2ZZoAsoIIoumIv2jI01QjZ6Ykq8qpUtJvMv2NdmttI6FaMugg",
    statusText: "Disponible",
    isOnline: true,
    initial: "V",
  },
];

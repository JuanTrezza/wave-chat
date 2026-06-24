export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'wave-bg': '#0F0F14',
        'wave-elevated': '#1A1A22',
        'wave-card': '#21212C',
        'wave-purple': '#8B5CF6',
        'wave-pink': '#EC4899',
        'wave-green': '#10B981',
        'wave-text': '#F8FAFC',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-bubble': 'linear-gradient(135deg, #8B5CF6, #EC4899)',
      },
    },
  },
  plugins: [],
}

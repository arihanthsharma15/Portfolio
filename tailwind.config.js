/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#030303',
        emeraldAccent: '#10b981',
        glass: 'rgba(255, 255, 255, 0.06)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(16, 185, 129, 0.35), 0 0 24px rgba(16, 185, 129, 0.18)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
        scanline: 'linear-gradient(to bottom, rgba(255,255,255,0.035) 50%, rgba(0,0,0,0.08) 50%)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.25), 0 0 20px rgba(16, 185, 129, 0.12)' },
          '50%': { boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.45), 0 0 28px rgba(16, 185, 129, 0.3)' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

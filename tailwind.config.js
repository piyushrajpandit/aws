/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0F172A',
          secondary: '#1E293B',
          accent: '#2563EB',
          success: '#16A34A',
          warning: '#EA580C',
          danger: '#DC2626',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B',
        },
        pastel: {
          lavender: '#EEF2FF',
          peach: '#FFF1F2',
          mint: '#ECFDF5',
          cream: '#FFFBEB',
          sky: '#F0F9FF',
          blush: '#FDF2F8',
          yellow: '#FEF9C3',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px 0 rgba(15, 23, 42, 0.03)',
        'card': '0 2px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 10px 25px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
        'modal': '0 20px 40px -15px rgba(15, 23, 42, 0.25)',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'slide-down': 'slide-down 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'float-fast': 'float 6s ease-in-out infinite',
        'color-cycle': 'color-cycle 10s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'right center'
          }
        },
        'slide-down': {
          '0%': { 
            transform: 'translateY(-10px)',
            opacity: '0',
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'slide-up': {
          '0%': { 
            transform: 'translateY(0)',
            opacity: '1',
          },
          '100%': { 
            transform: 'translateY(-10px)',
            opacity: '0',
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0) translateX(0)',
            opacity: '0.3',
          },
          '50%': {
            transform: 'translateY(-45vh) translateX(20px)',
            opacity: '0.6',
          }
        },
        'color-cycle': {
          '0%, 100%': {
            'background-image': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
            '--tw-gradient-from': '#6366f1',
            '--tw-gradient-to': '#818cf8',
          },
          '33%': {
            '--tw-gradient-from': '#8b5cf6',
            '--tw-gradient-to': '#a78bfa',
          },
          '66%': {
            '--tw-gradient-from': '#3b82f6',
            '--tw-gradient-to': '#60a5fa',
          }
        },
      },
    },
  },
  plugins: [],
}; 
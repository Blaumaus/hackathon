/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        aquarium: 'aquarium 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        aquarium: {
          '0%, 100%': { opacity: 0.9 },
          '50%': { opacity: 0.75 },
        }
      }
    },
  },
  plugins: [require("daisyui")],
}
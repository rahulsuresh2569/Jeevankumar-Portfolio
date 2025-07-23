/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#111111',      // Dark background
        'secondary': '#ffffff',    // Light text
        'tertiary': '#1f1f1f',    // Slightly lighter dark for cards
        'accent': '#f5f5f7',      // Light gray for subtle text
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
} 
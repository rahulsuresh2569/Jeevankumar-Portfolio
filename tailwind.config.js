/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#010414',
        'secondary': '#f6f6f6',
        'tertiary': '#ffffff',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 
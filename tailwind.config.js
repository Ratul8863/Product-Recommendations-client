// tailwind.config.js
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // 👈 Ensure this is set
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
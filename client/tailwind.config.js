/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('daisyui'), // ✅ Add daisyUI plugin
  ],
  daisyui: {
    themes: ["forest"], // ✅ Enable "forest" theme
  },
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'cream-lightest': '#fffdf9',
        'indigo-lightest': '#F6F6FF'
      },
    },
  },
  plugins: [],
}


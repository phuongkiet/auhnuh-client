/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,tsx,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        myfont: ['MyFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


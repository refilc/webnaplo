/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'refilc': '#3d7bf4',
        'ogfilc': '#20ac9b',
        'refilc-sec': '#7aa4f8',
        'ogfilc-sec': '#7aa4f8',
      }
    },
  },
  plugins: [],
}

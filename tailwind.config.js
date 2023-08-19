/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // accent colors
        'refilc': '#3d7bf4',
        'ogfilc': '#20ac9b',
        'refilc-sec': '#7aa4f8',
        'ogfilc-sec': '#7aa4f8',
        // grade colors
        'grade-5': '#3d7bf4',
        'grade-4': '#4c3df4',
        'grade-3': '#833df4',
        'grade-2': '#ae3df4',
        'grade-1': '#f43dab',
      }
    },
  },
  plugins: [],
}

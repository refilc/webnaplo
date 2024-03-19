/** @type {import('tailwindcss').Config} */

import textFill from "tailwindcss-text-fill";

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
        // new colors
        'v5_txt': '#0A1C41',
        'v5_btn': '#0E275A',
      }
    },
  },
  plugins: [
    textFill,
  ],
}

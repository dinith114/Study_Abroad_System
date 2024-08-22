/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grNavText: '#0F2F64',
        grNavTextHov: '#1E5DBC',
      },
    },
  },
  plugins: [],
}
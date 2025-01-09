/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js}",
  ],
  theme: {
    extend: { 
      
      colors:{ 
        primary:{
          light: "#303ce3",
          dark: '#a2a6db'
        },
        background:{
          light: '#dadcf0',
          dark:"#11121c"
        },
        text:{
          light:'#11121c',
          dark:'#f2f3f7'
        }

      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode:"class",
  theme: {
    extend: {
      container: {
        screens: {
          DEFAULT: "1280px",
        },
        padding: {
          DEFAULT: "20px"
        }
      },
      colors: {
        "darkBlue":"#4462ff",
        "lightBlue": "#8c9fff",
        "orange":"#ff9f2b",
        "darkGray":"#1e1e1e",
        "darkBlack":"#141313"
      }
    },
    fontFamily: {
      "poppins": ["Poppins"]
    }
  },
  plugins: [],
}


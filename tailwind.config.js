/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
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
      }
    },
    fontFamily: {
      "poppins": ["Poppins"]
    }
  },
  plugins: [],
}


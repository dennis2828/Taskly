/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      container: {
        screens: {
          DEFAULT: "1280px",
        },
      },
    },
  },
  plugins: [],
}


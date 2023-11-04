/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    screens: {
      sm: 640
    },
    extend: {
      colors: {
        error: "#F20000",
        text: {
          primary: "#1D1D1D"
        },
        button: {
          primary: {
            bg: "red"
          }
        }
      },
    },
  },
}

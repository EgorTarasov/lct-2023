/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    screens: {
      sm: 640
    },
    extend: {
      colors: {
        primary: "var(--color-primary)",
        error: "#F20000",
        text: {
          primary: "#1D1D1D"
        },
        input: {
        },
        button: {
          primary: {
            bg: "#2C55DE",
            text: "#FFFFFF"
          }
        }
      }
    }
  }
};

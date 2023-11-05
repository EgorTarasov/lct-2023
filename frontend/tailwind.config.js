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
        onPrimary: "var(--color-onPrimary)",
        error: "#F20000",
        nav: {
          background: "#FFFFFF",
          text: "#1D1D1D",
          border: "#E5E5E5"
        },
        text: {
          primary: "#1D1D1D"
        },
        input: {},
        button: {
          primary: {}
        }
      }
    }
  }
};

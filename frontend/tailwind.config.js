/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    screens: {
      sm: "640px"
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
        event: {
          sport: "#EB5284",
          education: "#2C55DE",
          art: "#7B2CBF",
          charity: "#FF6400"
        }
      }
    }
  },
  safelist: [
    "text-event-sport",
    "text-event-education",
    "text-event-art",
    "text-event-charity"
  ],
};

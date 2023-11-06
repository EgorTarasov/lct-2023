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
        },
        task: {
          education: "#2C55DE",
          divein: "#7B2CBF",
          event: "#EB5284",
          meeting: "#FF6400",
          work: "#097240"
        }
      }
    }
  },
  safelist: [
    "text-event-sport",
    "bg-event-sport",
    "text-event-education",
    "bg-event-education",
    "text-event-art",
    "bg-event-art",
    "text-event-charity",
    "bg-event-charity",
    "text-tasks-education",
    "bg-tasks-education",
    "text-tasks-divein",
    "bg-tasks-divein",
    "text-tasks-event",
    "bg-tasks-event",
    "text-tasks-meeting",
    "bg-tasks-meeting",
    "text-tasks-work",
    "bg-tasks-work",
  ],
};

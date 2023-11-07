/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      desktop: "1024px",
      etalon: "1420px"
    },
    extend: {
      colors: {
        primary: "rgba(var(--color-primary), <alpha-value>)",
        onPrimary: "rgba(var(--color-onPrimary), <alpha-value>)",
        bg: {
          desktop: "#EDEDED"
        },
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
    "text-task-education",
    "bg-task-education",
    "text-task-divein",
    "bg-task-divein",
    "text-task-event",
    "bg-task-event",
    "text-task-meeting",
    "bg-task-meeting",
    "text-task-work",
    "bg-task-work",
  ],
};

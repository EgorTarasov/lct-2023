/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    screens: {
      sm: 640
    },
    extend: {},
  },
  plugins: [
    require("tailwindcss-themer")({
      defaultTheme: {
        extend: {
          colors: {
            button: {
              primary: {
                bg: "red"
              }
            }
          },
        }
      },
      themes: [
        {
          name: "greenTheme",
          extend: {
            colors: {
              button: {
                primary: {
                  bg: "green"
                }
              }
            }
          }
        }
      ]
    })
  ],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
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

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    // app content
    // `**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/**/*.{js,ts,jsx,tsx}",
    "../../apps/web/pages/**/*.{js,ts,jsx,tsx}",
    "../../apps/web/components/**/*.{js,ts,jsx,tsx}",
    "../../apps/docs/pages/*.{js,ts,jsx,tsx}",
    "../../apps/docs/components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#0000FF",
        green: {
          light: "#D0E92B",
          dark: "#09B757",
          neon: "#6EE881",
        },
        pink: {
          light: "#FFD2D7",
          dark: "#E23957",
        },
        orange: {
          light: "#FFD335",
          dark: "#FF0000",
          neon: "#FCB964",
        },
      },
      fontFamily: {
        sans: ["--font-helvetica-neue", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

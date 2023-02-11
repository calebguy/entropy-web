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
    fontSize: {
      xs: ["12px", "15px"],
      sm: ["14px", "14px"],
      base: ["16px", "18px"],
      lg: ["24px", "38px"],
      xl: ["48px", "52px"],
    },
    borderRadius: {
      sm: "5px",
      md: "10px",
      lg: "12px",
      full: "9999px",
    },
    extend: {
      colors: {
        brand: "#0000FF",
        ["deep-blue"]: "#042991",
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
        gray: "#737577",
      },
      fontFamily: {
        sans: ["var(--font-helvetica-neue)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

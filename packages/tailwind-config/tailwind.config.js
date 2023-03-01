const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    // @next could make this better by using src directories in each package / app
    "../../packages/dsl/src/**/*.{js,ts,jsx,tsx}",
    "../../apps/entropy-plus/pages/**/*.{js,ts,jsx,tsx}",
    "../../apps/entropy-plus/components/**/*.{js,ts,jsx,tsx}",
    "../../apps/entropy-plus/layouts/**/*.{js,ts,jsx,tsx}",
    "../../apps/docs/pages/*.{js,ts,jsx,tsx}",
    "../../apps/docs/components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ["10px", "15px"],
      sm: ["12px", "14px"],
      base: ["14px", "16px"],
      lg: ["18px", "20px"],
      xl: ["27px", "27px"],
      xxl: ["38px", "38px"],
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
        error: "#dc2626",
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
        gray: {
          light: "#D9D9D9",
          medium: "#C4C4C4",
          dark: "#737577",
        },
      },
      fontFamily: {
        sans: ["var(--font-helvetica-neue)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

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
      },
      fontFamily: {
        sans: ["--font-helvetica-neue", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

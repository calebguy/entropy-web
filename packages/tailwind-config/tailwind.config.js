const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    // app content
    // `**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "../../apps/web/pages/**/*.{js,ts,jsx,tsx}",
    "../../apps/docs/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandblue: colors.blue[500],
        brandred: colors.red[500],
      },
    },
  },
  plugins: [],
};

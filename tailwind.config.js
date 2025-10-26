/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        instagram: {
          primary: "#262626",
          secondary: "#8e8e8e",
          border: "#dbdbdb",
          hover: "#fafafa",
          blue: "#0095f6",
        },
      },
      animation: {
        progress: "progress 5s linear forwards",
      },
      keyframes: {
        progress: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      // override the default font
      sans: "Roboto Mono, monospace",
    },

    extend: {
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};

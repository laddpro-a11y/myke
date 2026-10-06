/** @tailwindcss/forms */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mykeblack: "#0a0a0a",
        mykewhite: "#ffffff",
        mykedarkgray: "#1f1f1f",
        mykeblue: "#0a84ff",
        mykepurple: "#a855f7",
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobilehover: { raw: "(hover: hover)" },
      },


      colors: {
        black: "hsl(250, 85%, 5%)",
        while: "hsl(20, 100%m 99%)",
        orange: "hsl(30, 100%, 35%)",

        primary: {
          40: "hsl(280,60%,90%)",
          50: "hsl(280, 100%, 35%)",
          100: "hsl(295, 75%, 30%)",
        },
      },

      fontFamily: {
        LifeSugarly: "LifeSugarlyUP",
        PlayfairDisplay: "Playfair Display",
        WorkSans: "WorkSans",
      },

      dropShadow: {
        shadow: "15px 15px 35px 0px rgba(194, 71, 10, 1.00)",
        "shadow-focus": "0 1px 2px rgba(150, 75, 30, 0.70)",
      },

      borderRadius: {
        lg: "24px",
      },

      backgroundImage: {
        bgImage01: 'url("assets/images/bgImage01.webp")',
        bgImage02: 'url("assets/images/bgImage02.webp")',
        bgImage03: 'url("assets/images/bgImage03.webp")',
        bgImage04: 'url("assets/images/bgImage04.webp")',
      },
    },
  },
  plugins: [],
  experimental: {
    applComplexClasses: true,
  },
};

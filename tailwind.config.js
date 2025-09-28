// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobilehover: { raw: "(hover: hover)" },
      },
      colors: {
        black: "hsl(250, 85%, 5%)",
        white: "hsl(20, 100%, 99%)",
        orange: "hsl(30, 100%, 35%)",
        primary: {
          "40": "hsl(280, 60%, 90%)",
          "50": "hsl(280, 100%, 35%)",
          "100": "hsl(295, 75%, 30%)",
        },
      },
      fontFamily: {
        LifeSugarly: ["LifeSugarlyUP", "sans-serif"],
        PlayfairDisplay: ["Playfair Display", "serif"],
        WorkSans: ["WorkSans", "sans-serif"],
      },
      dropShadow: {
        shadow: "15px 15px 35px rgba(194, 71, 10, 1)",
        "shadow-focus": "0 1px 2px rgba(150, 75, 30, 0.7)",
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
}

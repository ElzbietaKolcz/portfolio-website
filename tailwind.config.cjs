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

        primary: {
          40: "hsl(20,100%,85%)",
          50: "hsl(20, 96%, 50%)",
          100: "hsl(31, 100%, 45%)",
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
        bgImage01:
          'url("https://firebasestorage.googleapis.com/v0/b/portfolioui-962a3.appspot.com/o/background%2FbgImage01.jpg?alt=media&token=f27274f9-14f0-4df9-aa58-093bf741e0a1")',
        bgImage02:
          'url("https://firebasestorage.googleapis.com/v0/b/portfolioui-962a3.appspot.com/o/background%2FbgImage02.jpg?alt=media&token=42ba37ad-b8dc-4eed-89fc-4e2740913afe")',
        bgImage03:
          'url("https://firebasestorage.googleapis.com/v0/b/portfolioui-962a3.appspot.com/o/background%2FbgImage03.jpg?alt=media&token=998934a4-9d64-4b9a-a183-64bcdf020d0c")',
        bgImage04:
          'url("https://firebasestorage.googleapis.com/v0/b/portfolioui-962a3.appspot.com/o/background%2FbgImage04.jpg?alt=media&token=209e9a35-8b99-4bf2-a445-c022e21661e3")',
      },
    },
  },
  plugins: [],
  experimental: {
    applComplexClasses: true,
  },
};

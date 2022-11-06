/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        back: "rgba(232,239,238,0.45)",
        "back-side": "#BFD2D1",
        "back-color": "#2A263E",
        "table-header": "rgba(255, 100, 120, 0.25)",
        candle: "#F6FEFD",
        "green-tbl": "#CEF5F2",
        "green-h-tbl": "#7BE5DB",
        "red-tbl": "rgba(255, 99, 129, 0.35)",
        "red-h-tbl": "rgba(255, 99, 129, 0.35)",
        "search-color": "rgba(255, 99, 129, 0.14)",
      },
      borderRadius: {
        "5xl": "50px",
        "2.5x": "20px",
      },
      screens: {
        tablet: "768px",
        desktop: "992px",
      },
    },
  },
  plugins: [
    // ...
    require("tailwind-scrollbar"),
  ],
};

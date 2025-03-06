/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#000000",
          light: "#333333",
        },
        secondary: {
          DEFAULT: "#FFB800",
          light: "#FFD466",
        },
        accent: {
          DEFAULT: "#0066CC",
          light: "#3399FF",
        },
        background: {
          light: "#FFFFFF",
          dark: "#F5F5F5",
        },
        text: {
          primary: "#000000",
          secondary: "#666666",
          light: "#999999",
        },
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      fontFamily: {
        sans: ["Inter var", "sans-serif"],
      },
      fontSize: {
        "heading-1": ["3.5rem", { lineHeight: "1.2" }],
        "heading-2": ["2.5rem", { lineHeight: "1.3" }],
        "heading-3": ["2rem", { lineHeight: "1.4" }],
        "body-large": ["1.125rem", { lineHeight: "1.5" }],
        body: ["1rem", { lineHeight: "1.5" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
      },
    },
  },
  plugins: [],
};

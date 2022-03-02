module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#232019",
          DARK: "#000000",
        },
        gray: "#EEE9D7",
        brown: "#27231B",
        orange: "#F49600",
        gold: {
          DEFAULT: "#6D5B31",
          light: "#A99159",
        },
        pink: {
          DEFAULT: "#E5D7B4",
          light: "#FCF7F0",
        },
        green: {
          DEFAULT: "#323E2F",
          light: "#B6E0AC",
        },
        purple: {
          DEFAULT: "#3E2F39",
          light: "#7E52A0",
        },
        yellow: {
          DEFAULT: "#A99F45",
          medium: "#B2B250",
          light: "#F7F9A5",
        },
        red: {
          DEFAULT: "#552D2D",
          light: "#E0463C",
        },
      },
      fontSize: {
        xxs: ["12px", "20px"],
        xs: ["14px", "22px"],
        sm: ["16px", "26px"],
        base: ["18px", "28px"],
        lg: ["24px", "34px"],
        xl: ["28px", "38px"],
        "2xl": ["32px", "38px"],
        "3xl": ["48px", "56px"],
        "4xl": ["62px", "70px"],
        "5xl": ["80px", "88px"],
      },
      fontFamily: {
        serif: ["Graphik", "serif"],
        sans: ["Graphik", "sans-serif"],
      },
      screens: {
        "3xl": "1920px",
      },
      backgroundImage: {
        arrowSx: "url('/icons/arrow_left.svg')",
        arrowDx: "url('/icons/arrow_right.svg')",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "640px",
          },
          "@screen md": {
            maxWidth: "768px",
          },
          "@screen lg": {
            maxWidth: "1024px",
          },
          "@screen xl": {
            maxWidth: "1280px",
          },
          "@screen 2xl": {
            maxWidth: "1350px",
          },
          "@screen 3xl": {
            maxWidth: "1460px",
          },
        },
      });
    },
  ],
};

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        fallStamp: "fallStamp 3s ease-in-out forwards",
        scaleUp: "scaleUp .3s cubic-bezier(.36,.96,.69,1.42) forwards",
      },
      keyframes: {
        fallStamp: {
          "0%": { opacity: "1" },
          "99%": {
            opacity: ".5",
            top: "120vh",
            transform: "rotate(-360deg)",
          },
          "100%": {
            opacity: "0",
            top: "120vh",
            transform: "rotate(-360deg)",
          },
        },
        scaleUp: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

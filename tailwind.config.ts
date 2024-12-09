import type { Config } from "tailwindcss";

export default {
  content: [
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        loader: "loader 1s infinite",
      },
      colors: {
        light: "#F5F3FF",
        primary: "#7C3AED",
        dark: "#6D28D9",
        primaryDark: "#6b21a8",
      },
      fontFamily: {
        primary: ["Poppins"],
        secondary: ['"Open Sans"'],
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";

export default {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                palette: {
                    light: "#F5F3FF",
                    primary: "#7C3AED",
                    dark: "#6D28D9",
                },
            },
            fontFamily: {
                primary: ["Poppins"],
                secondary: ['"Open Sans"'],
            },
        },
    },
    plugins: [],
} satisfies Config;

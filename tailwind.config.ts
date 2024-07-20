import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            borderRadius: {
                "tr-lg": "30px", // Add your custom radius value
            },
            fontFamily: {
                cursive: ["cursive"],
            },
            fontSize: {
                revert: "revert",
                large: "x-large",
            },
            colors: {
                "custom-pink": "rgb(255, 29, 115)",
                beige: "#F5F5DC", // Add the color beige with its hex code
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;

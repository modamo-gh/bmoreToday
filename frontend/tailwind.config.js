/**@type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                text: "#f5f5f5",
                background: "#1c1a29",
                primary: "#241773",
                secondary: "#5d3fd3",
                accent: "#ff6a00",
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
};

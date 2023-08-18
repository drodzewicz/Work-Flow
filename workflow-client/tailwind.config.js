/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      accent: {
        primary: "var(--color-accent-primary)",
        secondary: "var(--color-accent-secondary)",
      },
    },
    extend: {},
  },
  plugins: [],
};

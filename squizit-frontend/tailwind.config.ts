import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  darkMode: "class",

  theme: {
    extend: {
      backgroundColor: ["active"],
      colors: {
        dark: "#2b2d37",
        light: "#fff",
      },
      boxShadow: {
        center: "0 0 0.5rem #000",
      },
    },
  },
  variants: {},
  plugins: [],
});

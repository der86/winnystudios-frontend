import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/ , tailwindcss()
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://192.168.0.110:5000",
    },
  },
});

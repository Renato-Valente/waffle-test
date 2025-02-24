import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "public/index.html",
        login: 'public/login.html'
        //about: "public/about.html",
        //contact: "public/contact.html",
      },
    },
  },
});

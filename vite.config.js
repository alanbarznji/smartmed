import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    historyApiFallback: true, // Ensure Vue Router handles all routes
  }
});

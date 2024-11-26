import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                  @use "@/styles/_variables.scss" as *;
                  @use "@/styles/_mixins.scss" as *;
                  @use "@/styles/reset.scss" as *;
                `,
      },
    },
  },
});

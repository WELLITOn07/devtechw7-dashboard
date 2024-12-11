import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "/src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/styles/_fonts.scss" as *;
          @use "@/styles/_mixins.scss" as *;
          @use "@/styles/reset.scss" as *;
          `,
        },
      },
    },
    base: env.VITE_BASE_URL || "/",
    server: {
      host: env.VITE_HOST || "localhost",
      port: parseInt(env.VITE_PORT) || 5173,
    },
    build: {
      outDir: "dist",
    },
    define: {
      "process.env": env,
    },
  };
});

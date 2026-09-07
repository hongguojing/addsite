import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";

export default defineConfig({
  output: "static",
  site: "https://shanxiang.local",
  integrations: [
    mdx(),
    vue({ appEntrypoint: "/src/vue/motion-app.ts" }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

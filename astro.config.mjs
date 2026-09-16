import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";

export default defineConfig({
  output: "static",
  site: "https://hongguojing.github.io",
  base: "/addsite",
  integrations: [
    mdx(),
    vue({ appEntrypoint: "/src/vue/motion-app.ts" }),
  ],
  markdown: {
    shikiConfig: {
      // Dual themes: the active one is picked in global.css via [data-theme]
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
      wrap: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

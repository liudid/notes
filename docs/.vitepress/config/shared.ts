import { defineConfig } from "vitepress";
export const shared = defineConfig({
  base: "/notes/",
  head: [],
  themeConfig: {
    socialLinks: [{ icon: "github", link: "https://github.com/liudid" }],
  },
});

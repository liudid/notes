import { defineConfig } from "vitepress";
export const shared = defineConfig({
  base: "/notes/",
  head: [['link', { rel: 'icon', href: '/notes/favicon.ico' }]],
  themeConfig: {
    socialLinks: [{ icon: "github", link: "https://github.com/liudid" }],
  },
});

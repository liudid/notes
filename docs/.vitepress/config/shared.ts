import { defineConfig } from "vitepress";
export const shared = defineConfig({
  base: "/notes/",
  head: [
    ["link", { rel: "icon", href: "/notes/favicon.ico" }],
    ["link", { rel: "icon", href: "/notes/img/avatar.png" }],
  ],
  themeConfig: {
    logo: "/img/avatar.png",
    socialLinks: [{ icon: "github", link: "https://github.com/liudid" }],
  },
});

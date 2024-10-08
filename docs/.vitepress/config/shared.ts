import { defineConfig } from "vitepress";

export const shared = defineConfig({
  base: "/notes/",
  head: [
    ["link", { rel: "icon", href: "/notes/favicon.ico" }],
  ],
  themeConfig: {
    logo: "/avatar.svg",
    socialLinks: [{ icon: "github", link: "https://github.com/liudid" }],
  },
});

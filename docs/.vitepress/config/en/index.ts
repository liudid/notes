import { defineConfig, type DefaultTheme } from "vitepress";
import { getNav } from "./nav";
import { getSidebar } from "./sidebar";

export const en = defineConfig({
  lang: "en-US",
  title: "My Notes",
  description: "My Notes Site",
  themeConfig: {
    nav: getNav(),
    sidebar: getSidebar(),
  },
});

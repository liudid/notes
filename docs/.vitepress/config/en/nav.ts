import { type DefaultTheme } from "vitepress";
export function getNav(): DefaultTheme.NavItem[] {
  return [
    { text: "home", link: "/en/" },
    { text: "tools", link: "/en/tools/life", activeMatch: "/en/tools/" },
  ];
}

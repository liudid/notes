import { type DefaultTheme } from "vitepress";
export function getSidebar(): DefaultTheme.Sidebar {
  return {
    "/en/tools/": sidebarTools(),
  };
}


function sidebarTools(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Life Tools",
      link: "/en/tools/life",
    },
  ];
}

import { type DefaultTheme } from "vitepress";
export function getNav(): DefaultTheme.NavItem[] {
  return [
    { text: "主页", link: "/" },
    { text: "笔记", link: "/zh/notes/money", activeMatch: "/zh/notes/" },
    { text: "技术文档", link: "/zh/dev/directory", activeMatch: "/zh/dev/" },
    { text: "日记", link: "/zh/diary/2024-01-18", activeMatch: "/zh/diary/" },
    { text: "好用工具", link: "/zh/tools/life", activeMatch: "/zh/tools/" },
  ];
}

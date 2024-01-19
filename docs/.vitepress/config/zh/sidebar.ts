import { type DefaultTheme } from "vitepress";
export function getSidebar(): DefaultTheme.Sidebar {
  return {
    "/zh/notes/": sidebarNotes(),
    "/zh/dev/": sidebarDev(),
    "/zh/diary/": sidebarDiary(),
    "/zh/tools/": sidebarTools(),
  };
}

function sidebarNotes(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "钱",
      link: "/zh/notes/money",
    },
  ];
}

function sidebarDev(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "规范",
      collapsed: false,
      items: [
        {
          text: "目录结构（directory）",
          link: "/zh/dev/directory",
        },
        { text: "命名（naming）", link: "/zh/dev/naming" },
        { text: "风格（style）", link: "/zh/dev/style" },
        {
          text: "编码（Language）",
          collapsed: true,
          items: [
            { text: "HTML", link: "/zh/dev/language-html" },
            { text: "CSS", link: "/zh/dev/language-css" },
            { text: "JS", link: "/zh/dev/language-js" },
            { text: "TS", link: "/zh/dev/language-ts" },
            { text: "Vue", link: "/zh/dev/language-vue" },
          ],
        },
        {
          text: "教程（tutorials）",
          collapsed: true,
          items: [
            {
              text: "GitHub",
              items: [
                {
                  text: "GitHub Pages",
                },
              ],
            },
            { text: "其它", link: "" },
          ],
        },
      ],
    },
  ];
}

function sidebarDiary(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "2024-01-18",
      link: "/zh/diary/2024-01-18",
    },
  ];
}

function sidebarTools(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "生活工具",
      link: "/zh/tools/life",
    },
    {
      text: "开发工具",
      link: "/zh/tools/dev",
    },
  ];
}

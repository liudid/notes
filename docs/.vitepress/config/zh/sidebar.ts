import { type DefaultTheme } from "vitepress";
export function getSidebar(): DefaultTheme.Sidebar {
  return {
    "/zh/notes/": sidebarNotes(),
    "/zh/dev/": sidebarDev(),
    "/zh/diary/": sidebarDiary(),
    "/zh/tools/": sidebarTools(),
    "/zh/english/": sidebarEnglish(),
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
    {
      text: "Open-Source Library",
      link: "/zh/tools/open",
    },
  ];
}

function sidebarEnglish(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "WORDS & 1500",
      link: "/zh/english/middle-school-words",
    },
    {
      text: "Words-Manager",
      link: "/zh/english/words-manager",
    },
    {
      text: "语法（Grammar）",
      collapsed: false,
      items: [
        {
          text: "词法",
          collapsed: true,
          items: [
            {
              text: "词的属性",
              collapsed: false,
              items: [
                { text: "名词" },
                { text: "代词" },
                { text: "动词" },
                { text: "形容词" },
                { text: "副词" },
                { text: "数词" },
                { text: "介词" },
                { text: "连词" },
                { text: "冠词" },
                { text: "叹词" },
              ],
            },
            {
              text: "词的变化",
              collapsed: false,
            },
            {
              text: "构词法",
              collapsed: false,
            },
          ],
        },
        {
          text: "句法",
          collapsed: false,
          items: [
            {
              text: "句子成分",
              collapsed: false,
              items: [
                {
                  text: "基本成分",
                  collapsed: false,
                  items: [
                    {
                      text: "主语 + 谓语",
                    },
                  ],
                },
                {
                  text: "所有成分",
                  collapsed: false,
                  items: [
                    {
                      text: "主语",
                    },
                    {
                      text: "谓语动词",
                      collapsed: false,
                      items: [
                        {
                          text: "动作的时间和状态",
                        },
                        {
                          text: "动词语气",
                        },
                      ],
                    },
                    {
                      text: "宾语",
                    },
                    {
                      text: "宾语补语",
                    },
                    {
                      text: "主语补语",
                    },
                    {
                      text: "定语",
                    },
                    {
                      text: "状语",
                    },
                    {
                      text: "同位语",
                    },
                  ],
                },
              ],
            },
            {
              text: "五大基本句型",
            },
            {
              text: "简单句",
            },
          ],
        },
      ],
    },
    {
      text: "词汇",
      collapsed: false,
    },
    {
      text: "语音",
      collapsed: false,
    },
  ];
}

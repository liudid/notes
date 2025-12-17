import { type DefaultTheme } from "vitepress";
export function getSidebar(): DefaultTheme.Sidebar {
  return {
    "/zh/notes/": sidebarNotes(),
    "/zh/dev/": sidebarDev(),
    "/zh/diary/": sidebarDiary(),
    "/zh/tools/": sidebarTools(),
    "/zh/english/": sidebarEnglish(),
    "/zh/yao/": sidebarYao(),
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
        {
          text: "JavaScript Clean Code",
          link: "/zh/dev/clean-code",
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
      text: "Words-Manager",
      link: "/zh/english/words-manager",
    },
    {
      text: "宇宙奥义之究极理解",
      link: "/zh/english/universe",
    },
    {
      text: "语法-词法",
      collapsed: false,
      items: [
        {
          text: "词的属性",
          collapsed: true,
          items: [
            { text: "名词" },
            { text: "代词" },
            { text: "动词", link: "/zh/english/words-rule/verb" },
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
          collapsed: true,
          items: [
            {
              text: "复数",
              link: "/zh/english/morphology/plural",
            },
            {
              text: "时态",
              link: "/zh/english/morphology/tense",
            },
          ],
        },
        {
          text: "构词法",
          collapsed: true,
          items: [
            {
              text: "派生",
              items: [
                {
                  text: "词根",
                },
                {
                  text: "词缀",
                },
              ],
            },
            {
              text: "合成",
            },
            {
              text: "混合",
            },
            {
              text: "截短",
            },
            {
              text: "缩写",
            },
            {
              text: "转化",
            },
          ],
        },
      ],
    },
    {
      text: "语法-句法",
      collapsed: false,
      items: [
        {
          text: "句子成分",
          collapsed: true,
          items: [
            {
              text: "基本成分",
              link: "/zh/english/syntax/basic",
            },
            {
              text: "所有成分",
              collapsed: true,
              items: [
                {
                  text: "主语",
                  link: "/zh/english/syntax/all/subject",
                },
                {
                  text: "谓语动词",
                  collapsed: true,
                  items: [
                    {
                      text: "基础",
                      link: "/zh/english/syntax/all/verb",
                    },
                    {
                      text: "动作的时间&状态",
                      items: [
                        {
                          text: "基本",
                          link: "/zh/english/syntax/all/tense/basic",
                        },
                        {
                          text: "现在（一般）",
                          link: "/zh/english/syntax/all/tense/1",
                        },
                        {
                          text: "现在-进行",
                          link: "/zh/english/syntax/all/tense/2",
                        },
                        {
                          text: "现在-完成",
                          link: "/zh/english/syntax/all/tense/3",
                        },
                        {
                          text: "现在-完成&进行",
                          link: "/zh/english/syntax/all/tense/4",
                        },
                        {
                          text: "过去（一般）",
                          link: "/zh/english/syntax/all/tense/5",
                        },
                        {
                          text: "过去-进行",
                          link: "/zh/english/syntax/all/tense/6",
                        },
                        {
                          text: "过去-完成",
                          link: "/zh/english/syntax/all/tense/7",
                        },
                        {
                          text: "过去-完成&进行",
                          link: "/zh/english/syntax/all/tense/8",
                        },
                        {
                          text: "将来（一般）",
                          link: "/zh/english/syntax/all/tense/9",
                        },
                        {
                          text: "将来-进行",
                          link: "/zh/english/syntax/all/tense/10",
                        },
                        {
                          text: "将来-完成",
                          link: "/zh/english/syntax/all/tense/11",
                        },
                        {
                          text: "将来-完成&进行",
                          link: "/zh/english/syntax/all/tense/12",
                        },
                        {
                          text: "过去将来（一般）",
                          link: "/zh/english/syntax/all/tense/13",
                        },
                        {
                          text: "过去将来-进行",
                          link: "/zh/english/syntax/all/tense/14",
                        },
                        {
                          text: "过去将来-完成",
                          link: "/zh/english/syntax/all/tense/15",
                        },
                        {
                          text: "过去将来-完成进行",
                          link: "/zh/english/syntax/all/tense/16",
                        },
                      ],
                    },
                    {
                      text: "动作的语气",
                    },
                  ],
                },
                {
                  text: "宾语",
                  link: "/zh/english/syntax/all/object",
                },
                {
                  text: "宾语补语",
                  link: "/zh/english/syntax/all/object-complement",
                },
                {
                  text: "主语补语（表语）",
                  link: "/zh/english/syntax/all/subject-complement",
                },
                {
                  text: "定语",
                  link: "/zh/english/syntax/all/attribute",
                },
                {
                  text: "状语",
                  link: "/zh/english/syntax/all/adverbial",
                },
                {
                  text: "同位语",
                  link: "/zh/english/syntax/all/appositive",
                },
              ],
            },
          ],
        },
        {
          text: "句子分类",
          collapsed: true,
          items: [
            {
              text: "结构复杂度分类",
              collapsed: true,
              items: [
                {
                  text: "简单句",
                  link: "/zh/english/syntax/type/complexity/simple",
                },
                {
                  text: "复合句/并列句",
                  link: "/zh/english/syntax/type/complexity/compound",
                },
                {
                  text: "复杂句",
                  link: "/zh/english/syntax/type/complexity/complex",
                },
              ],
            },
            {
              text: "用途分类",
              collapsed: true,
              items: [
                {
                  text: "陈述句",
                },
                {
                  text: "疑问句",
                },
                {
                  text: "祈使句",
                },
                {
                  text: "感叹句",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      text: "语音",
      collapsed: false,
      items: [
        {
          text: "音标",
          link: "/zh/english/voice/phonetic-symbol",
        },
        {
          text: "连读/弱读/缩读",
          link: "/zh/english/voice/du",
        },
      ],
    },
    {
      text: "词汇",
      collapsed: false,
      items: [
        {
          text: "基础",
          link: "/zh/english/middle-school-words",
        },
        {
          text: "元音字母",
          link: "/zh/english/vowel-rule",
        },
      ],
    },
    {
      text: "字母",
      collapsed: false,
      items: [
        {
          text: "基础",
          link: "/zh/english/letter/basic",
        },
      ],
    },
    {
      text: "文化",
      collapsed: false,
      items: [
        {
          text: "姓名",
        },
      ],
    },
  ];
}

function sidebarYao(): DefaultTheme.SidebarItem[] {
  return [
    { text: "五行", link: "/zh/yao/wuxing" },
    {
      text: "六十甲子",
      link: "/zh/yao/liushijiazi",
    },
  ];
}

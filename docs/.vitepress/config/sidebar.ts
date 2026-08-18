import { type DefaultTheme } from "vitepress";

export function getSidebar(): DefaultTheme.Sidebar {
  return {
    "/shuo-wen-jie-zi/": sidebarShuowenjiezi(),
    "/xing-gong/": sidebarXinggong(),
    "/ming-gong/": sidebarMinggong(),
    "/tools/": sidebarTools(),
    "/english/": sidebarEnglish(),
    "/dao/": sidebarDao(),
    "/yao/": sidebarYao(),
  };
}

function sidebarShuowenjiezi(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "丹",
      link: "/shuo-wen-jie-zi/dan",
    },
  ];
}

function sidebarXinggong(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "1",
    },
  ];
}

function sidebarMinggong(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "1",
    },
  ];
}

function sidebarTools(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "生活工具",
      link: "/tools/life",
    },
    {
      text: "开发工具",
      link: "/tools/dev",
    },
    {
      text: "Open-Source Library",
      link: "/tools/open",
    },
  ];
}

function sidebarEnglish(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Words-Manager",
      link: "/english/words-manager",
    },
    {
      text: "宇宙奥义之究极理解",
      link: "/english/universe",
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
            { text: "动词", link: "/english/words-rule/verb" },
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
              link: "/english/morphology/plural",
            },
            {
              text: "时态",
              link: "/english/morphology/tense",
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
              link: "/english/syntax/basic",
            },
            {
              text: "所有成分",
              collapsed: true,
              items: [
                {
                  text: "主语",
                  link: "/english/syntax/all/subject",
                },
                {
                  text: "谓语动词",
                  collapsed: true,
                  items: [
                    {
                      text: "基础",
                      link: "/english/syntax/all/verb",
                    },
                    {
                      text: "动作的时间&状态",
                      items: [
                        {
                          text: "基本",
                          link: "/english/syntax/all/tense/basic",
                        },
                        {
                          text: "现在（一般）",
                          link: "/english/syntax/all/tense/1",
                        },
                        {
                          text: "现在-进行",
                          link: "/english/syntax/all/tense/2",
                        },
                        {
                          text: "现在-完成",
                          link: "/english/syntax/all/tense/3",
                        },
                        {
                          text: "现在-完成&进行",
                          link: "/english/syntax/all/tense/4",
                        },
                        {
                          text: "过去（一般）",
                          link: "/english/syntax/all/tense/5",
                        },
                        {
                          text: "过去-进行",
                          link: "/english/syntax/all/tense/6",
                        },
                        {
                          text: "过去-完成",
                          link: "/english/syntax/all/tense/7",
                        },
                        {
                          text: "过去-完成&进行",
                          link: "/english/syntax/all/tense/8",
                        },
                        {
                          text: "将来（一般）",
                          link: "/english/syntax/all/tense/9",
                        },
                        {
                          text: "将来-进行",
                          link: "/english/syntax/all/tense/10",
                        },
                        {
                          text: "将来-完成",
                          link: "/english/syntax/all/tense/11",
                        },
                        {
                          text: "将来-完成&进行",
                          link: "/english/syntax/all/tense/12",
                        },
                        {
                          text: "过去将来（一般）",
                          link: "/english/syntax/all/tense/13",
                        },
                        {
                          text: "过去将来-进行",
                          link: "/english/syntax/all/tense/14",
                        },
                        {
                          text: "过去将来-完成",
                          link: "/english/syntax/all/tense/15",
                        },
                        {
                          text: "过去将来-完成进行",
                          link: "/english/syntax/all/tense/16",
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
                  link: "/english/syntax/all/object",
                },
                {
                  text: "宾语补语",
                  link: "/english/syntax/all/object-complement",
                },
                {
                  text: "主语补语（表语）",
                  link: "/english/syntax/all/subject-complement",
                },
                {
                  text: "定语",
                  link: "/english/syntax/all/attribute",
                },
                {
                  text: "状语",
                  link: "/english/syntax/all/adverbial",
                },
                {
                  text: "同位语",
                  link: "/english/syntax/all/appositive",
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
                  link: "/english/syntax/type/complexity/simple",
                },
                {
                  text: "复合句/并列句",
                  link: "/english/syntax/type/complexity/compound",
                },
                {
                  text: "复杂句",
                  link: "/english/syntax/type/complexity/complex",
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
          link: "/english/voice/phonetic-symbol",
        },
        {
          text: "连读/弱读/缩读",
          link: "/english/voice/du",
        },
      ],
    },
    {
      text: "词汇",
      collapsed: false,
      items: [
        {
          text: "基础",
          link: "/english/middle-school-words",
        },
        {
          text: "元音字母",
          link: "/english/vowel-rule",
        },
      ],
    },
    {
      text: "字母",
      collapsed: false,
      items: [
        {
          text: "基础",
          link: "/english/letter/basic",
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

function sidebarDao(): DefaultTheme.SidebarItem[] {
  return [{ text: "无极", link: "/dao/wuji" }];
}

function sidebarYao(): DefaultTheme.SidebarItem[] {
  return [
    { text: "五行", link: "/yao/wuxing" },
    { text: "天干", link: "/yao/tiangan" },
    {
      text: "地支",
      link: "/yao/dizhi",
    },
    {
      text: "天干地支（四序干支）",
      link: "/yao/ganzhi",
    },
    {
      text: "炁机互动",
      link: "/yao/qi-ji-hu-dong/index",
      items: [
        {
          text: "合",
          link: "/yao/qi-ji-hu-dong/he",
        },
        {
          text: "冲",
          link: "/yao/qi-ji-hu-dong/he",
        },
        {
          text: "刑",
          link: "/yao/qi-ji-hu-dong/he",
        },
        {
          text: "害",
          link: "/yao/qi-ji-hu-dong/he",
        },
        {
          text: "会",
          link: "/yao/qi-ji-hu-dong/he",
        },
      ],
    },
    {
      text: "年干支",
      link: "/yao/liushijiazi",
    },
    {
      text: "月干支",
      link: "/yao/yueganzhi",
    },
    {
      text: "日干支",
      link: "/yao/riganzhi",
    },
    {
      text: "时干支",
      link: "/yao/shiganzhi",
    },
  ];
}

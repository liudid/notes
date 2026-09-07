import { type DefaultTheme } from "vitepress";

export function getSidebar(): DefaultTheme.Sidebar {
  return {
    "/shuo-wen-jie-zi/": sidebarShuowenjiezi(),
    "/xing-gong/": sidebarXinggong(),
    "/ming-gong/": sidebarMinggong(),
    "/tools/": sidebarTools(),
    "/english/": sidebarEnglish(),
    "/dao/": sidebarDao(),
    "/yi-xue/": sidebarYixue(),
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

function sidebarYixue(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "初始",
      link: "/yi-xue/chu-shi",
      collapsed: false,
      items: [
        { text: "三易", link: "/yi-xue/chu-shi/san-yi" },
        { text: "三原则", link: "/yi-xue/chu-shi/san-yuanze" },
        { text: "三法则", link: "/yi-xue/chu-shi/san-faze" },
      ],
    },
    {
      text: "爻",
      link: "/yi-xue/yao",
      collapsed: false,
      items: [
        {
          text: "六画之象",
          link: "/yi-xue/yao/liu-hua-zhi-xiang",
          collapsed: false,
          items: [
            { text: "正", link: "/yi-xue/yao/liu-hua-zhi-xiang/zheng" },
            { text: "承", link: "/yi-xue/yao/liu-hua-zhi-xiang/cheng" },
            { text: "乘", link: "/yi-xue/yao/liu-hua-zhi-xiang/cheng-yao" },
            { text: "比", link: "/yi-xue/yao/liu-hua-zhi-xiang/bi" },
            { text: "应", link: "/yi-xue/yao/liu-hua-zhi-xiang/ying" },
            { text: "中", link: "/yi-xue/yao/liu-hua-zhi-xiang/zhong" },
            { text: "据", link: "/yi-xue/yao/liu-hua-zhi-xiang/ju" },
          ],
        },
      ],
    },
    { text: "方位", link: "/yi-xue/fan-wei" },
    { text: "先天八卦", link: "/yi-xue/xian-tian-ba-gua" },
    { text: "后天八卦", link: "/yi-xue/hou-tian-ba-gua" },
    {
      text: "六十四卦",
      link: "/yi-xue/liu-shi-si-gua",
      collapsed: false,
      items: [
        {
          text: "规范术语",
          link: "/yi-xue/liu-shi-si-gua/gui-fan-shu-yu",
        },
        {
          text: "卦体结构",
          link: "/yi-xue/liu-shi-si-gua/gua-ti-jie-gou",
        },
        {
          text: "经文《周易》",
          link: "/yi-xue/liu-shi-si-gua/jing-wen",
          collapsed: false,
          items: [
            {
              text: "卦辞（总论）",
              link: "/yi-xue/liu-shi-si-gua/jing-wen/gua-ci",
            },
            {
              text: "爻辞（分论）",
              link: "/yi-xue/liu-shi-si-gua/jing-wen/yao-ci",
            },
          ],
        },
        {
          text: "传文《易传》",
          link: "/yi-xue/liu-shi-si-gua/zhuan-wen",
          collapsed: false,
          items: [
            {
              text: "《彖传上》",
              link: "/yi-xue/liu-shi-si-gua/zhuan-wen/tuan-zhuan-shang",
            },
            {
              text: "《彖传下》",
              link: "/yi-xue/liu-shi-si-gua/zhuan-wen/tuan-zhuan-xia",
            },
            {
              text: "《象传上》",
              link: "/yi-xue/liu-shi-si-gua/zhuan-wen/xiang-zhuan-shang",
            },
            {
              text: "《象传下》",
              link: "/yi-xue/liu-shi-si-gua/zhuan-wen/xiang-zhuan-xia",
            },
            {
              text: "《系辞传上》",
              link: "/yi-xue/liu-shi-si-gua/zhuan-wen/xi-ci-zhuan-shang",
            },
            {
              text: "《系辞传下》",
              link: "/yi-xue/liu-shi-si-gua/zhuan-wen/xi-ci-zhuan-xia",
            },
            {
              text: "《文言传》",
              link: "/yi-xue/liu-shi-si-gua/zhuan-wen/wen-yan-zhuan",
            },
            {
              text: "《说卦传》",
              link: "/yi-xue/liu-shi-si-gua/zhuan-wen/shuo-gua-zhuan",
            },
            {
              text: "《序卦传》",
              link: "/yi-xue/liu-shi-si-gua/zhuan-wen/xu-gua-zhuan",
            },
            {
              text: "《杂卦传》",
              link: "/yi-xue/liu-shi-si-gua/zhuan-wen/za-gua-zhuan",
            },
          ],
        },
        {
          text: "十二消息卦",
          link: "/yi-xue/liu-shi-si-gua/shi-er-xiao-xi-gua",
        },
        {
          text: "卜、筮、占",
          link: "/yi-xue/bu-shi/bu-shi",
          items: [
            {
              text: "纳甲筮法",
              link: "/yi-xue/bu-shi/na-jia-shi-fa",
            },
          ],
        },
      ],
    },
  ];
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

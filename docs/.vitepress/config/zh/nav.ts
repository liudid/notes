import { type DefaultTheme } from "vitepress";
export function getNav(): DefaultTheme.NavItem[] {
  return [
    { text: "主页", link: "/" },
    {
      text: "说文解字",
      link: "/zh/shuo-wen-jie-zi/dan",
      activeMatch: "/zh/shuo-wen-jie-zi/",
    },
    {
      text: "性功",
      link: "/zh/xing-gong/1",
      activeMatch: "/zh/xing-gong/",
    },
    {
      text: "命功",
      link: "/zh/ming-gong/1",
      activeMatch: "/zh/ming-gong/",
    },
    { text: "技术文档", link: "/zh/dev/directory", activeMatch: "/zh/dev/" },
    { text: "日记", link: "/zh/diary/2024-01-18", activeMatch: "/zh/diary/" },
    { text: "好用工具", link: "/zh/tools/life", activeMatch: "/zh/tools/" },
    { text: "Emoji", link: "/zh/emoji/index", activeMatch: "/zh/emoji/" },
    {
      text: "Learning English",
      link: "/zh/english/middle-school-words",
      activeMatch: "/zh/english/",
    },
    {
      text: "道",
      link: "/zh/dao/wuji",
      activeMatch: "/zh/dao/",
    },
    {
      text: "钥匙",
      link: "/zh/yao/liushijiazi",
      activeMatch: "/zh/yao/",
    },
  ];
}

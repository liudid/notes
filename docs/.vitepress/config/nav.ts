import { type DefaultTheme } from "vitepress";

export function getNav(): DefaultTheme.NavItem[] {
  return [
    { text: "主页", link: "/" },
    {
      text: "说文解字",
      link: "/shuo-wen-jie-zi/dan",
      activeMatch: "/shuo-wen-jie-zi/",
    },
    {
      text: "性功",
      link: "/xing-gong/1",
      activeMatch: "/xing-gong/",
    },
    {
      text: "命功",
      link: "/ming-gong/1",
      activeMatch: "/ming-gong/",
    },
    { text: "好用工具", link: "/tools/life", activeMatch: "/tools/" },
    {
      text: "Learning English",
      link: "/english/middle-school-words",
      activeMatch: "/english/",
    },
    {
      text: "道",
      link: "/dao/wuji",
      activeMatch: "/dao/",
    },
    {
      text: "钥匙",
      link: "/yao/liushijiazi",
      activeMatch: "/yao/",
    },
  ];
}

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
    // {
    //   text: "Learning English",
    //   link: "/english/middle-school-words",
    //   activeMatch: "/english/",
    // },
    {
      text: "道",
      link: "/dao/wuji",
      activeMatch: "/dao/",
    },
    {
      text: "易学",
      link: "/yi-xue/xian-tian-ba-gua",
      activeMatch: "/yi-xue/",
    },
    {
      text: "卜筮",
      link: "/bu-shi/gui-bu",
      activeMatch: "^/bu-shi/",
    },
    {
      text: "命理",
      link: "/ming-li/zi-ping-si-zhu",
      activeMatch: "/ming-li/",
    },
    {
      text: "干支五行",
      link: "/gan-zhi/liushijiazi",
      activeMatch: "/gan-zhi/",
    },
  ];
}

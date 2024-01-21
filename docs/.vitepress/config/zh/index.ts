import { defineConfig, type DefaultTheme } from "vitepress";
import { getNav } from "./nav";
import { getSidebar } from "./sidebar";
export const zh = defineConfig({
  lang: "zh-Hans",
  title: "江初鸭",
  description: "我的笔记站点",
  themeConfig: {
    nav: getNav(),
    sidebar: getSidebar(),
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询结果",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
    lastUpdatedText: "上次更新",
    returnToTopLabel: "返回顶部",
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
  },
});

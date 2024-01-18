import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "我的笔记",
  description: "My Notes Site",
  base: '/notes/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '笔记', link: '/notes/money' },
      { text: '技术文档', link: '/dev/directory' },
      { text: '日记', link: '/diary/2024-01-18' },
      { text: '好用工具', link: '/tools/life' },
    ],

    sidebar: {
      "/dev/": [
        {
          text: "规范",
          collapsed: false,
          items: [
            {
              text: "目录结构（directory）",
              link: "/dev/directory",
            },
            { text: "命名（naming）", link: "/dev/naming" },
            { text: "风格（style）", link: "/dev/style" },
            {
              text: "编码（Language）",
              collapsed: true,
              items: [
                { text: "HTML", link: "/dev/language-html" },
                { text: "CSS", link: "/dev/language-css" },
                { text: "JS", link: "/dev/language-js" },
                { text: "TS", link: "/dev/language-ts" },
                { text: "Vue", link: "/dev/language-vue" },
              ],
            },
          ],
        },
      ],
      "/notes/": [
        {
          text: "钱",
          link: "/notes/money",
        }
      ],
      "/tools/": [
        {
          text: "生活工具",
          link: "/tools/life",
        },
        {
          text: "开发工具",
          link: "/tools/dev",
        },
      ],
      "/diary/": [
        {
          text: "2024-01-18",
          link: "/diary/2024-01-18",
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/liudid' }
    ],

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
  }
})

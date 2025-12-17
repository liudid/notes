// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import WordItem from "./components/WordItem.vue";
import Segmented from "./components/Segmented.vue";
import WuXing from "./components/WuXing.vue";
import LiuShiJiaZi from "./components/LiuShiJiaZi.vue";
import GanZhiSlider from "./components/GanZhiSlider.vue";
import GanZhi from "./components/GanZhi.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus);
    app.component("WordItem", WordItem);
    app.component("Segmented", Segmented);
    app.component("WuXing", WuXing);
    app.component("LiuShiJiaZi", LiuShiJiaZi);
    app.component("GanZhiSlider", GanZhiSlider);
    app.component("GanZhi", GanZhi);
    // ...
  },
} satisfies Theme;

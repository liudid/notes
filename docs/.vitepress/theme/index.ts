// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import WordItem from "./components/WordItem.vue";
import Segmented from "./components/Segmented.vue";

import IntroTitle from "./components/ui/IntroTitle.vue";
import IntroFrom from "./components/ui/IntroFrom.vue";
import WuXing from "./components/WuXing.vue";
import TianGan from "./components/TianGan.vue";
import LiuShiJiaZi from "./components/LiuShiJiaZi.vue";
import GanZhiSlider from "./components/GanZhiSlider.vue";
import GanZhi from "./components/GanZhi.vue";
import DiZhi from "./components/DiZhi.vue";

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

    app.component("IntroFrom", IntroFrom);
    app.component("IntroTitle", IntroTitle);
    app.component("WuXing", WuXing);
    app.component("TianGan", TianGan);
    app.component("LiuShiJiaZi", LiuShiJiaZi);
    app.component("GanZhiSlider", GanZhiSlider);
    app.component("GanZhi", GanZhi);
    app.component("DiZhi", DiZhi);
    // ...
  },
} satisfies Theme;

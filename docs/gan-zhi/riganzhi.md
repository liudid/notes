---
layout: doc
aside: false
lastUpdated: false
editLink: false
footer: false
pageClass: no-aside-page
---


<div class="container">
  <IntroTitle
    text="以六十甲子无限循环的方式排列，不依附节气、不依附岁气、不因立春、冬至而重置。"
  ></IntroTitle>
  <GanZhiSlider @change="handleGanZhiChange" />
  <LiuShiJiaZi :highlightIndex="highlightIndex" />
</div>

<script setup>
import { ref } from 'vue'


// 当前要高亮的60甲子索引
const highlightIndex = ref(-1)

// 接收 GanZhiSlider 的 change 事件
function handleGanZhiChange({ index }) {
  highlightIndex.value = index
}
</script>

<style scoped>

</style>

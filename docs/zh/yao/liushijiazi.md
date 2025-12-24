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
    text="参照：“天（五运）× 地（六气）”构成的整体气机相位循环。既炁在天地之间完成一次完整展开—回收的呼吸周期。"
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

<div class="container">
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

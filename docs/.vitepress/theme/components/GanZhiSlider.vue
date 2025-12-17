<template>
  <div class="gan-zhi-slider">
    <!-- 天干 -->
    <div class="block">
      <div class="row">
        <div class="btn" @click="move(-1, 'gan')">←</div>
        <div class="bar-wrapper">
          <div class="bar">
            <div
              v-for="(gan, i) in ganDisplay"
              :key="gan.name"
              class="item"
              :class="[gan.element, i === 0 ? 'current' : '']"
            >
              {{ gan.name }}
            </div>
          </div>
        </div>
        <div class="btn" @click="move(1, 'gan')">→</div>
      </div>
    </div>

    <!-- 地支 -->
    <div class="block">
      <div class="row">
        <div class="btn" @click="move(-1, 'zhi')">←</div>
        <div class="bar-wrapper">
          <div class="bar">
            <div
              v-for="(zhi, i) in zhiDisplay"
              :key="zhi.name"
              class="item"
              :class="[zhi.element, i === 0 ? 'current' : '']"
            >
              {{ zhi.name }}
            </div>
          </div>
        </div>
        <div class="btn" @click="move(1, 'zhi')">→</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { TIAN_GAN, DI_ZHI } from "../config/ganZhi"; // 公共配置

const emit = defineEmits(["change"]);

const state = reactive({
  currentIndex: 0, // 当前60甲子的索引 (0-59)
});

// 计算当前天干和地支
const currentGan = computed(
  () => TIAN_GAN[state.currentIndex % TIAN_GAN.length]
);
const currentZhi = computed(() => DI_ZHI[state.currentIndex % DI_ZHI.length]);

// 滑动显示数组（显示完整的循环）
const ganDisplay = computed(() =>
  Array.from(
    { length: TIAN_GAN.length },
    (_, i) => TIAN_GAN[(state.currentIndex + i) % TIAN_GAN.length]
  )
);
const zhiDisplay = computed(() =>
  Array.from(
    { length: DI_ZHI.length },
    (_, i) => DI_ZHI[(state.currentIndex + i) % DI_ZHI.length]
  )
);

// 统一的移动函数
function move(n, type) {
  if (type === "gan") {
    // 移动天干时，步长为1，因为60甲子中天干是连续的
    state.currentIndex = (state.currentIndex + n + 60) % 60;
  } else {
    // 移动地支时，需要保持与天干的配对关系
    // 60甲子中，地支是每12个循环一次，但配对是固定的
    // 所以移动地支时，需要移动12步（因为10和12的最小公倍数是60）
    state.currentIndex = (state.currentIndex + n * 12 + 60) % 60;
  }
  emitChange();
}

function emitChange() {
  const index = state.currentIndex % 60;
  const ganIndex = index % TIAN_GAN.length;
  const zhiIndex = index % DI_ZHI.length;

  console.log(
    `60甲子索引: ${index}, 天干: ${TIAN_GAN[ganIndex].name}, 地支: ${DI_ZHI[zhiIndex].name}`
  );

  emit("change", {
    index,
    ganIndex,
    zhiIndex,
    gan: TIAN_GAN[ganIndex],
    zhi: DI_ZHI[zhiIndex],
  });
}

// 初始化触发一次
emitChange();
</script>

<style scoped lang="scss">
.gan-zhi-slider {
  font-family: sans-serif;
}

.block {
  margin-bottom: 20px;
}

.row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn {
  padding: 6px 10px;
  background: #ddd;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
}

.btn:hover {
  background: #ccc;
}

.bar-wrapper {
  position: relative;
  display: inline-block;
}

.bar {
  display: flex;
  gap: 6px;
  background: #fff;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.item {
  width: 42px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  border-radius: 6px;
  position: relative;
  transition: all 0.2s ease;
}

.item.current {
  transform: translateY(-6px) scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35), 0 12px 24px rgba(0, 0, 0, 0.2),
    0 16px 32px rgba(0, 0, 0, 0.15);
  z-index: 20;
  margin-right: 12px;
  transition: all 0.3s ease;
}

.item.current::after {
  content: "↓";
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  color: #333;
}

.wood {
  background: #4caf50;
}
.fire {
  background: #e53935;
}
.earth {
  background: #bca360;
}
.metal {
  background: #cfcfcf;
  color: #333;
}
.water {
  background: #1e88e5;
}
</style>

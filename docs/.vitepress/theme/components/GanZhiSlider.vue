<template>
  <div class="gan-zhi-slider">
    <!-- 天干 -->
    <div class="block">
      <!-- <div class="title">天干</div> -->
      <div class="row">
        <div class="btn" @click="moveGan(-1)">←</div>
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
        <div class="btn" @click="moveGan(1)">→</div>
      </div>
    </div>

    <!-- 地支 -->
    <div class="block">
      <!-- <div class="title">地支</div> -->
      <div class="row">
        <div class="btn" @click="moveZhi(-1)">←</div>
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
        <div class="btn" @click="moveZhi(1)">→</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { TIAN_GAN, DI_ZHI } from "../config/ganZhi"; // 公共配置

const emit = defineEmits(["change"]);

const state = reactive({
  ganIndex: 0,
  zhiIndex: 0,
});

const currentGan = computed(() => TIAN_GAN[state.ganIndex]);
const currentZhi = computed(() => DI_ZHI[state.zhiIndex]);

// 滑动显示数组
const ganDisplay = computed(() =>
  Array.from(
    { length: TIAN_GAN.length },
    (_, i) => TIAN_GAN[(state.ganIndex + i) % TIAN_GAN.length]
  )
);
const zhiDisplay = computed(() =>
  Array.from(
    { length: DI_ZHI.length },
    (_, i) => DI_ZHI[(state.zhiIndex + i) % DI_ZHI.length]
  )
);

function moveGan(n) {
  state.ganIndex = (state.ganIndex + n + TIAN_GAN.length) % TIAN_GAN.length;
  emitChange();
}

function moveZhi(n) {
  state.zhiIndex = (state.zhiIndex + n + DI_ZHI.length) % DI_ZHI.length;
  emitChange();
}

function emitChange() {
  const index = (state.ganIndex * 12 + state.zhiIndex) % 60;
  emit("change", { ganIndex: state.ganIndex, zhiIndex: state.zhiIndex, index });
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

.title {
  font-size: 16px;
  margin-bottom: 6px;
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

/* 当前第一个格子高亮 + 独立浮起 */
.item.current {
  transform: translateY(-6px) scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35), 0 12px 24px rgba(0, 0, 0, 0.2),
    0 16px 32px rgba(0, 0, 0, 0.15);
  z-index: 20;
  margin-right: 12px; /* 给右侧留空 */
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

/* 五行背景色 */
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

.output {
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
</style>

<template>
  <div class="fang-wei">
    <div class="switch">
      <button
        type="button"
        class="switch__btn"
        :class="{ 'switch__btn--active': !modern }"
        @click="modern = false"
      >
        传统
      </button>
      <button
        type="button"
        class="switch__btn"
        :class="{ 'switch__btn--active': modern }"
        @click="modern = true"
      >
        现代
      </button>
    </div>
    <p class="hint">{{ modern ? "上北下南 · 左西右东" : "上南下北 · 左东右西" }}</p>

    <div class="board">
      <div class="grid" :style="gridStyle">
        <div v-for="cell in cells" :key="cell" class="cell">
          <span class="label" :style="labelStyle">{{ cell }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const cells = ["东南", "正南", "西南", "正东", "中", "正西", "东北", "正北", "西北"];

const modern = ref(false);

const rotation = computed(() => (modern.value ? 180 : 0));

const gridStyle = computed(() => ({
  transform: `rotate(${rotation.value}deg)`,
}));

const labelStyle = computed(() => ({
  transform: `rotate(${-rotation.value}deg)`,
}));
</script>

<style lang="scss" scoped>
.fang-wei {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--vp-c-text-1);
}

.switch {
  display: inline-flex;
  padding: 2px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
}

.switch__btn {
  border: 0;
  background: transparent;
  color: var(--vp-c-text-2);
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.4;

  &--active {
    background: var(--vp-c-brand-3);
    color: var(--vp-c-white);
  }
}

.hint {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.board {
  width: min(360px, 90vw);
  aspect-ratio: 1;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  border: 1px solid var(--vp-c-divider);
  transition: transform 0.45s ease;
}

.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.label {
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  user-select: none;
  transition: transform 0.45s ease;
}
</style>

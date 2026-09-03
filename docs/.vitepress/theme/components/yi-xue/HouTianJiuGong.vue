<template>
  <div class="jiu-gong">
    <div v-for="cell in cells" :key="cell.fang" class="jiu-gong__cell">
      <span class="jiu-gong__fang">{{ cell.fang }}</span>
      <span v-if="cell.name" class="jiu-gong__name">{{ cell.name }}</span>
      <Gua v-if="cell.name" :name="cell.name" :size="28" color="#9c1010" />
      <span class="jiu-gong__num">{{ cell.num }}</span>
    </div>
  </div>
</template>

<script setup>
import Gua from "./Gua.vue";

const cells = [
  { name: "巽", fang: "东南", num: 4 },
  { name: "离", fang: "南", num: 9 },
  { name: "坤", fang: "西南", num: 2 },
  { name: "震", fang: "东", num: 3 },
  { name: "", fang: "中", num: 5 },
  { name: "兑", fang: "西", num: 7 },
  { name: "艮", fang: "东北", num: 8 },
  { name: "坎", fang: "北", num: 1 },
  { name: "乾", fang: "西北", num: 6 },
];
</script>

<style lang="scss" scoped>
.jiu-gong {
  --border: var(--vp-c-divider);
  --size: min(320px, 90vw);
  width: var(--size);
  height: var(--size);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  border-top: 1px solid var(--border);
  border-left: 1px solid var(--border);
  box-sizing: border-box;
  color: var(--vp-c-text-1);
}

.jiu-gong__cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  box-sizing: border-box;
  padding: 6px 4px;
}

.jiu-gong__fang {
  font-size: 12px;
  line-height: 1;
  color: var(--vp-c-text-2);
}

.jiu-gong__name {
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
}

.jiu-gong__num {
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  color: var(--vp-c-brand-1);
}
</style>

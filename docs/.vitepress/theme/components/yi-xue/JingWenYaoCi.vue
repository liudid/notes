<template>
  <div class="jing-wen-yao-ci">
    <div class="toolbar">
      <el-input
        v-model="query"
        clearable
        placeholder="按卦名或序号筛选，如 乾 / 1"
      />
      <span class="count">{{ filtered.length }} / {{ hexagrams.length }}</span>
    </div>

    <div v-if="filtered.length" class="blocks">
      <section v-for="h in filtered" :key="h.num" class="block">
        <header class="meta">
          <span class="num">{{ h.num }}</span>
          <span class="symbol" aria-hidden="true">{{ h.symbol }}</span>
          <div class="names">
            <span class="name">{{ h.name }}</span>
            <span class="full">{{ h.full }}</span>
          </div>
        </header>

        <ul class="yao-list">
          <li v-for="yao in h.jingWen.yaoCi" :key="yao.label" class="yao-row">
            <span class="yao-label">{{ yao.label }}</span>
            <span class="yao-text">{{ yao.text }}</span>
          </li>
          <li v-if="h.jingWen.yongJiu" class="yao-row yong">
            <span class="yao-label">用九</span>
            <span class="yao-text">{{ h.jingWen.yongJiu }}</span>
          </li>
          <li v-if="h.jingWen.yongLiu" class="yao-row yong">
            <span class="yao-label">用六</span>
            <span class="yao-text">{{ h.jingWen.yongLiu }}</span>
          </li>
        </ul>
      </section>
    </div>
    <p v-else class="empty">无匹配爻辞</p>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import data from "../../config/liuShiSiGuaJingZhuan.json";

const hexagrams = data.hexagrams;
const query = ref("");

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return hexagrams;
  const raw = query.value.trim();
  return hexagrams.filter((h) => {
    const num = String(h.num);
    if (num === q || h.name.includes(q) || h.full.includes(q) || h.symbol.includes(q)) {
      return true;
    }
    return h.jingWen.yaoCi.some(
      (y) => y.label.includes(raw) || y.text.includes(raw),
    );
  });
});
</script>

<style scoped>
.jing-wen-yao-ci {
  margin-top: 0.75rem;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
  position: sticky;
  top: calc(var(--vp-nav-height, 64px) + 8px);
  z-index: 2;
  padding: 8px 0;
  background: var(--vp-c-bg);
}

.toolbar :deep(.el-input) {
  max-width: 320px;
}

.count {
  font-size: 13px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.blocks {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.block {
  padding: 20px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.block:first-child {
  border-top: 1px solid var(--vp-c-divider);
}

.meta {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
}

.num {
  flex: none;
  min-width: 1.75rem;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-3);
  line-height: 1.6;
  padding-top: 2px;
}

.symbol {
  flex: none;
  font-size: 28px;
  line-height: 1.1;
  color: var(--vp-c-text-1);
}

.names {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.name {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.full {
  font-size: 12px;
  color: var(--vp-c-text-3);
  line-height: 1.3;
}

.yao-list {
  list-style: none;
  margin: 0;
  padding: 0 0 0 2px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.yao-row {
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  gap: 12px;
  align-items: baseline;
}

.yao-label {
  font-size: 13px;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
}

.yao-text {
  font-size: 16px;
  line-height: 1.7;
  color: var(--vp-c-text-1);
  letter-spacing: 0.02em;
}

.yao-row.yong .yao-label {
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.yao-row.yong .yao-text {
  color: var(--vp-c-text-1);
}

.empty {
  margin: 2rem 0;
  text-align: center;
  color: var(--vp-c-text-3);
}

@media (max-width: 640px) {
  .toolbar {
    flex-wrap: wrap;
  }

  .toolbar :deep(.el-input) {
    max-width: none;
    flex: 1;
  }

  .yao-row {
    grid-template-columns: 3rem 1fr;
    gap: 8px;
  }
}
</style>

<template>
  <div class="jing-wen-gua-ci">
    <div class="toolbar">
      <el-input
        v-model="query"
        clearable
        placeholder="按卦名或序号筛选，如 乾 / 1"
      />
      <span class="count">{{ filtered.length }} / {{ hexagrams.length }}</span>
    </div>

    <ul v-if="filtered.length" class="list">
      <li v-for="h in filtered" :key="h.num" class="row">
        <div class="meta">
          <span class="num">{{ h.num }}</span>
          <span class="symbol" aria-hidden="true">{{ h.symbol }}</span>
          <div class="names">
            <span class="name">{{ h.name }}</span>
            <span class="full">{{ h.full }}</span>
          </div>
        </div>
        <p class="text">{{ h.jingWen.guaCi }}</p>
      </li>
    </ul>
    <p v-else class="empty">无匹配卦辞</p>
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
  return hexagrams.filter((h) => {
    const num = String(h.num);
    return (
      num === q ||
      h.name.includes(q) ||
      h.full.includes(q) ||
      h.symbol.includes(q) ||
      h.jingWen.guaCi.includes(query.value.trim())
    );
  });
});
</script>

<style scoped>
.jing-wen-gua-ci {
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

.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.row {
  display: grid;
  grid-template-columns: minmax(140px, 180px) 1fr;
  gap: 16px 24px;
  padding: 18px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.row:first-child {
  border-top: 1px solid var(--vp-c-divider);
}

.meta {
  display: flex;
  align-items: flex-start;
  gap: 10px;
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

.text {
  margin: 0;
  font-size: 17px;
  line-height: 1.75;
  color: var(--vp-c-text-1);
  letter-spacing: 0.02em;
}

.empty {
  margin: 2rem 0;
  text-align: center;
  color: var(--vp-c-text-3);
}

@media (max-width: 640px) {
  .row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .toolbar {
    flex-wrap: wrap;
  }

  .toolbar :deep(.el-input) {
    max-width: none;
    flex: 1;
  }
}
</style>

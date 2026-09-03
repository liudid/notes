<template>
  <section class="xian-hou-map">
    <div class="xian-hou-map__header">
      <div class="xian-hou-map__th xian-hou-map__th--gua">卦</div>
      <div class="xian-hou-map__th xian-hou-map__th--xian">先天</div>
      <div class="xian-hou-map__th xian-hou-map__th--hou">后天</div>
    </div>

    <div class="xian-hou-map__body">
      <svg
        class="xian-hou-map__lines"
        viewBox="0 0 100 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g v-for="(row, index) in rows" :key="`${row.name}-${row.xianTian}`">
          <line
            class="xian-hou-map__line"
            x1="38"
            :y1="rowCenter(index)"
            x2="62"
            :y2="rowCenter(row.houTian - 1)"
          />
        </g>
      </svg>

      <div class="xian-hou-map__grid">
        <template v-for="row in rows" :key="row.name">
          <div class="xian-hou-map__cell xian-hou-map__cell--gua">
            <span class="xian-hou-map__name">{{ row.name }}</span>
          </div>
          <div class="xian-hou-map__cell xian-hou-map__cell--xian" :title="row.name">
            <span class="xian-hou-map__num">{{ row.xianTian }}</span>
          </div>
          <div class="xian-hou-map__cell xian-hou-map__cell--hou">
            <span class="xian-hou-map__num">{{ row.houTian }}</span>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
const rows = [
  { name: "乾", xianTian: 1, houTian: 5 },
  { name: "兑", xianTian: 2, houTian: 6 },
  { name: "离", xianTian: 3, houTian: 2 },
  { name: "震", xianTian: 4, houTian: 3 },
  { name: "巽", xianTian: 5, houTian: 4 },
  { name: "坎", xianTian: 6, houTian: 1 },
  { name: "艮", xianTian: 7, houTian: 7 },
  { name: "坤", xianTian: 8, houTian: 8 },
];

const rowCenter = (index) => index * 10 + 5;
</script>

<style lang="scss" scoped>
.xian-hou-map {
  --border: var(--vp-c-divider);
  width: min(980px, 96vw);
  margin: 24px auto 0;
  color: var(--vp-c-text-1);
}

.xian-hou-map__header,
.xian-hou-map__grid {
  display: grid;
  grid-template-columns: 88px 1fr 1fr;
}

.xian-hou-map__header {
  border-top: 1px solid var(--border);
  border-left: 1px solid var(--border);
}

.xian-hou-map__th,
.xian-hou-map__cell {
  min-height: 56px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.xian-hou-map__th {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.xian-hou-map__th--gua,
.xian-hou-map__th--xian,
.xian-hou-map__th--hou {
  justify-content: center;
}

.xian-hou-map__body {
  position: relative;
}

.xian-hou-map__grid {
  position: relative;
  z-index: 2;
  border-left: 1px solid var(--border);
}

.xian-hou-map__th,
.xian-hou-map__cell {
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.xian-hou-map__cell--gua,
.xian-hou-map__cell--xian,
.xian-hou-map__cell--hou {
  justify-content: center;
}

.xian-hou-map__name {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.xian-hou-map__num {
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.xian-hou-map__lines {
  position: absolute;
  top: 0;
  left: 88px;
  width: calc(100% - 88px);
  height: 448px;
  z-index: 1;
  pointer-events: none;
}

.xian-hou-map__line {
  stroke: var(--vp-c-brand-1);
  stroke-width: 0.65;
  stroke-opacity: 0.8;
}

@media (max-width: 640px) {
  .xian-hou-map__header,
  .xian-hou-map__grid {
    grid-template-columns: 72px 1fr 1fr;
  }

  .xian-hou-map__lines {
    left: 72px;
    width: calc(100% - 72px);
  }
}
</style>

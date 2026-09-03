<template>
  <div class="bagua-yuan-tu" :class="{ 'bagua-yuan-tu--with-num': hasNum }">
    <!-- 最外圈：数字与箭头所在环带的外边界 -->
    <div v-if="hasNum" class="ring ring--rim"></div>

    <div
      v-for="i in 4"
      :key="`d-${i}`"
      class="divider"
      :style="{ transform: `rotate(${(i - 1) * 45 + 22.5}deg)` }"
    ></div>

    <div class="chart">
      <div class="ring ring--outer"></div>
      <div class="ring ring--mid"></div>
      <div class="ring ring--inner"></div>
      <div v-if="!hasNum" class="ring ring--core"></div>

      <div v-if="hasNum" class="center-mark" aria-hidden="true">
        <span>9</span>
      </div>

      <svg class="sectors" viewBox="0 0 100 100" aria-hidden="true">
        <path
          v-for="(item, i) in items"
          :key="item.name"
          class="sector"
          :class="{ 'sector--active': hoverIndex === i }"
          :d="sectorPath(i)"
          @mouseenter="hoverIndex = i"
          @mouseleave="hoverIndex = -1"
        />
      </svg>

      <div
        v-for="(item, i) in items"
        :key="item.name"
        class="spoke"
        :class="{ 'spoke--active': hoverIndex === i }"
        :style="{ transform: `rotate(${i * 45}deg)` }"
      >
        <div class="rail">
          <div class="cell cell--fang">
            <span class="label" :style="unrotate(i)">{{ item.fang }}</span>
          </div>
          <div class="cell cell--name">
            <span class="label" :style="unrotate(i)">{{ item.name }}</span>
          </div>
          <div class="cell cell--gua">
            <span class="label" :style="unrotate(i)">
              <Gua :name="item.name" :size="32" color="#9c1010" />
            </span>
          </div>
        </div>
      </div>
    </div>

    <svg
      v-if="hasNum"
      class="outer-seq"
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <defs>
        <marker
          id="bagua-arrow"
          markerWidth="4"
          markerHeight="4"
          refX="3.2"
          refY="2"
          orient="auto"
        >
          <path d="M0,0 L4,2 L0,4 Z" fill="currentColor" />
        </marker>
      </defs>

      <path
        v-for="(arc, i) in sequenceArcs"
        :key="`s-${i}`"
        class="seq-arc"
        :d="arc.d"
        marker-end="url(#bagua-arrow)"
      />

      <text
        v-for="n in outerNums"
        :key="`n-${n.num}`"
        class="outer-num"
        :x="n.x"
        :y="n.y"
        text-anchor="middle"
        dominant-baseline="central"
      >
        {{ n.num }}
      </text>
    </svg>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Gua from "./Gua.vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  showSequence: {
    type: Boolean,
    default: false,
  },
});

const hoverIndex = ref(-1);

const CX = 50;
const CY = 50;
const R_OUTER = 50;
const R_INNER = 10.7;
/**
 * 数字环带：chart inset 14% → 内缘约 r=36，外缘 rim r=50
 * 数字与弧走环带中线；pad 拉开箭头与数字间距
 */
const R_NUM = 43;
const R_SEQ = 43;
const SEQ_PAD = 11;

const hasNum = computed(() => props.items.some((item) => item.num != null));

const outerNums = computed(() => {
  if (!hasNum.value) return [];
  return props.items
    .map((item, i) => {
      if (item.num == null) return null;
      const [x, y] = polar(R_NUM, i * 45);
      return { num: item.num, x, y };
    })
    .filter(Boolean);
});

const sequenceArcs = computed(() => {
  if (!props.showSequence || !hasNum.value) return [];

  const byNum = [...props.items]
    .map((item, i) => ({ ...item, i }))
    .filter((item) => item.num != null)
    .sort((a, b) => a.num - b.num);

  const arcs = [];
  for (let k = 0; k < byNum.length - 1; k++) {
    const from = byNum[k];
    const to = byNum[k + 1];
    if (from.num === 4 && to.num === 5) continue;
    const clockwise = to.num <= 4;
    arcs.push({
      d: arcPath(R_SEQ, from.i * 45, to.i * 45, clockwise, SEQ_PAD),
    });
  }
  return arcs;
});

function polar(r, deg) {
  const rad = (deg * Math.PI) / 180;
  return [CX + r * Math.sin(rad), CY - r * Math.cos(rad)];
}

function normalizeDeg(deg) {
  return ((deg % 360) + 360) % 360;
}

function arcPath(r, fromDeg, toDeg, clockwise, pad = 0) {
  const start = normalizeDeg(clockwise ? fromDeg + pad : fromDeg - pad);
  const end = normalizeDeg(clockwise ? toDeg - pad : toDeg + pad);
  const [x1, y1] = polar(r, start);
  const [x2, y2] = polar(r, end);
  let delta = clockwise ? end - start : start - end;
  delta = normalizeDeg(delta);
  const large = delta > 180 ? 1 : 0;
  const sweep = clockwise ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} ${sweep} ${x2} ${y2}`;
}

function sectorPath(i) {
  const start = i * 45 - 22.5;
  const end = i * 45 + 22.5;
  const [x1, y1] = polar(R_OUTER, start);
  const [x2, y2] = polar(R_OUTER, end);
  const [x3, y3] = polar(R_INNER, end);
  const [x4, y4] = polar(R_INNER, start);
  return `M ${x1} ${y1} A ${R_OUTER} ${R_OUTER} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${R_INNER} ${R_INNER} 0 0 0 ${x4} ${y4} Z`;
}

function unrotate(i) {
  return { transform: `rotate(${-i * 45}deg)` };
}
</script>

<style lang="scss" scoped>
.bagua-yuan-tu {
  --size: min(440px, 90vw);
  position: relative;
  width: var(--size);
  height: var(--size);
  margin: 0 auto;
  color: var(--vp-c-text-1);
}

.bagua-yuan-tu--with-num {
  --size: min(520px, 96vw);
}

.chart {
  position: absolute;
  inset: 0;
}

.bagua-yuan-tu--with-num .chart {
  /* 内图缩小，与 rim 之间形成数字环带 */
  inset: 14%;
}

.ring {
  position: absolute;
  left: 50%;
  top: 50%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  pointer-events: none;
}

.ring--rim {
  width: 100%;
  height: 100%;
  z-index: 0;
}

.ring--outer {
  width: 100%;
  height: 100%;
}

.ring--mid {
  width: 73.8%;
  height: 73.8%;
}

.ring--inner {
  width: 47.6%;
  height: 47.6%;
}

.ring--core {
  width: 21.4%;
  height: 21.4%;
}

.divider {
  position: absolute;
  left: 50%;
  top: 0;
  width: 1px;
  height: 100%;
  margin-left: -0.5px;
  background: var(--vp-c-divider);
  transform-origin: center center;
  pointer-events: none;
  z-index: 2;
}

.sectors,
.outer-seq {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.outer-seq {
  pointer-events: none;
  z-index: 4;
  color: var(--vp-c-brand-1);
}

.center-mark {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 6;
  width: 12%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  box-sizing: border-box;

  span {
    font-size: clamp(12px, 3.2vw, 18px);
    font-weight: 700;
    color: var(--vp-c-brand-1);
    line-height: 1;
  }
}

.seq-arc {
  fill: none;
  stroke: var(--vp-c-brand-1);
  stroke-width: 1.1;
  stroke-opacity: 0.75;
}

.outer-num {
  fill: var(--vp-c-brand-1);
  font-size: 5px;
  font-weight: 700;
  font-family: system-ui, sans-serif;
}

.sector {
  fill: transparent;
  cursor: pointer;
  transition: fill 0.15s ease;
}

.sector--active {
  fill: var(--vp-c-brand-soft);
}

.spoke {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
}

.spoke--active {
  color: var(--vp-c-brand-1);
}

.rail {
  position: absolute;
  left: 50%;
  top: 0;
  height: 50%;
  width: 0;
  transform: translateX(-50%);
}

.cell {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cell--fang {
  top: 13.1%;
}

.cell--name {
  top: 39.3%;
}

.cell--gua {
  top: 65.5%;
}

.label {
  display: inline-block;
  white-space: nowrap;
  font-size: 16px;
  line-height: 1;
  user-select: none;
}

.cell--fang .label {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.spoke--active .cell--fang .label {
  color: var(--vp-c-brand-1);
}

.cell--name .label {
  font-size: 18px;
  font-weight: 600;
}
</style>

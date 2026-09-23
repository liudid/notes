<template>
  <div class="yao-ju-mini">
    <div class="ju-readout" :class="{ on: focusPair }">
      <span class="ju-tick" aria-hidden="true"></span>
      <span class="ju-readout-text">{{ headline }}</span>
    </div>

    <div class="ju-stage">
      <div class="ju-board">
        <div
          v-for="row in yaoRows"
          :key="row.i"
          class="ju-row"
        >
          <div
            class="ju-cell"
            :class="yaoTone(row.i)"
            role="button"
            :aria-label="'看 ' + row.label + ' 的据'"
            @click="tapYao(row.i)"
          >
            <span class="ju-label">{{ row.label }}</span>
            <span class="ju-line" :class="row.yang ? 'yang' : 'yin'">
              <span class="seg"></span>
              <span v-if="!row.yang" class="seg"></span>
            </span>
          </div>
        </div>
      </div>

      <svg
        class="ju-links"
        :viewBox="'0 0 ' + LINK_W + ' ' + BOARD_H"
        preserveAspectRatio="xMinYMin meet"
        aria-hidden="true"
      >
        <g v-for="p in pairs" :key="'h' + p.index">
          <path
            class="ju-link-hit"
            :d="linkPath(p)"
            @click="focus(p.index)"
          />
          <path
            class="ju-link"
            :class="linkState(p.index)"
            :d="linkPath(p)"
          />
        </g>
      </svg>

      <div class="ju-dots">
        <div
          v-for="p in pairs"
          :key="'d' + p.index"
          class="ju-dot-wrap"
          :style="{ top: dotTop(p) + 'px' }"
        >
          <button
            type="button"
            class="ju-dot"
            :class="{ on: focusIdx === p.index }"
            :aria-label="'看这一对：' + p.title"
            @click="focus(p.index)"
          >
            <i />
          </button>
        </div>
      </div>
    </div>

    <div class="ju-legend">
      <span><i class="j" /><span>相邻据 · 阳据阴</span></span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import {
  computeJuPairs,
  yaoTraditionalLabel,
} from "../../config/liuShiSiGuaWei.ts";

const props = defineProps({
  code: { type: String, required: true },
});

const focusIdx = ref(null);

watch(
  () => props.code,
  () => {
    focusIdx.value = null;
  }
);

// 与 CSS --ju-row-h / --ju-gap-h / --ju-link-w 一致
const ROW_H = 20;
const GAP_H = 10;
const BOARD_H = 6 * ROW_H + 5 * GAP_H;
const LINK_W = 44;
const X_STEM = 1;

function yCenter(i) {
  return (5 - i) * (ROW_H + GAP_H) + ROW_H / 2;
}

const lines = computed(() => props.code.split("").map((c) => c === "1"));

const pairs = computed(() => computeJuPairs(props.code));

const focusPair = computed(() =>
  focusIdx.value === null ? null : pairs.value[focusIdx.value]
);

const yaoRows = computed(() => {
  const out = [];
  for (let i = 5; i >= 0; i--) {
    const yang = lines.value[i];
    out.push({
      i,
      yang,
      label: yaoTraditionalLabel(i, yang),
    });
  }
  return out;
});

const headline = computed(() => {
  const p = focusPair.value;
  if (p) return `${p.title} · ${p.hint}`;
  if (pairs.value.length === 0) return "本卦无相邻据";
  return `相邻据 ${pairs.value.length}`;
});

function linkPath(p) {
  const yHi = yCenter(p.hi);
  const yLo = yCenter(p.lo);
  const xOuter = 16 + (pairs.value.length - 1 - p.index) * 8;
  return `M ${X_STEM} ${yHi} L ${xOuter} ${yHi} L ${xOuter} ${yLo} L ${X_STEM} ${yLo}`;
}

function dotTop(p) {
  return (yCenter(p.hi) + yCenter(p.lo)) / 2;
}

function yaoTone(i) {
  const p = focusPair.value;
  if (!p) return "";
  return i === p.lo || i === p.hi ? "lit" : "faint";
}

function linkState(i) {
  if (focusIdx.value === null) return "idle";
  return focusIdx.value === i ? "active" : "faint";
}

function focus(i) {
  focusIdx.value = focusIdx.value === i ? null : i;
}

function tapYao(i) {
  const idx = pairs.value.findIndex((p) => p.lo === i || p.hi === i);
  if (idx < 0) return;
  focus(idx);
}
</script>

<style scoped>
.yao-ju-mini {
  --ju-row-h: 20px;
  --ju-gap-h: 10px;
  --ju-line-w: 72px;
  --ju-line-h: 8px;
  --ju-board-h: calc(6 * var(--ju-row-h) + 5 * var(--ju-gap-h));
  --ju-link-w: 44px;
  --ju-accent: #2b6cb0;
  --ju-ink: var(--ink, #241f17);
  --ju-soft: var(--ink-soft, #655b47);
  --ju-faint: var(--ink-faint, #8b806a);
  --ju-paper: var(--paper-deep, #e1d3ae);
  --ju-ease: 0.22s ease;
  --ju-serif: var(--serif, "Noto Serif SC", "Songti SC", serif);
}

.ju-readout {
  display: flex;
  align-items: center;
  gap: 7px;
  min-height: 28px;
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--ju-paper) 55%, transparent);
  font-size: 12px;
  line-height: 1.45;
  color: var(--ju-soft);
}

.ju-tick {
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ju-faint);
}

.ju-readout.on .ju-tick {
  background: var(--ju-accent);
}

.ju-readout-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ju-stage {
  display: grid;
  grid-template-columns: auto var(--ju-link-w) 18px;
  column-gap: 4px;
  align-items: start;
  width: fit-content;
  max-width: 100%;
  user-select: none;
}

.ju-board {
  height: var(--ju-board-h);
}

.ju-row {
  height: var(--ju-row-h);
}

.ju-row + .ju-row {
  margin-top: var(--ju-gap-h);
}

.ju-cell {
  display: grid;
  grid-template-columns: 2.4rem var(--ju-line-w);
  column-gap: 8px;
  align-items: center;
  height: var(--ju-row-h);
  cursor: pointer;
  transition: opacity var(--ju-ease);
}

.ju-label {
  font-family: var(--ju-serif);
  font-size: 12px;
  font-weight: 600;
  color: var(--ju-faint);
  letter-spacing: 0.04em;
  transition: color 0.2s ease;
}

.ju-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--ju-line-h);
  width: var(--ju-line-w);
}

.ju-line .seg {
  height: 100%;
  background: var(--ju-ink);
  border-radius: 1px;
}

.ju-line.yang .seg {
  width: 100%;
}

.ju-line.yin .seg {
  width: 44%;
}

.ju-cell.faint {
  opacity: 0.18;
}

.ju-cell.lit .ju-label {
  color: var(--ju-ink);
}

.ju-cell.lit .ju-line .seg {
  box-shadow: 0 0 0 1px var(--ju-accent);
}

.ju-links {
  width: var(--ju-link-w);
  height: var(--ju-board-h);
  display: block;
  overflow: visible;
}

.ju-link-hit {
  fill: transparent;
  stroke: transparent;
  stroke-width: 12;
  cursor: pointer;
  pointer-events: stroke;
}

.ju-link {
  fill: none;
  stroke: var(--ju-accent);
  stroke-linecap: square;
  stroke-linejoin: miter;
  pointer-events: none;
  transition: stroke-opacity var(--ju-ease), stroke-width var(--ju-ease);
}

.ju-link.idle {
  stroke-opacity: 0.5;
  stroke-width: 1.5;
}

.ju-link.faint {
  stroke-opacity: 0.12;
  stroke-width: 1.5;
}

.ju-link.active {
  stroke-opacity: 1;
  stroke-width: 2;
}

.ju-dots {
  position: relative;
  height: var(--ju-board-h);
  margin: 0;
  padding: 0;
}

.ju-dot-wrap {
  position: absolute;
  left: 0;
  transform: translateY(-50%);
}

.ju-dot {
  width: 16px;
  height: 16px;
  display: grid;
  place-items: center;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
}

.ju-dot i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1.5px solid var(--ju-accent);
  background: transparent;
  transition: background 0.2s ease, transform 0.2s ease;
}

.ju-dot.on i {
  background: var(--ju-accent);
  transform: scale(1.15);
}

.ju-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 10px;
  font-size: 11px;
  color: var(--ju-soft);
}

.ju-legend > span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.ju-legend i {
  width: 14px;
  height: 12px;
  display: inline-block;
  position: relative;
}

.ju-legend i.j::before {
  content: "";
  position: absolute;
  left: 1px;
  top: 1px;
  bottom: 1px;
  width: 10px;
  border: 1.5px solid var(--ju-accent);
  border-left: 0;
}
</style>

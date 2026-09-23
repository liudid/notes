<template>
  <div class="yao-ying-mini">
    <div class="ying-readout" :class="focusPair ? focusPair.kind : ''">
      <span class="ying-tick" aria-hidden="true"></span>
      <span class="ying-readout-text">{{ headline }}</span>
    </div>

    <div class="ying-stage">
      <div class="ying-board">
        <div
          v-for="row in yaoRows"
          :key="row.i"
          class="ying-row"
        >
          <div
            class="ying-cell"
            :class="[yaoTone(row.i), toneKind]"
            role="button"
            :aria-label="'看 ' + row.label + ' 的应'"
            @click="tapYao(row.i)"
          >
            <span class="ying-label">{{ row.label }}</span>
            <span class="ying-line" :class="row.yang ? 'yang' : 'yin'">
              <span class="seg"></span>
              <span v-if="!row.yang" class="seg"></span>
            </span>
          </div>
        </div>
      </div>

      <svg
        class="ying-links"
        :viewBox="'0 0 ' + LINK_W + ' ' + BOARD_H"
        preserveAspectRatio="xMinYMin meet"
        aria-hidden="true"
      >
        <g v-for="p in pairs" :key="'h' + p.index">
          <path
            class="ying-link-hit"
            :d="linkPath(p)"
            @click="focus(p.index)"
          />
          <path
            class="ying-link"
            :class="[p.kind, linkState(p.index)]"
            :d="linkPath(p)"
          />
        </g>
      </svg>

      <div class="ying-dots">
        <button
          v-for="p in pairsVisual"
          :key="'d' + p.index"
          type="button"
          class="ying-dot"
          :class="[p.kind, { on: focusIdx === p.index }]"
          :aria-label="'看这一对：' + p.title"
          @click="focus(p.index)"
        >
          <i />
        </button>
      </div>
    </div>

    <div class="ying-legend">
      <span><i class="m" /><span>正应</span></span>
      <span><i class="v" /><span>无应</span></span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import {
  YING_PAIRS,
  computeYingPairs,
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

// 与 CSS --ying-row-h / --ying-gap-h / --ying-link-w 一致
const ROW_H = 20;
const GAP_H = 10;
const BOARD_H = 6 * ROW_H + 5 * GAP_H;
const LINK_W = 44;
const X_STEM = 1;
const X_OUTER = [28, 20, 12];

function yCenter(i) {
  return (5 - i) * (ROW_H + GAP_H) + ROW_H / 2;
}

const lines = computed(() => props.code.split("").map((c) => c === "1"));

const pairs = computed(() => computeYingPairs(props.code));

const pairsVisual = computed(() => [...pairs.value].reverse());

const focusPair = computed(() =>
  focusIdx.value === null ? null : pairs.value[focusIdx.value]
);

const toneKind = computed(() => (focusPair.value ? focusPair.value.kind : ""));

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
  if (p) return `${p.title} · ${p.tag} · ${p.hint}`;
  const c = { match: 0, void: 0 };
  pairs.value.forEach((x) => {
    c[x.kind] += 1;
  });
  return `正应 ${c.match} · 无应 ${c.void}`;
});

function linkPath(p) {
  const yHi = yCenter(p.hi);
  const yLo = yCenter(p.lo);
  const xOuter = X_OUTER[p.index];
  return `M ${X_STEM} ${yHi} L ${xOuter} ${yHi} L ${xOuter} ${yLo} L ${X_STEM} ${yLo}`;
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
  const idx = YING_PAIRS.findIndex(([a, b]) => a === i || b === i);
  if (idx < 0) return;
  focus(idx);
}
</script>

<style scoped>
.yao-ying-mini {
  --ying-row-h: 20px;
  --ying-gap-h: 10px;
  --ying-line-w: 72px;
  --ying-line-h: 8px;
  --ying-board-h: calc(6 * var(--ying-row-h) + 5 * var(--ying-gap-h));
  --ying-link-w: 44px;
  --ying-match: var(--good, #4c6b3f);
  --ying-void: var(--ink-faint, #8b806a);
  --ying-ink: var(--ink, #241f17);
  --ying-soft: var(--ink-soft, #655b47);
  --ying-paper: var(--paper-deep, #e1d3ae);
  --ying-ease: 0.22s ease;
  --ying-serif: var(--serif, "Noto Serif SC", "Songti SC", serif);
}

.ying-readout {
  display: flex;
  align-items: center;
  gap: 7px;
  min-height: 28px;
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--ying-paper) 55%, transparent);
  font-size: 12px;
  line-height: 1.45;
  color: var(--ying-soft);
}

.ying-tick {
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ying-void);
}

.ying-readout.match .ying-tick {
  background: var(--ying-match);
}

.ying-readout.void .ying-tick {
  background: var(--ying-void);
}

.ying-readout-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ying-stage {
  display: grid;
  grid-template-columns: auto var(--ying-link-w) 18px;
  column-gap: 4px;
  align-items: start;
  width: fit-content;
  max-width: 100%;
  user-select: none;
}

.ying-board {
  height: var(--ying-board-h);
}

.ying-row {
  height: var(--ying-row-h);
}

.ying-row + .ying-row {
  margin-top: var(--ying-gap-h);
}

.ying-cell {
  display: grid;
  grid-template-columns: 2.4rem var(--ying-line-w);
  column-gap: 8px;
  align-items: center;
  height: var(--ying-row-h);
  cursor: pointer;
  transition: opacity var(--ying-ease);
}

.ying-label {
  font-family: var(--ying-serif);
  font-size: 12px;
  font-weight: 600;
  color: var(--ying-void);
  letter-spacing: 0.04em;
  transition: color 0.2s ease;
}

.ying-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--ying-line-h);
  width: var(--ying-line-w);
}

.ying-line .seg {
  height: 100%;
  background: var(--ying-ink);
  border-radius: 1px;
}

.ying-line.yang .seg {
  width: 100%;
}

.ying-line.yin .seg {
  width: 44%;
}

.ying-cell.faint {
  opacity: 0.18;
}

.ying-cell.lit .ying-label {
  color: var(--ying-ink);
}

.ying-cell.lit.match .ying-line .seg {
  box-shadow: 0 0 0 1px var(--ying-match);
}

.ying-cell.lit.void .ying-line .seg {
  box-shadow: 0 0 0 1px var(--ying-void);
}

.ying-links {
  width: var(--ying-link-w);
  height: var(--ying-board-h);
  display: block;
  overflow: visible;
}

.ying-link-hit {
  fill: transparent;
  stroke: transparent;
  stroke-width: 12;
  cursor: pointer;
  pointer-events: stroke;
}

.ying-link {
  fill: none;
  stroke-linecap: square;
  stroke-linejoin: miter;
  pointer-events: none;
  transition: stroke-opacity var(--ying-ease), stroke-width var(--ying-ease);
}

.ying-link.match {
  stroke: var(--ying-match);
}

.ying-link.void {
  stroke: var(--ying-void);
  stroke-dasharray: 3 3;
}

.ying-link.idle {
  stroke-opacity: 0.5;
  stroke-width: 1.5;
}

.ying-link.faint {
  stroke-opacity: 0.12;
  stroke-width: 1.5;
}

.ying-link.active.match {
  stroke-opacity: 1;
  stroke-width: 2;
}

.ying-link.active.void {
  stroke-opacity: 0.95;
  stroke-width: 2;
}

.ying-dots {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: var(--ying-board-h);
  margin: 0;
  padding: 0;
}

.ying-dot {
  width: 16px;
  height: 16px;
  display: grid;
  place-items: center;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
}

.ying-dot i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1.5px solid var(--ying-void);
  background: transparent;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.ying-dot.match i {
  border-color: var(--ying-match);
}

.ying-dot.on.match i {
  background: var(--ying-match);
  transform: scale(1.15);
}

.ying-dot.on.void i {
  background: var(--ying-void);
  transform: scale(1.15);
}

.ying-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 10px;
  font-size: 11px;
  color: var(--ying-soft);
}

.ying-legend > span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.ying-legend i {
  width: 14px;
  height: 12px;
  display: inline-block;
  position: relative;
}

.ying-legend i.m::before,
.ying-legend i.v::before {
  content: "";
  position: absolute;
  left: 1px;
  top: 1px;
  bottom: 1px;
  width: 10px;
  border: 1.5px solid var(--ying-match);
  border-left: 0;
}

.ying-legend i.v::before {
  border-color: var(--ying-void);
  border-style: dashed;
  border-left: 0;
}
</style>

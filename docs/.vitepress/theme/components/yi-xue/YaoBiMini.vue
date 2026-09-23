<template>
  <div class="yao-bi-mini">
    <div class="bi-readout" :class="focusPair ? focusPair.kind : ''">
      <span class="bi-tick" aria-hidden="true"></span>
      <span class="bi-readout-text">{{ headline }}</span>
    </div>

    <div class="bi-board">
      <div
        v-if="focusPair"
        class="bi-frame"
        :class="focusPair.kind"
        :style="frameStyle"
        aria-hidden="true"
      >
        <span class="bi-tag">{{ focusPair.tag }}</span>
        <span
          v-if="focusPair.kind === 'support' || focusPair.kind === 'ride'"
          class="bi-dir"
        >{{ focusPair.kind === 'support' ? '↑' : '↓' }}</span>
      </div>

      <div
        v-for="row in rows"
        :key="row.key"
        class="bi-row"
        :class="row.type"
      >
        <template v-if="row.type === 'yao'">
          <div
            class="bi-cell"
            :class="yaoTone(row.i)"
            role="button"
            tabindex="0"
            :aria-label="'看 ' + row.label + ' 的相邻关系'"
            @click="tapYao(row.i)"
            @keydown.enter.prevent="tapYao(row.i)"
            @keydown.space.prevent="tapYao(row.i)"
          >
            <span class="bi-label">{{ row.label }}</span>
            <span class="bi-line" :class="row.yang ? 'yang' : 'yin'">
              <span class="seg"></span>
              <span v-if="!row.yang" class="seg"></span>
            </span>
          </div>
          <div></div>
        </template>

        <template v-else>
          <div></div>
          <div class="bi-marks">
            <button
              type="button"
              class="bi-mark-hit"
              :aria-label="'看这一对：' + row.pair.title"
              @click="focus(row.pair.index)"
            />
            <div
              class="bi-mark"
              :class="[row.pair.kind, markState(row.pair.index)]"
            />
          </div>
          <button
            type="button"
            class="bi-dot"
            :class="[row.pair.kind, { on: focusIdx === row.pair.index }]"
            :aria-label="'看这一对：' + row.pair.title"
            @click="focus(row.pair.index)"
          >
            <i />
          </button>
        </template>
      </div>
    </div>

    <div class="bi-legend">
      <span><i class="s">↑</i>亲比·承</span>
      <span><i class="r">↓</i>亲比·乘</span>
      <span><i class="h" />敌比</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import {
  computeBiPairs,
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

const lines = computed(() =>
  props.code.split("").map((c) => c === "1")
);

const pairs = computed(() => computeBiPairs(props.code));

const focusPair = computed(() =>
  focusIdx.value === null ? null : pairs.value[focusIdx.value]
);

const rows = computed(() => {
  const out = [];
  for (let i = 5; i >= 0; i--) {
    const yang = lines.value[i];
    out.push({
      type: "yao",
      key: `y${i}`,
      i,
      yang,
      label: yaoTraditionalLabel(i, yang),
    });
    if (i > 0) {
      out.push({
        type: "gap",
        key: `g${i - 1}`,
        pair: pairs.value[i - 1],
      });
    }
  }
  return out;
});

const frameStyle = computed(() => {
  if (focusIdx.value === null) return {};
  const i = focusIdx.value;
  const unit = "calc(var(--bi-row-h) + var(--bi-gap-h))";
  return {
    top: `calc(${4 - i} * ${unit} - var(--bi-frame-pad-y))`,
    height:
      "calc(2 * var(--bi-row-h) + var(--bi-gap-h) + 2 * var(--bi-frame-pad-y))",
  };
});

const headline = computed(() => {
  const p = focusPair.value;
  if (p) return `${p.title} · ${p.hint}`;
  const c = { support: 0, ride: 0, hostile: 0 };
  pairs.value.forEach((x) => {
    c[x.kind] += 1;
  });
  return `承 ${c.support} · 乘 ${c.ride} · 敌比 ${c.hostile}`;
});

function yaoTone(i) {
  const p = focusPair.value;
  if (!p) return "";
  return i === p.index || i === p.index + 1 ? "lit" : "faint";
}

function markState(i) {
  if (focusIdx.value === null) return "idle";
  return focusIdx.value === i ? "active" : "faint";
}

function focus(i) {
  focusIdx.value = focusIdx.value === i ? null : i;
}

function tapYao(i) {
  const upper = i < 5 ? i : null;
  const lower = i > 0 ? i - 1 : null;
  const cur = focusIdx.value;
  if (cur !== null && cur === upper && lower !== null) {
    focusIdx.value = lower;
  } else if (cur !== null && cur === lower && upper !== null) {
    focusIdx.value = upper;
  } else {
    focusIdx.value = upper !== null ? upper : lower;
  }
}
</script>

<style scoped>
.yao-bi-mini {
  --bi-row-h: 20px;
  --bi-gap-h: 22px;
  --bi-line-w: 72px;
  --bi-line-h: 8px;
  --bi-frame-pad-x: 6px;
  --bi-frame-pad-y: 3px;
  --bi-support: var(--good, #4c6b3f);
  --bi-ride: var(--cinnabar, #ac392b);
  --bi-hostile: var(--ink-faint, #8b806a);
  --bi-ink: var(--ink, #241f17);
  --bi-soft: var(--ink-soft, #655b47);
  --bi-paper: var(--paper-deep, #e1d3ae);
  --bi-ease: 0.22s ease;
  --bi-serif: var(--serif, "Noto Serif SC", "Songti SC", serif);
}

.bi-readout {
  display: flex;
  align-items: center;
  gap: 7px;
  min-height: 28px;
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--bi-paper) 55%, transparent);
  font-size: 12px;
  line-height: 1.45;
  color: var(--bi-soft);
}

.bi-tick {
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--bi-hostile);
}

.bi-readout.support .bi-tick {
  background: var(--bi-support);
}

.bi-readout.ride .bi-tick {
  background: var(--bi-ride);
}

.bi-readout.hostile .bi-tick {
  background: var(--bi-hostile);
}

.bi-readout-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bi-board {
  position: relative;
  width: fit-content;
  max-width: 100%;
  user-select: none;
}

.bi-row {
  display: grid;
  grid-template-columns: 2.4rem var(--bi-line-w) 18px;
  column-gap: 8px;
  align-items: center;
}

.bi-row.yao {
  height: var(--bi-row-h);
}

.bi-row.gap {
  height: var(--bi-gap-h);
}

.bi-cell {
  grid-column: 1 / 3;
  display: grid;
  grid-template-columns: 2.4rem var(--bi-line-w);
  column-gap: 8px;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: opacity var(--bi-ease);
}

.bi-cell:focus-visible {
  outline: 1.5px solid var(--bi-soft);
  outline-offset: 2px;
  border-radius: 3px;
}

.bi-label {
  font-family: var(--bi-serif);
  font-size: 12px;
  font-weight: 600;
  color: var(--bi-hostile);
  letter-spacing: 0.04em;
  transition: color 0.2s ease;
}

.bi-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--bi-line-h);
  width: var(--bi-line-w);
}

.bi-line .seg {
  height: 100%;
  background: var(--bi-ink);
  border-radius: 1px;
}

.bi-line.yang .seg {
  width: 100%;
}

.bi-line.yin .seg {
  width: 44%;
}

.bi-cell.faint {
  opacity: 0.18;
}

.bi-cell.lit .bi-label {
  color: var(--bi-ink);
}

.bi-frame {
  position: absolute;
  left: calc(-1 * var(--bi-frame-pad-x));
  width: calc(2.4rem + 8px + var(--bi-line-w) + 2 * var(--bi-frame-pad-x));
  border: 1.5px solid var(--bi-hostile);
  border-radius: 6px;
  pointer-events: none;
  z-index: 0;
  box-sizing: border-box;
  transition: top var(--bi-ease), height var(--bi-ease), border-color var(--bi-ease),
    background-color var(--bi-ease);
}

.bi-frame.support {
  border-color: var(--bi-support);
  background: color-mix(in srgb, var(--bi-support) 10%, transparent);
}

.bi-frame.ride {
  border-color: var(--bi-ride);
  background: color-mix(in srgb, var(--bi-ride) 10%, transparent);
}

.bi-frame.hostile {
  border-color: var(--bi-hostile);
  background: color-mix(in srgb, var(--bi-hostile) 12%, transparent);
}

.bi-tag {
  position: absolute;
  top: -8px;
  right: 6px;
  padding: 0 6px;
  font-family: var(--bi-serif);
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0.04em;
  border-radius: 3px;
  background: var(--paper-card, #f5eeda);
  border: 1.5px solid currentColor;
  white-space: nowrap;
}

.bi-frame.support .bi-tag {
  color: var(--bi-support);
}

.bi-frame.ride .bi-tag {
  color: var(--bi-ride);
}

.bi-frame.hostile .bi-tag {
  color: var(--bi-hostile);
}

.bi-dir {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
}

.bi-frame.support .bi-dir {
  color: var(--bi-support);
}

.bi-frame.ride .bi-dir {
  color: var(--bi-ride);
}

.bi-marks {
  position: relative;
  height: 100%;
  z-index: 1;
}

.bi-mark-hit {
  position: absolute;
  inset: -1px 0;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
}

.bi-mark-hit:focus-visible {
  outline: 1.5px solid var(--bi-soft);
  outline-offset: 1px;
}

.bi-mark {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 11px;
  margin: -5.5px 0 0 -2px;
  border-radius: 2px;
  pointer-events: none;
  transition: opacity var(--bi-ease), height var(--bi-ease), margin-top var(--bi-ease);
}

.bi-mark.support {
  background: var(--bi-support);
}

.bi-mark.ride {
  background: var(--bi-ride);
}

.bi-mark.hostile {
  height: 14px;
  margin-top: -7px;
  background: linear-gradient(
    var(--bi-hostile) 0 4px,
    transparent 4px 10px,
    var(--bi-hostile) 10px 14px
  );
}

.bi-mark.idle {
  opacity: 0.45;
}

.bi-mark.faint {
  opacity: 0.1;
}

.bi-mark.active {
  opacity: 0;
}

.bi-mark.hostile.active {
  opacity: 0.85;
  height: 16px;
  margin-top: -8px;
  background: linear-gradient(
    var(--bi-hostile) 0 5px,
    transparent 5px 11px,
    var(--bi-hostile) 11px 16px
  );
}

.bi-dot {
  width: 18px;
  height: 18px;
  display: grid;
  place-items: center;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
  position: relative;
  z-index: 1;
}

.bi-dot i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--bi-hostile);
  opacity: 0.4;
  transition: all 0.2s ease;
}

.bi-dot:hover i {
  opacity: 0.8;
}

.bi-dot.on i {
  width: 8px;
  height: 8px;
  opacity: 1;
}

.bi-dot.on.support i {
  background: var(--bi-support);
}

.bi-dot.on.ride i {
  background: var(--bi-ride);
}

.bi-dot.on.hostile i {
  background: var(--bi-hostile);
}

.bi-dot:focus-visible {
  outline: 1.5px solid var(--bi-soft);
  outline-offset: -1px;
  border-radius: 4px;
}

.bi-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 10px;
  font-size: 11px;
  color: var(--bi-hostile);
}

.bi-legend span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.bi-legend i {
  width: 16px;
  height: 14px;
  border-radius: 2px;
  display: inline-grid;
  place-items: center;
  border: 1.5px solid;
  font-style: normal;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
}

.bi-legend i.s {
  border-color: var(--bi-support);
  color: var(--bi-support);
  background: color-mix(in srgb, var(--bi-support) 10%, transparent);
}

.bi-legend i.r {
  border-color: var(--bi-ride);
  color: var(--bi-ride);
  background: color-mix(in srgb, var(--bi-ride) 10%, transparent);
}

.bi-legend i.h {
  border-color: var(--bi-hostile);
  color: transparent;
  background-image: linear-gradient(
    var(--bi-hostile) 0 3px,
    transparent 3px 8px,
    var(--bi-hostile) 8px 11px
  );
  background-repeat: no-repeat;
  background-position: center;
  background-size: 3px 11px;
}

@media (prefers-reduced-motion: reduce) {
  .bi-cell,
  .bi-frame,
  .bi-mark,
  .bi-dot i {
    transition-duration: 0.01ms !important;
  }
}
</style>

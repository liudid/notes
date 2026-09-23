<template>
  <div class="yao-bian-mini">
    <div class="bm-root">
      <span class="bm-tag">本卦</span>
      <span class="bm-name">{{ rootFull }}</span>
      <div class="bm-glyph lg" aria-hidden="true">
        <div
          v-for="row in yaoRows(code)"
          :key="'r' + row.i"
          class="bm-yao"
          :class="row.yang ? 'yang' : 'yin'"
        >
          <span class="seg"></span>
          <span v-if="!row.yang" class="seg"></span>
        </div>
      </div>
    </div>

    <div class="bm-stem" aria-hidden="true"></div>
    <div class="bm-fork" aria-hidden="true">
      <span class="leg"></span>
      <span class="leg"></span>
      <span class="leg"></span>
    </div>

    <div class="bm-branches">
      <div class="bm-branch cuo">
        <div class="op">阴阳全反</div>
        <div class="kind">错（旁通）</div>
        <div class="bm-glyph sm" aria-hidden="true">
          <div
            v-for="row in yaoRows(tree.cuo.code)"
            :key="'c' + row.i"
            class="bm-yao"
            :class="row.yang ? 'yang' : 'yin'"
          >
            <span class="seg"></span>
            <span v-if="!row.yang" class="seg"></span>
          </div>
        </div>
        <div class="full">{{ tree.cuo.full }}</div>
      </div>
      <div class="bm-branch zong">
        <div class="op">上下颠倒</div>
        <div class="kind">综（覆）</div>
        <div class="bm-glyph sm" aria-hidden="true">
          <div
            v-for="row in yaoRows(tree.zong.code)"
            :key="'z' + row.i"
            class="bm-yao"
            :class="row.yang ? 'yang' : 'yin'"
          >
            <span class="seg"></span>
            <span v-if="!row.yang" class="seg"></span>
          </div>
        </div>
        <div class="full">{{ tree.zong.full }}</div>
      </div>
      <div class="bm-branch hu">
        <div class="op">取中爻</div>
        <div class="kind">互卦</div>
        <div class="bm-glyph sm" aria-hidden="true">
          <div
            v-for="row in yaoRows(tree.hu.code)"
            :key="'h' + row.i"
            class="bm-yao"
            :class="row.yang ? 'yang' : 'yin'"
          >
            <span class="seg"></span>
            <span v-if="!row.yang" class="seg"></span>
          </div>
        </div>
        <div class="full">{{ tree.hu.full }}</div>
      </div>
    </div>

    <div class="bm-zhi">
      <div class="bm-zhi-head">
        <span class="kind">之卦（变卦）</span>
        <span class="badge">需指定动爻</span>
      </div>

      <table class="bm-si-xiang" aria-label="四象与是否变化">
        <thead>
          <tr>
            <th>数</th>
            <th>名称</th>
            <th>爻</th>
            <th>变化</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="num">6</td>
            <td>老阴</td>
            <td>
              <div class="yao-cell">
                <div class="bm-yao yin tiny" aria-hidden="true">
                  <span class="seg"></span><span class="seg"></span>
                </div>
              </div>
            </td>
            <td class="change">变阳</td>
          </tr>
          <tr>
            <td class="num">7</td>
            <td>少阳</td>
            <td>
              <div class="yao-cell">
                <div class="bm-yao yang tiny" aria-hidden="true">
                  <span class="seg"></span>
                </div>
              </div>
            </td>
            <td class="keep">不变</td>
          </tr>
          <tr>
            <td class="num">8</td>
            <td>少阴</td>
            <td>
              <div class="yao-cell">
                <div class="bm-yao yin tiny" aria-hidden="true">
                  <span class="seg"></span><span class="seg"></span>
                </div>
              </div>
            </td>
            <td class="keep">不变</td>
          </tr>
          <tr>
            <td class="num">9</td>
            <td>老阳</td>
            <td>
              <div class="yao-cell">
                <div class="bm-yao yang tiny" aria-hidden="true">
                  <span class="seg"></span>
                </div>
              </div>
            </td>
            <td class="change">变阴</td>
          </tr>
        </tbody>
      </table>
      <p class="bm-si-note">动·老阴/老阳 ≈ 6/9；静·少阴/少阳 ≈ 8/7</p>

      <div class="bm-zhi-row">
        <div class="bm-zhi-panel src">
          <div class="lab">本卦 · 静 / 动</div>
          <div class="src-board">
            <div
              v-for="row in yaoRows(code)"
              :key="'b' + row.i"
              class="yao-row"
              :class="{ moving: movingFlags[row.i] }"
            >
              <span class="name">{{ row.label }}</span>
              <div
                class="bm-yao bar"
                :class="[
                  row.yang ? 'yang' : 'yin',
                  { moving: movingFlags[row.i] },
                ]"
                aria-hidden="true"
              >
                <span class="seg"></span>
                <span v-if="!row.yang" class="seg"></span>
              </div>
              <div class="state-btns">
                <button
                  type="button"
                  class="state-btn jing"
                  :class="{ on: !movingFlags[row.i] }"
                  @click="setMoving(row.i, false)"
                >
                  {{ row.yang ? "静·少阳" : "静·少阴" }}
                </button>
                <button
                  type="button"
                  class="state-btn dong"
                  :class="{ on: movingFlags[row.i] }"
                  @click="setMoving(row.i, true)"
                >
                  {{ row.yang ? "动·老阳" : "动·老阴" }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="bm-arrow" aria-hidden="true">→</div>

        <div class="bm-zhi-panel">
          <div class="lab">之卦（变卦）</div>
          <template v-if="zhi">
            <div class="bm-glyph" aria-hidden="true">
              <div
                v-for="row in yaoRows(zhi.code)"
                :key="'v' + row.i"
                class="bm-yao"
                :class="row.yang ? 'yang' : 'yin'"
              >
                <span class="seg"></span>
                <span v-if="!row.yang" class="seg"></span>
              </div>
            </div>
            <div class="full">{{ zhi.full }}</div>
          </template>
          <div v-else class="placeholder">选动爻成之卦</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import {
  applyDongYao,
  computeBianTree,
  resolveHexFull,
  yaoTraditionalLabel,
} from "../../config/liuShiSiGuaWei.ts";

const props = defineProps({
  code: { type: String, required: true },
});

const movingFlags = ref([false, false, false, false, false, false]);

watch(
  () => props.code,
  () => {
    movingFlags.value = [false, false, false, false, false, false];
  }
);

const rootFull = computed(() => resolveHexFull(props.code));
const tree = computed(() => computeBianTree(props.code));
const zhi = computed(() => applyDongYao(props.code, movingFlags.value));

function yaoRows(code) {
  const lines = code.split("").map((c) => c === "1");
  const out = [];
  for (let i = 5; i >= 0; i--) {
    out.push({
      i,
      yang: lines[i],
      label: yaoTraditionalLabel(i, lines[i]),
    });
  }
  return out;
}

function setMoving(i, on) {
  const next = movingFlags.value.slice();
  next[i] = on;
  movingFlags.value = next;
}
</script>

<style scoped>
.yao-bian-mini {
  --bm-ink: var(--ink, #241f17);
  --bm-soft: var(--ink-soft, #655b47);
  --bm-faint: var(--ink-faint, #8b806a);
  --bm-paper: var(--paper-deep, #e1d3ae);
  --bm-cuo: var(--good, #4c6b3f);
  --bm-zong: #c47a2c;
  --bm-hu: #5b6b9a;
  --bm-bian: var(--cinnabar, #ac392b);
  --bm-div: color-mix(in srgb, var(--bm-faint) 35%, transparent);
  font-size: 12px;
  color: var(--bm-soft);
}

.bm-root {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.bm-tag {
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--bm-faint);
}

.bm-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--bm-ink);
}

.bm-stem {
  width: 1.5px;
  height: 12px;
  margin: 4px auto 0;
  background: var(--bm-div);
}

.bm-fork {
  position: relative;
  width: 100%;
  max-width: 280px;
  height: 14px;
  margin: 0 auto;
}

.bm-fork::before {
  content: "";
  position: absolute;
  left: 16.66%;
  right: 16.66%;
  top: 0;
  height: 1.5px;
  background: var(--bm-div);
}

.bm-fork .leg {
  position: absolute;
  top: 0;
  width: 1.5px;
  height: 14px;
  background: var(--bm-div);
}

.bm-fork .leg:nth-child(1) {
  left: 16.66%;
  transform: translateX(-50%);
}

.bm-fork .leg:nth-child(2) {
  left: 50%;
  transform: translateX(-50%);
}

.bm-fork .leg:nth-child(3) {
  left: 83.33%;
  transform: translateX(-50%);
}

.bm-branches {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-top: 2px;
}

.bm-branch {
  border: 1px solid var(--bm-div);
  border-radius: 6px;
  padding: 8px 4px 10px;
  text-align: center;
  background: color-mix(in srgb, var(--bm-paper) 35%, transparent);
}

.bm-branch .op {
  font-size: 10px;
  color: var(--bm-faint);
}

.bm-branch .kind {
  font-size: 11px;
  font-weight: 600;
  margin: 2px 0 6px;
}

.bm-branch.cuo .kind {
  color: var(--bm-cuo);
}

.bm-branch.zong .kind {
  color: var(--bm-zong);
}

.bm-branch.hu .kind {
  color: var(--bm-hu);
}

.bm-branch .full {
  margin-top: 6px;
  font-size: 11px;
  font-weight: 600;
  color: var(--bm-ink);
  line-height: 1.3;
}

.bm-glyph {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 40px;
  margin: 0 auto;
}

.bm-glyph.lg {
  width: 56px;
  gap: 4px;
}

.bm-glyph.sm {
  width: 36px;
  gap: 2px;
}

.bm-yao {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5px;
}

.bm-glyph.lg .bm-yao {
  height: 7px;
}

.bm-yao .seg {
  height: 100%;
  background: var(--bm-ink);
  border-radius: 1px;
}

.bm-yao.yang .seg {
  width: 100%;
}

.bm-yao.yin .seg {
  width: 42%;
}

.bm-yao.tiny {
  width: 28px;
  height: 4px;
}

.bm-yao.bar {
  width: 36px;
  height: 6px;
}

.bm-yao.moving .seg {
  background: var(--bm-bian);
}

.bm-zhi {
  margin-top: 14px;
  padding: 10px;
  border: 1px dashed color-mix(in srgb, var(--bm-bian) 40%, var(--bm-div));
  border-radius: 8px;
  background: color-mix(in srgb, var(--bm-bian) 6%, transparent);
}

.bm-zhi-head {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;
}

.bm-zhi-head .kind {
  font-size: 13px;
  font-weight: 600;
  color: var(--bm-bian);
}

.bm-zhi-head .badge {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--bm-bian) 35%, transparent);
  color: var(--bm-bian);
}

.bm-si-xiang {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
  margin-bottom: 4px;
}

.bm-si-xiang th,
.bm-si-xiang td {
  padding: 4px 4px;
  border-bottom: 1px solid var(--bm-div);
  text-align: center;
  vertical-align: middle;
}

.bm-si-xiang th {
  font-weight: 600;
  color: var(--bm-soft);
  background: color-mix(in srgb, var(--bm-paper) 45%, transparent);
}

.bm-si-xiang .num {
  font-weight: 600;
  color: var(--bm-ink);
}

.bm-si-xiang .yao-cell {
  display: flex;
  justify-content: center;
}

.bm-si-xiang .change {
  color: var(--bm-bian);
  font-weight: 600;
}

.bm-si-xiang .keep {
  color: var(--bm-faint);
}

.bm-si-note {
  margin: 0 0 10px;
  font-size: 10px;
  color: var(--bm-faint);
  line-height: 1.4;
}

.bm-zhi-row {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) auto minmax(0, 0.9fr);
  gap: 8px;
  align-items: start;
}

.bm-zhi-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.bm-zhi-panel.src {
  align-items: stretch;
}

.bm-zhi-panel .lab {
  font-size: 10px;
  letter-spacing: 0.04em;
  color: var(--bm-faint);
  text-align: center;
}

.bm-zhi-panel .full {
  font-size: 12px;
  font-weight: 600;
  color: var(--bm-ink);
}

.bm-zhi-panel .placeholder {
  min-height: 72px;
  display: grid;
  place-items: center;
  text-align: center;
  font-size: 11px;
  color: var(--bm-faint);
  padding: 0 4px;
}

.bm-arrow {
  color: var(--bm-bian);
  font-size: 16px;
  padding-top: 28px;
  opacity: 0.75;
}

.src-board {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.yao-row {
  display: grid;
  grid-template-columns: 2rem 36px minmax(0, 1fr);
  column-gap: 6px;
  align-items: center;
}

.yao-row .name {
  font-size: 10px;
  color: var(--bm-faint);
  text-align: right;
}

.yao-row.moving .name {
  color: var(--bm-bian);
  font-weight: 600;
}

.state-btns {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 3px;
}

.state-btn {
  font: inherit;
  font-size: 9px;
  line-height: 1.2;
  padding: 2px 5px;
  border: 1px solid var(--bm-div);
  border-radius: 999px;
  background: transparent;
  color: var(--bm-faint);
  cursor: pointer;
  white-space: nowrap;
}

.state-btn.on.jing {
  border-color: var(--bm-soft);
  color: var(--bm-ink);
  background: color-mix(in srgb, var(--bm-paper) 55%, transparent);
}

.state-btn.on.dong {
  border-color: var(--bm-bian);
  color: var(--bm-bian);
  background: color-mix(in srgb, var(--bm-bian) 12%, transparent);
}

@media (max-width: 480px) {
  .bm-zhi-row {
    grid-template-columns: 1fr;
  }

  .bm-arrow {
    transform: rotate(90deg);
    padding: 0;
    justify-self: center;
  }
}
</style>

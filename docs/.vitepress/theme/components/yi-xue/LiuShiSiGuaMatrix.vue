<template>
  <div class="liu-shi-si-gua">
    <div class="liu-shi-si-gua__toolbar">
      <Segmented :options="modeOptions" :value="mode" @change="mode = $event" />
    </div>

    <div class="matrix-scroll">
      <table class="matrix" :aria-label="grid.ariaLabel">
        <thead>
          <tr>
            <th class="axis-label">{{ grid.corner }}</th>
            <th
              v-for="(col, ci) in grid.colHeaders"
              :key="`col-${ci}`"
              class="trig-head"
              scope="col"
            >
              <template v-if="col.kind === 'trigram'">
                <div class="sym">{{ T[col.key].sym }}</div>
                <div class="zh">{{ T[col.key].zh }}</div>
                <div class="el">{{ T[col.key].el }}</div>
              </template>
              <template v-else>
                <div class="zh">{{ col.text }}</div>
              </template>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, ri) in grid.cells" :key="`row-${ri}`">
            <th class="row-head" scope="row">
              <template v-if="grid.rowHeaders[ri].kind === 'trigram'">
                <span class="sym">{{ T[grid.rowHeaders[ri].key].sym }}</span>
                <span class="zh">{{ T[grid.rowHeaders[ri].key].zh }}</span>
                <br />
                <span class="el">{{ T[grid.rowHeaders[ri].key].el }}</span>
              </template>
              <template v-else>
                <span class="zh">{{ grid.rowHeaders[ri].text }}</span>
              </template>
            </th>
            <td v-for="(hex, ci) in row" :key="`${ri}-${ci}`">
              <HexCell v-if="hex" :hex="hex" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Segmented from "../Segmented.vue";
import HexCell from "./HexCell.vue";
import {
  HEX,
  T,
  OVERLAP_ORDER,
  JING_FANG_COLS,
  JING_FANG_PALACES,
  getByPair,
  getByName,
} from "../../config/liuShiSiGua.ts";

const mode = ref("zhouyi");

const modeOptions = [
  { label: "周易卦序", value: "zhouyi" },
  { label: "京房八宫", value: "jingfang" },
  { label: "八卦相重", value: "overlap" },
];

/** @typedef {{ kind: 'text', text: string } | { kind: 'trigram', key: import('../../config/liuShiSiGua.ts').TrigramKey }} HeaderCell */

const buildZhouYiGrid = () => {
  const colHeaders = Array.from({ length: 8 }, (_, i) => ({
    kind: "text",
    text: String(i + 1),
  }));
  const rowHeaders = Array.from({ length: 8 }, (_, i) => ({
    kind: "text",
    text: `${i * 8 + 1}–${i * 8 + 8}`,
  }));
  const cells = Array.from({ length: 8 }, (_, r) =>
    Array.from({ length: 8 }, (_, c) => HEX[r * 8 + c] ?? null),
  );
  return {
    corner: "周易卦序",
    colHeaders,
    rowHeaders,
    cells,
    ariaLabel: "六十四卦周易卦序，1至64顺排",
  };
};

const buildJingFangGrid = () => {
  const colHeaders = JING_FANG_COLS.map((text) => ({ kind: "text", text }));
  const rowHeaders = JING_FANG_PALACES.map((p) => ({
    kind: "text",
    text: p.label,
  }));
  const cells = JING_FANG_PALACES.map((p) =>
    p.names.map((name) => getByName(name)),
  );
  return {
    corner: "八宫 ＼ 世应",
    colHeaders,
    rowHeaders,
    cells,
    ariaLabel: "六十四卦京房八宫卦序",
  };
};

const buildOverlapGrid = () => {
  const trigramHeader = (key) => ({ kind: "trigram", key });
  const colHeaders = OVERLAP_ORDER.map(trigramHeader);
  const rowHeaders = OVERLAP_ORDER.map(trigramHeader);
  const cells = OVERLAP_ORDER.map((lower) =>
    OVERLAP_ORDER.map((upper) => getByPair(lower, upper)),
  );
  return {
    corner: "内卦 ＼ 外卦",
    colHeaders,
    rowHeaders,
    cells,
    ariaLabel: "六十四卦八卦相重矩阵，横向为外卦，纵向为内卦",
  };
};

const grid = computed(() => {
  if (mode.value === "jingfang") return buildJingFangGrid();
  if (mode.value === "overlap") return buildOverlapGrid();
  return buildZhouYiGrid();
});
</script>

<style lang="scss">
/* 不用 scoped，避免被 .vp-doc table 主题样式盖掉颜色 */
.liu-shi-si-gua {
  --paper: #ece2c9;
  --paper-deep: #e1d3ae;
  --paper-card: #f5eeda;
  --ink: #241f17;
  --ink-soft: #655b47;
  --ink-faint: #8b806a;
  --cinnabar: #ac392b;
  --cinnabar-deep: #832a20;
  --rule: #b7a87c;
  --shadow: rgba(36, 31, 23, 0.22);
  --serif: "Noto Serif SC", "Songti SC", "Source Han Serif SC", "STSong", serif;

  color: var(--ink);
  margin: 8px auto 24px;
  max-width: 1180px;
  font-family: "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", sans-serif;
}

.liu-shi-si-gua__toolbar {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.liu-shi-si-gua .matrix-scroll {
  overflow-x: auto;
  border: 1px solid var(--ink);
  background: var(--paper-card);
  box-shadow: 0 10px 26px -14px var(--shadow);
}

.liu-shi-si-gua .matrix {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  min-width: 820px;
  margin: 0;
  display: table;
  background: var(--paper-card);
  overflow: visible;
}

.liu-shi-si-gua .matrix th,
.liu-shi-si-gua .matrix td {
  border: 1px solid var(--rule) !important;
  text-align: center;
  padding: 0 !important;
  background-color: var(--paper-card);
  color: var(--ink);
  font-size: inherit;
  font-weight: inherit;
}

.liu-shi-si-gua .matrix thead th {
  position: sticky;
  top: 0;
  z-index: 3;
  background-color: var(--paper-deep) !important;
}

.liu-shi-si-gua .matrix tbody th.row-head {
  position: sticky;
  left: 0;
  z-index: 2;
  background-color: var(--paper-deep) !important;
  padding: 8px 10px !important;
  min-width: 64px;
}

.liu-shi-si-gua .matrix thead th:first-child {
  z-index: 4;
  left: 0;
  background-color: var(--paper-deep) !important;
}

.liu-shi-si-gua .matrix .axis-label {
  font-family: var(--serif);
  font-size: 11px;
  font-weight: 400;
  color: var(--ink-faint);
  padding: 10px 6px !important;
  line-height: 1.5;
  letter-spacing: 0.05em;
}

.liu-shi-si-gua .matrix .trig-head {
  padding: 10px 4px 12px !important;
  min-width: 96px;
}

.liu-shi-si-gua .matrix .trig-head .sym {
  font-size: 20px;
  line-height: 1;
  color: var(--cinnabar-deep);
}

.liu-shi-si-gua .matrix .trig-head .zh {
  font-family: var(--serif);
  font-weight: 700;
  font-size: 14px;
  margin-top: 2px;
  color: var(--ink);
}

.liu-shi-si-gua .matrix .trig-head .el {
  font-size: 10.5px;
  color: var(--ink-faint);
  letter-spacing: 0.15em;
}

.liu-shi-si-gua .matrix .row-head .sym {
  font-size: 18px;
  color: var(--cinnabar-deep);
  display: block;
}

.liu-shi-si-gua .matrix .row-head .zh {
  font-family: var(--serif);
  font-weight: 700;
  font-size: 13px;
  color: var(--ink);
}

.liu-shi-si-gua .matrix .row-head .el {
  font-size: 10px;
  color: var(--ink-faint);
  letter-spacing: 0.15em;
}
</style>

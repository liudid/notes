<template>
  <el-dialog
    v-model="visible"
    :title="drawerTitle"
    fullscreen
    destroy-on-close
    class="liu-shi-si-gua-detail-drawer"
  >
    <div v-if="hex" class="liu-shi-si-gua-detail">
      <div class="detail-split">
        <aside class="detail-left">
          <header class="detail-head">
            <div class="detail-head-top">
              <span class="detail-seal">{{ hex.num }}</span>
              <div class="detail-title">
                <span class="detail-order">第 {{ hex.num }} 卦</span>
                <span class="detail-name">· {{ hex.name }}</span>
              </div>
            </div>

            <div class="gua-mindmap">
              <div class="gua-branch-label upper">
                <span class="branch-tag">{{ headBranchLabels.upper.tag }}</span>
                <span class="branch-sym">{{
                  headBranchLabels.upper.trigram.sym
                }}</span>
                <span class="branch-name">{{
                  headBranchLabels.upper.trigram.zh
                }}</span>
              </div>

              <div class="branch-col upper" aria-hidden="true">
                <svg viewBox="0 0 36 132" preserveAspectRatio="none">
                  <path
                    d="M 8 22 V 110 M 8 22 H 36 M 8 66 H 36 M 8 110 H 36"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>

              <div class="gua-branch-label lower">
                <span class="branch-tag">{{ headBranchLabels.lower.tag }}</span>
                <span class="branch-sym">{{
                  headBranchLabels.lower.trigram.sym
                }}</span>
                <span class="branch-name">{{
                  headBranchLabels.lower.trigram.zh
                }}</span>
              </div>

              <div class="branch-col lower" aria-hidden="true">
                <svg viewBox="0 0 36 132" preserveAspectRatio="none">
                  <path
                    d="M 8 22 V 110 M 8 22 H 36 M 8 66 H 36 M 8 110 H 36"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>

              <div class="rows-col">
                <div class="gua-col-head">
                  <span>爻位</span>
                  <span>爻画</span>
                  <span>爻性</span>
                  <span>位属性</span>
                  <span>爻题（爻称）</span>
                </div>
                <div
                  v-for="row in headYaoRows"
                  :key="row.index"
                  class="gua-yao-row"
                >
                  <span class="gua-pos-label">{{ row.posLabel }}</span>
                  <span
                    class="gua-yao-line"
                    :class="row.isYang ? 'yang' : 'yin'"
                  >
                    <span class="seg"></span>
                    <span v-if="!row.isYang" class="seg"></span>
                  </span>
                  <span
                    class="gua-yao-xing"
                    :class="row.isYang ? 'yang' : 'yin'"
                    >{{ row.yaoXing }}</span
                  >
                  <span class="gua-pos-attr">{{ row.posAttr }}</span>
                  <span class="gua-call-name">{{ row.callName }}</span>
                </div>
              </div>
            </div>
          </header>

          <el-collapse v-model="activePanels" class="detail-collapse">
            <el-collapse-item name="jing" title="第一层 · 经文">
              <section class="detail-sec">
                <h4 class="sec-label">卦辞（彖辞·经）</h4>
                <p class="sec-desc">总断语、整个卦的吉凶大纲</p>
                <p class="sec-text" :class="{ empty: !detail?.jingWen.guaCi }">
                  {{ detail?.jingWen.guaCi || "（待补充）" }}
                </p>
              </section>

              <section class="detail-sec">
                <h4 class="sec-label">爻辞（分论）</h4>
                <p class="sec-desc">每个爻的具体情况</p>
                <ul class="yao-ci-list">
                  <li v-for="(yao, idx) in yaoRows" :key="idx">
                    <span class="yao-ci-label">{{ yao.label }}</span>
                    <span class="yao-ci" :class="{ empty: !yao.yaoCi }">
                      {{ yao.yaoCi || "（待补充）" }}
                    </span>
                  </li>
                  <li v-if="detail?.jingWen.yongJiu">
                    <span class="yao-ci-label">用九</span>
                    <span class="yao-ci">{{ detail.jingWen.yongJiu }}</span>
                  </li>
                  <li v-if="detail?.jingWen.yongLiu">
                    <span class="yao-ci-label">用六</span>
                    <span class="yao-ci">{{ detail.jingWen.yongLiu }}</span>
                  </li>
                </ul>
              </section>
            </el-collapse-item>

            <el-collapse-item name="zhuan" title="第二层 · 传文">
              <section class="detail-sec">
                <h4 class="sec-label">彖传（彖辞·传）</h4>
                <p class="sec-desc">解释卦辞和卦名含义</p>
                <p
                  class="sec-text"
                  :class="{ empty: !detail?.zhuanWen.tuanZhuan }"
                >
                  {{ detail?.zhuanWen.tuanZhuan || "（待补充）" }}
                </p>
              </section>

              <section class="detail-sec">
                <h4 class="sec-label">象传 · 大象</h4>
                <p class="sec-desc">以「象」来解释整卦</p>
                <p
                  class="sec-text"
                  :class="{ empty: !detail?.zhuanWen.daXiang }"
                >
                  {{ detail?.zhuanWen.daXiang || "（待补充）" }}
                </p>
              </section>

              <section class="detail-sec">
                <h4 class="sec-label">象传 · 小象</h4>
                <p class="sec-desc">以「象」来解释每一爻</p>
                <ul class="xiaoxiang-list">
                  <li v-for="(yao, idx) in yaoRows" :key="idx">
                    <span class="xiaoxiang-label">{{ yao.label }}</span>
                    <span
                      class="xiaoxiang-text"
                      :class="{ empty: !yao.xiaoXiang }"
                    >
                      {{ yao.xiaoXiang || "（待补充）" }}
                    </span>
                  </li>
                  <li v-if="detail?.jingWen.yongJiu">
                    <span class="xiaoxiang-label">用九</span>
                    <span
                      class="xiaoxiang-text"
                      :class="{ empty: !detail.jingWen.yongJiuXiaoXiang }"
                    >
                      {{ detail.jingWen.yongJiuXiaoXiang || "（待补充）" }}
                    </span>
                  </li>
                  <li v-if="detail?.jingWen.yongLiu">
                    <span class="xiaoxiang-label">用六</span>
                    <span
                      class="xiaoxiang-text"
                      :class="{ empty: !detail.jingWen.yongLiuXiaoXiang }"
                    >
                      {{ detail.jingWen.yongLiuXiaoXiang || "（待补充）" }}
                    </span>
                  </li>
                </ul>
              </section>
            </el-collapse-item>
          </el-collapse>
        </aside>

        <aside class="detail-right">
          <h3 class="panel-title">第三层 · 解卦工具</h3>

          <div class="wei-charts-row">
            <section class="detail-sec zhong-sec">
              <h4 class="sec-label">中（看中位）</h4>
              <p class="sec-desc">二爻、五爻为上下卦之中</p>
              <div class="zhong-yao-chart">
                <div
                  v-for="row in headYaoRows"
                  :key="row.index"
                  class="zhong-yao-row"
                >
                  <span class="zhong-line" :class="row.isYang ? 'yang' : 'yin'">
                    <span class="seg"></span>
                    <span v-if="!row.isYang" class="seg"></span>
                  </span>
                  <span
                    v-if="row.index === 1 || row.index === 4"
                    class="zhong-mark"
                  >
                    <i class="zhong-lead" aria-hidden="true"></i>
                    中
                  </span>
                </div>
              </div>
            </section>

            <section class="detail-sec zheng-sec">
              <h4 class="sec-label">正（看当位）</h4>
              <p class="sec-desc">阳爻居阳位、阴爻居阴位为当位</p>
              <div class="zhong-yao-chart">
                <div
                  v-for="row in headYaoRows"
                  :key="row.index"
                  class="zhong-yao-row"
                >
                  <span class="zhong-line" :class="row.isYang ? 'yang' : 'yin'">
                    <span class="seg"></span>
                    <span v-if="!row.isYang" class="seg"></span>
                  </span>
                  <span
                    class="zheng-mark"
                    :class="row.dangWei ? 'correct' : 'wrong'"
                  >
                    <i class="zhong-lead" aria-hidden="true"></i>
                    {{ row.dangWei ? "当位" : "不当位" }}
                  </span>
                </div>
              </div>
            </section>
          </div>

          <section class="detail-sec bi-sec">
            <h4 class="sec-label">比（看相邻）</h4>
            <p class="sec-desc">相邻两爻：一阴一阳为亲比（承/乘），同性为敌比</p>
            <YaoBiMini v-if="hex" :code="hex.code" />
          </section>

          <section class="detail-sec ying-sec">
            <h4 class="sec-label">应（看隔位）</h4>
            <p class="sec-desc">初四、二五、三上：异性为正应，同性为无应</p>
            <YaoYingMini v-if="hex" :code="hex.code" />
          </section>

          <section class="detail-sec ju-sec">
            <h4 class="sec-label">据（看阳据阴）</h4>
            <p class="sec-desc">相邻两爻：阳在上、阴在下，则阳据阴</p>
            <YaoJuMini v-if="hex" :code="hex.code" />
          </section>

          <section class="detail-sec bian-sec">
            <h4 class="sec-label">变（看变化）</h4>
            <p class="sec-desc">错综互由本卦推出；之卦需指定动爻</p>
            <YaoBianMini v-if="hex" :code="hex.code" />
          </section>
        </aside>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { T } from "../../config/liuShiSiGua.ts";
import { getHexDetail } from "../../config/liuShiSiGuaDetail.ts";
import {
  POS_IS_YANG,
  posAttrLabel,
  posLabelWithOrdinal,
  yaoTraditionalLabel,
  yaoXingLabel,
} from "../../config/liuShiSiGuaWei.ts";
import YaoBiMini from "./YaoBiMini.vue";
import YaoYingMini from "./YaoYingMini.vue";
import YaoJuMini from "./YaoJuMini.vue";
import YaoBianMini from "./YaoBianMini.vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  hex: { type: Object, default: null },
});

const emit = defineEmits(["update:modelValue"]);

const activePanels = ref(["jing", "zhuan"]);

const visible = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

const drawerTitle = computed(() =>
  props.hex ? `${props.hex.full}` : "卦详情"
);

const detail = computed(() => (props.hex ? getHexDetail(props.hex.num) : null));

function buildYaoRow(index) {
  const isYang = props.hex.code[index] === "1";
  const yao = detail.value?.jingWen.yaoCi?.[index];
  return {
    index,
    posLabel: posLabelWithOrdinal(index),
    isYang,
    dangWei: isYang === POS_IS_YANG[index],
    yaoXing: yaoXingLabel(isYang),
    posAttr: posAttrLabel(index),
    callName: yao?.label || yaoTraditionalLabel(index, isYang),
  };
}

const headBranchLabels = computed(() => {
  if (!props.hex) {
    return {
      upper: { tag: "上卦（外卦）", trigram: { sym: "", zh: "" } },
      lower: { tag: "下卦（内卦）", trigram: { sym: "", zh: "" } },
    };
  }
  return {
    upper: { tag: "上卦（外卦）", trigram: T[props.hex.upper] },
    lower: { tag: "下卦（内卦）", trigram: T[props.hex.lower] },
  };
});

const headYaoRows = computed(() => {
  if (!props.hex) return [];
  return [5, 4, 3, 2, 1, 0].map(buildYaoRow);
});

const yaoRows = computed(() => {
  if (!props.hex) return [];
  const sourceYao = detail.value?.jingWen.yaoCi ?? [];

  return Array.from({ length: 6 }, (_, i) => {
    const yao = sourceYao[i];
    const isYang = props.hex.code[i] === "1";
    return {
      index: i,
      label: yao?.label || yaoTraditionalLabel(i, isYang),
      yaoCi: yao?.yaoCi ?? "",
      xiaoXiang: yao?.xiaoXiang ?? "",
    };
  }).reverse();
});

watch(
  () => props.hex,
  () => {
    activePanels.value = ["jing", "zhuan"];
  }
);
</script>

<style lang="scss">
.liu-shi-si-gua-detail-drawer.el-dialog {
  --paper-card: #f5eeda;
  --paper-deep: #e1d3ae;
  --ink: #241f17;
  --ink-soft: #655b47;
  --ink-faint: #8b806a;
  --cinnabar: #ac392b;
  --cinnabar-deep: #832a20;
  --good: #4c6b3f;
  --serif: "Noto Serif SC", "Songti SC", "Source Han Serif SC", "STSong", serif;
  --kaiti: "KaiTi", "STKaiti", "Kaiti SC", "楷体", serif;
  display: flex;
  flex-direction: column;
  margin: 0;
}

.liu-shi-si-gua-detail-drawer .el-dialog__header {
  margin-bottom: 0;
  padding: 14px 20px;
  border-bottom: 1px solid var(--paper-deep);
  background: var(--paper-card);
}

.liu-shi-si-gua-detail-drawer .el-dialog__title {
  font-family: var(--serif);
  font-weight: 700;
  color: var(--cinnabar-deep);
}

.liu-shi-si-gua-detail-drawer .el-dialog__body {
  flex: 1;
  min-height: 0;
  background: var(--paper-card);
  padding: 0;
  overflow: hidden;
}

.liu-shi-si-gua-detail {
  color: var(--ink);
  font-family: "Noto Sans SC", "PingFang SC", sans-serif;
  height: 100%;
}

.liu-shi-si-gua-detail .detail-split {
  display: flex;
  height: 100%;
  min-height: 0;
}

.liu-shi-si-gua-detail .detail-left,
.liu-shi-si-gua-detail .detail-right {
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
  padding: 16px 20px 28px;
}

.liu-shi-si-gua-detail .detail-right {
  border-left: 1px solid var(--paper-deep);
}

.liu-shi-si-gua-detail .panel-title {
  margin: 0 0 16px;
  font-family: var(--serif);
  font-size: 16px;
  font-weight: 600;
  color: var(--cinnabar-deep);
}

.liu-shi-si-gua-detail .wei-charts-row {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 8px;
}

.liu-shi-si-gua-detail .wei-charts-row .detail-sec {
  margin-bottom: 12px;
}

.liu-shi-si-gua-detail .zhong-yao-chart {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: fit-content;
  // padding: 4px 0 8px;
}

.liu-shi-si-gua-detail .zhong-yao-row {
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: 14px;
}

.liu-shi-si-gua-detail .zhong-line {
  flex: none;
  width: 52px;
  height: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.liu-shi-si-gua-detail .zhong-line .seg {
  height: 100%;
  background: var(--ink);
  border-radius: 1px;
}

.liu-shi-si-gua-detail .zhong-line.yang .seg {
  width: 100%;
}

.liu-shi-si-gua-detail .zhong-line.yin .seg {
  width: 44%;
}

.liu-shi-si-gua-detail .zhong-mark {
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 0;
  font-family: var(--serif);
  font-size: 13px;
  font-weight: 700;
  color: var(--good);
  letter-spacing: 0.08em;
}

.liu-shi-si-gua-detail .zheng-mark {
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 0;
  font-family: var(--serif);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.liu-shi-si-gua-detail .zheng-mark.correct {
  color: var(--good);
}

.liu-shi-si-gua-detail .zheng-mark.wrong {
  color: var(--cinnabar);
}

.liu-shi-si-gua-detail .zhong-lead {
  display: block;
  width: 28px;
  height: 0;
  border-top: 1.5px solid currentColor;
  margin-right: 4px;
}

.liu-shi-si-gua-detail .detail-head {
  padding: 0 0 20px;
  border-bottom: 1px solid var(--paper-deep);
  margin-bottom: 8px;
}

.liu-shi-si-gua-detail .detail-head-top {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}

.liu-shi-si-gua-detail .detail-title {
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex-wrap: wrap;
}

.liu-shi-si-gua-detail .detail-seal {
  flex: none;
  width: 28px;
  height: 28px;
  background: var(--cinnabar);
  color: #fff;
  font-family: var(--serif);
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
}

.liu-shi-si-gua-detail .gua-mindmap {
  display: grid;
  grid-template-columns: 92px 36px 1fr;
  grid-template-rows: auto repeat(3, minmax(44px, auto)) 10px repeat(
      3,
      minmax(44px, auto)
    );
  align-items: stretch;
  column-gap: 0;
}

.liu-shi-si-gua-detail .gua-branch-label {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  padding-right: 6px;
}

.liu-shi-si-gua-detail .gua-branch-label.upper {
  grid-column: 1;
  grid-row: 2 / 5;
}

.liu-shi-si-gua-detail .gua-branch-label.lower {
  grid-column: 1;
  grid-row: 6 / 9;
}

.liu-shi-si-gua-detail .branch-tag {
  font-size: 11px;
  color: var(--ink-faint);
  letter-spacing: 0.04em;
  line-height: 1.3;
}

.liu-shi-si-gua-detail .branch-sym {
  font-size: 22px;
  color: var(--cinnabar-deep);
  line-height: 1;
}

.liu-shi-si-gua-detail .branch-name {
  font-family: var(--serif);
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
}

.liu-shi-si-gua-detail .branch-col {
  color: var(--cinnabar-deep);
  opacity: 0.55;
  align-self: stretch;
}

.liu-shi-si-gua-detail .branch-col.upper {
  grid-column: 2;
  grid-row: 2 / 5;
}

.liu-shi-si-gua-detail .branch-col.lower {
  grid-column: 2;
  grid-row: 6 / 9;
}

.liu-shi-si-gua-detail .branch-col svg {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 132px;
}

.liu-shi-si-gua-detail .rows-col {
  grid-column: 3;
  grid-row: 1 / 9;
  min-width: 0;
}

.liu-shi-si-gua-detail .gua-col-head {
  display: grid;
  grid-template-columns: 108px 1fr 44px 52px 80px;
  gap: 8px;
  padding: 0 4px 8px;
  font-size: 11px;
  color: var(--cinnabar-deep);
  letter-spacing: 0.12em;
  font-weight: 600;
}

.liu-shi-si-gua-detail .gua-col-head span:nth-child(n + 3) {
  text-align: center;
}

.liu-shi-si-gua-detail .gua-yao-row {
  display: grid;
  grid-template-columns: 108px 1fr 44px 52px 80px;
  align-items: center;
  gap: 8px;
  padding: 10px 4px;
  min-height: 44px;
}

.liu-shi-si-gua-detail .gua-yao-row + .gua-yao-row {
  border-top: 1px solid rgba(36, 31, 23, 0.1);
}

.liu-shi-si-gua-detail .gua-yao-row:nth-child(5) {
  border-top: 1px dashed rgba(36, 31, 23, 0.2);
  margin-top: 2px;
  padding-top: 12px;
}

.liu-shi-si-gua-detail .gua-pos-label {
  font-size: 13px;
  color: var(--ink);
  line-height: 1.35;
}

.liu-shi-si-gua-detail .gua-yao-line {
  height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.liu-shi-si-gua-detail .gua-yao-line .seg {
  height: 100%;
  background: var(--ink);
  border-radius: 1px;
}

.liu-shi-si-gua-detail .gua-yao-line.yang .seg {
  width: 100%;
}

.liu-shi-si-gua-detail .gua-yao-line.yin .seg {
  width: 44%;
}

.liu-shi-si-gua-detail .gua-yao-xing {
  font-size: 12px;
  text-align: center;
  font-weight: 600;
}

.liu-shi-si-gua-detail .gua-yao-xing.yang {
  color: var(--cinnabar-deep);
}

.liu-shi-si-gua-detail .gua-yao-xing.yin {
  color: var(--ink-soft);
}

.liu-shi-si-gua-detail .gua-pos-attr {
  font-size: 12px;
  text-align: center;
  color: var(--ink-soft);
}

.liu-shi-si-gua-detail .gua-call-name {
  font-family: var(--serif);
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  color: var(--cinnabar-deep);
}

.liu-shi-si-gua-detail .detail-order {
  font-size: 12px;
  color: var(--ink-faint);
  letter-spacing: 0.08em;
}

.liu-shi-si-gua-detail .detail-name {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 700;
  color: var(--cinnabar-deep);
}

.liu-shi-si-gua-detail .detail-collapse {
  border: none;
}

.liu-shi-si-gua-detail .detail-collapse .el-collapse-item__header {
  font-family: var(--serif);
  font-weight: 600;
  color: var(--cinnabar-deep);
  background: transparent;
  border-bottom-color: var(--paper-deep);
}

.liu-shi-si-gua-detail .detail-collapse .el-collapse-item__wrap {
  background: transparent;
  border-bottom-color: var(--paper-deep);
}

.liu-shi-si-gua-detail .detail-sec {
  margin-bottom: 20px;
}

.liu-shi-si-gua-detail .detail-sec:last-child {
  margin-bottom: 8px;
}

.liu-shi-si-gua-detail .sec-label {
  margin: 0 0 4px;
  font-family: var(--serif);
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
}

.liu-shi-si-gua-detail .sec-desc {
  margin: 0 0 8px;
  font-size: 11px;
  color: var(--ink-faint);
}

.liu-shi-si-gua-detail .sec-text {
  margin: 0;
  font-family: var(--kaiti);
  font-weight: 700;
  font-size: 14px;
  line-height: 1.9;
  color: var(--ink);
}

.liu-shi-si-gua-detail .sec-text.empty,
.liu-shi-si-gua-detail .yao-ci.empty,
.liu-shi-si-gua-detail .xiaoxiang-text.empty,
.liu-shi-si-gua-detail .empty {
  color: var(--ink-faint);
  font-size: 13px;
  font-weight: 400;
}

.liu-shi-si-gua-detail .yao-ci-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.liu-shi-si-gua-detail .yao-ci-list li {
  display: flex;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid var(--paper-deep);
  align-items: baseline;
}

.liu-shi-si-gua-detail .yao-ci-label {
  flex: none;
  width: 48px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
}

.liu-shi-si-gua-detail .yao-ci {
  margin: 0;
  font-family: var(--kaiti);
  font-weight: 700;
  font-size: 14px;
  line-height: 1.8;
  color: var(--ink);
}

.liu-shi-si-gua-detail .xiaoxiang-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.liu-shi-si-gua-detail .xiaoxiang-list li {
  display: flex;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid var(--paper-deep);
  font-size: 13px;
  line-height: 1.7;
  align-items: baseline;
}

.liu-shi-si-gua-detail .xiaoxiang-label {
  flex: none;
  width: 48px;
  font-weight: 600;
  color: var(--ink);
}

.liu-shi-si-gua-detail .xiaoxiang-text {
  font-family: var(--kaiti);
  font-weight: 700;
  font-size: 14px;
  line-height: 1.8;
  color: var(--ink);
}

@media (max-width: 768px) {
  .liu-shi-si-gua-detail .detail-split {
    flex-direction: column;
  }

  .liu-shi-si-gua-detail .detail-right {
    border-left: none;
    border-top: 1px solid var(--paper-deep);
  }
}

@media (max-width: 480px) {
  .liu-shi-si-gua-detail .gua-mindmap {
    grid-template-columns: 72px 28px 1fr;
  }

  .liu-shi-si-gua-detail .gua-col-head,
  .liu-shi-si-gua-detail .gua-yao-row {
    grid-template-columns: 88px 1fr 40px 48px 48px;
    gap: 6px;
  }

  .liu-shi-si-gua-detail .branch-sym {
    font-size: 18px;
  }

  .liu-shi-si-gua-detail .branch-name {
    font-size: 14px;
  }
}
</style>

<template>
  <div class="dayan">
    <div class="dayan__top">
      <p class="dayan__motto">一变四营，三变成爻，十八变成卦。</p>
      <el-button size="small" text type="danger" @click="resetAll">
        重新起卦
      </el-button>
    </div>

    <div class="dayan__layout">
      <div class="dayan__main">
        <div class="dayan__progress">
          <template v-if="phase === 'prep'">准备 · 大衍之数五十</template>
          <template v-else-if="phase === 'done'">十八变已成 · 得卦</template>
          <template v-else>
            第 {{ yaoIndex + 1 }} 爻（{{ yaoLabels[yaoIndex] }}）· 第
            {{ bianIndex + 1 }} 变 / 3 · {{ stepLabel }}
          </template>
        </div>

        <p class="dayan__hint">{{ hint }}</p>

        <!-- 准备 -->
        <div v-if="phase === 'prep'" class="dayan__stage">
          <div class="dayan__pile dayan__pile--single">
            <div class="dayan__pile-title">蓍草</div>
            <div class="dayan__count">{{ total }}</div>
            <StalkVisual :count="total" />
          </div>
          <el-button type="primary" @click="takeOneAside">
            取出 1 根不用
          </el-button>
        </div>

        <!-- 演算中 -->
        <div v-else-if="phase === 'cast'" class="dayan__stage">
          <div v-if="step === 'idle'" class="dayan__pile dayan__pile--single">
            <div class="dayan__pile-title">合策（待分二）</div>
            <div class="dayan__count">{{ working }}</div>
            <StalkVisual :count="working" />
          </div>

          <div v-else class="dayan__piles">
            <div class="dayan__pile">
              <div class="dayan__pile-title">左（天）</div>
              <div class="dayan__count">{{ left }}</div>
              <StalkVisual :count="left" />
            </div>
            <div class="dayan__pile">
              <div class="dayan__pile-title">右（地）</div>
              <div class="dayan__count">{{ right }}</div>
              <StalkVisual :count="right" />
            </div>
            <div class="dayan__pile dayan__pile--aside">
              <div class="dayan__pile-title">挂一 / 奇</div>
              <div class="dayan__count">{{ hung + oddLeft + oddRight }}</div>
              <div class="dayan__aside-detail">
                <span v-if="hung">挂 {{ hung }}</span>
                <span v-if="oddLeft">左余 {{ oddLeft }}</span>
                <span v-if="oddRight">右余 {{ oddRight }}</span>
                <span v-if="!hung && !oddLeft && !oddRight">—</span>
              </div>
            </div>
          </div>

          <div class="dayan__meta">
            案上共 {{ onTable }} 策
            <template v-if="step === 'idle'">（合而未分）</template>
            <template v-else-if="step === 'dieSi'">
              · 本变将归奇 {{ hung + oddLeft + oddRight }}，余
              {{ left + right }} 入下变
            </template>
          </div>

          <el-button type="primary" :disabled="busy" @click="advance">
            {{ actionLabel }}
          </el-button>
        </div>

        <!-- 成卦 -->
        <div v-else class="dayan__stage dayan__stage--done">
          <div class="dayan__gua-pair">
            <div class="dayan__gua-card">
              <div class="dayan__gua-title">本卦</div>
              <div v-if="benGua" class="dayan__gua-name">{{ benGua.name }}</div>
              <div v-if="benGua" class="dayan__gua-full">{{ benGua.full }}</div>
              <YaoStack :yaos="yaos" mode="ben" />
            </div>
            <div v-if="hasChanging" class="dayan__gua-card">
              <div class="dayan__gua-title">变卦</div>
              <div v-if="zhiGua" class="dayan__gua-name">{{ zhiGua.name }}</div>
              <div v-if="zhiGua" class="dayan__gua-full">{{ zhiGua.full }}</div>
              <YaoStack :yaos="yaos" mode="zhi" />
            </div>
          </div>
          <el-button type="primary" @click="resetAll">再起一卦</el-button>
        </div>
      </div>

      <aside class="dayan__yaos">
        <div class="dayan__yaos-title">已得爻（自下而上）</div>
        <ul class="dayan__yao-list">
          <li
            v-for="(label, i) in yaoLabels.slice().reverse()"
            :key="label"
            class="dayan__yao-item"
            :class="{
              'dayan__yao-item--current':
                phase === 'cast' && yaoLabels.indexOf(label) === yaoIndex,
              'dayan__yao-item--filled': yaos[yaoLabels.indexOf(label)],
            }"
          >
            <span class="dayan__yao-label">{{ label }}</span>
            <template v-if="yaos[yaoLabels.indexOf(label)]">
              <span class="dayan__yao-sym">{{
                lineSym(yaos[yaoLabels.indexOf(label)])
              }}</span>
              <span class="dayan__yao-num">{{
                yaos[yaoLabels.indexOf(label)].value
              }}</span>
              <span class="dayan__yao-name">{{
                yaos[yaoLabels.indexOf(label)].name
              }}</span>
              <span
                v-if="yaos[yaoLabels.indexOf(label)].changing"
                class="dayan__yao-dong"
                >动</span
              >
            </template>
            <span v-else class="dayan__yao-empty">…</span>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed, defineComponent, h, ref } from "vue";
import { resolveHex } from "../../config/liuShiSiGuaWei.ts";

const yaoLabels = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"];

const YAO_MAP = {
  9: { name: "老阳", yang: true, changing: true },
  7: { name: "少阳", yang: true, changing: false },
  8: { name: "少阴", yang: false, changing: false },
  6: { name: "老阴", yang: false, changing: true },
};

function rem4(n) {
  if (n <= 0) return 0;
  const r = n % 4;
  return r === 0 ? 4 : r;
}

function randomSplit(n) {
  // 左≥1、右≥2，保证挂一后右堆仍可揲
  if (n < 3) return { left: 1, right: Math.max(n - 1, 0) };
  const left = 1 + Math.floor(Math.random() * (n - 2));
  return { left, right: n - left };
}

function lineSym(yao) {
  if (!yao) return "";
  if (yao.yang && yao.changing) return "⚊ ○";
  if (yao.yang) return "⚊";
  if (yao.changing) return "⚋ ×";
  return "⚋";
}

function yaosToCode(yaos, mode = "ben") {
  return yaos
    .map((y) => {
      if (!y) return "0";
      let yang = y.yang;
      if (mode === "zhi" && y.changing) yang = !yang;
      return yang ? "1" : "0";
    })
    .join("");
}

const StalkVisual = defineComponent({
  name: "StalkVisual",
  props: {
    count: { type: Number, default: 0 },
  },
  setup(props) {
    return () => {
      const n = Math.min(props.count, 24);
      return h(
        "div",
        { class: "dayan__stalks", "aria-hidden": "true" },
        Array.from({ length: n }, (_, i) =>
          h("span", { class: "dayan__stalk", key: i }),
        ),
      );
    };
  },
});

const YaoStack = defineComponent({
  name: "YaoStack",
  props: {
    yaos: { type: Array, required: true },
    mode: { type: String, default: "ben" },
  },
  setup(props) {
    return () => {
      const lines = [];
      for (let i = 5; i >= 0; i--) {
        const y = props.yaos[i];
        if (!y) {
          lines.push(h("div", { class: "dayan__line dayan__line--empty", key: i }, "—"));
          continue;
        }
        let yang = y.yang;
        if (props.mode === "zhi" && y.changing) yang = !yang;
        lines.push(
          h(
            "div",
            {
              class: [
                "dayan__line",
                yang ? "dayan__line--yang" : "dayan__line--yin",
                props.mode === "ben" && y.changing ? "dayan__line--dong" : "",
              ],
              key: i,
            },
            yang
              ? h("span", { class: "dayan__bar" })
              : [
                  h("span", { class: "dayan__bar dayan__bar--half" }),
                  h("span", { class: "dayan__bar dayan__bar--half" }),
                ],
          ),
        );
      }
      return h("div", { class: "dayan__stack" }, lines);
    };
  },
});

const phase = ref("prep"); // prep | cast | done
const step = ref("idle"); // idle | fenEr | guaYi | dieSi | guiQi
const total = ref(50);
const working = ref(0);
const left = ref(0);
const right = ref(0);
const hung = ref(0);
const oddLeft = ref(0);
const oddRight = ref(0);
const yaoIndex = ref(0);
const bianIndex = ref(0);
const yaos = ref([null, null, null, null, null, null]);
const busy = ref(false);

const hasChanging = computed(() =>
  yaos.value.some((y) => y && y.changing),
);

const benGua = computed(() => resolveHex(yaosToCode(yaos.value, "ben")));
const zhiGua = computed(() => resolveHex(yaosToCode(yaos.value, "zhi")));

const onTable = computed(() => {
  if (phase.value !== "cast" || step.value === "idle") return working.value;
  return left.value + right.value + hung.value + oddLeft.value + oddRight.value;
});

const stepLabel = computed(() => {
  const map = {
    idle: "待分二",
    fenEr: "分二",
    guaYi: "挂一",
    dieSi: "揲四",
    guiQi: "归奇",
  };
  return map[step.value] ?? "";
});

const hint = computed(() => {
  if (phase.value === "prep") {
    return "共 50 根蓍草，先拿出 1 根不用。实际用来算的是 49 根（其用四十有九）。";
  }
  if (phase.value === "done") {
    return "六爻已成。老阳、老阴为动爻，变后得变卦。";
  }
  const map = {
    idle: "把当前的草随便分成左右两堆（象征天地）。点「分二」开始。",
    fenEr: "已分而为二，象天地。下一步：从右边拿走 1 根，夹在手指间（象征人）。",
    guaYi: "已挂一象人。下一步：左右两堆各自用 4 根一组去数（象四时）。",
    dieSi: `揲四完毕：左余 ${oddLeft.value}，右余 ${oddRight.value}（整除则余作 4）。下一步：归奇——余数与挂一夹起放旁边。`,
    guiQi: "归奇已毕，此一变完成。剩余合拢，进入下一变（或定爻）。",
  };
  return map[step.value] ?? "";
});

const actionLabel = computed(() => {
  if (step.value === "idle") return "分二";
  if (step.value === "fenEr") return "挂一";
  if (step.value === "guaYi") return "揲四";
  if (step.value === "dieSi") return "归奇";
  return "继续";
});

function resetAll() {
  phase.value = "prep";
  step.value = "idle";
  total.value = 50;
  working.value = 0;
  left.value = 0;
  right.value = 0;
  hung.value = 0;
  oddLeft.value = 0;
  oddRight.value = 0;
  yaoIndex.value = 0;
  bianIndex.value = 0;
  yaos.value = [null, null, null, null, null, null];
  busy.value = false;
}

function takeOneAside() {
  total.value = 49;
  working.value = 49;
  left.value = 49;
  right.value = 0;
  hung.value = 0;
  oddLeft.value = 0;
  oddRight.value = 0;
  phase.value = "cast";
  step.value = "idle";
  yaoIndex.value = 0;
  bianIndex.value = 0;
}

function clearAside() {
  hung.value = 0;
  oddLeft.value = 0;
  oddRight.value = 0;
}

function doFenEr() {
  const { left: l, right: r } = randomSplit(working.value);
  left.value = l;
  right.value = r;
  clearAside();
  step.value = "fenEr";
}

function doGuaYi() {
  if (right.value < 1) return;
  right.value -= 1;
  hung.value = 1;
  step.value = "guaYi";
}

function doDieSi() {
  oddLeft.value = rem4(left.value);
  oddRight.value = rem4(right.value);
  left.value -= oddLeft.value;
  right.value -= oddRight.value;
  step.value = "dieSi";
}

function doGuiQi() {
  const discarded = hung.value + oddLeft.value + oddRight.value;
  working.value = left.value + right.value;
  left.value = working.value;
  right.value = 0;
  hung.value = 0;
  oddLeft.value = 0;
  oddRight.value = 0;
  // discarded 仅作仪式旁置，不进入下一变
  void discarded;

  if (bianIndex.value < 2) {
    bianIndex.value += 1;
    step.value = "idle";
    return;
  }

  // 三变完成 → 定爻
  const value = working.value / 4;
  const meta = YAO_MAP[value];
  if (!meta || !Number.isInteger(value)) {
    // 异常时重来本爻
    working.value = 49;
    left.value = 49;
    right.value = 0;
    bianIndex.value = 0;
    step.value = "idle";
    return;
  }

  const next = [...yaos.value];
  next[yaoIndex.value] = { value, ...meta };
  yaos.value = next;

  if (yaoIndex.value >= 5) {
    phase.value = "done";
    step.value = "idle";
    return;
  }

  yaoIndex.value += 1;
  bianIndex.value = 0;
  working.value = 49;
  left.value = 49;
  right.value = 0;
  step.value = "idle";
}

function advance() {
  if (busy.value || phase.value !== "cast") return;
  if (step.value === "idle") doFenEr();
  else if (step.value === "fenEr") doGuaYi();
  else if (step.value === "guaYi") doDieSi();
  else if (step.value === "dieSi") doGuiQi();
}
</script>

<style scoped>
.dayan {
  margin-top: 0.75rem;
}

.dayan__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.dayan__motto {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.dayan__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 11rem;
  gap: 1.25rem;
  align-items: start;
}

@media (max-width: 720px) {
  .dayan__layout {
    grid-template-columns: 1fr;
  }
}

.dayan__progress {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.35rem;
}

.dayan__hint {
  margin: 0 0 1rem;
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.dayan__stage {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
}

.dayan__piles {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
}

@media (max-width: 560px) {
  .dayan__piles {
    grid-template-columns: 1fr;
  }
}

.dayan__pile {
  padding: 0.75rem 0.65rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  text-align: center;
}

.dayan__pile--single {
  max-width: 16rem;
}

.dayan__pile--aside {
  border-style: dashed;
}

.dayan__pile-title {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.dayan__count {
  font-size: 1.6rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
  line-height: 1.2;
}

.dayan__aside-detail {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem;
  margin-top: 0.35rem;
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
}

.dayan__meta {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.dayan__yaos {
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.dayan__yaos-title {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.dayan__yao-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.dayan__yao-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.4rem;
  border-radius: 4px;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.dayan__yao-item--current {
  background: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
}

.dayan__yao-item--filled {
  color: var(--vp-c-text-1);
}

.dayan__yao-label {
  min-width: 2.2rem;
  font-weight: 600;
}

.dayan__yao-sym {
  font-family: "Noto Sans Symbols 2", "Segoe UI Symbol", sans-serif;
}

.dayan__yao-num {
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-2);
}

.dayan__yao-dong {
  font-size: 0.68rem;
  padding: 0 0.28rem;
  border-radius: 3px;
  background: color-mix(in srgb, #ef4444 22%, transparent);
  color: #b91c1c;
}

.dayan__yao-empty {
  color: var(--vp-c-text-3);
}

.dayan__gua-pair {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.dayan__gua-card {
  padding: 0.85rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.dayan__gua-title {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
  text-align: center;
}

.dayan__gua-name {
  font-size: 1.15rem;
  font-weight: 700;
  text-align: center;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

.dayan__gua-full {
  font-size: 0.78rem;
  text-align: center;
  color: var(--vp-c-text-2);
  margin-bottom: 0.65rem;
}

:deep(.dayan__stack) {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 6.5rem;
}

:deep(.dayan__line) {
  display: flex;
  justify-content: center;
  gap: 0.35rem;
  height: 0.55rem;
}

:deep(.dayan__line--empty) {
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
  height: auto;
}

:deep(.dayan__bar) {
  display: block;
  height: 100%;
  width: 100%;
  border-radius: 1px;
  background: var(--vp-c-text-1);
}

:deep(.dayan__bar--half) {
  width: calc(50% - 0.18rem);
}

:deep(.dayan__line--dong .dayan__bar) {
  background: color-mix(in srgb, #ef4444 70%, var(--vp-c-text-1));
}

:deep(.dayan__stalks) {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px;
  margin-top: 0.5rem;
  min-height: 1.6rem;
}

:deep(.dayan__stalk) {
  width: 3px;
  height: 1.35rem;
  border-radius: 1px;
  background: color-mix(in srgb, #a16207 55%, var(--vp-c-text-2));
}
</style>

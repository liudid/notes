<template>
  <div class="jinqian">
    <div class="jinqian__top">
      <p class="jinqian__motto">三钱六掷，自下而上。</p>
      <el-button size="small" text type="danger" @click="resetAll">
        重新起卦
      </el-button>
    </div>

    <div class="jinqian__layout">
      <div class="jinqian__main">
        <div class="jinqian__progress">
          <template v-if="phase === 'done'">六掷已成 · 得卦</template>
          <template v-else>
            第 {{ yaoIndex + 1 }} 爻（{{ yaoLabels[yaoIndex] }}）· 已掷
            {{ yaoIndex }} / 6
          </template>
        </div>

        <p class="jinqian__hint">{{ hint }}</p>

        <div v-if="phase === 'cast'" class="jinqian__stage">
          <div class="jinqian__coins" :class="{ 'jinqian__coins--spin': spinning }">
            <div
              v-for="(face, i) in coins"
              :key="i"
              class="jinqian__coin"
              :class="face === 'bei' ? 'jinqian__coin--bei' : 'jinqian__coin--zi'"
            >
              <span class="jinqian__coin-face">{{
                face === "bei" ? "背" : "字"
              }}</span>
            </div>
          </div>

          <div v-if="lastThrow" class="jinqian__result">
            {{ lastThrow.bei }} 背 {{ lastThrow.zi }} 字 ·
            {{ lastThrow.su }} · {{ lastThrow.name }}
            <span v-if="lastThrow.changing" class="jinqian__dong">动</span>
          </div>
          <div v-else class="jinqian__result jinqian__result--muted">
            背 = 少（阳），字 = 多（阴）
          </div>

          <el-button type="primary" :disabled="spinning" @click="throwCoins">
            摇卦
          </el-button>
        </div>

        <div v-else class="jinqian__stage jinqian__stage--done">
          <div class="jinqian__gua-pair">
            <div class="jinqian__gua-card">
              <div class="jinqian__gua-title">本卦</div>
              <div v-if="benGua" class="jinqian__gua-name">{{ benGua.name }}</div>
              <div v-if="benGua" class="jinqian__gua-full">{{ benGua.full }}</div>
              <YaoStack :yaos="yaos" mode="ben" />
            </div>
            <div v-if="hasChanging" class="jinqian__gua-card">
              <div class="jinqian__gua-title">变卦</div>
              <div v-if="zhiGua" class="jinqian__gua-name">{{ zhiGua.name }}</div>
              <div v-if="zhiGua" class="jinqian__gua-full">{{ zhiGua.full }}</div>
              <YaoStack :yaos="yaos" mode="zhi" />
            </div>
          </div>
          <el-button type="primary" @click="resetAll">再起一卦</el-button>
        </div>
      </div>

      <aside class="jinqian__yaos">
        <div class="jinqian__yaos-title">已得爻（自下而上）</div>
        <ul class="jinqian__yao-list">
          <li
            v-for="label in yaoLabels.slice().reverse()"
            :key="label"
            class="jinqian__yao-item"
            :class="{
              'jinqian__yao-item--current':
                phase === 'cast' && yaoLabels.indexOf(label) === yaoIndex,
              'jinqian__yao-item--filled': yaos[yaoLabels.indexOf(label)],
            }"
          >
            <span class="jinqian__yao-label">{{ label }}</span>
            <template v-if="yaos[yaoLabels.indexOf(label)]">
              <span class="jinqian__yao-sym">{{
                lineSym(yaos[yaoLabels.indexOf(label)])
              }}</span>
              <span class="jinqian__yao-name">{{
                yaos[yaoLabels.indexOf(label)].name
              }}</span>
              <span class="jinqian__yao-su">{{
                yaos[yaoLabels.indexOf(label)].su
              }}</span>
              <span
                v-if="yaos[yaoLabels.indexOf(label)].changing"
                class="jinqian__yao-dong"
                >动</span
              >
            </template>
            <span v-else class="jinqian__yao-empty">…</span>
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

/** 背数 → 爻 */
const BY_BEI = {
  3: { value: 9, name: "老阳", su: "重", yang: true, changing: true },
  2: { value: 8, name: "少阴", su: "拆", yang: false, changing: false },
  1: { value: 7, name: "少阳", su: "单", yang: true, changing: false },
  0: { value: 6, name: "老阴", su: "交", yang: false, changing: true },
};

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

function randomFace() {
  return Math.random() < 0.5 ? "bei" : "zi";
}

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
          lines.push(
            h("div", { class: "jinqian__line jinqian__line--empty", key: i }, "—"),
          );
          continue;
        }
        let yang = y.yang;
        if (props.mode === "zhi" && y.changing) yang = !yang;
        lines.push(
          h(
            "div",
            {
              class: [
                "jinqian__line",
                yang ? "jinqian__line--yang" : "jinqian__line--yin",
                props.mode === "ben" && y.changing ? "jinqian__line--dong" : "",
              ],
              key: i,
            },
            yang
              ? h("span", { class: "jinqian__bar" })
              : [
                  h("span", { class: "jinqian__bar jinqian__bar--half" }),
                  h("span", { class: "jinqian__bar jinqian__bar--half" }),
                ],
          ),
        );
      }
      return h("div", { class: "jinqian__stack" }, lines);
    };
  },
});

const phase = ref("cast"); // cast | done
const yaoIndex = ref(0);
const yaos = ref([null, null, null, null, null, null]);
const coins = ref(["bei", "zi", "bei"]);
const lastThrow = ref(null);
const spinning = ref(false);

const hasChanging = computed(() =>
  yaos.value.some((y) => y && y.changing),
);

const benGua = computed(() => resolveHex(yaosToCode(yaos.value, "ben")));
const zhiGua = computed(() => resolveHex(yaosToCode(yaos.value, "zhi")));

const hint = computed(() => {
  if (phase.value === "done") {
    return "六爻已成。老阳、老阴为动爻，变后得变卦。";
  }
  return "三枚铜钱合掌默念所问，点「摇卦」掷出一爻。背为少（阳），字为多（阴）。";
});

function resetAll() {
  phase.value = "cast";
  yaoIndex.value = 0;
  yaos.value = [null, null, null, null, null, null];
  coins.value = ["bei", "zi", "bei"];
  lastThrow.value = null;
  spinning.value = false;
}

function throwCoins() {
  if (spinning.value || phase.value !== "cast") return;
  spinning.value = true;
  lastThrow.value = null;

  const flipTimer = setInterval(() => {
    coins.value = [randomFace(), randomFace(), randomFace()];
  }, 70);

  setTimeout(() => {
    clearInterval(flipTimer);
    const faces = [randomFace(), randomFace(), randomFace()];
    coins.value = faces;
    const bei = faces.filter((f) => f === "bei").length;
    const zi = 3 - bei;
    const meta = BY_BEI[bei];
    const yao = { ...meta, bei, zi };
    lastThrow.value = yao;

    const next = [...yaos.value];
    next[yaoIndex.value] = yao;
    yaos.value = next;

    spinning.value = false;

    if (yaoIndex.value >= 5) {
      phase.value = "done";
      return;
    }
    yaoIndex.value += 1;
  }, 650);
}
</script>

<style scoped>
.jinqian {
  margin-top: 0.75rem;
}

.jinqian__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.jinqian__motto {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.jinqian__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 11rem;
  gap: 1.25rem;
  align-items: start;
}

@media (max-width: 720px) {
  .jinqian__layout {
    grid-template-columns: 1fr;
  }
}

.jinqian__progress {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.35rem;
}

.jinqian__hint {
  margin: 0 0 1rem;
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.jinqian__stage {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.jinqian__coins {
  display: flex;
  gap: 0.85rem;
  perspective: 480px;
}

.jinqian__coins--spin .jinqian__coin {
  animation: jinqian-flip 0.35s ease-in-out infinite;
}

.jinqian__coin {
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid color-mix(in srgb, #b45309 55%, var(--vp-c-divider));
  box-shadow: inset 0 0 0 3px color-mix(in srgb, #fbbf24 35%, transparent);
  user-select: none;
  transition: background 0.15s ease, color 0.15s ease;
}

.jinqian__coin--bei {
  background: color-mix(in srgb, #78350f 18%, var(--vp-c-bg-soft));
  color: var(--vp-c-text-1);
}

.jinqian__coin--zi {
  background: color-mix(in srgb, #f59e0b 42%, var(--vp-c-bg));
  color: #78350f;
}

.jinqian__coin-face {
  font-size: 1.05rem;
  font-weight: 700;
}

@keyframes jinqian-flip {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}

.jinqian__result {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.jinqian__result--muted {
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
}

.jinqian__dong {
  margin-left: 0.25rem;
  font-size: 0.72rem;
  padding: 0 0.28rem;
  border-radius: 3px;
  background: color-mix(in srgb, #ef4444 22%, transparent);
  color: #b91c1c;
}

.jinqian__yaos {
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.jinqian__yaos-title {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.jinqian__yao-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.jinqian__yao-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.4rem;
  border-radius: 4px;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.jinqian__yao-item--current {
  background: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
}

.jinqian__yao-item--filled {
  color: var(--vp-c-text-1);
}

.jinqian__yao-label {
  min-width: 2.2rem;
  font-weight: 600;
}

.jinqian__yao-su {
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
}

.jinqian__yao-dong {
  font-size: 0.68rem;
  padding: 0 0.28rem;
  border-radius: 3px;
  background: color-mix(in srgb, #ef4444 22%, transparent);
  color: #b91c1c;
}

.jinqian__yao-empty {
  color: var(--vp-c-text-3);
}

.jinqian__gua-pair {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.jinqian__gua-card {
  padding: 0.85rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.jinqian__gua-title {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
  text-align: center;
}

.jinqian__gua-name {
  font-size: 1.15rem;
  font-weight: 700;
  text-align: center;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

.jinqian__gua-full {
  font-size: 0.78rem;
  text-align: center;
  color: var(--vp-c-text-2);
  margin-bottom: 0.65rem;
}

:deep(.jinqian__stack) {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 6.5rem;
}

:deep(.jinqian__line) {
  display: flex;
  justify-content: center;
  gap: 0.35rem;
  height: 0.55rem;
}

:deep(.jinqian__line--empty) {
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
  height: auto;
}

:deep(.jinqian__bar) {
  display: block;
  height: 100%;
  width: 100%;
  border-radius: 1px;
  background: var(--vp-c-text-1);
}

:deep(.jinqian__bar--half) {
  width: calc(50% - 0.18rem);
}

:deep(.jinqian__line--dong .jinqian__bar) {
  background: color-mix(in srgb, #ef4444 70%, var(--vp-c-text-1));
}
</style>

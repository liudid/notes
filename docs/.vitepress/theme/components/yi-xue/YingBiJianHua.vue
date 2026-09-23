<template>
  <div class="coin-simple">
    <p class="coin-simple__motto">简化硬币：单枚无动爻；双枚可出动静。</p>
    <Segmented :options="modeOptions" :value="mode" @change="onMode" />

    <div class="coin-simple__layout">
      <div class="coin-simple__main">
        <p class="coin-simple__progress">
          <template v-if="phase === 'done'">六爻已成</template>
          <template v-else>
            {{ mode === "single" ? "单枚" : "双枚" }} · 第
            {{ yaoIndex + 1 }} 爻（{{ yaoLabels[yaoIndex] }}）· 已得
            {{ yaoIndex }} / 6
          </template>
        </p>
        <p class="coin-simple__hint">{{ hint }}</p>

        <div v-if="phase === 'cast'" class="coin-simple__stage">
          <div class="coin-simple__coins">
            <div
              v-for="(face, i) in displayCoins"
              :key="i"
              class="coin-simple__coin"
              :class="face === 'bei' ? 'is-bei' : 'is-zi'"
            >
              {{ face === "bei" ? "背" : "字" }}
            </div>
          </div>
          <p v-if="lastMsg" class="coin-simple__last">{{ lastMsg }}</p>
          <div class="coin-simple__actions">
            <el-button type="primary" :disabled="busy" @click="throwOnce">
              摇一爻
            </el-button>
            <el-button :disabled="busy" @click="throwAll">一次摇满</el-button>
            <el-button text type="danger" @click="resetAll">重新</el-button>
          </div>
        </div>

        <div v-else>
          <QiGuaResult :yaos="yaos" />
          <el-button type="primary" style="margin-top: 0.75rem" @click="resetAll">
            再起一卦
          </el-button>
        </div>
      </div>

      <aside class="coin-simple__yaos">
        <div class="coin-simple__yaos-title">已得爻</div>
        <ul>
          <li
            v-for="label in yaoLabels.slice().reverse()"
            :key="label"
          >
            <strong>{{ label }}</strong>
            <template v-if="yaos[yaoLabels.indexOf(label)]">
              {{ yaos[yaoLabels.indexOf(label)].name }}
              <span v-if="yaos[yaoLabels.indexOf(label)].changing">动</span>
            </template>
            <template v-else>…</template>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Segmented from "../Segmented.vue";
import QiGuaResult from "./QiGuaResult.vue";

const yaoLabels = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"];
const modeOptions = [
  { label: "单枚", value: "single" },
  { label: "双枚", value: "double" },
];

const mode = ref("single");
const phase = ref("cast");
const yaoIndex = ref(0);
const yaos = ref([null, null, null, null, null, null]);
const displayCoins = ref(["bei"]);
const lastMsg = ref("");
const busy = ref(false);

const hint = computed(() =>
  mode.value === "single"
    ? "背为阳、字为阴；摇满六爻，无动爻。"
    : "同背少阳、同字少阴；一背一字则补摇一枚定阴阳并为动爻。",
);

function randFace() {
  return Math.random() < 0.5 ? "bei" : "zi";
}

function onMode(v) {
  mode.value = v;
  resetAll();
}

function resetAll() {
  phase.value = "cast";
  yaoIndex.value = 0;
  yaos.value = [null, null, null, null, null, null];
  displayCoins.value = mode.value === "single" ? ["bei"] : ["bei", "zi"];
  lastMsg.value = "";
  busy.value = false;
}

function singleYao() {
  const f = randFace();
  displayCoins.value = [f];
  const yang = f === "bei";
  return {
    yao: yang
      ? { value: 7, name: "少阳", yang: true, changing: false }
      : { value: 8, name: "少阴", yang: false, changing: false },
    msg: `${f === "bei" ? "背" : "字"} · ${yang ? "少阳" : "少阴"}`,
  };
}

function doubleYao() {
  const a = randFace();
  const b = randFace();
  if (a === b) {
    displayCoins.value = [a, b];
    const yang = a === "bei";
    return {
      yao: yang
        ? { value: 7, name: "少阳", yang: true, changing: false }
        : { value: 8, name: "少阴", yang: false, changing: false },
      msg: `同${a === "bei" ? "背" : "字"} · ${yang ? "少阳" : "少阴"}`,
    };
  }
  const c = randFace();
  displayCoins.value = [a, b, c];
  const yang = c === "bei";
  return {
    yao: yang
      ? { value: 9, name: "老阳", yang: true, changing: true }
      : { value: 6, name: "老阴", yang: false, changing: true },
    msg: `一背一字 + 补${c === "bei" ? "背" : "字"} · ${yang ? "老阳" : "老阴"}动`,
  };
}

function applyYao(result) {
  const next = [...yaos.value];
  next[yaoIndex.value] = result.yao;
  yaos.value = next;
  lastMsg.value = result.msg;
  if (yaoIndex.value >= 5) {
    phase.value = "done";
    return;
  }
  yaoIndex.value += 1;
}

function throwOnce() {
  if (busy.value || phase.value !== "cast") return;
  const result = mode.value === "single" ? singleYao() : doubleYao();
  applyYao(result);
}

function throwAll() {
  if (busy.value || phase.value !== "cast") return;
  while (phase.value === "cast") {
    const result = mode.value === "single" ? singleYao() : doubleYao();
    applyYao(result);
  }
}
</script>

<style scoped>
.coin-simple {
  margin-top: 0.75rem;
}

.coin-simple__motto {
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.coin-simple__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 9rem;
  gap: 1rem;
  margin-top: 1rem;
}

@media (max-width: 720px) {
  .coin-simple__layout {
    grid-template-columns: 1fr;
  }
}

.coin-simple__progress {
  font-weight: 600;
  margin: 0 0 0.35rem;
}

.coin-simple__hint {
  margin: 0 0 0.75rem;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
}

.coin-simple__coins {
  display: flex;
  gap: 0.65rem;
  margin-bottom: 0.5rem;
}

.coin-simple__coin {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border: 2px solid color-mix(in srgb, #b45309 55%, var(--vp-c-divider));
}

.coin-simple__coin.is-bei {
  background: color-mix(in srgb, #78350f 18%, var(--vp-c-bg-soft));
}

.coin-simple__coin.is-zi {
  background: color-mix(in srgb, #f59e0b 42%, var(--vp-c-bg));
  color: #78350f;
}

.coin-simple__last {
  font-size: 0.88rem;
  margin: 0 0 0.75rem;
}

.coin-simple__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.coin-simple__yaos {
  padding: 0.65rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  font-size: 0.78rem;
}

.coin-simple__yaos-title {
  font-weight: 600;
  margin-bottom: 0.4rem;
}

.coin-simple__yaos ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.coin-simple__yaos span {
  color: #b91c1c;
  margin-left: 0.2rem;
}
</style>

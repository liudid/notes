<template>
  <div class="fwsy">
    <p class="fwsy__motto">方位取数、声音计数，皆归梅花：卦八爻六。</p>
    <Segmented :options="modeOptions" :value="mode" @change="onMode" />

    <div v-if="mode === 'dir'" class="fwsy__panel">
      <p class="fwsy__hint">点选 1～2 个后天方位。一个则上下动同用该数；两个则先为上、后为下，和为动。</p>
      <div class="fwsy__dirs">
        <button
          v-for="d in HOU_TIAN_DIR"
          :key="d.key"
          type="button"
          class="fwsy__dir"
          :class="{ active: selected.includes(d.num) }"
          @click="toggleDir(d.num)"
        >
          {{ d.label }}
          <small>{{ d.num }}</small>
        </button>
      </div>
      <el-button type="primary" :disabled="!selected.length" @click="castDir">
        起卦
      </el-button>
    </div>

    <div v-else class="fwsy__panel">
      <p class="fwsy__hint">输入听见的声响次数（1～2 个数），算法同梅花报数。</p>
      <div class="fwsy__row">
        <el-input-number v-model="s1" :min="1" :controls="false" placeholder="次数1" />
        <el-input-number v-model="s2" :min="0" :controls="false" placeholder="次数2（可空）" />
        <el-button type="primary" @click="castSound">起卦</el-button>
      </div>
    </div>

    <p v-if="meta" class="fwsy__meta">{{ meta }}</p>
    <QiGuaResult v-if="yaos" :yaos="yaos" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Segmented from "../Segmented.vue";
import QiGuaResult from "./QiGuaResult.vue";
import {
  HOU_TIAN_DIR,
  castByBaoShu,
  castByNumbers,
  mod6,
  mod8,
} from "../../config/meihua.ts";

const modeOptions = [
  { label: "方位", value: "dir" },
  { label: "声音", value: "sound" },
];

const mode = ref("dir");
const selected = ref([]);
const s1 = ref(1);
const s2 = ref(0);
const yaos = ref(null);
const meta = ref("");

function onMode(v) {
  mode.value = v;
  yaos.value = null;
  meta.value = "";
}

function toggleDir(num) {
  const i = selected.value.indexOf(num);
  if (i >= 0) {
    selected.value = selected.value.filter((n) => n !== num);
    return;
  }
  if (selected.value.length >= 2) {
    selected.value = [selected.value[1], num];
    return;
  }
  selected.value = [...selected.value, num];
}

function castDir() {
  const nums = selected.value;
  if (!nums.length) return;
  let r;
  if (nums.length === 1) {
    r = castByNumbers(nums[0], nums[0], nums[0]);
    meta.value = `方位数 ${nums[0]} → 上/下/动皆 ${mod8(nums[0])} / 第${mod6(nums[0])}爻`;
  } else {
    r = castByNumbers(nums[0], nums[1], nums[0] + nums[1]);
    meta.value = `上 ${nums[0]}→${mod8(nums[0])} · 下 ${nums[1]}→${mod8(nums[1])} · 动第${mod6(nums[0] + nums[1])}爻`;
  }
  yaos.value = r?.yaos ?? null;
}

function castSound() {
  const nums = [s1.value, s2.value].filter((n) => n && n > 0);
  const r = castByBaoShu(nums);
  yaos.value = r?.yaos ?? null;
  meta.value = nums.length
    ? `声数 ${nums.join("、")}`
    : "";
}
</script>

<style scoped>
.fwsy {
  margin-top: 0.75rem;
}

.fwsy__motto {
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.fwsy__panel {
  margin-top: 1rem;
}

.fwsy__hint {
  margin: 0 0 0.75rem;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.fwsy__dirs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.fwsy__dir {
  padding: 0.45rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  text-align: left;
  font-size: 0.82rem;
  color: var(--vp-c-text-1);
}

.fwsy__dir small {
  display: block;
  color: var(--vp-c-text-2);
  margin-top: 0.15rem;
}

.fwsy__dir.active {
  border-color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
}

.fwsy__row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.fwsy__meta {
  margin: 0.75rem 0 0;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}
</style>

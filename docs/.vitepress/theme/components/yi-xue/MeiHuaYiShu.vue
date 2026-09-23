<template>
  <div class="meihua">
    <p class="meihua__motto">卦以八除，爻以六除。体用另断。</p>
    <Segmented
      :options="modeOptions"
      :value="mode"
      @change="onMode"
    />

    <div v-if="mode === 'time'" class="meihua__panel">
      <p class="meihua__hint">
        公历年+月+日为上卦，再加时为下卦，年月日时总和为动爻。
      </p>
      <div class="meihua__row">
        <el-date-picker
          v-model="dateVal"
          type="datetime"
          placeholder="选择日期时间"
          format="YYYY-MM-DD HH:mm"
          value-format="x"
        />
        <el-button type="primary" @click="castTime">起卦</el-button>
        <el-button @click="useNow">此刻</el-button>
      </div>
      <p v-if="detail" class="meihua__meta">
        {{ detail.y }}年{{ detail.m }}月{{ detail.day }}日 {{ detail.h }}时 ·
        上 {{ detail.upper }} → {{ mod8(detail.upper) }} ·
        下 {{ detail.lower }} → {{ mod8(detail.lower) }} ·
        动 {{ detail.dong }} → 第 {{ mod6(detail.dong) }} 爻
      </p>
    </div>

    <div v-else class="meihua__panel">
      <p class="meihua__hint">
        报 1～3 个正整数：一数则上下动皆用该数；两数作上下、和为动；三数依次为上、下、动。
      </p>
      <div class="meihua__row">
        <el-input-number v-model="n1" :min="1" :controls="false" placeholder="数1" />
        <el-input-number v-model="n2" :min="0" :controls="false" placeholder="数2（可空）" />
        <el-input-number v-model="n3" :min="0" :controls="false" placeholder="数3（可空）" />
        <el-button type="primary" @click="castNums">起卦</el-button>
      </div>
    </div>

    <QiGuaResult v-if="yaos" :yaos="yaos" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Segmented from "../Segmented.vue";
import QiGuaResult from "./QiGuaResult.vue";
import {
  castByBaoShu,
  castByDateTime,
  mod6,
  mod8,
} from "../../config/meihua.ts";

const modeOptions = [
  { label: "时间", value: "time" },
  { label: "报数", value: "num" },
];

const mode = ref("time");
const dateVal = ref(Date.now());
const n1 = ref(1);
const n2 = ref(0);
const n3 = ref(0);
const yaos = ref(null);
const detail = ref(null);

function onMode(v) {
  mode.value = v;
  yaos.value = null;
  detail.value = null;
}

function useNow() {
  dateVal.value = Date.now();
}

function castTime() {
  const d = new Date(Number(dateVal.value) || Date.now());
  const r = castByDateTime(d);
  yaos.value = r.yaos;
  detail.value = r.detail;
}

function castNums() {
  const nums = [n1.value, n2.value, n3.value].filter((n) => n && n > 0);
  const r = castByBaoShu(nums);
  yaos.value = r?.yaos ?? null;
  detail.value = null;
}
</script>

<style scoped>
.meihua {
  margin-top: 0.75rem;
}

.meihua__motto {
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.meihua__panel {
  margin-top: 1rem;
}

.meihua__hint {
  margin: 0 0 0.75rem;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.meihua__row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.meihua__meta {
  margin: 0.75rem 0 0;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}
</style>

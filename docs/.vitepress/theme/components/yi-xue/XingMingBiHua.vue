<template>
  <div class="xingming">
    <p class="xingming__motto">姓笔画和为上卦，名笔画和为下卦，姓名总和为动爻。</p>
    <p class="xingming__hint">
      未收录的字请在下方补填笔画。体用需另断。
    </p>

    <div class="xingming__row">
      <el-input v-model="xing" placeholder="姓" style="width: 8rem" />
      <el-input v-model="ming" placeholder="名" style="width: 12rem" />
      <el-button type="primary" @click="cast">起卦</el-button>
    </div>

    <div v-if="missing.length" class="xingming__missing">
      <p>以下字无笔画，请填写：</p>
      <div v-for="ch in missing" :key="ch" class="xingming__fix">
        <span>{{ ch }}</span>
        <el-input-number
          v-model="overrides[ch]"
          :min="1"
          :max="64"
          :controls="false"
          size="small"
        />
      </div>
      <el-button size="small" type="primary" @click="cast">用补填再起</el-button>
    </div>

    <p v-if="meta" class="xingming__meta">
      姓 {{ meta.xingSum }} · 名 {{ meta.mingSum }} · 总 {{ meta.all }} ·
      上→{{ mod8(meta.xingSum) }} 下→{{ mod8(meta.mingSum) }} 动第{{ mod6(meta.all) }}爻
    </p>

    <QiGuaResult v-if="yaos" :yaos="yaos" />
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import QiGuaResult from "./QiGuaResult.vue";
import { castByNumbers, mod6, mod8 } from "../../config/meihua.ts";
import { sumStrokes } from "../../config/hanStroke.ts";

const xing = ref("");
const ming = ref("");
const overrides = reactive({});
const missing = ref([]);
const yaos = ref(null);
const meta = ref(null);

function cast() {
  const xs = sumStrokes(xing.value, overrides);
  const ms = sumStrokes(ming.value, overrides);
  const miss = [...new Set([...xs.missing, ...ms.missing])];
  missing.value = miss;
  if (miss.length) {
    yaos.value = null;
    meta.value = null;
    for (const ch of miss) {
      if (overrides[ch] == null) overrides[ch] = 1;
    }
    return;
  }
  if (xs.total <= 0 || ms.total <= 0) {
    yaos.value = null;
    meta.value = null;
    return;
  }
  const all = xs.total + ms.total;
  const r = castByNumbers(xs.total, ms.total, all);
  yaos.value = r?.yaos ?? null;
  meta.value = { xingSum: xs.total, mingSum: ms.total, all };
}
</script>

<style scoped>
.xingming {
  margin-top: 0.75rem;
}

.xingming__motto {
  margin: 0 0 0.35rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.xingming__hint {
  margin: 0 0 1rem;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
}

.xingming__row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.xingming__missing {
  margin-top: 1rem;
  padding: 0.75rem;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
  font-size: 0.88rem;
}

.xingming__fill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.35rem 0;
}

.xingming__meta {
  margin: 0.75rem 0 0;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}
</style>

<template>
  <div class="touzi">
    <p class="touzi__motto">三骰：A+B 上卦，A+B+C 下卦，三骰和为动爻。</p>
    <p class="touzi__hint">与梅花数理相同（卦以八除，爻以六除）。</p>

    <div class="touzi__dice">
      <div v-for="(d, i) in dice" :key="i" class="touzi__die" :class="{ spin }">
        {{ d }}
      </div>
    </div>

    <div class="touzi__actions">
      <el-button type="primary" :disabled="spin" @click="roll">掷骰起卦</el-button>
    </div>

    <p v-if="meta" class="touzi__meta">
      骰 {{ meta.a }}、{{ meta.b }}、{{ meta.c }} ·
      上 {{ meta.upper }} → {{ mod8(meta.upper) }} ·
      下 {{ meta.lower }} → {{ mod8(meta.lower) }} ·
      动第 {{ mod6(meta.dong) }} 爻
    </p>

    <QiGuaResult v-if="yaos" :yaos="yaos" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import QiGuaResult from "./QiGuaResult.vue";
import { castByNumbers, mod6, mod8 } from "../../config/meihua.ts";

const dice = ref([1, 1, 1]);
const yaos = ref(null);
const meta = ref(null);
const spin = ref(false);

function rollOne() {
  return 1 + Math.floor(Math.random() * 6);
}

function roll() {
  if (spin.value) return;
  spin.value = true;
  const t = setInterval(() => {
    dice.value = [rollOne(), rollOne(), rollOne()];
  }, 60);
  setTimeout(() => {
    clearInterval(t);
    const a = rollOne();
    const b = rollOne();
    const c = rollOne();
    dice.value = [a, b, c];
    const upper = a + b;
    const lower = a + b + c;
    const dong = a + b + c;
    const r = castByNumbers(upper, lower, dong);
    yaos.value = r?.yaos ?? null;
    meta.value = { a, b, c, upper, lower, dong };
    spin.value = false;
  }, 500);
}
</script>

<style scoped>
.touzi {
  margin-top: 0.75rem;
}

.touzi__motto {
  margin: 0 0 0.35rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.touzi__hint {
  margin: 0 0 1rem;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
}

.touzi__dice {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.touzi__die {
  width: 3rem;
  height: 3rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  font-weight: 700;
}

.touzi__die.spin {
  animation: die-shake 0.12s linear infinite;
}

@keyframes die-shake {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0);
  }
}

.touzi__meta {
  margin: 0.75rem 0 0;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}
</style>

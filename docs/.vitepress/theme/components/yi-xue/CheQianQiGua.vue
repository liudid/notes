<template>
  <div class="cheqian">
    <p class="cheqian__motto">六十四签应文王卦序；可再抽动爻签（1–6），或跳过。</p>

    <div class="cheqian__tube" :class="{ shake }">
      <span>签筒</span>
    </div>

    <div class="cheqian__actions">
      <el-button type="primary" :disabled="shake" @click="drawGua">
        {{ hex ? "重抽本卦签" : "抽本卦签" }}
      </el-button>
      <el-button :disabled="!hex || shake" @click="drawDong">抽动爻签</el-button>
      <el-button :disabled="!hex" text @click="skipDong">无动爻</el-button>
    </div>

    <p v-if="hex" class="cheqian__meta">
      第 {{ hex.num }} 签 · {{ hex.name }}（{{ hex.full }}）
      <template v-if="dongWei != null"> · 动第 {{ dongWei }} 爻</template>
      <template v-else-if="yaos"> · 静卦无动</template>
    </p>

    <QiGuaResult v-if="yaos" :yaos="yaos" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import QiGuaResult from "./QiGuaResult.vue";
import { byNum } from "../../config/liuShiSiGua.ts";
import { yaosFromDong } from "../../config/meihua.ts";

const hex = ref(null);
const dongWei = ref(null);
const yaos = ref(null);
const shake = ref(false);

function buildYaos() {
  if (!hex.value) return;
  yaos.value = yaosFromDong(hex.value, dongWei.value);
}

function drawGua() {
  if (shake.value) return;
  shake.value = true;
  setTimeout(() => {
    const n = 1 + Math.floor(Math.random() * 64);
    hex.value = byNum[n];
    dongWei.value = null;
    yaos.value = null;
    shake.value = false;
  }, 450);
}

function drawDong() {
  if (!hex.value || shake.value) return;
  shake.value = true;
  setTimeout(() => {
    dongWei.value = 1 + Math.floor(Math.random() * 6);
    buildYaos();
    shake.value = false;
  }, 350);
}

function skipDong() {
  if (!hex.value) return;
  dongWei.value = null;
  buildYaos();
}
</script>

<style scoped>
.cheqian {
  margin-top: 0.75rem;
}

.cheqian__motto {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.cheqian__tube {
  width: 4.5rem;
  height: 6rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem 0.5rem 0.35rem 0.35rem;
  border: 1px solid var(--vp-c-divider);
  background: color-mix(in srgb, #a16207 22%, var(--vp-c-bg-soft));
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 0.5rem;
  font-size: 0.82rem;
  font-weight: 600;
}

.cheqian__tube.shake {
  animation: tube 0.12s linear infinite;
}

@keyframes tube {
  0% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(4deg);
  }
  100% {
    transform: rotate(-4deg);
  }
}

.cheqian__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cheqian__meta {
  margin: 0.75rem 0 0;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
}
</style>

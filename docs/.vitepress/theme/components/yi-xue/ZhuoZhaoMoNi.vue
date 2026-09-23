<template>
  <div class="zhuo-zhao">
    <div class="zhuo-zhao__top">
      <p class="zhuo-zhao__motto">命龟 → 灼兆 → 得兆 → 观兆（占）</p>
      <el-button size="small" text type="danger" @click="resetAll">
        重新灼兆
      </el-button>
    </div>

    <p class="zhuo-zhao__progress">{{ progressLabel }}</p>
    <p class="zhuo-zhao__hint">{{ hint }}</p>

    <!-- 命龟 -->
    <div v-if="step === 'ming'" class="zhuo-zhao__panel">
      <el-input
        v-model="question"
        type="textarea"
        :rows="2"
        placeholder="所问之事（可空）——向龟陈述所欲卜问"
        maxlength="120"
        show-word-limit
      />
      <el-button type="primary" @click="doMingGui">命龟</el-button>
    </div>

    <!-- 钻凿 -->
    <div v-else-if="step === 'zuan'" class="zhuo-zhao__panel">
      <div class="zhuo-zhao__board zhuo-zhao__board--back">
        <svg viewBox="0 0 200 240" class="zhuo-zhao__svg" aria-hidden="true">
          <ellipse
            cx="100"
            cy="120"
            rx="70"
            ry="95"
            fill="color-mix(in srgb, #a16207 18%, var(--vp-c-bg-soft))"
            stroke="var(--vp-c-divider)"
            stroke-width="2"
          />
          <line
            x1="100"
            y1="35"
            x2="100"
            y2="205"
            stroke="var(--vp-c-text-3)"
            stroke-width="1"
            stroke-dasharray="4 3"
          />
          <!-- 凿（长槽）+ 钻（圆窝）示意 -->
          <ellipse
            cx="78"
            cy="100"
            rx="6"
            ry="14"
            fill="color-mix(in srgb, #444 35%, transparent)"
          />
          <circle cx="92" cy="100" r="7" fill="color-mix(in srgb, #222 40%, transparent)" />
          <text x="100" y="230" text-anchor="middle" class="zhuo-zhao__svg-label">
            背面 · 凿＋钻（示意）
          </text>
        </svg>
      </div>
      <el-button type="primary" @click="step = 'zhuo'">钻凿已备，去施灼</el-button>
    </div>

    <!-- 灼兆 -->
    <div v-else-if="step === 'zhuo'" class="zhuo-zhao__panel">
      <div class="zhuo-zhao__board" :class="{ 'is-burning': burning }">
        <svg viewBox="0 0 200 240" class="zhuo-zhao__svg" aria-hidden="true">
          <ellipse
            cx="100"
            cy="120"
            rx="70"
            ry="95"
            fill="color-mix(in srgb, #d6b07c 35%, var(--vp-c-bg))"
            stroke="var(--vp-c-divider)"
            stroke-width="2"
          />
          <circle
            v-if="burning"
            cx="100"
            cy="118"
            r="14"
            class="zhuo-zhao__hot"
          />
          <text x="100" y="230" text-anchor="middle" class="zhuo-zhao__svg-label">
            正面 · 待兆
          </text>
        </svg>
      </div>
      <el-button type="primary" :loading="burning" @click="doZhuo">
        施灼
      </el-button>
    </div>

    <!-- 得兆 / 不成兆 -->
    <div v-else-if="step === 'de' || step === 'fail'" class="zhuo-zhao__panel">
      <div class="zhuo-zhao__board">
        <svg viewBox="0 0 200 240" class="zhuo-zhao__svg" aria-hidden="true">
          <ellipse
            cx="100"
            cy="120"
            rx="70"
            ry="95"
            :fill="
              step === 'fail'
                ? 'color-mix(in srgb, #444 45%, var(--vp-c-bg-soft))'
                : 'color-mix(in srgb, #d6b07c 35%, var(--vp-c-bg))'
            "
            stroke="var(--vp-c-divider)"
            stroke-width="2"
          />
          <!-- 焦斑 -->
          <template v-if="step === 'fail'">
            <ellipse
              cx="100"
              cy="118"
              rx="22"
              ry="16"
              fill="color-mix(in srgb, #1c1917 70%, transparent)"
            />
            <text x="100" y="175" text-anchor="middle" class="zhuo-zhao__svg-label">
              灼焦 · 不成兆
            </text>
          </template>
          <!-- 卜形裂纹 -->
          <template v-else-if="crack">
            <line
              :x1="crack.stem.x1"
              :y1="crack.stem.y1"
              :x2="crack.stem.x2"
              :y2="crack.stem.y2"
              stroke="var(--vp-c-text-1)"
              stroke-width="2.2"
              stroke-linecap="round"
            />
            <line
              :x1="crack.branch.x1"
              :y1="crack.branch.y1"
              :x2="crack.branch.x2"
              :y2="crack.branch.y2"
              stroke="var(--vp-c-text-1)"
              stroke-width="2"
              stroke-linecap="round"
            />
            <text
              :x="crack.stem.x2 + 8"
              :y="(crack.stem.y1 + crack.stem.y2) / 2"
              class="zhuo-zhao__anno"
            >
              兆干
            </text>
            <text
              :x="crack.branch.x2 + 4"
              :y="crack.branch.y2 - 4"
              class="zhuo-zhao__anno"
            >
              兆枝
            </text>
          </template>
          <text x="100" y="230" text-anchor="middle" class="zhuo-zhao__svg-label">
            {{ step === 'fail' ? '请重灼' : '正面 · 卜兆' }}
          </text>
        </svg>
      </div>

      <div class="zhuo-zhao__actions">
        <el-button v-if="step === 'fail'" type="primary" @click="retryZhuo">
          重新施灼
        </el-button>
        <el-button v-else type="primary" @click="step = 'guan'">
          观兆
        </el-button>
      </div>
    </div>

    <!-- 观兆 -->
    <div v-else class="zhuo-zhao__panel">
      <div class="zhuo-zhao__board">
        <svg viewBox="0 0 200 240" class="zhuo-zhao__svg" aria-hidden="true">
          <ellipse
            cx="100"
            cy="120"
            rx="70"
            ry="95"
            fill="color-mix(in srgb, #d6b07c 35%, var(--vp-c-bg))"
            stroke="var(--vp-c-divider)"
            stroke-width="2"
          />
          <template v-if="crack">
            <line
              :x1="crack.stem.x1"
              :y1="crack.stem.y1"
              :x2="crack.stem.x2"
              :y2="crack.stem.y2"
              stroke="var(--vp-c-text-1)"
              stroke-width="2.2"
              stroke-linecap="round"
            />
            <line
              :x1="crack.branch.x1"
              :y1="crack.branch.y1"
              :x2="crack.branch.x2"
              :y2="crack.branch.y2"
              stroke="var(--vp-c-text-1)"
              stroke-width="2"
              stroke-linecap="round"
            />
          </template>
        </svg>
      </div>

      <div class="zhuo-zhao__note">
        <p v-if="question">所问：{{ question }}</p>
        <p>
          纵纹为<strong>兆干</strong>，横纹为<strong>兆枝</strong>。殷人据其形态占断吉凶；具体规则已不可考，本页只演示流程与结构。
        </p>
        <p class="zhuo-zhao__quote">
          「灼龟观兆，变化无穷。」——《史记·龟策列传》
        </p>
        <p class="zhuo-zhao__foot">
          《周礼》有玉兆、瓦兆、原兆及方／功／义／弓等名目，仅作历史名词，此处不做成断法表。
        </p>
      </div>

      <el-button type="primary" @click="resetAll">再灼一兆</el-button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

/** ming | zuan | zhuo | de | fail | guan */
const step = ref("ming");
const question = ref("");
const burning = ref(false);
const crack = ref(null);

const progressLabel = computed(() => {
  const map = {
    ming: "① 命龟",
    zuan: "② 钻凿",
    zhuo: "③ 灼兆",
    de: "④ 得兆",
    fail: "④ 不成兆",
    guan: "⑤ 观兆（占）",
  };
  return map[step.value] ?? "";
});

const hint = computed(() => {
  const map = {
    ming: "向龟陈述所欲卜问之事（命龟）。可留空，直接进入仪式流程。",
    zuan: "甲骨背面先钻凿使薄，便于受热成纹。图为简化示意。",
    zhuo: "以火施灼钻凿处。正面将现「卜」形裂纹——即兆。",
    de: "已得兆。纵为兆干，横为兆枝。可进入观兆。",
    fail: "灼焦过甚，纹不可辨，谓之不成兆。可重新施灼。",
    guan: "观兆即占：看裂纹形态以断所问。殷商细则已失传，此处止于教学。",
  };
  return map[step.value] ?? "";
});

function resetAll() {
  step.value = "ming";
  question.value = "";
  burning.value = false;
  crack.value = null;
}

function doMingGui() {
  step.value = "zuan";
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

/** 生成卜形：纵干 + 向一侧伸出的横枝 */
function makeCrack() {
  const cx = 100;
  const cy = 118;
  const stemLen = rand(36, 52);
  const tilt = rand(-8, 8) * (Math.PI / 180);
  const x1 = cx + Math.sin(tilt) * (stemLen * 0.15);
  const y1 = cy - stemLen / 2;
  const x2 = cx - Math.sin(tilt) * (stemLen * 0.15);
  const y2 = cy + stemLen / 2;
  const midY = cy + rand(-6, 8);
  const side = Math.random() < 0.5 ? -1 : 1;
  const branchLen = rand(22, 38);
  return {
    stem: { x1, y1, x2, y2 },
    branch: {
      x1: cx,
      y1: midY,
      x2: cx + side * branchLen,
      y2: midY + rand(-6, 6),
    },
  };
}

function doZhuo() {
  if (burning.value) return;
  burning.value = true;
  setTimeout(() => {
    burning.value = false;
    // ~8% 不成兆
    if (Math.random() < 0.08) {
      crack.value = null;
      step.value = "fail";
      return;
    }
    crack.value = makeCrack();
    step.value = "de";
  }, 900);
}

function retryZhuo() {
  crack.value = null;
  step.value = "zhuo";
}
</script>

<style scoped>
.zhuo-zhao {
  margin-top: 0.75rem;
}

.zhuo-zhao__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.zhuo-zhao__motto {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.zhuo-zhao__progress {
  margin: 0 0 0.35rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.zhuo-zhao__hint {
  margin: 0 0 1rem;
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.zhuo-zhao__panel {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.85rem;
}

.zhuo-zhao__board {
  width: min(100%, 16rem);
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.zhuo-zhao__board.is-burning {
  box-shadow: 0 0 0 2px color-mix(in srgb, #f59e0b 45%, transparent);
}

.zhuo-zhao__svg {
  width: 100%;
  height: auto;
  display: block;
}

.zhuo-zhao__svg-label {
  font-size: 10px;
  fill: var(--vp-c-text-2);
}

.zhuo-zhao__anno {
  font-size: 9px;
  fill: var(--vp-c-text-2);
}

.zhuo-zhao__hot {
  fill: color-mix(in srgb, #ef4444 55%, #fbbf24);
  animation: pulse-hot 0.45s ease-in-out infinite alternate;
}

@keyframes pulse-hot {
  from {
    opacity: 0.55;
    r: 12;
  }
  to {
    opacity: 1;
    r: 16;
  }
}

.zhuo-zhao__actions {
  display: flex;
  gap: 0.5rem;
}

.zhuo-zhao__note {
  max-width: 36rem;
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.zhuo-zhao__note p {
  margin: 0 0 0.55rem;
}

.zhuo-zhao__quote {
  color: var(--vp-c-text-1);
  font-style: italic;
}

.zhuo-zhao__foot {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}
</style>

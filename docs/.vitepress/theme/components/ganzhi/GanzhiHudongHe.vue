<template>
  <div class="combinations-container">
    <div class="combinations-header">
      <h2>天干地支合局</h2>
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>

    <div class="combinations-content">
      <!-- 天干五合 -->
      <div v-show="activeTab === 'heavenly'" class="combination-section">
        <h3>天干五合</h3>
        <div class="combinations-grid">
          <div
            v-for="combination in heavenlyCombinations"
            :key="combination.name"
            class="combination-card heavenly"
          >
            <div class="combination-pair">
              <div class="stem-item" :style="getStemStyle(combination.stem1)">
                <span class="stem-name">{{ combination.stem1.name }}</span>
                <div class="stem-details">
                  <span
                    class="element"
                    :style="{
                      color: getElementColor(combination.stem1.element),
                    }"
                  >
                    {{ getElementSymbol(combination.stem1.element) }}
                  </span>
                  <span class="polarity" :class="combination.stem1.polarity">
                    {{ combination.stem1.polarity === "yang" ? "⚌" : "⚍" }}
                  </span>
                </div>
              </div>

              <div class="connector">
                <span class="connector-symbol">合</span>
              </div>

              <div class="stem-item" :style="getStemStyle(combination.stem2)">
                <span class="stem-name">{{ combination.stem2.name }}</span>
                <div class="stem-details">
                  <span
                    class="element"
                    :style="{
                      color: getElementColor(combination.stem2.element),
                    }"
                  >
                    {{ getElementSymbol(combination.stem2.element) }}
                  </span>
                  <span class="polarity" :class="combination.stem2.polarity">
                    {{ combination.stem2.polarity === "yang" ? "⚌" : "⚍" }}
                  </span>
                </div>
              </div>
            </div>

            <div class="combination-result">
              <div
                class="result-badge"
                :style="{
                  backgroundColor: getElementColor(combination.result),
                }"
              >
                化{{ combination.result }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 地支三合 -->
      <div v-show="activeTab === 'earthly3'" class="combination-section">
        <h3>地支三合局</h3>
        <div class="combinations-grid">
          <div
            v-for="combination in earthlyTriCombinations"
            :key="combination.name"
            class="combination-card earthly"
          >
            <div class="combination-title">
              {{ combination.name }} ({{ combination.type }})
            </div>
            <div class="earthly-tri-pair">
              <div
                v-for="branch in combination.branches"
                :key="branch.name"
                class="branch-item"
                :style="{
                  backgroundColor: getElementColor(combination.element),
                }"
              >
                <span class="branch-name">{{ branch.name }}</span>
                <div class="branch-animal">{{ branch.animal }}</div>
              </div>
              <div class="earthly-connector">合</div>
            </div>

            <div class="combination-result">
              <div
                class="result-badge"
                :style="{
                  backgroundColor: getElementColor(combination.element),
                }"
              >
                {{ combination.element }}局
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 地支六合 -->
      <div v-show="activeTab === 'earthly6'" class="combination-section">
        <h3>地支六合</h3>
        <div class="combinations-grid">
          <div
            v-for="combination in earthlySixCombinations"
            :key="combination.name"
            class="combination-card earthly"
          >
            <div class="combination-pair">
              <div
                class="branch-item"
                :style="{
                  backgroundColor: getElementColor(combination.branch1.element),
                }"
              >
                <span class="branch-name">{{ combination.branch1.name }}</span>
                <div class="branch-animal">
                  {{ combination.branch1.animal }}
                </div>
              </div>

              <div class="connector">
                <span class="connector-symbol">合</span>
              </div>

              <div
                class="branch-item"
                :style="{
                  backgroundColor: getElementColor(combination.branch2.element),
                }"
              >
                <span class="branch-name">{{ combination.branch2.name }}</span>
                <div class="branch-animal">
                  {{ combination.branch2.animal }}
                </div>
              </div>
            </div>

            <div class="combination-result">
              <div
                class="result-badge"
                :style="{
                  backgroundColor: getElementColor(combination.result),
                }"
              >
                化{{ combination.result }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 暗合 -->
      <div v-show="activeTab === 'hidden'" class="combination-section">
        <h3>暗合</h3>
        <div class="combinations-grid">
          <div
            v-for="combination in hiddenCombinations"
            :key="combination.name"
            class="combination-card hidden"
          >
            <div class="combination-pair">
              <div class="stem-item" :style="getStemStyle(combination.stem)">
                <span class="stem-name">{{ combination.stem.name }}</span>
                <div class="stem-details">
                  <span
                    class="element"
                    :style="{
                      color: getElementColor(combination.stem.element),
                    }"
                  >
                    {{ getElementSymbol(combination.stem.element) }}
                  </span>
                  <span class="polarity" :class="combination.stem.polarity">
                    {{ combination.stem.polarity === "yang" ? "⚌" : "⚍" }}
                  </span>
                </div>
              </div>

              <div class="connector hidden">
                <span class="connector-symbol">暗合</span>
              </div>

              <div
                class="branch-item"
                :style="{
                  backgroundColor: getElementColor(combination.branch.element),
                }"
              >
                <span class="branch-name">{{ combination.branch.name }}</span>
                <div class="branch-animal">{{ combination.branch.animal }}</div>
              </div>
            </div>

            <div class="combination-note">
              {{ combination.note }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="legend">
      <div
        class="legend-item"
        v-for="element in elementList"
        :key="element.key"
      >
        <div
          class="legend-color"
          :style="{ backgroundColor: element.color }"
        ></div>
        <span>{{ element.name }}</span>
      </div>
      <div class="legend-item">
        <span class="polarity yang">⚌</span>
        <span>阳</span>
      </div>
      <div class="legend-item">
        <span class="polarity yin">⚍</span>
        <span>阴</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 五行配置
const elementConfig = {
  wood: { name: "木", color: "#10b981", symbol: "🌲" },
  fire: { name: "火", color: "#ef4444", symbol: "🔥" },
  earth: { name: "土", color: "#f59e0b", symbol: "⛰️" },
  metal: { name: "金", color: "#6b7280", symbol: "⚔️" },
  water: { name: "水", color: "#3b82f6", symbol: "💧" },
};

// 辅助函数
const getElementColor = (element) => elementConfig[element]?.color || "#9ca3af";
const getElementSymbol = (element) => elementConfig[element]?.symbol || "?";

// 天干数据
const heavenlyStems = [
  { name: "甲", element: "wood", polarity: "yang" },
  { name: "乙", element: "wood", polarity: "yin" },
  { name: "丙", element: "fire", polarity: "yang" },
  { name: "丁", element: "fire", polarity: "yin" },
  { name: "戊", element: "earth", polarity: "yang" },
  { name: "己", element: "earth", polarity: "yin" },
  { name: "庚", element: "metal", polarity: "yang" },
  { name: "辛", element: "metal", polarity: "yin" },
  { name: "壬", element: "water", polarity: "yang" },
  { name: "癸", element: "water", polarity: "yin" },
];

// 地支数据
const earthlyBranches = [
  { name: "子", element: "water", animal: "鼠" },
  { name: "丑", element: "earth", animal: "牛" },
  { name: "寅", element: "wood", animal: "虎" },
  { name: "卯", element: "wood", animal: "兔" },
  { name: "辰", element: "earth", animal: "龙" },
  { name: "巳", element: "fire", animal: "蛇" },
  { name: "午", element: "fire", animal: "马" },
  { name: "未", element: "earth", animal: "羊" },
  { name: "申", element: "metal", animal: "猴" },
  { name: "酉", element: "metal", animal: "鸡" },
  { name: "戌", element: "earth", animal: "狗" },
  { name: "亥", element: "water", animal: "猪" },
];

// 天干五合
const heavenlyCombinations = computed(() => [
  {
    name: "甲己合",
    stem1: heavenlyStems[0],
    stem2: heavenlyStems[5],
    result: "土",
  },
  {
    name: "乙庚合",
    stem1: heavenlyStems[1],
    stem2: heavenlyStems[6],
    result: "金",
  },
  {
    name: "丙辛合",
    stem1: heavenlyStems[2],
    stem2: heavenlyStems[7],
    result: "水",
  },
  {
    name: "丁壬合",
    stem1: heavenlyStems[3],
    stem2: heavenlyStems[8],
    result: "木",
  },
  {
    name: "戊癸合",
    stem1: heavenlyStems[4],
    stem2: heavenlyStems[9],
    result: "火",
  },
]);

// 地支三合局（包含拱合、半合）
const earthlyTriCombinations = computed(() => [
  {
    name: "申子辰",
    branches: [earthlyBranches[8], earthlyBranches[0], earthlyBranches[4]],
    element: "water",
    type: "全合",
  },
  {
    name: "寅午戌",
    branches: [earthlyBranches[2], earthlyBranches[6], earthlyBranches[10]],
    element: "fire",
    type: "全合",
  },
  {
    name: "巳酉丑",
    branches: [earthlyBranches[5], earthlyBranches[9], earthlyBranches[1]],
    element: "metal",
    type: "全合",
  },
  {
    name: "亥卯未",
    branches: [earthlyBranches[11], earthlyBranches[3], earthlyBranches[7]],
    element: "wood",
    type: "全合",
  },
  {
    name: "申子",
    branches: [earthlyBranches[8], earthlyBranches[0]],
    element: "water",
    type: "半合",
  },
  {
    name: "子辰",
    branches: [earthlyBranches[0], earthlyBranches[4]],
    element: "water",
    type: "半合",
  },
  {
    name: "寅午",
    branches: [earthlyBranches[2], earthlyBranches[6]],
    element: "fire",
    type: "半合",
  },
]);

// 地支六合
const earthlySixCombinations = computed(() => [
  {
    name: "子丑合",
    branch1: earthlyBranches[0],
    branch2: earthlyBranches[1],
    result: "土",
  },
  {
    name: "寅亥合",
    branch1: earthlyBranches[2],
    branch2: earthlyBranches[11],
    result: "木",
  },
  {
    name: "卯戌合",
    branch1: earthlyBranches[3],
    branch2: earthlyBranches[10],
    result: "火",
  },
  {
    name: "辰酉合",
    branch1: earthlyBranches[4],
    branch2: earthlyBranches[9],
    result: "金",
  },
  {
    name: "巳申合",
    branch1: earthlyBranches[5],
    branch2: earthlyBranches[8],
    result: "水",
  },
  {
    name: "午未合",
    branch1: earthlyBranches[6],
    branch2: earthlyBranches[7],
    result: "土",
  },
]);

// 暗合
const hiddenCombinations = computed(() => [
  {
    name: "戊子暗合",
    stem: heavenlyStems[4], // 戊
    branch: earthlyBranches[0], // 子
    note: "戊癸化火，子中癸水",
  },
  {
    name: "己亥暗合",
    stem: heavenlyStems[5], // 己
    branch: earthlyBranches[11], // 亥
    note: "甲己化土，亥中甲木",
  },
  {
    name: "辛巳暗合",
    stem: heavenlyStems[7], // 辛
    branch: earthlyBranches[5], // 巳
    note: "丙辛化水，巳中丙火",
  },
  {
    name: "壬午暗合",
    stem: heavenlyStems[8], // 壬
    branch: earthlyBranches[6], // 午
    note: "丁壬化木，午中丁火",
  },
  {
    name: "丁亥暗合",
    stem: heavenlyStems[3], // 丁
    branch: earthlyBranches[11], // 亥
    note: "丁壬化木，亥中壬水",
  },
]);

// 天干样式
const getStemStyle = (stem) => {
  return {
    backgroundColor: stem.polarity === "yang" ? "#fef3c7" : "#f5f3ff",
    borderColor: getElementColor(stem.element),
    color: stem.polarity === "yang" ? "#92400e" : "#5b21b6",
  };
};

// 选项卡
const tabs = [
  { id: "heavenly", name: "天干五合" },
  { id: "earthly3", name: "地支三合" },
  { id: "earthly6", name: "地支六合" },
  { id: "hidden", name: "暗合" },
];

const activeTab = ref("heavenly");

// 五行图例
const elementList = computed(() =>
  Object.keys(elementConfig).map((key) => ({
    key,
    name: elementConfig[key].name,
    color: elementConfig[key].color,
  }))
);
</script>

<style scoped>
.combinations-container {
  font-family: "Microsoft YaHei", "Segoe UI", -apple-system, BlinkMacSystemFont,
    sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
}

.combinations-header {
  text-align: center;
  margin-bottom: 24px;
}

.combinations-header h2 {
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #cbd5e1;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.tabs button {
  padding: 8px 16px;
  border: none;
  background: #e2e8f0;
  color: #64748b;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tabs button:hover {
  background: #cbd5e1;
  transform: translateY(-1px);
}

.tabs button.active {
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.combination-section {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.combination-section h3 {
  color: #334155;
  font-size: 1.25rem;
  margin-bottom: 20px;
  padding-left: 8px;
  border-left: 4px solid #3b82f6;
}

.combinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.combination-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.combination-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.combination-card.heavenly {
  border-top: 4px solid #8b5cf6;
}

.combination-card.earthly {
  border-top: 4px solid #10b981;
}

.combination-card.hidden {
  border-top: 4px solid #f59e0b;
}

.combination-title {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 12px;
  text-align: center;
  font-weight: 500;
}

.combination-pair {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
}

.stem-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  border-radius: 10px;
  border: 2px solid;
  min-width: 70px;
}

.stem-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 4px;
}

.stem-details {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
}

.element {
  font-size: 0.875rem;
}

.polarity {
  font-size: 1rem;
}

.polarity.yang {
  color: #dc2626;
}

.polarity.yin {
  color: #2563eb;
}

.branch-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  border-radius: 10px;
  color: white;
  min-width: 70px;
}

.branch-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 4px;
}

.branch-animal {
  font-size: 0.75rem;
  opacity: 0.9;
}

.connector {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
}

.connector.hidden {
  width: 60px;
}

.connector-symbol {
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(139, 92, 246, 0.3);
}

.connector.hidden .connector-symbol {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  width: 50px;
  border-radius: 20px;
}

.earthly-tri-pair {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
  position: relative;
}

.earthly-connector {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 600;
  color: #10b981;
  border: 2px solid #10b981;
  font-size: 0.875rem;
}

.combination-result {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

.result-badge {
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.combination-note {
  margin-top: 12px;
  padding: 8px;
  background: #f8fafc;
  border-radius: 8px;
  font-size: 0.75rem;
  color: #64748b;
  text-align: center;
  border: 1px dashed #cbd5e1;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
  margin-top: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: #475569;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

@media (max-width: 640px) {
  .combinations-container {
    padding: 16px;
  }

  .combinations-grid {
    grid-template-columns: 1fr;
  }

  .tabs {
    gap: 4px;
  }

  .tabs button {
    padding: 6px 12px;
    font-size: 0.75rem;
  }
}
</style>

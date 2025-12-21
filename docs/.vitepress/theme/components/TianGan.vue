<template>
  <IntroTitle
    text="天：主统摄。天干，是对五行（五种炁）在天位运转（一开一合）的命名。"
  ></IntroTitle>
  <div class="five-elements-container">
    <!-- 十天干面板 -->
    <div class="stems-panel">
      <div class="stems-list">
        <button
          v-for="stem in allStems"
          :key="stem.id"
          class="stem-btn"
          :class="{ active: activeStem === stem.id }"
          @click="setActiveStem(stem.id)"
          :style="{
            'background-color': stem.color,
            color: stem.textColor,
          }"
        >
          <div class="stem-char">{{ stem.character }}</div>
          <div class="stem-info">
            <div class="stem-yinyang">
              {{ stem.yinyang }}（{{ stem.yinyang === "阳" ? "开" : "合" }}）
            </div>
            <div class="stem-element">{{ stem.element }}</div>
          </div>
        </button>
      </div>
    </div>

    <div class="gear-wrapper">
      <!-- 五行交叉齿轮 -->
      <div
        class="cross-gear"
        :class="{ rotating: isRotating }"
        :style="{ '--direction': rotationDirection > 0 ? 'normal' : 'reverse' }"
      >
        <!-- 五条交叉线 -->
        <div
          v-for="(element, index) in elements"
          :key="element.id"
          class="cross-line"
          :style="getLineStyle(element, index)"
        >
          <!-- 线本体 -->
          <div class="line-body">
            <div class="line-glow"></div>
            <div class="line-flow"></div>
          </div>

          <!-- 起点天干 (阳) -->
          <div class="stem stem-start">
            <div
              class="stem-character"
              :style="getStemCharacterStyle(element, element.yangStem)"
            >
              {{ element.yangStem }}
            </div>
            <div
              class="stem-label yang-label"
              :style="getStemLabelStyle(element.yangStem)"
            >
              阳
            </div>
            <div
              class="stem-nature"
              :style="getStemNatureStyle(element, element.yangStem)"
            >
              {{ element.yangNature }}
            </div>
          </div>

          <!-- 终点天干 (阴) -->
          <div class="stem stem-end">
            <div
              class="stem-character"
              :style="getStemCharacterStyle(element, element.yinStem)"
            >
              {{ element.yinStem }}
            </div>
            <div
              class="stem-label yin-label"
              :style="getStemLabelStyle(element.yinStem)"
            >
              阴
            </div>
            <div
              class="stem-nature"
              :style="getStemNatureStyle(element, element.yinStem)"
            >
              {{ element.yinNature }}
            </div>
          </div>
        </div>

        <!-- 中心点 -->
        <div class="gear-center">
          <div class="center-circle">
            <div class="center-yin-yang">
              <div class="yin-dot"></div>
              <div class="yang-dot"></div>
            </div>
          </div>
          <div class="center-label">五行</div>
        </div>
      </div>
    </div>

    <!-- 控制面板 -->
    <div class="control-panel">
      <div class="control-buttons">
        <button
          @click="toggleRotation"
          class="control-btn btn-rotate"
          :class="{ active: isRotating }"
        >
          <span class="btn-icon">{{ isRotating ? "⏸️" : "▶️" }}</span>
          <span class="btn-text">{{
            isRotating ? "暂停转动" : "开始转动"
          }}</span>
        </button>

        <button @click="reverseRotation" class="control-btn btn-reverse">
          <span class="btn-icon">↻</span>
          <span class="btn-text">反转方向</span>
        </button>

        <div class="speed-control">
          <label for="speed">转速:</label>
          <input
            type="range"
            id="speed"
            min="1"
            max="10"
            v-model="rotationSpeed"
            class="speed-slider"
          />
          <span class="speed-value">{{ rotationSpeed }}x</span>
        </div>
      </div>

      <!-- 天干详细信息 -->
      <div class="stem-detail" v-if="activeStem">
        <div class="detail-title">
          <span
            class="detail-char"
            :style="{
              'background-color': getStemByChar(activeStem)?.color,
              color: getStemByChar(activeStem)?.textColor,
            }"
          >
            {{ getStemByChar(activeStem)?.character }}
          </span>
          <span class="detail-name">{{
            getStemByChar(activeStem)?.fullName
          }}</span>
        </div>
        <div class="detail-content">
          <div class="detail-item">
            <span class="detail-label">五行:</span>
            <span class="detail-value">{{
              getStemByChar(activeStem)?.element
            }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">阴阳:</span>
            <span class="detail-value">{{
              getStemByChar(activeStem)?.yinyang
            }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">方位:</span>
            <span class="detail-value">{{
              getStemByChar(activeStem)?.direction
            }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">季节:</span>
            <span class="detail-value">{{
              getStemByChar(activeStem)?.season
            }}</span>
          </div>
          <div class="detail-item full-width">
            <span class="detail-label">特性:</span>
            <span class="detail-value">{{
              getStemByChar(activeStem)?.description
            }}</span>
          </div>
        </div>
      </div>

      <div class="legend">
        <div class="legend-title">天干对应五行</div>
        <div class="legend-items">
          <div
            v-for="element in elements"
            :key="element.id"
            class="legend-item"
            :style="getLegendItemStyle(element)"
          >
            <div
              class="legend-color"
              :style="{ 'background-color': element.color }"
            ></div>
            <div class="legend-text">
              <span class="stem-pair"
                >{{ element.yangStem }}{{ element.yinStem }}</span
              >
              <span class="element-name"> - {{ element.name }}行</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="intro">
      <div>天干 = 五行之气的呼吸口</div>
      <div>
        五行：是"气的性质" 天干：是"气的动作方式",所以天干不是元素，而是动词
      </div>
      <div>
        五行之气，一行必有"出"与"入" 出 → 阳 入 → 阴 5 × 2 = 10 于是出现
        十个"干"作为气的节律节点。
      </div>
      <div>
        <p>
          「干」在上古并不是现在理解的"木头那根干"。在《说文》体系中，它的核心义有三层：
        </p>
        <p>干 = 主也、当也 → 承当、主持、担当</p>
        <p>干 = 竖直、贯通之物 → 上下相接，能把不同层级连在一起</p>
        <p>
          干 = 骨架、纲纪 → 没有干，枝叶无所附
          所以「干」不是"一个东西"，而是让万象能展开的中轴。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";

// 组件状态
const isRotating = ref(true);
const rotationDirection = ref(1); // 1表示顺时针，-1表示逆时针
const rotationSpeed = ref(3);
const activeStem = ref(); // 默认选中甲

// 十天干数据
const allStems = reactive([
  {
    id: "甲",
    character: "甲",
    fullName: "甲木",
    element: "木",
    yinyang: "阳",
    color: "#4CAF50",
    textColor: "#FFFFFF",
    direction: "东",
    season: "春",
    description: "阳木，象征树木生长，有生发、向上之力",
  },
  {
    id: "乙",
    character: "乙",
    fullName: "乙木",
    element: "木",
    yinyang: "阴",
    color: "#4CAF50",
    textColor: "#FFFFFF",
    direction: "东",
    season: "春",
    description: "阴木，象征花草藤蔓，有柔韧、屈曲之性",
  },
  {
    id: "丙",
    character: "丙",
    fullName: "丙火",
    element: "火",
    yinyang: "阳",
    color: "#FF5722",
    textColor: "#FFFFFF",
    direction: "南",
    season: "夏",
    description: "阳火，象征太阳烈火，有光明、热烈之性",
  },
  {
    id: "丁",
    character: "丁",
    fullName: "丁火",
    element: "火",
    yinyang: "阴",
    color: "#FF5722",
    textColor: "#FFFFFF",
    direction: "南",
    season: "夏",
    description: "阴火，象征灯烛炉火，有温暖、文明之性",
  },
  {
    id: "戊",
    character: "戊",
    fullName: "戊土",
    element: "土",
    yinyang: "阳",
    color: "#FFC107",
    textColor: "#333333",
    direction: "中",
    season: "长夏",
    description: "阳土，象征山岳高原，有厚重、承载之性",
  },
  {
    id: "己",
    character: "己",
    fullName: "己土",
    element: "土",
    yinyang: "阴",
    color: "#FFC107",
    textColor: "#333333",
    direction: "中",
    season: "长夏",
    description: "阴土，象征田园耕地，有滋养、化育之性",
  },
  {
    id: "庚",
    character: "庚",
    fullName: "庚金",
    element: "金",
    yinyang: "阳",
    color: "#607D8B",
    textColor: "#FFFFFF",
    direction: "西",
    season: "秋",
    description: "阳金，象征刀剑矿石，有刚健、肃杀之性",
  },
  {
    id: "辛",
    character: "辛",
    fullName: "辛金",
    element: "金",
    yinyang: "阴",
    color: "#607D8B",
    textColor: "#FFFFFF",
    direction: "西",
    season: "秋",
    description: "阴金，象征珠玉金银，有精致、贵重之性",
  },
  {
    id: "壬",
    character: "壬",
    fullName: "壬水",
    element: "水",
    yinyang: "阳",
    color: "#2196F3",
    textColor: "#FFFFFF",
    direction: "北",
    season: "冬",
    description: "阳水，象征江河湖海，有奔腾、浩荡之性",
  },
  {
    id: "癸",
    character: "癸",
    fullName: "癸水",
    element: "水",
    yinyang: "阴",
    color: "#2196F3",
    textColor: "#FFFFFF",
    direction: "北",
    season: "冬",
    description: "阴水，象征雨露云雾，有润泽、渗透之性",
  },
]);

// 五行数据 - 简化版
const elements = reactive([
  {
    id: 1,
    name: "木",
    color: "#4CAF50",
    lightColor: "#E8F5E9",
    textColor: "#FFFFFF",
    rotation: 0,
    yangStem: "甲",
    yinStem: "乙",
    yangNature: "阳木",
    yinNature: "阴木",
    description: "木行，生长之力",
  },
  {
    id: 2,
    name: "火",
    color: "#FF5722",
    lightColor: "#FFEBEE",
    textColor: "#FFFFFF",
    rotation: 36,
    yangStem: "丙",
    yinStem: "丁",
    yangNature: "阳火",
    yinNature: "阴火",
    description: "火行，炎上之力",
  },
  {
    id: 3,
    name: "土",
    color: "#FFC107",
    lightColor: "#FFF8E1",
    textColor: "#333333",
    rotation: 72,
    yangStem: "戊",
    yinStem: "己",
    yangNature: "阳土",
    yinNature: "阴土",
    description: "土行，承载之力",
  },
  {
    id: 4,
    name: "金",
    color: "#607D8B",
    lightColor: "#F5F5F5",
    textColor: "#FFFFFF",
    rotation: 108,
    yangStem: "庚",
    yinStem: "辛",
    yangNature: "阳金",
    yinNature: "阴金",
    description: "金行，收敛之力",
  },
  {
    id: 5,
    name: "水",
    color: "#2196F3",
    lightColor: "#E3F2FD",
    textColor: "#FFFFFF",
    rotation: 144,
    yangStem: "壬",
    yinStem: "癸",
    yangNature: "阳水",
    yinNature: "阴水",
    description: "水行，润下之力",
  },
]);

// 计算旋转动画时间
const rotationDuration = computed(() => {
  return 40 / rotationSpeed.value;
});

// 根据天干字符获取天干数据
const getStemByChar = (char) => {
  return allStems.find((stem) => stem.character === char);
};

// 检查元素是否与当前选中的天干相关
const isElementActive = (element) => {
  if (!activeStem.value) return true;
  return (
    element.yangStem === activeStem.value ||
    element.yinStem === activeStem.value
  );
};

// 检查天干字符是否与当前选中的天干相同
const isStemActive = (stemChar) => {
  if (!activeStem.value) return true;
  return stemChar === activeStem.value;
};

// 获取线条样式
const getLineStyle = (element, index) => {
  const opacity = activeStem.value
    ? isElementActive(element)
      ? "1"
      : "0.3"
    : "1";

  return {
    "--color": element.color,
    "--light-color": element.lightColor,
    "--rotation": element.rotation,
    "--index": index,
    opacity: opacity,
  };
};

// 获取天干字符样式
const getStemCharacterStyle = (element, stemChar) => {
  const opacity = activeStem.value
    ? isStemActive(stemChar)
      ? "1"
      : "0.7"
    : "1";

  return {
    "background-color": element.color,
    color: element.textColor,
    opacity: opacity,
  };
};

// 获取天干标签样式
const getStemLabelStyle = (stemChar) => {
  const opacity = activeStem.value
    ? isStemActive(stemChar)
      ? "1"
      : "0.5"
    : "1";

  return {
    opacity: opacity,
  };
};

// 获取天干性质样式
const getStemNatureStyle = (element, stemChar) => {
  const opacity = activeStem.value
    ? isStemActive(stemChar)
      ? "1"
      : "0.5"
    : "1";

  return {
    color: element.color,
    opacity: opacity,
  };
};

// 获取图例项样式
const getLegendItemStyle = (element) => {
  const opacity = activeStem.value
    ? isElementActive(element)
      ? "1"
      : "0.4"
    : "1";

  return {
    opacity: opacity,
  };
};

// 设置活动天干
const setActiveStem = (stemId) => {
  if (stemId === activeStem.value) {
    activeStem.value = "";
    return;
  }
  activeStem.value = stemId;
};

// 切换转动状态
const toggleRotation = () => {
  isRotating.value = !isRotating.value;
};

// 反转转动方向
const reverseRotation = () => {
  rotationDirection.value = rotationDirection.value * -1;
};

// 组件挂载时自动开始转动
onMounted(() => {
  isRotating.value = true;
});
</script>

<style scoped>
.five-elements-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 十天干面板样式 */
.stems-panel {
  /* width: 100%;
  background: white;
  border-radius: 12px;
  padding: 1.2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.08); */
}

.panel-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
}

.stems-list {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 0.8rem;
}

.stem-btn {
  border: none;
  border-radius: 10px;
  padding: 0.8rem 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.stem-btn:hover {
  transform: translateY(-11px);

  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35), 0 4px 6px rgba(0, 0, 0, 0.25),
    0 2px 4px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.stem-btn.active {
  transform: translateY(-11px);

  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35), 0 4px 6px rgba(0, 0, 0, 0.25),
    0 2px 4px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.stem-btn::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stem-btn:hover::after {
  opacity: 1;
}

.stem-char {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
}

.stem-info {
  font-size: 0.8rem;
  text-align: center;
}

.stem-yinyang {
  font-weight: 600;
  margin-bottom: 0.1rem;
}

.stem-element {
  opacity: 0.9;
}

.intro {
  margin-top: 1rem;
  padding: 1rem;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
  width: 100%;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.intro div {
  margin-bottom: 0.5rem;
}

/* 齿轮容器 */
.gear-wrapper {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 60px;
  /* margin: 0 auto 1.5rem; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.cross-gear {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: transform 0.5s ease;
}

.cross-gear.rotating {
  animation: rotateGear calc(v-bind(rotationDuration) * 1s) linear infinite;
  animation-direction: var(--direction, normal);
}

@keyframes rotateGear {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 交叉线样式 */
.cross-line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 10px;
  transform-origin: center center;
  transform: translate(-50%, -50%) rotate(calc(var(--rotation) * 1deg));
  transition: opacity 0.3s ease;
}

.line-body {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--light-color) 15%,
    var(--color) 50%,
    var(--light-color) 85%,
    transparent 100%
  );
  border-radius: 5px;
  overflow: hidden;
}

.line-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color);
  opacity: 0.4;
  filter: blur(2px);
}

.line-flow {
  /* position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.8) 30%,
    rgba(255, 255, 255, 0.8) 70%,
    transparent 100%
  );
  animation: flow 2.5s linear infinite;
  animation-delay: calc(var(--index) * 2s); */
}

@keyframes flow {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* 天干标记 */
.stem {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
}

.stem-start {
  left: 0;
  transform: translateY(-50%) translateX(-100%);
}

.stem-end {
  right: 0;
  transform: translateY(-50%) translateX(100%);
}

.stem-character {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 5px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
  transition: opacity 0.3s ease;
}

.stem-label {
  font-size: 0.8rem;
  padding: 2px 8px;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  margin-bottom: 3px;
  transition: opacity 0.3s ease;
}

.yang-label {
  background-color: #ff9800;
}

.yin-label {
  background-color: #2196f3;
}

.stem-nature {
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  transition: opacity 0.3s ease;
}

/* 中心点 */
.gear-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.center-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border: 2px solid #e0e0e0;
}

.center-yin-yang {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(90deg, #2c3e50 50%, white 50%);
  position: relative;
}

.yin-dot,
.yang-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.yin-dot {
  background: white;
  top: 13px;
  left: 6px;
}

.yang-dot {
  background: #2c3e50;
  top: 13px;
  right: 6px;
}

.center-label {
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.85rem;
  color: #666;
  font-weight: bold;
  white-space: nowrap;
  background: white;
  padding: 3px 10px;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* 控制面板 */
.control-panel {
  width: 100%;
  margin-top: 1.5rem;
  padding: 1.2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.control-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.2rem;
  align-items: center;
}

.control-btn {
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.control-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
}

.btn-rotate {
  background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
  color: white;
}

.btn-rotate.active {
  background: linear-gradient(135deg, #ff5722 0%, #d84315 100%);
}

.btn-reverse {
  background: linear-gradient(135deg, #2196f3 0%, #0d47a1 100%);
  color: white;
}

.btn-icon {
  font-size: 1.1rem;
}

.speed-control {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-left: auto;
}

.speed-control label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.speed-slider {
  width: 120px;
  height: 6px;
  -webkit-appearance: none;
  background: #e0e0e0;
  border-radius: 3px;
  outline: none;
}

.speed-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #2196f3;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.speed-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #2196f3;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.speed-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2196f3;
  min-width: 30px;
}

/* 天干详细信息 */
.stem-detail {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.2rem;
  border-left: 4px solid #2196f3;
  transition: all 0.3s ease;
}

.detail-title {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
}

.detail-char {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.detail-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
}

.detail-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-item.full-width {
  grid-column: span 2;
}

.detail-label {
  font-weight: 600;
  color: #666;
  min-width: 40px;
}

.detail-value {
  color: #333;
  flex: 1;
}

.detail-item.full-width .detail-value {
  font-size: 0.9rem;
  line-height: 1.4;
}

/* 图例 */
.legend {
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.legend-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 0.8rem;
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.3s ease;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.legend-text {
  font-size: 0.9rem;
  color: #666;
}

.stem-pair {
  font-weight: 600;
}

.element-name {
  color: #888;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .five-elements-container {
    padding: 1rem;
    max-width: 95%;
  }

  .stems-list {
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
  }

  .stem-btn {
    padding: 0.6rem 0.3rem;
  }

  .stem-char {
    font-size: 1.5rem;
  }

  .stem-info {
    font-size: 0.7rem;
  }

  .gear-wrapper {
    width: 320px;
    height: 320px;
  }

  .stem-character {
    width: 36px;
    height: 36px;
    font-size: 1.3rem;
  }

  .stem-nature {
    font-size: 0.7rem;
  }

  .control-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .speed-control {
    margin-left: 0;
    justify-content: space-between;
  }

  .detail-content {
    grid-template-columns: 1fr;
  }

  .detail-item.full-width {
    grid-column: span 1;
  }

  .legend-items {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .stems-list {
    grid-template-columns: repeat(3, 1fr);
  }

  .gear-wrapper {
    width: 280px;
    height: 280px;
  }

  .stem-character {
    width: 32px;
    height: 32px;
    font-size: 1.2rem;
  }

  .stem-label {
    font-size: 0.7rem;
    padding: 1px 6px;
  }

  .center-circle {
    width: 50px;
    height: 50px;
  }

  .center-yin-yang {
    width: 30px;
    height: 30px;
  }

  .yin-dot,
  .yang-dot {
    width: 8px;
    height: 8px;
  }

  .yin-dot {
    top: 11px;
    left: 5px;
  }

  .yang-dot {
    top: 11px;
    right: 5px;
  }
}
</style>

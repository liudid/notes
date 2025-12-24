<template>
  <div class="compact-ganzhi-system">
    <div class="header">
      <h2>干支格子刻度系统</h2>
      <div class="subtitle">年干定月干（五虎遁），日干定时干（五鼠遁）</div>
    </div>

    <div class="main-card">
      <!-- 年柱行 -->
      <div class="row-section">
        <div class="row-header">
          <div class="title-group">
            <span class="row-title">年柱（六十甲子）</span>
            <span class="current-display">
              <span
                class="stem"
                :style="getStemColor(currentYearGanzhi.stem)"
                >{{ currentYearGanzhi.stem }}</span
              >
              <span
                class="branch"
                :style="getBranchColor(currentYearGanzhi.branch)"
                >{{ currentYearGanzhi.branch }}</span
              >
              <span class="yinyang-tag">{{
                getYinYangText(currentYearGanzhi)
              }}</span>
            </span>
          </div>
          <div class="row-controls">
            <button @click="scrollYear(-5)" class="mini-btn" title="前5位">
              -5
            </button>
            <button @click="scrollYear(-1)" class="mini-btn" title="前1位">
              ‹
            </button>
            <button @click="scrollYear(1)" class="mini-btn" title="后1位">
              ›
            </button>
            <button @click="scrollYear(5)" class="mini-btn" title="后5位">
              +5
            </button>
          </div>
        </div>

        <div class="grid-row" ref="yearRow">
          <div
            v-for="(gz, index) in yearCycle"
            :key="'year-' + index"
            class="grid-item year-item"
            :class="{
              active: index === currentYearIndex,
              'decade-mark': index % 10 === 0,
            }"
            @click="selectYear(index)"
            :style="getCellStyle(gz)"
          >
            <div class="item-content vertical">
              <div class="ganzhi-label">
                <div class="stem" :style="getStemColor(gz.stem)">
                  {{ gz.stem }}
                </div>
                <div class="branch" :style="getBranchColor(gz.branch)">
                  {{ gz.branch }}
                </div>
              </div>
              <div class="index-label">
                {{ (index + 1).toString().padStart(2, "0") }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- 月柱行 -->
      <div class="row-section">
        <div class="row-header">
          <div class="title-group">
            <span class="row-title">月柱（十二月令）</span>
            <span class="current-display">
              <span
                class="stem"
                :style="getStemColor(currentMonthGanzhi.stem)"
                >{{ currentMonthGanzhi.stem }}</span
              >
              <span
                class="branch"
                :style="getBranchColor(currentMonthGanzhi.branch)"
                >{{ currentMonthGanzhi.branch }}</span
              >
              <span class="yinyang-tag">{{
                getYinYangText(currentMonthGanzhi)
              }}</span>
            </span>
            <span class="rule-display">
              年干<strong :style="getStemColor(yearStem)">{{
                yearStem
              }}</strong>
              → 月起<strong :style="getStemColor(monthCycle[0]?.stem)">{{
                monthCycle[0]?.stem
              }}</strong>
            </span>
          </div>
          <div class="row-controls">
            <button @click="scrollMonth(-1)" class="mini-btn" title="前1月">
              ‹
            </button>
            <button @click="scrollMonth(1)" class="mini-btn" title="后1月">
              ›
            </button>
          </div>
        </div>

        <div class="grid-row month-row" ref="monthRow">
          <div
            v-for="(month, index) in monthCycle"
            :key="'month-' + index"
            class="grid-item month-item"
            :class="{ active: index === currentMonthIndex }"
            @click="selectMonth(index)"
            :style="getCellStyle(month)"
          >
            <div class="item-content vertical">
              <div class="ganzhi-label">
                <div class="stem" :style="getStemColor(month.stem)">
                  {{ month.stem }}
                </div>
                <div class="branch" :style="getBranchColor(month.branch)">
                  {{ month.branch }}
                </div>
              </div>
              <div v-if="showMonthInfo" class="month-info">
                <div class="solar-term">{{ month.solarTerm }}</div>
                <div class="month-name">{{ month.chineseMonth }}</div>
              </div>
              <div v-else class="index-label">{{ index + 1 }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- 日柱行 -->
      <div class="row-section">
        <div class="row-header">
          <div class="title-group">
            <span class="row-title">日柱（六十甲子）</span>
            <span class="current-display">
              <span class="stem" :style="getStemColor(currentDayGanzhi.stem)">{{
                currentDayGanzhi.stem
              }}</span>
              <span
                class="branch"
                :style="getBranchColor(currentDayGanzhi.branch)"
                >{{ currentDayGanzhi.branch }}</span
              >
              <span class="yinyang-tag">{{
                getYinYangText(currentDayGanzhi)
              }}</span>
            </span>
          </div>
          <div class="row-controls">
            <button @click="scrollDay(-5)" class="mini-btn" title="前5位">
              -5
            </button>
            <button @click="scrollDay(-1)" class="mini-btn" title="前1位">
              ‹
            </button>
            <button @click="scrollDay(1)" class="mini-btn" title="后1位">
              ›
            </button>
            <button @click="scrollDay(5)" class="mini-btn" title="后5位">
              +5
            </button>
          </div>
        </div>

        <div class="grid-row" ref="dayRow">
          <div
            v-for="(gz, index) in dayCycle"
            :key="'day-' + index"
            class="grid-item day-item"
            :class="{
              active: index === currentDayIndex,
              'decade-mark': index % 10 === 0,
            }"
            @click="selectDay(index)"
            :style="getCellStyle(gz)"
          >
            <div class="item-content vertical">
              <div class="ganzhi-label">
                <div class="stem" :style="getStemColor(gz.stem)">
                  {{ gz.stem }}
                </div>
                <div class="branch" :style="getBranchColor(gz.branch)">
                  {{ gz.branch }}
                </div>
              </div>
              <div class="index-label">
                {{ (index + 1).toString().padStart(2, "0") }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- 时柱行 -->
      <div class="row-section">
        <div class="row-header">
          <div class="title-group">
            <span class="row-title">时柱（十二时辰）</span>
            <span class="current-display">
              <span
                class="stem"
                :style="getStemColor(currentHourGanzhi.stem)"
                >{{ currentHourGanzhi.stem }}</span
              >
              <span
                class="branch"
                :style="getBranchColor(currentHourGanzhi.branch)"
                >{{ currentHourGanzhi.branch }}</span
              >
              <span class="yinyang-tag">{{
                getYinYangText(currentHourGanzhi)
              }}</span>
            </span>
            <span class="rule-display">
              日干<strong :style="getStemColor(dayStem)">{{ dayStem }}</strong>
              → 时起<strong :style="getStemColor(hourCycle[0]?.stem)">{{
                hourCycle[0]?.stem
              }}</strong>
            </span>
          </div>
          <div class="row-controls">
            <button @click="scrollHour(-1)" class="mini-btn" title="前1时">
              ‹
            </button>
            <button @click="scrollHour(1)" class="mini-btn" title="后1时">
              ›
            </button>
          </div>
        </div>

        <div class="grid-row hour-row" ref="hourRow">
          <div
            v-for="(hour, index) in hourCycle"
            :key="'hour-' + index"
            class="grid-item hour-item"
            :class="{ active: index === currentHourIndex }"
            @click="selectHour(index)"
            :style="getCellStyle(hour)"
          >
            <div class="item-content vertical">
              <div class="ganzhi-label">
                <div class="stem" :style="getStemColor(hour.stem)">
                  {{ hour.stem }}
                </div>
                <div class="branch" :style="getBranchColor(hour.branch)">
                  {{ hour.branch }}
                </div>
              </div>
              <div v-if="showHourInfo" class="hour-info">
                <div class="hour-name">{{ hour.chineseHour }}</div>
                <div class="time-range">{{ hour.timeRange }}时</div>
              </div>
              <div v-else class="index-label">{{ index + 1 }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 控制栏 -->
    <div class="control-bar">
      <div class="current-summary">
        <div class="summary-item" :style="getPillarStyle('year')">
          <div class="summary-label">年柱</div>
          <div class="summary-content">
            <span class="stem" :style="getStemColor(currentYearGanzhi.stem)">{{
              currentYearGanzhi.stem
            }}</span>
            <span
              class="branch"
              :style="getBranchColor(currentYearGanzhi.branch)"
              >{{ currentYearGanzhi.branch }}</span
            >
          </div>
          <div class="summary-yinyang">
            {{ getYinYangText(currentYearGanzhi) }}
          </div>
        </div>

        <div class="summary-item" :style="getPillarStyle('month')">
          <div class="summary-label">月柱</div>
          <div class="summary-content">
            <span class="stem" :style="getStemColor(currentMonthGanzhi.stem)">{{
              currentMonthGanzhi.stem
            }}</span>
            <span
              class="branch"
              :style="getBranchColor(currentMonthGanzhi.branch)"
              >{{ currentMonthGanzhi.branch }}</span
            >
          </div>
          <div class="summary-yinyang">
            {{ getYinYangText(currentMonthGanzhi) }}
          </div>
        </div>

        <div class="summary-item" :style="getPillarStyle('day')">
          <div class="summary-label">日柱</div>
          <div class="summary-content">
            <span class="stem" :style="getStemColor(currentDayGanzhi.stem)">{{
              currentDayGanzhi.stem
            }}</span>
            <span
              class="branch"
              :style="getBranchColor(currentDayGanzhi.branch)"
              >{{ currentDayGanzhi.branch }}</span
            >
          </div>
          <div class="summary-yinyang">
            {{ getYinYangText(currentDayGanzhi) }}
          </div>
        </div>

        <div class="summary-item" :style="getPillarStyle('hour')">
          <div class="summary-label">时柱</div>
          <div class="summary-content">
            <span class="stem" :style="getStemColor(currentHourGanzhi.stem)">{{
              currentHourGanzhi.stem
            }}</span>
            <span
              class="branch"
              :style="getBranchColor(currentHourGanzhi.branch)"
              >{{ currentHourGanzhi.branch }}</span
            >
          </div>
          <div class="summary-yinyang">
            {{ getYinYangText(currentHourGanzhi) }}
          </div>
        </div>
      </div>

      <div class="control-group">
        <button @click="resetAll" class="control-btn">
          <span class="btn-icon">↻</span>重置到甲子
        </button>
        <button @click="randomAll" class="control-btn">
          <span class="btn-icon">🎲</span>随机位置
        </button>
        <button @click="toggleMonthInfo" class="control-btn">
          <span class="btn-icon">{{ showMonthInfo ? "📅" : "📅" }}</span>
          {{ showMonthInfo ? "隐藏月份" : "显示月份" }}
        </button>
        <button @click="toggleHourInfo" class="control-btn">
          <span class="btn-icon">{{ showHourInfo ? "🕒" : "🕒" }}</span>
          {{ showHourInfo ? "隐藏时辰" : "显示时辰" }}
        </button>
      </div>
    </div>

    <!-- 五行图例 -->
    <div class="legend">
      <div class="legend-title">五行颜色：</div>
      <div class="legend-items">
        <div
          v-for="(color, element) in elementColors"
          :key="element"
          class="legend-item"
          :style="{ backgroundColor: color }"
        >
          {{ element }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";

// ========== 常量定义 ==========
const TIANGAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const DIZHI = [
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥",
];

// 五行颜色
const elementColors = {
  木: "#4CAF50",
  火: "#F44336",
  土: "#FF9800",
  金: "#FFC107",
  水: "#2196F3",
};

// 天干五行
const tianganElements = {
  甲: "木",
  乙: "木",
  丙: "火",
  丁: "火",
  戊: "土",
  己: "土",
  庚: "金",
  辛: "金",
  壬: "水",
  癸: "水",
};

// 地支五行
const dizhiElements = {
  子: "水",
  丑: "土",
  寅: "木",
  卯: "木",
  辰: "土",
  巳: "火",
  午: "火",
  未: "土",
  申: "金",
  酉: "金",
  戌: "土",
  亥: "水",
};

// 阴阳属性
const yinYang = {
  甲: "阳",
  乙: "阴",
  丙: "阳",
  丁: "阴",
  戊: "阳",
  己: "阴",
  庚: "阳",
  辛: "阴",
  壬: "阳",
  癸: "阴",
  子: "阳",
  丑: "阴",
  寅: "阳",
  卯: "阴",
  辰: "阳",
  巳: "阴",
  午: "阳",
  未: "阴",
  申: "阳",
  酉: "阴",
  戌: "阳",
  亥: "阴",
};

// 月份信息
const monthInfo = [
  { chineseMonth: "正月", solarTerm: "立春", branch: "寅" },
  { chineseMonth: "二月", solarTerm: "惊蛰", branch: "卯" },
  { chineseMonth: "三月", solarTerm: "清明", branch: "辰" },
  { chineseMonth: "四月", solarTerm: "立夏", branch: "巳" },
  { chineseMonth: "五月", solarTerm: "芒种", branch: "午" },
  { chineseMonth: "六月", solarTerm: "小暑", branch: "未" },
  { chineseMonth: "七月", solarTerm: "立秋", branch: "申" },
  { chineseMonth: "八月", solarTerm: "白露", branch: "酉" },
  { chineseMonth: "九月", solarTerm: "寒露", branch: "戌" },
  { chineseMonth: "十月", solarTerm: "立冬", branch: "亥" },
  { chineseMonth: "冬月", solarTerm: "大雪", branch: "子" },
  { chineseMonth: "腊月", solarTerm: "小寒", branch: "丑" },
];

// 时辰信息 - 修正了午时的错误
const hourInfo = [
  { chineseHour: "子时", timeRange: "23-1", branch: "子" },
  { chineseHour: "丑时", timeRange: "1-3", branch: "丑" },
  { chineseHour: "寅时", timeRange: "3-5", branch: "寅" },
  { chineseHour: "卯时", timeRange: "5-7", branch: "卯" },
  { chineseHour: "辰时", timeRange: "7-9", branch: "辰" },
  { chineseHour: "巳时", timeRange: "9-11", branch: "巳" },
  { chineseHour: "午时", timeRange: "11-13", branch: "午" },
  { chineseHour: "未时", timeRange: "13-15", branch: "未" },
  { chineseHour: "申时", timeRange: "15-17", branch: "申" },
  { chineseHour: "酉时", timeRange: "17-19", branch: "酉" },
  { chineseHour: "戌时", timeRange: "19-21", branch: "戌" },
  { chineseHour: "亥时", timeRange: "21-23", branch: "亥" },
];

// ========== 响应式数据 ==========
const showMonthInfo = ref(false);
const showHourInfo = ref(false);
const currentYearIndex = ref(0);
const currentMonthIndex = ref(0);
const currentDayIndex = ref(0);
const currentHourIndex = ref(0);

// ========== 计算属性 ==========
// 生成60甲子
const ganzhiCycle = computed(() => {
  const cycle = [];
  for (let i = 0; i < 60; i++) {
    const stem = TIANGAN[i % 10];
    const branch = DIZHI[i % 12];
    cycle.push({
      stem,
      branch,
      stemElement: tianganElements[stem],
      branchElement: dizhiElements[branch],
      stemYinYang: yinYang[stem] === "阳" ? "⚊" : "⚋",
      branchYinYang: yinYang[branch] === "阳" ? "⚊" : "⚋",
    });
  }
  return cycle;
});

// 各圈数据
const yearCycle = computed(() => ganzhiCycle.value);
const dayCycle = computed(() => ganzhiCycle.value);

// 当前干支
const currentYearGanzhi = computed(
  () => yearCycle.value[currentYearIndex.value]
);
const currentMonthGanzhi = computed(
  () => monthCycle.value[currentMonthIndex.value]
);
const currentDayGanzhi = computed(() => dayCycle.value[currentDayIndex.value]);
const currentHourGanzhi = computed(
  () => hourCycle.value[currentHourIndex.value]
);

const yearStem = computed(() => currentYearGanzhi.value?.stem);
const dayStem = computed(() => currentDayGanzhi.value?.stem);

// 获取阴阳文本
const getYinYangText = (item) => {
  if (!item) return "";
  const stemYY = item.stemYinYang === "⚊" ? "阳" : "阴";
  const branchYY = item.branchYinYang === "⚊" ? "阳" : "阴";
  return `${stemYY}${stemYY === branchYY ? "同" : "异"}`;
};

// 五虎遁：年干推月干
const monthCycle = computed(() => {
  const yearGan = yearStem.value;
  const monthGanStart =
    {
      甲: "丙",
      己: "丙",
      乙: "戊",
      庚: "戊",
      丙: "庚",
      辛: "庚",
      丁: "壬",
      壬: "壬",
      戊: "甲",
      癸: "甲",
    }[yearGan] || "丙";

  const startIndex = TIANGAN.indexOf(monthGanStart);

  return monthInfo.map((month, index) => {
    const stem = TIANGAN[(startIndex + index) % 10];
    return {
      stem,
      branch: month.branch,
      chineseMonth: month.chineseMonth,
      solarTerm: month.solarTerm,
      stemElement: tianganElements[stem],
      branchElement: dizhiElements[month.branch],
      stemYinYang: yinYang[stem] === "阳" ? "⚊" : "⚋",
      branchYinYang: yinYang[month.branch] === "阳" ? "⚊" : "⚋",
    };
  });
});

// 五鼠遁：日干推时干
const hourCycle = computed(() => {
  const dayGan = dayStem.value;
  const hourGanStart =
    {
      甲: "甲",
      己: "甲",
      乙: "丙",
      庚: "丙",
      丙: "戊",
      辛: "戊",
      丁: "庚",
      壬: "庚",
      戊: "壬",
      癸: "壬",
    }[dayGan] || "甲";

  const startIndex = TIANGAN.indexOf(hourGanStart);

  return hourInfo.map((hour, index) => {
    const stem = TIANGAN[(startIndex + index) % 10];
    return {
      stem,
      branch: hour.branch,
      chineseHour: hour.chineseHour,
      timeRange: hour.timeRange,
      stemElement: tianganElements[stem],
      branchElement: dizhiElements[hour.branch],
      stemYinYang: yinYang[stem] === "阳" ? "⚊" : "⚋",
      branchYinYang: yinYang[hour.branch] === "阳" ? "⚊" : "⚋",
    };
  });
});

// ========== 方法 ==========
// 年柱操作
const scrollYear = (steps) => {
  const newIndex = (currentYearIndex.value + steps + 60) % 60;
  selectYear(newIndex);
};

const selectYear = (index) => {
  currentYearIndex.value = index;
  // 当年柱变化时，月柱自动回到第一个位置
  currentMonthIndex.value = 0;
};

// 月柱操作
const scrollMonth = (steps) => {
  const newIndex = (currentMonthIndex.value + steps + 12) % 12;
  selectMonth(newIndex);
};

const selectMonth = (index) => {
  currentMonthIndex.value = index;
};

// 日柱操作
const scrollDay = (steps) => {
  const newIndex = (currentDayIndex.value + steps + 60) % 60;
  selectDay(newIndex);
};

const selectDay = (index) => {
  currentDayIndex.value = index;
  // 当日柱变化时，时柱自动回到第一个位置
  currentHourIndex.value = 0;
};

// 时柱操作
const scrollHour = (steps) => {
  const newIndex = (currentHourIndex.value + steps + 12) % 12;
  selectHour(newIndex);
};

const selectHour = (index) => {
  currentHourIndex.value = index;
};

// 获取样式
const getStemColor = (stem) => ({
  color: elementColors[tianganElements[stem]] || "#333",
  fontWeight: "bold",
});

const getBranchColor = (branch) => ({
  color: elementColors[dizhiElements[branch]] || "#333",
  fontWeight: "bold",
});

const getCellStyle = (item) => {
  return {
    "--stem-color": elementColors[item?.stemElement] || "#666",
    "--branch-color": elementColors[item?.branchElement] || "#666",
  };
};

const getPillarStyle = (type) => {
  const colors = {
    year:
      elementColors[tianganElements[currentYearGanzhi.value?.stem]] ||
      "#667eea",
    month:
      elementColors[tianganElements[currentMonthGanzhi.value?.stem]] ||
      "#f093fb",
    day:
      elementColors[tianganElements[currentDayGanzhi.value?.stem]] || "#4facfe",
    hour:
      elementColors[tianganElements[currentHourGanzhi.value?.stem]] ||
      "#43e97b",
  };
  return {
    background: `linear-gradient(135deg, ${colors[type]}22 0%, ${colors[type]}11 100%)`,
    borderColor: `${colors[type]}66`,
    borderLeft: `3px solid ${colors[type]}`,
  };
};

// 全局控制
const toggleMonthInfo = () => {
  showMonthInfo.value = !showMonthInfo.value;
};

const toggleHourInfo = () => {
  showHourInfo.value = !showHourInfo.value;
};

const resetAll = () => {
  selectYear(0);
  selectMonth(0);
  selectDay(0);
  selectHour(0);
};

const randomAll = () => {
  selectYear(Math.floor(Math.random() * 60));
  selectMonth(Math.floor(Math.random() * 12));
  selectDay(Math.floor(Math.random() * 60));
  selectHour(Math.floor(Math.random() * 12));
};

// 初始化
onMounted(() => {
  resetAll();
});
</script>

<style scoped>
.compact-ganzhi-system {
  font-family: "Microsoft YaHei", "Segoe UI", sans-serif;
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
  background: #f8f9fa;
  border-radius: 8px;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 16px;
}

.header h2 {
  color: #2c3e50;
  margin: 0 0 6px 0;
  font-size: 20px;
  font-weight: 600;
}

.subtitle {
  color: #5a6c7d;
  font-size: 12px;
  margin: 0;
}

.main-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  margin-bottom: 16px;
}

.row-section {
  margin-bottom: 0;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #dee2e6, transparent);
  margin: 12px 0;
}

.row-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  flex: 1;
}

.row-title {
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  background: #f1f3f5;
  padding: 4px 10px;
  border-radius: 4px;
  border-left: 3px solid #4dabf7;
  white-space: nowrap;
}

.current-display {
  font-size: 14px;
  font-weight: 600;
  color: #2b2d42;
  background: #f8f9fa;
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}

.current-display .stem,
.current-display .branch {
  font-weight: 700;
  font-size: 16px;
}

.yinyang-tag {
  font-size: 12px;
  color: #6c757d;
  margin-left: 4px;
  background: #f8f9fa;
  padding: 1px 6px;
  border-radius: 3px;
  border: 1px solid #dee2e6;
}

.rule-display {
  font-size: 12px;
  color: #5a6c7d;
  background: #f8f9fa;
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px dashed #adb5bd;
  white-space: nowrap;
}

.rule-display strong {
  font-weight: 700;
  margin: 0 2px;
  color: #e03131;
}

.row-controls {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.mini-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 4px;
  color: #495057;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 0.2s ease;
}

.mini-btn:hover {
  background: #f1f3f5;
  border-color: #adb5bd;
  transform: translateY(-1px);
}

.grid-row {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 3px;
  padding: 8px 0;
  min-height: 70px;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.grid-row::-webkit-scrollbar {
  height: 6px;
}

.grid-row::-webkit-scrollbar-track {
  background: #f1f3f5;
  border-radius: 3px;
}

.grid-row::-webkit-scrollbar-thumb {
  background: #adb5bd;
  border-radius: 3px;
}

.grid-row::-webkit-scrollbar-thumb:hover {
  background: #868e96;
}

.grid-item {
  flex: 0 0 32px;
  height: 65px;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-color: var(--stem-color, #4dabf7);
}

.grid-item.active {
  border: 2px solid #e03131;
  background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%);
  transform: scale(1.05);
  box-shadow: 0 3px 8px rgba(224, 49, 49, 0.2);
  z-index: 10;
}

.grid-item.active::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 1px solid #e03131;
  border-radius: 6px;
  animation: pulse 1.5s infinite;
}

.grid-item.decade-mark {
  border-left: 3px solid #495057;
}

.month-item,
.hour-item {
  flex: 0 0 36px;
  height: 65px;
}

.item-content.vertical {
  text-align: center;
  width: 100%;
  padding: 4px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.ganzhi-label {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 2px;
}

.ganzhi-label .stem,
.ganzhi-label .branch {
  font-weight: 700;
  line-height: 1.2;
}

.ganzhi-label .stem {
  font-size: 14px;
}

.ganzhi-label .branch {
  font-size: 14px;
}

.index-label {
  font-size: 9px;
  color: #adb5bd;
  font-weight: 600;
}

.month-info,
.hour-info {
  font-size: 9px;
  color: #5a6c7d;
  line-height: 1.1;
  margin-top: 2px;
}
.solar-term,
.hour-name {
  font-weight: 600;
  color: #495057;
  font-size: 10px;
}
.month-name,
.time-range {
  font-size: 8px;
  color: #868e96;
  font-style: italic;
}

.control-bar {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.current-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.summary-item {
  padding: 12px;
  border-radius: 6px;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.summary-label {
  font-size: 12px;
  color: #495057;
  font-weight: 600;
  margin-bottom: 4px;
}

.summary-content {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.summary-content .stem,
.summary-content .branch {
  font-size: 24px;
  font-weight: 700;
}

.summary-yinyang {
  font-size: 12px;
  color: #6c757d;
  background: rgba(255, 255, 255, 0.8);
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.control-group {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.control-btn {
  padding: 8px 16px;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 6px;
  color: #495057;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  font-weight: 600;
}

.control-btn:hover {
  background: #f8f9fa;
  border-color: #adb5bd;
  transform: translateY(-2px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.btn-icon {
  font-size: 16px;
}

.legend {
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  gap: 12px;
}

.legend-title {
  font-size: 12px;
  color: #495057;
  font-weight: 600;
  white-space: nowrap;
}

.legend-items {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.legend-item {
  padding: 4px 10px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  min-width: 32px;
  text-align: center;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

@media (max-width: 768px) {
  .row-header {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }

  .current-summary {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-item {
    flex: 0 0 30px;
    height: 60px;
  }

  .month-item,
  .hour-item {
    flex: 0 0 34px;
    height: 60px;
  }

  .ganzhi-label .stem,
  .ganzhi-label .branch {
    font-size: 13px;
  }
}
</style>

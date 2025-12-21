<template>
  <IntroTitle
    text="地：主承载。五行之炁在地层展开后形成了12个结构节点称为地支。地支主气位（在哪个结构中），节气主气的变化（发生了什么）"
  ></IntroTitle>
  <div class="earthly-branches-table-container">
    <table class="earthly-branches-table">
      <tbody>
        <!-- 第一行：地支 -->
        <tr>
          <th class="table-header">地支</th>
          <td
            v-for="(item, index) in data.earthlyBranches"
            :key="index"
            class="eb-cell"
          >
            {{ item }}
          </td>
        </tr>

        <!-- 第二行：五行 -->
        <tr>
          <th class="table-header">五行</th>
          <td
            v-for="(item, index) in data.fiveElements"
            :key="index"
            :class="['five-element-cell', getElementClass(item)]"
          >
            {{ item }}
          </td>
        </tr>

        <!-- 第三行：属性 -->
        <tr>
          <th class="table-header">属性</th>
          <td
            v-for="(item, index) in data.attributes"
            :key="index"
            :class="['attribute-cell', getAttributeClass(item)]"
          >
            {{ item }}
          </td>
        </tr>

        <!-- 第四行：气机阶段 -->
        <tr>
          <th class="table-header">气机阶段</th>
          <td
            v-for="(item, index) in data.qiStages"
            :key="index"
            class="qi-stage-cell"
          >
            {{ item }}
          </td>
        </tr>

        <!-- 第五行：核心象 -->
        <tr>
          <th class="table-header">核心象</th>
          <td
            v-for="(item, index) in data.coreSymbols"
            :key="index"
            class="core-symbol-cell"
          >
            {{ item }}
          </td>
        </tr>

        <!-- 第六行：描述 -->
        <tr>
          <th class="table-header">描述</th>
          <td
            v-for="(item, index) in data.descriptions"
            :key="index"
            class="description-cell"
          >
            {{ item }}
          </td>
        </tr>

        <!-- 第七行：方向 -->
        <tr>
          <th class="table-header">方向</th>
          <td
            v-for="(item, index) in data.directions"
            :key="index"
            :class="['direction-cell', getDirectionClass(item)]"
          >
            {{ item }}
          </td>
        </tr>

        <!-- 第八行：年单位（合并整行） -->
        <tr class="merged-row">
          <td colspan="13" class="time-unit year-unit">
            <span class="unit-text">年单位</span>
          </td>
        </tr>

        <!-- 第九行：生肖 -->
        <tr>
          <th class="table-header">生肖</th>
          <td
            v-for="(item, index) in data.zodiacSigns"
            :key="index"
            :class="['zodiac-cell', getZodiacClass(index)]"
          >
            <div class="zodiac-content">
              <span class="zodiac-icon">{{ getZodiacEmoji(index) }}</span>
              <span class="zodiac-text">{{ item }}</span>
            </div>
          </td>
        </tr>

        <!-- 第十行：月单位（合并整行） -->
        <tr class="merged-row">
          <td colspan="13" class="time-unit month-unit">
            <span class="unit-text">月单位</span>
          </td>
        </tr>

        <!-- 第十一行：节 -->
        <tr>
          <th class="table-header">节</th>
          <td
            v-for="(item, index) in data.solarTerms"
            :key="index"
            class="solar-term-cell"
          >
            {{ item }}
          </td>
        </tr>

        <!-- 第十二行：中气 -->
        <tr>
          <th class="table-header">中气</th>
          <td
            v-for="(item, index) in data.midQi"
            :key="index"
            class="mid-qi-cell"
          >
            {{ item }}
          </td>
        </tr>

        <!-- 第十三行：季节 -->
        <tr>
          <th class="table-header">季节</th>
          <td
            v-for="(item, index) in data.seasons"
            :key="index"
            :class="['season-cell', getSeasonClass(item)]"
          >
            {{ item }}
          </td>
        </tr>

        <!-- 第十四行：农历月 -->
        <tr>
          <th class="table-header">农历月</th>
          <td
            v-for="(item, index) in data.lunarMonths"
            :key="index"
            class="lunar-month-cell"
          >
            {{ item }}
          </td>
        </tr>

        <!-- 第十五行：节令位 -->
        <tr>
          <th class="table-header">节令位</th>
          <td
            v-for="(item, index) in data.termPositions"
            :key="index"
            :class="[
              'term-position-cell',
              { 'anchor-point': item.includes('锚点') },
            ]"
          >
            {{ item }}
          </td>
        </tr>

        <!-- 第十六行：太阳黄经 -->
        <tr>
          <th class="table-header">太阳黄经</th>
          <td
            v-for="(item, index) in data.solarLongitude"
            :key="index"
            class="solar-longitude-cell"
          >
            {{ item }}
          </td>
        </tr>

        <!-- 第十七行：日单位（合并整行） -->
        <tr class="merged-row">
          <td colspan="13" class="time-unit day-unit">
            <span class="unit-text">日单位</span>
          </td>
        </tr>

        <!-- 第十八行：时辰 -->
        <tr>
          <th class="table-header">时辰</th>
          <td
            v-for="(item, index) in data.timePeriods"
            :key="index"
            class="time-period-cell"
          >
            {{ item }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import diZhiData from "../config/diZhi.json";
console.log(diZhiData);

// 定义数据
const data = ref({
  earthlyBranches: [
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
  ],
  fiveElements: [
    "水",
    "土",
    "木",
    "木",
    "土",
    "火",
    "火",
    "土",
    "金",
    "金",
    "土",
    "水",
  ],
  attributes: [
    "阳",
    "阴",
    "阳",
    "阴",
    "阳",
    "阴",
    "阳",
    "阴",
    "阳",
    "阴",
    "阳",
    "阴",
  ],
  qiStages: [
    "一阳初生",
    "二阳进气",
    "三阳开泰",
    "四阳壮盛",
    "五阳极盛",
    "一阴初生",
    "二阴进气",
    "三阴肃杀",
    "四阴凝寒",
    "五阴极盛",
    "阴阳转化",
    "气机收藏",
  ],
  coreSymbols: [
    "萌",
    "孕",
    "生",
    "长",
    "化",
    "盛",
    "收",
    "藏",
    "杀",
    "敛",
    "归",
    "闭",
  ],
  descriptions: [
    "阴极而阳动，气在内，不可见",
    "阳气渐长，阴中蕴阳",
    "阳气生发，万物始动",
    "阳气展放，草木向荣",
    "阳气温煦，化育万物",
    "阳气旺盛，物极必反",
    "阳极生阴，阴阳交替",
    "阴气渐盛，万物收敛",
    "阴气肃杀，天地收杀",
    "阴气凝敛，万物归藏",
    "阴阳转化，新旧交替",
    "气机闭藏，以待来年",
  ],
  directions: [
    "正北",
    "东北偏北",
    "东北偏东",
    "正东",
    "东南偏东",
    "东南偏南",
    "正南",
    "西南偏南",
    "西南偏西",
    "正西",
    "西北偏西",
    "西北偏北",
  ],
  zodiacSigns: [
    "鼠",
    "牛",
    "虎",
    "兔",
    "龙",
    "蛇",
    "马",
    "羊",
    "猴",
    "鸡",
    "狗",
    "猪",
  ],
  solarTerms: [
    "大雪",
    "小寒",
    "立春",
    "惊蛰",
    "清明",
    "立夏",
    "芒种",
    "小暑",
    "立秋",
    "白露",
    "寒露",
    "立冬",
  ],
  midQi: [
    "冬至",
    "大寒",
    "雨水",
    "春分",
    "谷雨",
    "小满",
    "夏至",
    "大暑",
    "处暑",
    "秋分",
    "霜降",
    "小雪",
  ],
  seasons: [
    "冬季",
    "冬季",
    "春季",
    "春季",
    "春季",
    "夏季",
    "夏季",
    "夏季",
    "秋季",
    "秋季",
    "秋季",
    "冬季",
  ],
  lunarMonths: [
    "冬月",
    "腊月",
    "正月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
  ],
  termPositions: [
    "-",
    "子月锚点",
    "-",
    "寅月锚点",
    "-",
    "巳月锚点",
    "-",
    "未月锚点",
    "-",
    "酉月锚点",
    "-",
    "亥月锚点",
  ],
  solarLongitude: [
    "255°",
    "270°",
    "285°",
    "300°",
    "315°",
    "330°",
    "345°",
    "0°",
    "15°",
    "30°",
    "45°",
    "60°",
  ],
  timePeriods: [
    "23:00-0:59",
    "1:00-2:59",
    "3:00-4:59",
    "5:00-6:59",
    "7:00-8:59",
    "9:00-10:59",
    "11:00-12:59",
    "13:00-14:59",
    "15:00-16:59",
    "17:00-18:59",
    "19:00-20:59",
    "21:00-22:59",
  ],
});

// 获取五行对应的样式类
const getElementClass = (element) => {
  const classMap = {
    金: "metal",
    木: "wood",
    水: "water",
    火: "fire",
    土: "earth",
  };
  return classMap[element] || "";
};

// 获取属性对应的样式类
const getAttributeClass = (attribute) => {
  return attribute === "阳" ? "yang" : "yin";
};

// 获取方向对应的样式类
const getDirectionClass = (direction) => {
  if (direction.includes("正北") || direction.includes("北")) return "north";
  if (direction.includes("正东") || direction.includes("东")) return "east";
  if (direction.includes("正南") || direction.includes("南")) return "south";
  if (direction.includes("正西") || direction.includes("西")) return "west";
  return "";
};

// 获取季节对应的样式类
const getSeasonClass = (season) => {
  const classMap = {
    春季: "spring",
    夏季: "summer",
    秋季: "autumn",
    冬季: "winter",
  };
  return classMap[season] || "";
};

// 获取生肖对应的样式类
const getZodiacClass = (index) => {
  const zodiacAnimals = [
    "rat",
    "ox",
    "tiger",
    "rabbit",
    "dragon",
    "snake",
    "horse",
    "goat",
    "monkey",
    "rooster",
    "dog",
    "pig",
  ];
  return zodiacAnimals[index] || "";
};

// 获取生肖对应的emoji
const getZodiacEmoji = (index) => {
  const zodiacEmojis = [
    "🐭",
    "🐮",
    "🐯",
    "🐰",
    "🐲",
    "🐍",
    "🐴",
    "🐑",
    "🐵",
    "🐔",
    "🐶",
    "🐷",
  ];
  return zodiacEmojis[index] || "";
};
</script>

<style lang="scss" scoped>
.earthly-branches-table-container {
  border: 2px solid #409eff;
  // border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  table {
    margin: 0;
  }
}

.earthly-branches-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  table-layout: fixed; /* 确保单元格宽度平均分配 */
}

/* 固定表头宽度，其他单元格平均分配 */
.earthly-branches-table th,
.earthly-branches-table td {
  border: 1px solid #dcdfe6;
  padding: 12px 8px;
  text-align: center;
  vertical-align: middle;
  line-height: 1.5;
  word-break: break-word;
  overflow: hidden;
}

/* 表头固定宽度 */
.table-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: bold;
  font-size: 14px;
  width: 80px; /* 固定表头宽度 */
  position: sticky;
  left: 0;
  z-index: 10;
}

/* 数据单元格宽度平均分配 */
.earthly-branches-table td {
  width: calc((100% - 80px) / 12); /* 12个单元格平均分配剩余宽度 */
}

/* 五行样式 */
.five-element-cell.metal {
  background-color: #f0f9eb;
  color: #67c23a;
  border: 1px solid #e1f3d8;
}
.five-element-cell.wood {
  background-color: #edf7f9;
  color: #13c2c2;
  border: 1px solid #b5f5ec;
}
.five-element-cell.water {
  background-color: #f0f9ff;
  color: #1890ff;
  border: 1px solid #d6e4ff;
}
.five-element-cell.fire {
  background-color: #fef0f0;
  color: #f56c6c;
  border: 1px solid #fcd3d3;
}
.five-element-cell.earth {
  background-color: #fdf6ec;
  color: #e6a23c;
  border: 1px solid #fce2be;
}

/* 阴阳样式 */
.attribute-cell.yang {
  background-color: #f0f9ff;
  color: #1890ff;
  font-weight: bold;
  border: 1px solid #d6e4ff;
}
.attribute-cell.yin {
  background-color: #f9f0ff;
  color: #722ed1;
  font-weight: bold;
  border: 1px solid #efdbff;
}

/* 方向样式 - 修复颜色问题 */
.direction-cell.north {
  background-color: #e6f7ff;
  color: #0050b3;
  border: 1px solid #bae7ff;
}
.direction-cell.east {
  background-color: #f6ffed;
  color: #389e0d;
  border: 1px solid #d9f7be;
}
.direction-cell.south {
  background-color: #fff2e8;
  color: #d46b08;
  border: 1px solid #ffd8bf;
}
.direction-cell.west {
  background-color: #fff7e6;
  color: #d48806; /* 改为金色/黄色系，不是紫色 */
  border: 1px solid #ffe7ba;
}

/* 季节样式 */
.season-cell.spring {
  background-color: #f6ffed;
  color: #52c41a;
  border: 1px solid #d9f7be;
}
.season-cell.summer {
  background-color: #fff2e8;
  color: #fa8c16;
  border: 1px solid #ffd8bf;
}
.season-cell.autumn {
  background-color: #fff7e6;
  color: #faad14;
  border: 1px solid #ffe7ba;
}
.season-cell.winter {
  background-color: #e6f7ff;
  color: #1890ff;
  border: 1px solid #bae7ff;
}

/* 合并行样式 */
.merged-row td {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 16px;
}

.time-unit {
  background-color: #f0f9ff;
}

.year-unit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.month-unit {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
.day-unit {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.unit-text {
  font-size: 16px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

/* 锚点单元格样式 */
.term-position-cell.anchor-point {
  background-color: #fff7e6;
  color: #fa8c16;
  font-weight: bold;
  border: 2px solid #fa8c16 !important;
  position: relative;
}

.term-position-cell.anchor-point::after {
  content: "📍";
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 10px;
}

/* 修复生肖单元格样式 - 改为水平排列 */
.zodiac-cell .zodiac-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px; /* 图标和文字之间的间距 */
}

.zodiac-icon {
  font-size: 18px;
}

.zodiac-text {
  font-size: 14px;
  font-weight: bold;
}

/* 特定生肖颜色 */
.zodiac-cell.rat {
  background-color: #f0f9ff;
}
.zodiac-cell.ox {
  background-color: #f6ffed;
}
.zodiac-cell.tiger {
  background-color: #fff7e6;
}
.zodiac-cell.rabbit {
  background-color: #fff0f6;
}
.zodiac-cell.dragon {
  background-color: #f6ffed;
}
.zodiac-cell.snake {
  background-color: #f0f9ff;
}
.zodiac-cell.horse {
  background-color: #fff2e8;
}
.zodiac-cell.goat {
  background-color: #f6ffed;
}
.zodiac-cell.monkey {
  background-color: #fff7e6;
}
.zodiac-cell.rooster {
  background-color: #f0f9ff;
}
.zodiac-cell.dog {
  background-color: #fff2e8;
}
.zodiac-cell.pig {
  background-color: #fff0f6;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .earthly-branches-table {
    font-size: 12px;
  }

  .earthly-branches-table th,
  .earthly-branches-table td {
    padding: 8px 4px;
  }

  .table-header {
    width: 60px;
    font-size: 12px;
  }

  .earthly-branches-table td {
    width: calc((100% - 60px) / 12);
  }
}

@media (max-width: 768px) {
  .earthly-branches-table {
    font-size: 11px;
  }

  .zodiac-content {
    flex-direction: column;
    gap: 2px;
  }

  .zodiac-icon {
    font-size: 14px;
  }

  .zodiac-text {
    font-size: 11px;
  }
}

/* 打印样式 */
@media print {
  .earthly-branches-table-container {
    border: 1px solid #000;
    box-shadow: none;
  }

  .earthly-branches-table th,
  .earthly-branches-table td {
    border: 1px solid #000;
  }
}

/* 斑马纹效果 */
.earthly-branches-table tbody tr:nth-child(odd) {
  background-color: rgba(245, 247, 250, 0.3);
}

/* 鼠标悬停效果 */
.earthly-branches-table tbody tr:hover {
  background-color: rgba(64, 158, 255, 0.1);
}

.earthly-branches-table tbody tr:hover td {
  background-color: inherit;
}
</style>

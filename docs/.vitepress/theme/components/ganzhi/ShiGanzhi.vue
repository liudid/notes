<template>
  <IntroTitle
    text="时干支以“一日之内炁的流注次序”为切换依据，每两个小时，主导炁完成一次位置与性质的转移。"
  ></IntroTitle>
  <IntroTitle
    text="甲己还加甲，乙庚丙作初。丙辛从戊起，丁壬庚子居。戊癸起壬子，周而复始求。———《五鼠遁》"
  ></IntroTitle>
  <div class="yue-gan-zhi">
    <div class="legend">
      <div
        class="legend__item"
        v-for="(item, index) in legendData"
        :key="index"
        :class="{ current: currentLegendIndex === index }"
        @click="handleLegendClick(index)"
      >
        <span
          v-for="(gan, ganIndex) in item"
          :key="ganIndex"
          class="gan-item"
          :class="getGanElement(gan)"
          :style="{
            background: getElementColor(getGanElement(gan)),
            color: getGanElement(gan) === 'metal' ? '#333' : '',
          }"
        >
          {{ gan }}
        </span>
      </div>
    </div>
    <div
      v-for="(row, rowIndex) in data"
      :key="rowIndex"
      class="item"
      :class="{ 'row-highlight': currentLegendIndex === rowIndex }"
    >
      <div class="item__title">本日天干为：{{ row.riGan.join("、") }}</div>
      <ul class="row">
        <li
          v-for="(item, colIndex) in row.shiGan"
          :key="colIndex"
          class="cell"
          :class="{ highlight: highlightIndex === colIndex }"
        >
          <!-- 阴阳标识 -->
          <span class="yy" :class="item.yinYang">
            {{ item.yinYang === "yang" ? "阳" : "阴" }}
          </span>

          <!-- 天干地支主体 -->
          <div class="ganzhi-main">
            <!-- 天干 -->
            <div class="gan" :class="item.ganElement">
              {{ item.label.at(0) }}
            </div>

            <!-- 地支 -->
            <div class="zhi" :class="item.zhiElement">
              {{ item.label.at(1) }}
            </div>
          </div>
          <!-- 时辰显示 -->
          <div class="month-label">
            {{ getShiChenName(colIndex) }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

defineProps({
  highlightIndex: {
    type: Number,
    default: -1,
  },
});

// 节气名称映射
const shiChenNames = [
  "子时",
  "丑时",
  "寅时",
  "卯时",
  "辰时",
  "巳时",
  "午时",
  "未时",
  "申时",
  "酉时",
  "戌时",
  "亥时",
];

// 根据索引获取时辰名称
const getShiChenName = (index) => {
  return shiChenNames[index] || "";
};

// 当前选中的 legend 索引
const currentLegendIndex = ref(0);

// 处理 legend 点击
const handleLegendClick = (index) => {
  currentLegendIndex.value = index;
};

// 获取天干的五行元素
const getGanElement = (gan) => {
  const ganElementMap = {
    甲: "wood",
    乙: "wood",
    丙: "fire",
    丁: "fire",
    戊: "earth",
    己: "earth",
    庚: "metal",
    辛: "metal",
    壬: "water",
    癸: "water",
  };
  return ganElementMap[gan] || "";
};

// 五行对应的颜色
const getElementColor = (element) => {
  const colorMap = {
    wood: "#4caf50", // 木色
    fire: "#e53935", // 火色
    earth: "#bca360", // 土色
    metal: "#cfcfcf", // 金色
    water: "#1e88e5", // 水色
  };
  return colorMap[element] || "#999";
};

// ... data 部分保持不变 ...
const data = ref([
  {
    riGan: ["甲", "己"], // 甲己日
    shiGan: [
      {
        label: "甲子",
        ganElement: "wood",
        zhiElement: "water",
        yinYang: "yang",
      },
      {
        label: "乙丑",
        ganElement: "wood",
        zhiElement: "earth",
        yinYang: "yin",
      },
      {
        label: "丙寅",
        ganElement: "fire",
        zhiElement: "wood",
        yinYang: "yang",
      },
      { label: "丁卯", ganElement: "fire", zhiElement: "wood", yinYang: "yin" },
      {
        label: "戊辰",
        ganElement: "earth",
        zhiElement: "earth",
        yinYang: "yang",
      },
      {
        label: "己巳",
        ganElement: "earth",
        zhiElement: "fire",
        yinYang: "yin",
      },
      {
        label: "庚午",
        ganElement: "metal",
        zhiElement: "fire",
        yinYang: "yang",
      },
      {
        label: "辛未",
        ganElement: "metal",
        zhiElement: "earth",
        yinYang: "yin",
      },
      {
        label: "壬申",
        ganElement: "water",
        zhiElement: "metal",
        yinYang: "yang",
      },
      {
        label: "癸酉",
        ganElement: "water",
        zhiElement: "metal",
        yinYang: "yin",
      },
      {
        label: "甲戌",
        ganElement: "wood",
        zhiElement: "earth",
        yinYang: "yang",
      },
      {
        label: "乙亥",
        ganElement: "wood",
        zhiElement: "water",
        yinYang: "yin",
      },
    ],
  },
  {
    riGan: ["乙", "庚"], // 乙庚日
    shiGan: [
      {
        label: "丙子",
        ganElement: "fire",
        zhiElement: "water",
        yinYang: "yang",
      },
      {
        label: "丁丑",
        ganElement: "fire",
        zhiElement: "earth",
        yinYang: "yin",
      },
      {
        label: "戊寅",
        ganElement: "earth",
        zhiElement: "wood",
        yinYang: "yang",
      },
      {
        label: "己卯",
        ganElement: "earth",
        zhiElement: "wood",
        yinYang: "yin",
      },
      {
        label: "庚辰",
        ganElement: "metal",
        zhiElement: "earth",
        yinYang: "yang",
      },
      {
        label: "辛巳",
        ganElement: "metal",
        zhiElement: "fire",
        yinYang: "yin",
      },
      {
        label: "壬午",
        ganElement: "water",
        zhiElement: "fire",
        yinYang: "yang",
      },
      {
        label: "癸未",
        ganElement: "water",
        zhiElement: "earth",
        yinYang: "yin",
      },
      {
        label: "甲申",
        ganElement: "wood",
        zhiElement: "metal",
        yinYang: "yang",
      },
      {
        label: "乙酉",
        ganElement: "wood",
        zhiElement: "metal",
        yinYang: "yin",
      },
      {
        label: "丙戌",
        ganElement: "fire",
        zhiElement: "earth",
        yinYang: "yang",
      },
      {
        label: "丁亥",
        ganElement: "fire",
        zhiElement: "water",
        yinYang: "yin",
      },
    ],
  },
  {
    riGan: ["丙", "辛"], // 丙辛日
    shiGan: [
      {
        label: "戊子",
        ganElement: "earth",
        zhiElement: "water",
        yinYang: "yang",
      },
      {
        label: "己丑",
        ganElement: "earth",
        zhiElement: "earth",
        yinYang: "yin",
      },
      {
        label: "庚寅",
        ganElement: "metal",
        zhiElement: "wood",
        yinYang: "yang",
      },
      {
        label: "辛卯",
        ganElement: "metal",
        zhiElement: "wood",
        yinYang: "yin",
      },
      {
        label: "壬辰",
        ganElement: "water",
        zhiElement: "earth",
        yinYang: "yang",
      },
      {
        label: "癸巳",
        ganElement: "water",
        zhiElement: "fire",
        yinYang: "yin",
      },
      {
        label: "甲午",
        ganElement: "wood",
        zhiElement: "fire",
        yinYang: "yang",
      },
      {
        label: "乙未",
        ganElement: "wood",
        zhiElement: "earth",
        yinYang: "yin",
      },
      {
        label: "丙申",
        ganElement: "fire",
        zhiElement: "metal",
        yinYang: "yang",
      },
      {
        label: "丁酉",
        ganElement: "fire",
        zhiElement: "metal",
        yinYang: "yin",
      },
      {
        label: "戊戌",
        ganElement: "earth",
        zhiElement: "earth",
        yinYang: "yang",
      },
      {
        label: "己亥",
        ganElement: "earth",
        zhiElement: "water",
        yinYang: "yin",
      },
    ],
  },
  {
    riGan: ["丁", "壬"], // 丁壬日
    shiGan: [
      {
        label: "庚子",
        ganElement: "metal",
        zhiElement: "water",
        yinYang: "yang",
      },
      {
        label: "辛丑",
        ganElement: "metal",
        zhiElement: "earth",
        yinYang: "yin",
      },
      {
        label: "壬寅",
        ganElement: "water",
        zhiElement: "wood",
        yinYang: "yang",
      },
      {
        label: "癸卯",
        ganElement: "water",
        zhiElement: "wood",
        yinYang: "yin",
      },
      {
        label: "甲辰",
        ganElement: "wood",
        zhiElement: "earth",
        yinYang: "yang",
      },
      { label: "乙巳", ganElement: "wood", zhiElement: "fire", yinYang: "yin" },
      {
        label: "丙午",
        ganElement: "fire",
        zhiElement: "fire",
        yinYang: "yang",
      },
      {
        label: "丁未",
        ganElement: "fire",
        zhiElement: "earth",
        yinYang: "yin",
      },
      {
        label: "戊申",
        ganElement: "earth",
        zhiElement: "metal",
        yinYang: "yang",
      },
      {
        label: "己酉",
        ganElement: "earth",
        zhiElement: "metal",
        yinYang: "yin",
      },
      {
        label: "庚戌",
        ganElement: "metal",
        zhiElement: "earth",
        yinYang: "yang",
      },
      {
        label: "辛亥",
        ganElement: "metal",
        zhiElement: "water",
        yinYang: "yin",
      },
    ],
  },
  {
    riGan: ["戊", "癸"], // 戊癸日
    shiGan: [
      {
        label: "壬子",
        ganElement: "water",
        zhiElement: "water",
        yinYang: "yang",
      },
      {
        label: "癸丑",
        ganElement: "water",
        zhiElement: "earth",
        yinYang: "yin",
      },
      {
        label: "甲寅",
        ganElement: "wood",
        zhiElement: "wood",
        yinYang: "yang",
      },
      { label: "乙卯", ganElement: "wood", zhiElement: "wood", yinYang: "yin" },
      {
        label: "丙辰",
        ganElement: "fire",
        zhiElement: "earth",
        yinYang: "yang",
      },
      { label: "丁巳", ganElement: "fire", zhiElement: "fire", yinYang: "yin" },
      {
        label: "戊午",
        ganElement: "earth",
        zhiElement: "fire",
        yinYang: "yang",
      },
      {
        label: "己未",
        ganElement: "earth",
        zhiElement: "earth",
        yinYang: "yin",
      },
      {
        label: "庚申",
        ganElement: "metal",
        zhiElement: "metal",
        yinYang: "yang",
      },
      {
        label: "辛酉",
        ganElement: "metal",
        zhiElement: "metal",
        yinYang: "yin",
      },
      {
        label: "壬戌",
        ganElement: "water",
        zhiElement: "earth",
        yinYang: "yang",
      },
      {
        label: "癸亥",
        ganElement: "water",
        zhiElement: "water",
        yinYang: "yin",
      },
    ],
  },
]);

const legendData = data.value.map((item) => {
  return item.riGan;
});
</script>

<style lang="scss" scoped>
.yue-gan-zhi {
  display: inline-block;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li + li {
  margin-top: 0 !important;
}

.legend {
  display: flex;
  gap: 6px;
  background: #fff;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 24px;
  &__item {
    width: 110px;
    height: 42px;
    border-radius: 6px;
    position: relative;
    transition: all 0.2s ease;
    cursor: pointer;
    display: flex;
    overflow: hidden;
    background: #f5f5f5;
    border: 2px solid transparent;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    &.current {
      transform: translateY(-6px) scale(1.05);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35), 0 12px 24px rgba(0, 0, 0, 0.2),
        0 16px 32px rgba(0, 0, 0, 0.15);
      z-index: 20;
      border: 2px solid #ff9800;
      transition: all 0.3s ease;
    }

    .gan-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
      color: #fff;

      &:first-child {
        border-right: 1px solid rgba(255, 255, 255, 0.3);
      }

      &.wood {
        background: #2e7d32;
      }
      &.fire {
        background: #c62828;
      }
      &.earth {
        background: #9e7c3a;
      }
      &.metal {
        background: #757575;
      }
      &.water {
        background: #1565c0;
      }
    }
  }
}

.item {
  border-collapse: collapse;
  user-select: none;
  border: 1px solid #999;
  transition: all 0.3s ease;

  & + & {
    margin-top: 24px;
  }

  &__title {
    font-weight: bold;
    text-align: center;
    padding: 8px;
    background: #f5f5f5;
    transition: all 0.3s ease;
  }

  // 行高亮效果
  &.row-highlight {
    border: 2px solid #ff9800;
    box-shadow: 0 0 20px rgba(255, 152, 0, 0.3);

    .item__title {
      background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
      color: white;
      font-weight: bold;
    }
  }
}

.row {
  display: flex;
  align-items: flex-start;
  border-top: 1px solid #999;
}

.cell {
  position: relative;
  width: 52px;
  // height: 72px; // 增加高度以容纳月份标签
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 4px 0;

  // 网格边框优化
  border-right: 1px solid #999;
  border-bottom: 1px solid #999;

  &:last-child {
    border-right: none; // 最右列
  }

  .row:last-child & {
    border-bottom: none; // 最后一行
  }

  // 阴阳标识
  .yy {
    position: absolute;
    top: 12px; // 调整位置给月份留出空间
    right: 2px;
    font-size: 10px;
    font-weight: bold;
  }

  .yy.yang {
    color: #ff9800;
  }
  .yy.yin {
    color: #5c6bc0;
  }

  // 天干地支容器
  .ganzhi-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    justify-content: center;
  }

  .gan {
    font-size: 18px;
    font-weight: bold;
    line-height: 1;
  }
  .zhi {
    font-size: 14px;
    margin-top: 2px;
    line-height: 1;
  }

  // 月份标签
  .month-label {
    font-size: 11px;
    color: #666;
    font-weight: bold;
    text-align: center;
    margin-top: 2px;
    background: rgba(245, 245, 245, 0.7);
    padding: 1px 3px;
    border-radius: 2px;
    width: 100%;
  }

  // 五行颜色
  .wood {
    color: #2e7d32;
  }
  .fire {
    color: #c62828;
  }
  .earth {
    color: #9e7c3a;
  }
  .metal {
    color: #757575;
  }
  .water {
    color: #1565c0;
  }

  // 鼠标悬停高亮
  &.highlight {
    // transform: translateY(-4px); /* 悬浮更明显 */
    z-index: 20;
    /* 多层阴影，增强立体感 */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35), 0 4px 6px rgba(0, 0, 0, 0.25),
      0 2px 4px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.2s ease, transform 0.2s ease;

    .month-label {
      background: rgba(255, 152, 0, 0.1);
      color: #ff9800;
    }
  }
}
.desc {
  font-weight: bold;
  font-size: 18px;
  font-family: "KaiTi", "STKaiti", serif;
  color: #d32f2f;
}
</style>

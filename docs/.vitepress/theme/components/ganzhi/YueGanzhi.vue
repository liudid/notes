<template>
  <IntroTitle
    text="月干支：该年气机在进入春令时，“最需要哪一种阳性相位来完成展开”"
  ></IntroTitle>
  <IntroTitle
    text="甲己之年丙作首，乙庚之岁戊为头。
丙辛必定寻庚起，丁壬壬位顺行流。
若问戊癸何方发，甲寅之上好追求。———《五虎遁元》"
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
      <div class="item__title">本年天干为：{{ row.nianGan.join("、") }}</div>
      <ul class="row">
        <li
          v-for="(item, colIndex) in row.yueGan"
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
          <!-- 节气显示 -->
          <div class="month-label">
            {{ getJieName(colIndex) }}
          </div>
          <!-- 月份显示 -->
          <div class="month-label">
            {{ getMonthName(colIndex) }}
          </div>
        </li>
      </ul>
    </div>
  </div>
  <IntroFrom
    text="甲年，年气以阳木为主，木气已开，但仍属内在生发，需要通过火的显化才能外达万物；
己年，年气以阴土为主，土气已成，具备承载之实，但缺乏启动与外推能力，需经“土生木而火显”方能展开。
丙为火之开位，是五行中最稳定、最直接的显化发动相，
故甲、己二年，入春之月皆以丙为起干。"
  ></IntroFrom>
  <IntroFrom
    text="乙年，年气为阴木，木性内敛，虽具生机却不足以直接外发；
庚年，年气为阳金，金性刚断，若直接应春，易形成生机之伤。
二者在入春展开时，均需一稳定、缓冲、承载之中介相位，以平衡内敛与刚烈。
戊为阳土，具承载、调和、奠基之功，是展开前必需的结构平台，
故乙、庚二年，正月以戊为起干。"
  ></IntroFrom>
  <IntroFrom
    text="丙年，年气为阳火，火性外放，至年终已极，入春需转化为可定型、可承载之形；
辛年，年气为阴金，金性内藏，虽具收敛之质，但尚未成形。
入春之际，二者皆需一“成形、立则、定质”的阳性相位，以完成由气向形的转换。
庚为金之开位，主成形、定序、立法，
故丙、辛二年，正月以庚为起干。"
  ></IntroFrom>
  <IntroFrom
    text="丁年，年气为阴火，火藏于内，温而不达，需借流动以完成展开；
壬年，年气为阳水，水性本具通达、贯流之势，最宜作为展开之主导相。
入春之时，气机首重“贯通、流布、启动循环”，
壬为水之开位，主通达、运行、生机布散，
故丁、壬二年，正月以壬为起干。"
  ></IntroFrom>
  <IntroFrom
    text="戊年，年气为阳土，土厚而实，具稳定之功，却缺乏发动之力；
癸年，年气为阴水，水藏于内，生机潜伏而未显。
入春之际，气机需一能破土、引生、开启新一轮循环的发动相。
甲为木之开位，主破、起、生、达，是春令发动的根本相位，
故戊、癸二年，正月以甲为起干。"
  ></IntroFrom>
</template>

<script setup>
import { ref, computed } from "vue";

defineProps({
  highlightIndex: {
    type: Number,
    default: -1,
  },
});

// 月份名称映射
const monthNames = [
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
  "冬月",
  "腊月",
];

// 节气名称映射
const jieNames = [
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
  "大雪",
  "小寒",
];

// 根据索引获取月份名称
const getMonthName = (index) => {
  return monthNames[index] || "";
};
// 根据索引获取节气名称
const getJieName = (index) => {
  return jieNames[index] || "";
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
    nianGan: ["甲", "己"],
    yueGan: [
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
    ],
  },
  {
    nianGan: ["乙", "庚"],
    yueGan: [
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
    ],
  },
  {
    nianGan: ["丙", "辛"],
    yueGan: [
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
    ],
  },
  {
    nianGan: ["丁", "壬"],
    yueGan: [
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
    ],
  },
  {
    nianGan: ["戊", "癸"],
    yueGan: [
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
    ],
  },
]);

const legendData = data.value.map((item) => {
  return item.nianGan;
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

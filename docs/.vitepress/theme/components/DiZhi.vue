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
            v-for="(item, index) in view"
            :key="index"
            class="eb-cell"
            :class="['five-element-cell', getElementClass(item.common.wuXing)]"
          >
            {{ item.label }}
          </td>
        </tr>

        <!-- 第二行：五行 -->
        <tr>
          <th class="table-header">五行</th>
          <td
            v-for="(item, index) in view"
            :key="index"
            :class="['five-element-cell', getElementClass(item.common.wuXing)]"
          >
            {{ item.common.wuXing }}
          </td>
        </tr>

        <!-- 第三行：属性 -->
        <tr>
          <th class="table-header">属性</th>
          <td
            v-for="(item, index) in view"
            :key="index"
            :class="['attribute-cell', getAttributeClass(item.common.yinYang)]"
          >
            {{ item.common.yinYang }}
          </td>
        </tr>

        <!-- 第四行：气机阶段 -->
        <tr>
          <th class="table-header">气机阶段</th>
          <td v-for="(item, index) in view" :key="index" class="qi-stage-cell">
            {{ item.common.qiJiJieDuan }}
          </td>
        </tr>

        <!-- 第五行：核心象 -->
        <tr>
          <th class="table-header">核心象</th>
          <td
            v-for="(item, index) in view"
            :key="index"
            class="core-symbol-cell"
          >
            {{ item.common.heXinXiang }}
          </td>
        </tr>

        <!-- 第六行：描述 -->
        <tr>
          <th class="table-header">描述</th>
          <td
            v-for="(item, index) in view"
            :key="index"
            class="description-cell"
          >
            {{ item.common.miaoShu }}
          </td>
        </tr>

        <!-- 第七行：气机方位 -->
        <tr>
          <th class="table-header">气机方位</th>
          <td v-for="(item, index) in view" :key="index">
            {{ item.common.qiJiFangWei }}
          </td>
        </tr>

        <!-- 第七行：空间方向 -->
        <tr>
          <th class="table-header">空间方向</th>
          <td v-for="(item, index) in view" :key="index">
            {{ item.common.kongJianFangXiang }}
          </td>
        </tr>
        <tr>
          <th class="table-header">方向类型</th>
          <td v-for="(item, index) in view" :key="index">
            {{ item.spacePosition }}
          </td>
        </tr>

        <!-- 第七行：四象归属 -->
        <tr>
          <th class="table-header">四象归属</th>
          <td v-for="(item, index) in view" :key="index">
            {{ item.common.siXiangGuiShu }}
          </td>
        </tr>

        <!-- 第七行：藏干-->
        <!-- <tr>
          <th class="table-header">藏干</th>
          <td v-for="(item, index) in view" :key="index">
            <div class="canggan-container">
              <div
                v-for="(cg, cIndex) in item.common.cangGan"
                :key="cIndex"
                :class="[
                  'canggan-item',
                  getElementClass(cg.wuXing),
                  `role-${getRoleClass(cg.role)}`,
                ]"
                :title="`${cg.stem}·${cg.role}（${cg.yinYang}${cg.wuXing}）`"
              >
                <div class="canggan-content">
                  <div class="canggan-main">
                    <span class="canggan-stem">{{ cg.stem }}</span>
                    <span class="canggan-divider">·</span>
                    <span class="canggan-role">{{ cg.role }}</span>
                  </div>
                  <div class="canggan-details">
                    <span
                      class="canggan-yinyang"
                      :class="cg.yinYang === '阳' ? 'yang' : 'yin'"
                    >
                      {{ cg.yinYang }}
                    </span>
                    <span class="canggan-wuxing">{{ cg.wuXing }}</span>
                  </div>
                </div>
                <div
                  class="canggan-indicator"
                  :class="`indicator-${getRoleClass(cg.role)}`"
                ></div>
              </div>
            </div>
          </td>
        </tr> -->
        <tr>
          <th class="table-header">藏干</th>
          <td
            v-for="(item, index) in view"
            :key="index"
            style="vertical-align: top"
          >
            <div class="canggan-container">
              <div
                v-for="(cg, cIndex) in item.common.cangGan"
                :key="cIndex"
                class="canggan-item"
                :class="`role-${getRoleClass(cg.role)}`"
              >
                <div class="canggan-header">
                  <div style="display: flex">
                    <span
                      class="canggan-stem"
                      :class="getElementClass(cg.wuXing)"
                    >
                      {{ cg.stem }}
                    </span>
                    <div class="canggan-info">
                      <span
                        class="canggan-yinyang"
                        :class="cg.yinYang === '阳' ? 'yang' : 'yin'"
                      >
                        {{ cg.yinYang }}
                      </span>
                      <span
                        class="canggan-wuxing"
                        :class="getElementClass(cg.wuXing)"
                      >
                        {{ cg.wuXing }}
                      </span>
                    </div>
                  </div>
                  <span class="canggan-role">{{ cg.role }}</span>
                </div>
              </div>
            </div>
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
          <th class="table-header">属相</th>
          <td
            v-for="(item, index) in view"
            :key="index"
            :class="['zodiac-cell', getZodiacClass(index)]"
          >
            <div class="zodiac-content">
              <span class="zodiac-icon">{{ getZodiacEmoji(index) }}</span>
              <span class="zodiac-text">{{ item.year.shengXiao }}</span>
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
            v-for="(item, index) in view"
            :key="index"
            class="solar-term-cell"
          >
            {{ item.month.jie }}
          </td>
        </tr>

        <!-- 第十二行：中气 -->
        <tr>
          <th class="table-header">中气</th>
          <td v-for="(item, index) in view" :key="index" class="mid-qi-cell">
            {{ item.month.zhongQi }}
          </td>
        </tr>

        <!-- 第十四行：农历月 -->
        <tr>
          <th class="table-header">农历月</th>
          <td
            v-for="(item, index) in view"
            :key="index"
            class="lunar-month-cell"
          >
            {{ item.month.nongLiYue }}
          </td>
        </tr>

        <!-- 第十三行：季节 -->
        <tr>
          <th class="table-header">季节</th>
          <td
            v-for="(item, index) in view"
            :key="index"
            :class="['season-cell', getSeasonClass(item.month.jiJie)]"
          >
            {{ item.month.jiJie }}
          </td>
        </tr>

        <!-- 第十六行：太阳黄经 -->
        <tr>
          <th class="table-header">太阳黄经</th>
          <td
            v-for="(item, index) in view"
            :key="index"
            class="solar-longitude-cell term-position-cell anchor-point"
          >
            {{ item.month.taiYangHuangJing[0] }} -
            {{ item.month.taiYangHuangJing[1] }}
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
            v-for="(item, index) in view"
            :key="index"
            class="time-period-cell"
          >
            {{ item.day.timeRange[0] }} - {{ item.day.timeRange[1] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import diZhiData from "../config/diZhiData.json";

const view = ref(diZhiData);

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

// 获取藏干角色对应的样式类
const getRoleClass = (role) => {
  const roleMap = {
    本气: "main",
    中气: "middle",
    余气: "remaining",
  };
  return roleMap[role] || "other";
};
</script>

<style lang="scss" scoped>
.eb-cell {
  font-weight: bold;
}
.earthly-branches-table-container {
  margin-top: 26px;
  border: 2px solid #409eff;
  // border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  table {
    margin: 0;
  }
  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li + li {
    margin-top: 4px;
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
  // background-color: #f0f9ff;
  // color: #1890ff;
  // font-weight: bold;
  // border: 1px solid #d6e4ff;
  background: linear-gradient(to right, #ffebee, #ffcdd2);
  color: #d32f2f;
  font-weight: bold;
}
.attribute-cell.yin {
  // background-color: #f9f0ff;
  // color: #722ed1;
  // font-weight: bold;
  // border: 1px solid #efdbff;
  background: linear-gradient(to right, #e8eaf6, #c5cae9);
  color: #303f9f;
  font-weight: bold;
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

// /* 藏干容器样式 */
// .canggan-container {
//   display: flex;
//   flex-direction: column;
//   gap: 6px;
// }

// /* 藏干项基础样式 */
// .canggan-item {
//   position: relative;
//   border-radius: 6px;
//   padding: 8px 6px;
//   min-height: 40px;
//   display: flex;
//   align-items: center;
//   transition: all 0.3s ease;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   overflow: hidden;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
//   }

//   // 角色指示条
//   .canggan-indicator {
//     position: absolute;
//     left: 0;
//     top: 0;
//     bottom: 0;
//     width: 4px;
//   }

//   &.role-main .canggan-indicator {
//     background: linear-gradient(to bottom, #ff6b6b, #ee5a52);
//   }

//   &.role-middle .canggan-indicator {
//     background: linear-gradient(to bottom, #4ecdc4, #44a08d);
//   }

//   &.role-remaining .canggan-indicator {
//     background: linear-gradient(to bottom, #ffeaa7, #fab1a0);
//   }
// }

// /* 藏干内容布局 */
// .canggan-content {
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   gap: 4px;
//   margin-left: 4px;
// }

// .canggan-main {
//   display: flex;
//   align-items: center;
//   gap: 2px;
//   font-weight: bold;
//   font-size: 12px;

//   .canggan-stem {
//     font-size: 14px;
//     font-weight: bold;
//   }

//   .canggan-divider {
//     color: rgba(255, 255, 255, 0.6);
//     margin: 0 2px;
//   }

//   .canggan-role {
//     font-size: 10px;
//     opacity: 0.9;
//   }
// }

// .canggan-details {
//   display: flex;
//   align-items: center;
//   gap: 4px;
//   font-size: 10px;
//   opacity: 0.9;

//   .canggan-yinyang {
//     padding: 1px 4px;
//     border-radius: 3px;
//     font-weight: bold;

//     &.yang {
//       background: rgba(255, 255, 255, 0.2);
//       color: #ffeb3b;
//     }

//     &.yin {
//       background: rgba(0, 0, 0, 0.2);
//       color: #e1bee7;
//     }
//   }
// }

// /* 五行颜色样式 */
// .canggan-item.metal {
//   background: linear-gradient(
//     135deg,
//     rgba(96, 125, 139, 0.15) 0%,
//     rgba(69, 90, 100, 0.25) 100%
//   );
//   border: 1px solid rgba(96, 125, 139, 0.3);
//   color: #37474f;

//   .canggan-stem {
//     color: #455a64;
//   }

//   &.role-main {
//     background: linear-gradient(
//       135deg,
//       rgba(96, 125, 139, 0.25) 0%,
//       rgba(69, 90, 100, 0.35) 100%
//     );
//     border: 1px solid rgba(96, 125, 139, 0.4);
//   }
// }

// .canggan-item.wood {
//   background: linear-gradient(
//     135deg,
//     rgba(102, 187, 106, 0.15) 0%,
//     rgba(56, 142, 60, 0.25) 100%
//   );
//   border: 1px solid rgba(102, 187, 106, 0.3);
//   color: #1b5e20;

//   .canggan-stem {
//     color: #2e7d32;
//   }

//   &.role-main {
//     background: linear-gradient(
//       135deg,
//       rgba(102, 187, 106, 0.25) 0%,
//       rgba(56, 142, 60, 0.35) 100%
//     );
//     border: 1px solid rgba(102, 187, 106, 0.4);
//   }
// }

// .canggan-item.water {
//   background: linear-gradient(
//     135deg,
//     rgba(66, 165, 245, 0.15) 0%,
//     rgba(21, 101, 192, 0.25) 100%
//   );
//   border: 1px solid rgba(66, 165, 245, 0.3);
//   color: #0d47a1;

//   .canggan-stem {
//     color: #1565c0;
//   }

//   &.role-main {
//     background: linear-gradient(
//       135deg,
//       rgba(66, 165, 245, 0.25) 0%,
//       rgba(21, 101, 192, 0.35) 100%
//     );
//     border: 1px solid rgba(66, 165, 245, 0.4);
//   }
// }

// .canggan-item.fire {
//   background: linear-gradient(
//     135deg,
//     rgba(239, 83, 80, 0.15) 0%,
//     rgba(198, 40, 40, 0.25) 100%
//   );
//   border: 1px solid rgba(239, 83, 80, 0.3);
//   color: #b71c1c;

//   .canggan-stem {
//     color: #c62828;
//   }

//   &.role-main {
//     background: linear-gradient(
//       135deg,
//       rgba(239, 83, 80, 0.25) 0%,
//       rgba(198, 40, 40, 0.35) 100%
//     );
//     border: 1px solid rgba(239, 83, 80, 0.4);
//   }
// }

// .canggan-item.earth {
//   background: linear-gradient(
//     135deg,
//     rgba(255, 167, 38, 0.15) 0%,
//     rgba(245, 124, 0, 0.25) 100%
//   );
//   border: 1px solid rgba(255, 167, 38, 0.3);
//   color: #e65100;

//   .canggan-stem {
//     color: #ef6c00;
//   }

//   &.role-main {
//     background: linear-gradient(
//       135deg,
//       rgba(255, 167, 38, 0.25) 0%,
//       rgba(245, 124, 0, 0.35) 100%
//     );
//     border: 1px solid rgba(255, 167, 38, 0.4);
//   }
// }

// /* 角色强化样式 */
// .role-main {
//   font-weight: bold;

//   .canggan-stem {
//     text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
//   }

//   .canggan-role {
//     background: rgba(255, 255, 255, 0.3);
//     padding: 1px 4px;
//     border-radius: 3px;
//   }
// }

// .role-middle {
//   .canggan-role {
//     color: #00acc1;
//   }
// }

// .role-remaining {
//   .canggan-role {
//     color: #78909c;
//   }
// }

// /* 响应式调整 */
// @media (max-width: 768px) {
//   .canggan-item {
//     padding: 6px 4px;
//     min-height: 36px;
//   }

//   .canggan-main {
//     font-size: 11px;

//     .canggan-stem {
//       font-size: 12px;
//     }
//   }

//   .canggan-details {
//     font-size: 9px;
//   }
// }
/* 藏干容器样式 */
.canggan-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 藏干项基础样式 */
.canggan-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 6px;
  border-radius: 6px;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  min-width: 65px;
  text-align: center;

  /* 默认角色样式 - 余气最浅 */
  &.role-remaining {
    background-color: rgba(245, 245, 245, 0.7);
    border-color: rgba(0, 0, 0, 0.05);
  }

  /* 中气中等深浅 */
  &.role-middle {
    background-color: rgba(225, 225, 225, 0.7);
    border-color: rgba(0, 0, 0, 0.08);
  }

  /* 本气最深 */
  &.role-main {
    background-color: rgba(200, 200, 200, 0.7);
    border-color: rgba(0, 0, 0, 0.12);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

/* 藏干头部 */
.canggan-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.canggan-stem {
  font-size: 18px;
  font-weight: bold;
  line-height: 1;

  /* 五行字体颜色 */
  &.metal {
    color: #455a64;
  }

  &.wood {
    color: #2e7d32;
  }

  &.water {
    color: #1565c0;
  }

  &.fire {
    color: #c62828;
  }

  &.earth {
    color: #ef6c00;
  }
}

.canggan-role {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-top: 4px;

  /* 根据角色调整标签颜色 */
  .role-main & {
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
    color: white;
  }

  .role-middle & {
    background: linear-gradient(135deg, #4ecdc4, #44a08d);
    color: white;
  }

  .role-remaining & {
    background: linear-gradient(135deg, #a8edea, #fed6e3);
    color: #666;
  }
}

/* 藏干信息 */
.canggan-info {
  font-size: 11px;
  font-weight: 500;
  writing-mode: vertical-rl;

  .canggan-yinyang {
    &.yang {
      color: #d84315;
      position: relative;
    }

    &.yin {
      color: #5e35b1;
      position: relative;
    }
  }

  .canggan-wuxing {
    /* 保持五行字体颜色一致 */
    &.metal {
      color: #455a64;
    }

    &.wood {
      color: #2e7d32;
    }

    &.water {
      color: #1565c0;
    }

    &.fire {
      color: #c62828;
    }

    &.earth {
      color: #ef6c00;
    }
  }
}

/* 角色强化效果 */
.role-main {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    right: 2px;
    width: 6px;
    height: 6px;
    background-color: #ff6b6b;
    border-radius: 50%;
    box-shadow: 0 0 4px rgba(255, 107, 107, 0.8);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .canggan-item {
    min-width: 55px;
    padding: 6px 4px;
  }

  .canggan-stem {
    font-size: 16px;
  }

  .canggan-role {
    font-size: 10px;
    padding: 1px 4px;
  }

  .canggan-info {
    font-size: 10px;
    gap: 6px;
  }
}
</style>

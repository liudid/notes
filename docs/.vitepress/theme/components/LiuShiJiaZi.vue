<template>
  <div class="liu-shi-jia-zi">
    <ul class="row" v-for="(row, rowIndex) in rows" :key="rowIndex">
      <li
        v-for="(item, colIndex) in row"
        :key="item.index"
        class="cell"
        :class="{ highlight: highlightIndex === item.index }"
      >
        <!-- 阴阳标识 -->
        <span class="yy" :class="item.yinYang">
          {{ item.yinYang === "yang" ? "阳" : "阴" }}
        </span>

        <!-- 天干 -->
        <div class="gan" :class="item.gan.element">
          {{ item.gan.name }}
        </div>

        <!-- 地支 -->
        <div class="zhi" :class="item.zhi.element">
          {{ item.zhi.name }}
        </div>
        <!-- 属相显示 -->
        <!-- <div class="month-label">
          {{ getShuXiangNames(colIndex) }}
        </div> -->
        <!-- <el-popover
          width="700px"
          :content="getYearsByGanZhi(item.index).slice(0, 110).join('、')"
          placement="top-start"
        >
          <template #reference>
            <el-button>top-start</el-button>
          </template>
        </el-popover> -->
      </li>
    </ul>
    <p style="text-align: center">
      参照：“天（五运）× 地（六气）”构成的整体气机相位循环。
      既炁在天地之间完成一次完整展开—回收的呼吸周期。
    </p>
  </div>
  <div class="desc">
    <p>“天以六十为一周。” ————《汉书·律历志》</p>
    <p>“干支所以纪日月星辰之行，终而复始。” ————《后汉书·律历志》</p>
    <p>一元为六十年（一甲子）————《皇极经世》</p>
    <el-divider></el-divider>
    <div class="desc">
      <p>六十甲子不是人为发明，是炁一旦开始有秩序，就必然长成这个样子</p>
      <p>
        六十甲子循环的是炁，并不是“时间在转”，而是“炁的呼吸周期”，更加深刻说是「炁在天地之间完成一次完整展开—回收的呼吸」，呼吸不是“时间单位”，
        而是「周期结构」本身。
      </p>
      <p>
        元 =
        炁完成一次“自我同构”的最小闭环。且不是时间、不是年数、不是抽象概念。
        少于六十 → 信息不全。 多于六十 →
        信息开始重复、折叠。究其根本：“元”不是时间概念，时间只是“元在地上的投影”。
      </p>
      <p>
        为什么偏偏是六十？ 因为在“时间层”里，这个闭环第一次完全对齐了三件事：
      </p>
      <p>天干：五行之炁全部开合完 地支：十二相位全部走一遍</p>
      <p>阴阳：生、长、化、收、藏完整闭合</p>
      <p>十 × 十二 =六十，是第一次“全信息、不重复、不残缺”的同步。</p>
      <p>所以： 一甲子 = 一元（在时间层的投影）</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TIAN_GAN, DI_ZHI } from "../config/ganZhi"; // 公共配置

defineProps({
  highlightIndex: {
    type: Number,
    default: -1,
  },
});

// 六十甲子
const liuShiJiaZi = Array.from({ length: 60 }, (_, i) => {
  const gan = TIAN_GAN[i % 10];
  const zhi = DI_ZHI[i % 12];
  return { index: i, gan, zhi, yinYang: gan.yinYang };
});

console.log(liuShiJiaZi);

// 6 × 10
const rows = Array.from({ length: 6 }, (_, i) =>
  liuShiJiaZi.slice(i * 10, i * 10 + 10)
);
console.log(rows);

const getShuXiangNames = (index) => {
  const shuXiangNames = [
    "🐭",
    "🐮",
    "🐯",
    "🐰",
    "🐲",
    "🐍",
    "🐎",
    "🐑",
    "🐒",
    "🐔",
    "🐶",
    "🐷",
  ];
  return shuXiangNames[index % 12];
};

/**
 * 根据年天干地支，计算对应的年份（可追溯到几千年前）
 * @param {string} tg - 年天干，例如 "甲"
 * @param {string} dz - 年地支，例如 "子"
 * @param {number} baseYear - 可选基准年份，默认 1984 (甲子年)
 * @returns {string[]} - 对应的年份数组，格式 "公元前XXX年" 或 "公元XXX年"
 */
function getYearsByGanZhi(index, baseYear = 1984) {
  // const index = jiaZi.indexOf(tg + dz);
  // if (index === -1) return [];

  const years = [];
  // 我们从基准年份向前/向后推多个甲子循环
  const range = 100; // 这里假设返回 ±100 甲子（6000年）左右
  for (let k = -range; k <= range; k++) {
    const year = baseYear + k * 60 + (index - 0);
    if (year > 0) {
      years.push(`${year}`);
    } else {
      years.push(`公元前${1 - year}`); // 公元前1年 -> year = 0
    }
  }
  return years;
}

// 示例：
// console.log(getYearsByGanZhi("甲", "子").slice(0, 5)); // 前5个年份
</script>

<style lang="scss">
.liu-shi-jia-zi {
  display: inline-block;
  border-collapse: collapse;
  user-select: none;
  border: 1px solid #999;
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

.row {
  display: flex;
  align-items: flex-start;
}

.cell {
  position: relative;
  width: 52px;
  height: 62px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

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
    bottom: 2px;
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

  .gan {
    font-size: 18px;
    font-weight: bold;
    line-height: 1;
  }
  .zhi {
    font-size: 14px;
    margin-top: 4px;
    line-height: 1;
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
  }
}
.desc {
  font-weight: bold;
  font-size: 18px;
  font-family: "KaiTi", "STKaiti", serif;
  color: #d32f2f;
}
</style>

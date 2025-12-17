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
      </li>
    </ul>
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

const hoveredIndex = ref(null);

// 六十甲子
const liuShiJiaZi = Array.from({ length: 60 }, (_, i) => {
  const gan = TIAN_GAN[i % 10];
  const zhi = DI_ZHI[i % 12];
  return { index: i, gan, zhi, yinYang: gan.yinYang };
});

// 6 × 10
const rows = Array.from({ length: 6 }, (_, i) =>
  liuShiJiaZi.slice(i * 10, i * 10 + 10)
);
</script>

<style lang="scss" scoped>
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
    transform: translateY(-4px); /* 悬浮更明显 */
    z-index: 20;
    /* 多层阴影，增强立体感 */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35), 0 4px 6px rgba(0, 0, 0, 0.25),
      0 2px 4px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
  }
}
</style>

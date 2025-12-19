<template>
  <IntroTitle
    text="何为行：炁之所行，既炁的一开一合（一呼一吸、一阳一阴）。五行为五种炁的运行方式，既五种炁运行的五个节律。"
  ></IntroTitle>
  <div class="wu-xing-wrapper">
    <!-- 左侧 -->
    <div class="sidebar">
      <!-- 图例：5个小球和阴阳标记 -->
      <div class="legend">
        <div v-for="e in elements" :key="e.name" class="legend-item">
          <div class="legend-ball" :class="e.class"></div>
          <div class="legend-line-container">
            <!-- 线条 -->
            <div class="legend-line">
              <div class="line-segment yang">
                <span class="yin-yang-label">阳</span>
                <span class="hu-xi-label">呼</span>
              </div>
              <div class="line-segment yin">
                <span class="yin-yang-label">阴</span>
                <span class="hu-xi-label">吸</span>
              </div>
            </div>
            <!-- 标记 -->
            <div class="legend-markers">
              <div class="marker-left">
                <span class="marker-gan">{{ e.gan.yang }}</span>
                <span class="marker-zhi">{{ e.zhi.yang }}</span>
              </div>
              <div class="marker-right">
                <span class="marker-gan">{{ e.gan.yin }}</span>
                <span class="marker-zhi">{{ e.zhi.yin }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 中间五行球 -->
      <div class="center-area">
        <div
          v-for="e in elements"
          :key="e.name"
          class="ball"
          :class="[e.class, hoverClass(e)]"
          :style="ballPositionStyle(e.name)"
          @mouseenter="hoverElement(e)"
          @mouseleave="leaveElement"
        >
          <div class="ball-content">
            <div class="ball-name">{{ e.name }}</div>
          </div>
          <div class="ball-glow"></div>
        </div>
      </div>
      <!-- 关系说明 -->
      <div class="relations" v-if="current">
        <div class="current-name" :class="current.class">
          {{ current.name }}
        </div>
        <div class="relation-item">
          <span :class="getClass(relations.shengWo)">生我的：</span>
          <span :class="getClass(relations.shengWo)">{{
            relations.shengWo
          }}</span>
        </div>
        <div class="relation-item">
          <span :class="getClass(relations.woSheng)">我生的：</span>
          <span :class="getClass(relations.woSheng)">{{
            relations.woSheng
          }}</span>
        </div>
        <div class="relation-item">
          <span :class="getClass(relations.keWo)">克我的：</span>
          <span :class="getClass(relations.keWo)">{{ relations.keWo }}</span>
        </div>
        <div class="relation-item">
          <span :class="getClass(relations.woKe)">我克的：</span>
          <span :class="getClass(relations.woKe)">{{ relations.woKe }}</span>
        </div>
      </div>
    </div>
  </div>
  <IntroFrom
    text="“天地之气，合而为一，分而为阴阳，判而为五行。” ——《淮南子》"
  ></IntroFrom>
  <IntroFrom text="“五行者，五气之所生也。”——《黄帝内经》"></IntroFrom>
  <IntroFrom
    text="“五行之气，各有胜相，而相生相成。”——《管子·四时》《管子·枢言》"
  ></IntroFrom>
</template>

<script setup>
import { reactive, ref, computed } from "vue";

const elements = [
  {
    name: "木",
    class: "wood",
    sheng: "火",
    ke: "土",
    gan: {
      yang: "甲",
      yin: "乙",
    },
    zhi: {
      yang: "寅",
      yin: "卯",
    },
  },
  {
    name: "火",
    class: "fire",
    sheng: "土",
    ke: "金",
    gan: {
      yang: "丙",
      yin: "丁",
    },
    zhi: {
      yang: "巳",
      yin: "午",
    },
  },
  {
    name: "土",
    class: "earth",
    sheng: "金",
    ke: "水",
    gan: {
      yang: "戊",
      yin: "己",
    },
    zhi: {
      yang: "辰戌",
      yin: "丑未",
    },
  },
  {
    name: "金",
    class: "metal",
    sheng: "水",
    ke: "木",
    gan: {
      yang: "庚",
      yin: "辛",
    },
    zhi: {
      yang: "申",
      yin: "酉",
    },
  },
  {
    name: "水",
    class: "water",
    sheng: "木",
    ke: "火",
    gan: {
      yang: "壬",
      yin: "癸",
    },
    zhi: {
      yang: "子",
      yin: "亥",
    },
  },
];

const elementsMap = {};
elements.forEach((e) => (elementsMap[e.name] = e));

const current = ref(null);
const relations = reactive({ shengWo: "", woSheng: "", keWo: "", woKe: "" });

const hoverElement = (e) => {
  current.value = e;
  relations.shengWo = elements.find((el) => el.sheng === e.name)?.name || "-";
  relations.woSheng = e.sheng;
  relations.keWo = elements.find((el) => el.ke === e.name)?.name || "-";
  relations.woKe = e.ke;
};

const leaveElement = () => {
  current.value = null;
  relations.shengWo = relations.woSheng = relations.keWo = relations.woKe = "";
};

const hoverClass = computed(() => {
  return (e) => {
    if (!current.value) return "";

    const currentName = current.value.name;
    const elementName = e.name;

    // 当前选中的球
    if (currentName === elementName) return "current";

    // 我生的球
    if (current.value.sheng === elementName) return "grow";

    // 我克的球
    if (current.value.ke === elementName) return "shrink";

    // 其他情况变暗
    return "dim";
  };
});

const getClass = (name) => {
  if (!name || name === "-") return "";
  return elementsMap[name]?.class || "";
};

// const getSymbol = (name) => {
//   const symbols = {
//     木: "🌳",
//     火: "🔥",
//     土: "⛰️",
//     金: "⚔️",
//     水: "💧",
//   };
//   return symbols[name] || "";
// };

// 球的位置
const ballPositions = {
  木: { x: 190, y: 70 }, // 上中
  火: { x: 310, y: 190 }, // 右中
  土: { x: 190, y: 190 }, // 中心
  金: { x: 70, y: 190 }, // 左中
  水: { x: 190, y: 310 }, // 下中
};

// 生成相生关系连接
const generateShengLinks = () => {
  const links = [];
  elements.forEach((e) => {
    if (e.sheng) {
      links.push({ from: e.name, to: e.sheng, type: "sheng" });
    }
  });
  return links;
};

// 五行球布局
const ballPositionStyle = (name) => {
  const pos = ballPositions[name];
  return {
    left: `${pos.x - 50}px`,
    top: `${pos.y - 50}px`,
  };
};
</script>

<style scoped lang="scss">
.wu-xing-wrapper {
  display: flex;
  gap: 60px;
  font-family: "Microsoft YaHei", serif;
  padding: 20px;

  .sidebar {
    display: flex;
    justify-content: space-between;

    .legend {
      width: 200px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-bottom: 40px;
      padding: 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

      .legend-item {
        display: flex;
        gap: 15px;

        .legend-ball {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;

          &::after {
            content: "";
            position: absolute;
            top: 10%;
            left: 10%;
            right: 10%;
            bottom: 10%;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            filter: blur(2px);
          }

          &.wood {
            background: linear-gradient(145deg, #4caf50, #81c784);
          }
          &.fire {
            background: linear-gradient(145deg, #e53935, #ef5350);
          }
          &.earth {
            background: linear-gradient(145deg, #bca360, #d7ccc8);
          }
          &.metal {
            background: linear-gradient(145deg, #757575, #9e9e9e);
          }
          &.water {
            background: linear-gradient(145deg, #1e88e5, #42a5f5);
          }
        }

        .legend-line-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;

          .legend-line {
            display: flex;
            height: 20px;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            position: relative;
            border: 1px solid rgba(0, 0, 0, 0.1);

            .line-segment {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              padding: 2px 0;

              &.yang {
                background: linear-gradient(to right, #ffebee, #ffcdd2);
                border-right: 2px solid #d32f2f;

                .yin-yang-label {
                  color: #d32f2f;
                  font-weight: bold;
                  font-size: 11px;
                }

                .hu-xi-label {
                  color: #d32f2f;
                  font-size: 10px;
                }
              }

              &.yin {
                background: linear-gradient(to right, #e8eaf6, #c5cae9);
                border-left: 2px solid #303f9f;

                .yin-yang-label {
                  color: #303f9f;
                  font-weight: bold;
                  font-size: 11px;
                }

                .hu-xi-label {
                  color: #303f9f;
                  font-size: 10px;
                }
              }
            }
          }

          .legend-markers {
            display: flex;
            justify-content: space-between;
            font-size: 13px;

            .marker-left,
            .marker-right {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 2px 2px;
              border-radius: 6px;
              background: rgba(255, 255, 255, 0.7);

              .marker-gan {
                font-weight: bold;
                font-size: 16px;
                font-family: "KaiTi", "STKaiti", serif;
              }

              .marker-zhi {
                color: #666;
                font-size: 12px;
                font-family: "KaiTi", "STKaiti", serif;
              }
            }

            .marker-left {
              border: 1px solid #d32f2f;
              .marker-gan,
              .marker-zhi {
                color: #d32f2f;
              }
            }

            .marker-right {
              border: 1px solid #303f9f;
              .marker-gan,
              .marker-zhi {
                color: #303f9f;
              }
            }
          }
        }
      }
    }

    .relations {
      width: 400px;
      margin-top: 20px;
      padding: 24px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

      .current-name {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 24px;
        padding-bottom: 12px;
        border-bottom: 2px solid #e0e0e0;
        text-align: center;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
      }

      .relation-item {
        margin-bottom: 16px;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 16px;
        border-radius: 8px;
        background: #f8f9fa;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;

        &:hover {
          transform: translateX(5px);
          background: white;
        }

        span:first-child {
          font-weight: bold;
          font-family: "KaiTi", "STKaiti", serif;
        }

        span:last-child {
          font-size: 20px;
          font-weight: bold;
          font-family: "KaiTi", "STKaiti", serif;
        }
      }
    }
  }
  .content {
    flex: 1;
  }
  .center-area {
    position: relative;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    background: #f8f9fa;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .ball {
      position: absolute;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: pointer;
      z-index: 1;

      // 修复变换原点问题
      transform-origin: center;

      // 当前球样式 - 重点修复
      &.current {
        transform: scale(1.15) !important;
        z-index: 100;
        box-shadow: 0 0 50px rgba(0, 0, 0, 0.4), 0 15px 35px rgba(0, 0, 0, 0.3) !important;

        .ball-content {
          transform: scale(1.1);
        }

        .ball-glow {
          opacity: 1;
          transform: scale(1.3);
        }
      }

      // 我生的球 - 变大
      &.grow {
        transform: scale(1.6) !important;
        z-index: 50;
        box-shadow: 0 0 40px rgba(0, 0, 0, 0.35),
          0 12px 30px rgba(0, 0, 0, 0.25) !important;

        .ball-content {
          transform: scale(0.9);
        }

        .ball-glow {
          opacity: 0.8;
          transform: scale(1.5);
        }
      }

      // 我克的球 - 变小
      &.shrink {
        transform: scale(0.65) !important;
        z-index: 10;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.25), 0 6px 15px rgba(0, 0, 0, 0.2) !important;

        .ball-content {
          transform: scale(0.7);
        }

        .ball-glow {
          opacity: 0.3;
          transform: scale(0.8);
        }
      }

      // 其他球 - 变暗
      &.dim {
        opacity: 0.3 !important;
        filter: grayscale(0.8) brightness(0.7);
        transform: scale(0.85) !important;

        .ball-content {
          opacity: 0.7;
        }

        .ball-glow {
          opacity: 0.1;
        }
      }

      .ball-content {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.4s ease;

        .ball-name {
          font-size: 36px;
          font-weight: bold;
          color: white;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          margin-bottom: 4px;
        }

        .ball-symbol {
          font-size: 24px;
          opacity: 0.9;
        }
      }

      .ball-glow {
        position: absolute;
        top: -10%;
        left: -10%;
        right: -10%;
        bottom: -10%;
        border-radius: 50%;
        background: radial-gradient(
          circle at center,
          rgba(255, 255, 255, 0.3) 0%,
          transparent 70%
        );
        opacity: 0;
        transition: all 0.6s ease;
        z-index: 1;
      }

      &.wood {
        background: radial-gradient(
          circle at 30% 30%,
          #81c784,
          #4caf50,
          #2e7d32
        );
        box-shadow: 0 10px 20px rgba(76, 175, 80, 0.4),
          inset 0 4px 8px rgba(255, 255, 255, 0.3);
        // border: 3px solid rgba(129, 199, 132, 0.8);
      }
      &.fire {
        background: radial-gradient(
          circle at 30% 30%,
          #ef5350,
          #e53935,
          #b71c1c
        );
        box-shadow: 0 10px 20px rgba(229, 57, 53, 0.4),
          inset 0 4px 8px rgba(255, 255, 255, 0.3);
        // border: 3px solid rgba(239, 83, 80, 0.8);
      }
      &.earth {
        background: radial-gradient(
          circle at 30% 30%,
          #d7ccc8,
          #bca360,
          #8d6e63
        );
        box-shadow: 0 10px 20px rgba(188, 163, 96, 0.4),
          inset 0 4px 8px rgba(255, 255, 255, 0.3);
        // border: 3px solid rgba(215, 204, 200, 0.8);
      }
      &.metal {
        background: radial-gradient(
          circle at 30% 30%,
          #9e9e9e,
          #757575,
          #424242
        );
        box-shadow: 0 10px 20px rgba(117, 117, 117, 0.4),
          inset 0 4px 8px rgba(255, 255, 255, 0.3);
        // border: 3px solid rgba(158, 158, 158, 0.8);
      }
      &.water {
        background: radial-gradient(
          circle at 30% 30%,
          #42a5f5,
          #1e88e5,
          #0d47a1
        );
        box-shadow: 0 10px 20px rgba(30, 136, 229, 0.4),
          inset 0 4px 8px rgba(255, 255, 255, 0.3);
        // border: 3px solid rgba(66, 165, 245, 0.8);
      }
    }
  }

  /* 左侧五行颜色字体 */
  .wood {
    color: #4caf50;
  }
  .fire {
    color: #e53935;
  }
  .earth {
    color: #bca360;
  }
  .metal {
    color: #757575;
  }
  .water {
    color: #1e88e5;
  }
}
</style>

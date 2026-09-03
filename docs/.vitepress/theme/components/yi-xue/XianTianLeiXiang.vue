<template>
  <div class="lei-xiang">
    <table class="lei-xiang__levels">
      <thead>
        <tr>
          <th>层级</th>
          <th>标准术语</th>
          <th>通俗叫法</th>
          <th>乾卦举例</th>
          <th>关键区别</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in levelGuide" :key="row.level">
          <td class="lei-xiang__levels-level">{{ row.level }}</td>
          <td>{{ row.term }}</td>
          <td>{{ row.common }}</td>
          <td>{{ row.example }}</td>
          <td>{{ row.diff }}</td>
        </tr>
      </tbody>
    </table>

    <div class="lei-xiang__matrix-wrap">
      <table class="lei-xiang__matrix">
        <thead>
          <tr>
            <th class="lei-xiang__corner" rowspan="2" colspan="2">层级 / 术语</th>
            <th v-for="name in columns" :key="`sym-${name}`" class="lei-xiang__col-head">
              <Gua :name="name" :size="28" color="#9c1010" />
            </th>
          </tr>
          <tr>
            <th v-for="name in columns" :key="`name-${name}`" class="lei-xiang__col-head">
              {{ name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in matrixRows"
            :key="row.key"
            :class="`lei-xiang__band--${row.band}`"
          >
            <th
              v-if="row.showLevel"
              class="lei-xiang__level-cell"
              :rowspan="row.levelSpan"
              scope="rowgroup"
            >
              {{ row.level }}
            </th>
            <th class="lei-xiang__term-cell" scope="row">{{ row.term }}</th>
            <td v-for="(cell, i) in row.cells" :key="`${row.key}-${i}`">
              <Gua
                v-if="row.key === 'sym'"
                :name="cell"
                :size="24"
                color="#9c1010"
              />
              <template v-else>{{ cell }}</template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import Gua from "./Gua.vue";

const columns = ["乾", "兑", "离", "震", "巽", "坎", "艮", "坤"];

const levelGuide = [
  {
    level: "第一层（内核）",
    term: "卦德",
    common: "特性、属性",
    example: "刚健",
    diff: "看不见摸不着，是卦的灵魂本质",
  },
  {
    level: "第二层（载体）",
    term: "卦象（本象）",
    common: "基本象征",
    example: "天",
    diff: "卦德在自然界中最直接的投射",
  },
  {
    level: "第三层（外延）",
    term: "类象（广象）",
    common: "引申象征",
    example: "父、马、玉、金、首",
    diff: "卦德在万物中的各种具体投射",
  },
  {
    level: "第四层（应用）",
    term: "卦气 / 卦位",
    common: "时空方位",
    example: "南（先天）、西北（后天）",
    diff: "卦在时空中的位置和能量流转",
  },
];

const matrixRows = [
  {
    key: "de",
    band: "core",
    level: "第一层（内核）",
    showLevel: true,
    levelSpan: 1,
    term: "卦德",
    cells: ["刚健", "悦说", "附丽", "震动", "潜入", "陷险", "静止", "柔顺"],
  },
  {
    key: "sym",
    band: "symbol",
    level: "符号",
    showLevel: true,
    levelSpan: 2,
    term: "卦符",
    cells: columns,
  },
  {
    key: "name",
    band: "symbol",
    level: "符号",
    showLevel: false,
    levelSpan: 0,
    term: "卦名",
    cells: columns,
  },
  {
    key: "xiang",
    band: "carrier",
    level: "第二层（载体）",
    showLevel: true,
    levelSpan: 1,
    term: "卦象",
    cells: ["天", "泽", "火", "雷", "风", "水", "山", "地"],
  },
  {
    key: "animal",
    band: "extend",
    level: "第三层（外延）",
    showLevel: true,
    levelSpan: 5,
    term: "动物",
    cells: ["马", "羊", "雉", "龙", "鸡", "豕", "狗", "牛"],
  },
  {
    key: "body",
    band: "extend",
    level: "第三层（外延）",
    showLevel: false,
    levelSpan: 0,
    term: "人体",
    cells: ["首", "口", "目", "足", "股", "耳", "手", "腹"],
  },
  {
    key: "family",
    band: "extend",
    level: "第三层（外延）",
    showLevel: false,
    levelSpan: 0,
    term: "家庭角色",
    cells: ["父", "少女", "中女", "长男", "长女", "中男", "少男", "母"],
  },
  {
    key: "society",
    band: "extend",
    level: "第三层（外延）",
    showLevel: false,
    levelSpan: 0,
    term: "社会功能",
    cells: ["君", "妾", "中女", "长男", "长女", "中男", "少男", "母"],
  },
  {
    key: "color",
    band: "extend",
    level: "第三层（外延）",
    showLevel: false,
    levelSpan: 0,
    term: "颜色",
    cells: ["大赤", "白", "赤", "青", "绿", "黑", "黄", "黄黑"],
  },
  {
    key: "fang",
    band: "apply",
    level: "第四层（应用）",
    showLevel: true,
    levelSpan: 1,
    term: "方位",
    cells: ["南", "东南", "东", "东北", "西南", "西", "西北", "北"],
  },
];
</script>

<style lang="scss" scoped>
.lei-xiang {
  --border: var(--vp-c-divider);
  width: min(980px, 96vw);
  margin: 28px auto 0;
  color: var(--vp-c-text-1);
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.lei-xiang__levels {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  line-height: 1.6;

  th,
  td {
    text-align: left;
    padding: 12px 10px;
    border-bottom: 1px solid var(--border);
    vertical-align: top;
  }

  th {
    font-weight: 700;
    color: var(--vp-c-text-1);
  }

  td {
    color: var(--vp-c-text-2);
  }
}

.lei-xiang__levels-level {
  font-weight: 700;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.lei-xiang__matrix-wrap {
  overflow-x: auto;
}

.lei-xiang__matrix {
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
  font-size: 14px;
  line-height: 1.4;

  th,
  td {
    border: 1px solid var(--border);
    padding: 10px 8px;
    text-align: center;
    vertical-align: middle;
    box-sizing: border-box;
  }
}

.lei-xiang__corner,
.lei-xiang__level-cell,
.lei-xiang__term-cell {
  background: var(--vp-c-bg-soft);
  font-weight: 700;
}

.lei-xiang__corner {
  min-width: 88px;
}

.lei-xiang__level-cell {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  letter-spacing: 0.12em;
  min-width: 36px;
  max-width: 44px;
  padding: 12px 6px;
  color: var(--vp-c-brand-1);
}

.lei-xiang__term-cell {
  min-width: 72px;
  white-space: nowrap;
}

.lei-xiang__col-head {
  min-width: 64px;
  font-weight: 700;
}

.lei-xiang__band--core .lei-xiang__term-cell {
  background: color-mix(in srgb, var(--vp-c-brand-soft) 55%, var(--vp-c-bg-soft));
}

.lei-xiang__band--symbol .lei-xiang__term-cell,
.lei-xiang__band--symbol .lei-xiang__level-cell {
  background: color-mix(in srgb, var(--vp-c-bg-soft) 70%, var(--vp-c-divider));
}

.lei-xiang__band--carrier .lei-xiang__term-cell {
  background: color-mix(in srgb, var(--vp-c-bg-soft) 85%, var(--vp-c-brand-soft));
}

.lei-xiang__band--extend td {
  color: var(--vp-c-text-2);
}

.lei-xiang__band--apply .lei-xiang__term-cell {
  background: color-mix(in srgb, var(--vp-c-brand-soft) 35%, var(--vp-c-bg-soft));
}
</style>

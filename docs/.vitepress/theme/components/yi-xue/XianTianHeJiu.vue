<template>
  <div class="he-jiu">
    <div class="he-jiu__grid he-jiu__grid--top">
      <div
        v-for="col in topCols"
        :key="`t-name-${col.num}`"
        class="he-jiu__cell he-jiu__cell--name"
      >
        {{ col.name }}
      </div>
      <div
        v-for="col in topCols"
        :key="`t-num-${col.num}`"
        class="he-jiu__cell he-jiu__cell--num"
      >
        {{ col.num }}
      </div>
    </div>

    <div class="he-jiu__bridge">
      <div v-for="col in topCols" :key="`b-${col.num}`" class="he-jiu__sum">
        <span class="he-jiu__arrow">↓</span>
        <span class="he-jiu__nine">9</span>
        <span class="he-jiu__arrow">↑</span>
      </div>
    </div>

    <div class="he-jiu__grid he-jiu__grid--bottom">
      <div
        v-for="col in bottomCols"
        :key="`b-num-${col.num}`"
        class="he-jiu__cell he-jiu__cell--num"
      >
        {{ col.num }}
      </div>
      <div
        v-for="col in bottomCols"
        :key="`b-name-${col.num}`"
        class="he-jiu__cell he-jiu__cell--name"
      >
        {{ col.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
const topCols = [
  { name: "乾", num: 1 },
  { name: "兑", num: 2 },
  { name: "离", num: 3 },
  { name: "震", num: 4 },
];

const bottomCols = [
  { name: "坤", num: 8 },
  { name: "艮", num: 7 },
  { name: "坎", num: 6 },
  { name: "巽", num: 5 },
];
</script>

<style lang="scss" scoped>
.he-jiu {
  --border: var(--vp-c-divider);
  width: min(420px, 92vw);
  margin: 28px auto 0;
  color: var(--vp-c-text-1);
}

.he-jiu__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--border);
}

.he-jiu__cell {
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  box-sizing: border-box;

  &:nth-child(4n) {
    border-right: none;
  }

  /* 每行最后一行单元格去掉底边，避免与表格外边框重叠 */
  &:nth-child(n + 5) {
    border-bottom: none;
  }

  &--name {
    min-height: 52px;
    font-size: 18px;
    font-weight: 600;
  }

  &--num {
    min-height: 36px;
    font-size: 16px;
    font-weight: 700;
    color: var(--vp-c-brand-1);
  }
}

.he-jiu__bridge {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  /* 上下表已有外边框，中缝不再叠粗边 */
}

.he-jiu__sum {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 8px 0;
  border-right: 1px solid var(--border);

  &:last-child {
    border-right: none;
  }
}

.he-jiu__arrow {
  font-size: 14px;
  line-height: 1;
  color: var(--vp-c-text-2);
}

.he-jiu__nine {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--vp-c-brand-1);
}
</style>

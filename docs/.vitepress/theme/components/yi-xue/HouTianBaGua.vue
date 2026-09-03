<template>
  <div class="hou-tian">
    <div class="hou-tian__top">
      <BaGuaYuanTu :items="items" />
      <HouTianJiuGong />
    </div>

    <HouTianXianHouMap />
  </div>
</template>

<script setup>
import BaGuaYuanTu from "./BaGuaYuanTu.vue";
import HouTianJiuGong from "./HouTianJiuGong.vue";
import HouTianXianHouMap from "./HouTianXianHouMap.vue";

const items = [
  { name: "离", fang: "南" },
  { name: "巽", fang: "东南" },
  { name: "震", fang: "东" },
  { name: "艮", fang: "东北" },
  { name: "坎", fang: "北" },
  { name: "乾", fang: "西北" },
  { name: "兑", fang: "西" },
  { name: "坤", fang: "西南" },
];
</script>

<style lang="scss" scoped>
.hou-tian {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.hou-tian__top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 32px;

  :deep(.bagua-yuan-tu) {
    margin: 0;
  }
}
</style>

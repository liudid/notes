<template>
  <BaGuaYuanTu :items="items" show-sequence />
</template>

<script setup>
import BaGuaYuanTu from "./BaGuaYuanTu.vue";

const items = [
  { name: "乾", fang: "南", num: 1 },
  { name: "兑", fang: "东南", num: 2 },
  { name: "离", fang: "东", num: 3 },
  { name: "震", fang: "东北", num: 4 },
  { name: "坤", fang: "北", num: 8 },
  { name: "艮", fang: "西北", num: 7 },
  { name: "坎", fang: "西", num: 6 },
  { name: "巽", fang: "西南", num: 5 },
];
</script>

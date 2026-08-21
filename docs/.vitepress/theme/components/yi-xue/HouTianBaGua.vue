<template>
  <BaGuaYuanTu :items="items" />
</template>

<script setup>
import BaGuaYuanTu from "./BaGuaYuanTu.vue";

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

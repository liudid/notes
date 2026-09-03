<template>
  <div class="taiji-host" :style="hostStyle">
    <div class="taiji" :style="scaleStyle">
      <div class="middle-circle top-circle">
        <div class="small-circle black-circle"></div>
      </div>

      <div class="middle-circle bottom-circle">
        <div class="small-circle white-circle"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const BASE_SIZE = 300;

const props = defineProps({
  scale: {
    type: Number,
    default: 1,
  },
});

const hostStyle = computed(() => {
  const size = BASE_SIZE * props.scale;
  return {
    width: `${size}px`,
    height: `${size}px`,
  };
});

const scaleStyle = computed(() => ({
  transform: `scale(${props.scale})`,
  transformOrigin: "top left",
}));
</script>

<style lang="scss" scoped>
.taiji-host {
  position: relative;
  margin: auto;
}

/* 大圆 */
.taiji {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 150px;
  box-shadow: 0 0 15px #999;
  /* 用css3渐变可以只写一个圆得到两个半圆(不同色) */
  background-image: linear-gradient(to right, white 50%, black 50%);
}

/* 小圆 */
.small-circle {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  position: absolute;
  left: 50px;
  top: 50px;
}

.small-circle.black-circle {
  background-color: #000;
}

.small-circle.white-circle {
  background-color: #fff;
}

/* 中圆 */
.taiji .middle-circle {
  width: 150px;
  height: 150px;
  border-radius: 75px;
  position: absolute;
  left: 75px;
}

.taiji .middle-circle.top-circle {
  top: 0;
  background-color: #fff;
}

.taiji .middle-circle.bottom-circle {
  top: 150px;
  background-color: #000;
}
</style>

<template>
  <div class="taiji">
    <div class="middle-circle top-circle">
      <div class="small-circle black-circle"></div>
    </div>

    <div class="middle-circle bottom-circle">
      <div class="small-circle white-circle"></div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
/* 大圆 */

.taiji {
  position: relative;
  width: 300px;

  height: 300px;

  border-radius: 150px;

  /* 水平垂直居中 */

  // position: absolute;

  top: 0;

  bottom: 0;

  left: 0;

  right: 0;

  margin: auto;

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

/* 第一个小圆-黑色 */

.small-circle.black-circle {
  background-color: #000;
}

/* 第二个小圆-白色 */

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

/* 第一个中圆-白色 */

.taiji .middle-circle.top-circle {
  top: 0;

  background-color: #fff;
}

/* 第二个中圆-黑色 */

.taiji .middle-circle.bottom-circle {
  top: 150px;

  background-color: #000;
}

// .taiji {
//   animation: fadeNum 1000ms infinite;
// }

// /* 通过@keyframes规则设置动画的旋转动作 */

// @keyframes fadeNum {
//   0% {
//     transform: rotate(0deg);
//   }

//   50% {
//     transform: rotate(180deg);
//   }

//   100% {
//     transform: rotate(360deg);
//   }
// }
</style>

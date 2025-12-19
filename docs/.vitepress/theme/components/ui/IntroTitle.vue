<template>
  <div class="intro-from">
    <slot>{{ text }}</slot>
  </div>
</template>

<script setup>
defineProps({
  text: String,
});
</script>
<style lang="scss" scoped>
.intro-from {
  font-family: "KaiTi", "STKaiti", serif;
  // margin-top: 1rem;
  padding: 1rem;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 4px solid #d32f2f;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;
  background: rgba(211, 47, 47, 0.6);
  color: #fff;
  & + .intro-from {
    margin-top: 12px;
  }
}
</style>

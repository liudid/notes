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
  border-left: 4px solid #2196f3;
  width: 100%;
  font-size: 14px;
  line-height: 1.5;
  color: #d32f2f;
  & + .intro-from {
    margin-top: 12px;
  }
}
</style>

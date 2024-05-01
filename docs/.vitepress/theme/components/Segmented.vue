<template>
  <div class="segmented">
    <div class="segmented__group">
      <label
        class="label"
        v-for="(item, index) in options"
        :key="index"
        :class="{ 'label--selected': item.value === value }"
        @click="onClick(item)"
        >{{ item.label }}</label
      >
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "vue";
const emit = defineEmits(["input", "change"]);
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  value: {
    type: [String, Number],
  },
});

const { options, value } = toRefs(props);

function onClick(item) {
  emit("input", item.value);
  emit("change", item.value);
}
</script>

<style lang="scss">
.segmented {
  display: inline-flex;
  align-items: stretch;
  height: 32px;
  background: #f5f7fa;
  padding: 2px;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
  box-sizing: border-box;
  .segmented__group {
    display: flex;
    align-items: stretch;
    position: relative;
    width: 100%;
    .label {
      display: flex;
      align-items: center;
      flex: 1;
      cursor: pointer;
      border-radius: 2px;
      padding: 0 11px;
      &:not(.label--selected):hover {
        background-color: #ebedf0;
      }
      &--selected {
        background-color: #409eff;
        color: #fff;
      }
    }
  }
}
</style>

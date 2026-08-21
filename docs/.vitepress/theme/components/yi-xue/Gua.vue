<template>
  <span
    v-if="gua"
    class="gua"
    :style="guaStyle"
    :title="`${gua.name}·${gua.el}`"
  >{{ gua.sym }}</span>
</template>

<script setup>
import { computed } from "vue";
import { getGua } from "../../config/gua.ts";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "currentColor",
  },
  size: {
    type: [Number, String],
    default: 48,
  },
});

const gua = computed(() => getGua(props.name));

const guaStyle = computed(() => {
  const size =
    typeof props.size === "number" ? `${props.size}px` : props.size;
  return {
    color: props.color,
    fontSize: size,
    lineHeight: 1,
  };
});
</script>

<style lang="scss" scoped>
.gua {
  display: inline-block;
  font-family: "Noto Sans Symbols 2", "Segoe UI Symbol", "Apple Symbols",
    sans-serif;
  user-select: none;
}
</style>

<template>
  <div v-if="hex" class="cell">
    <span class="seal">{{ hex.num }}</span>
    <span class="lines">
      <span
        v-for="(yang, i) in yaoList"
        :key="i"
        class="yao"
        :class="yang ? 'yang' : 'yin'"
      >
        <span class="seg"></span>
        <span v-if="!yang" class="seg"></span>
      </span>
    </span>
    <span class="name-block">
      <span class="nm">{{ hex.name }}</span>
      <span class="full">{{ hex.full }}</span>
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  hex: {
    type: Object,
    required: true,
  },
});

/** code 自下而上；展示自上而下 */
const yaoList = computed(() => {
  const list = [];
  for (let i = 5; i >= 0; i -= 1) {
    list.push(props.hex.code[i] === "1");
  }
  return list;
});
</script>

<style lang="scss">
.liu-shi-si-gua .matrix .cell {
  width: 100%;
  height: 100%;
  padding: 10px 4px 8px;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-family: inherit;
  color: inherit;
  position: relative;
  box-sizing: border-box;
}

.liu-shi-si-gua .matrix .seal {
  position: absolute;
  top: 4px;
  left: 4px;
  font-size: 9px;
  color: #fff;
  background: var(--cinnabar);
  width: 15px;
  height: 15px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--serif);
}

.liu-shi-si-gua .matrix .lines {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32px;
}

.liu-shi-si-gua .matrix .yao {
  width: 100%;
  height: 3px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
}

.liu-shi-si-gua .matrix .yao:last-child {
  margin-bottom: 0;
}

.liu-shi-si-gua .matrix .yao .seg {
  height: 100%;
  background: var(--ink);
  border-radius: 1px;
}

.liu-shi-si-gua .matrix .yao.yang .seg {
  width: 100%;
}

.liu-shi-si-gua .matrix .yao.yin .seg {
  width: 44%;
}

.liu-shi-si-gua .matrix .name-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}

.liu-shi-si-gua .matrix .nm {
  font-family: var(--serif);
  font-weight: 600;
  font-size: 13px;
  color: var(--ink);
  line-height: 1.2;
}

.liu-shi-si-gua .matrix .full {
  font-family: var(--serif);
  font-size: 10px;
  font-weight: 400;
  color: var(--ink-faint);
  line-height: 1.2;
  letter-spacing: 0.02em;
}
</style>

<template>
  <table class="values-row-table">
    <tr>
      <td class="values-row-table__label">{{ label }}</td>
      <td
        v-for="(value, index) in displayedValues"
        :key="`v-${value}-${index}`"
        class="values-row-table__cell"
        :class="{ 'values-row-table__cell--fade': isDynamic }"
      >
        {{ value }}
      </td>
    </tr>
    <tr>
      <td class="values-row-table__label">{{ imageLabel }}</td>
      <td
        v-for="(src, index) in displayedImages"
        :key="`i-${src}-${index}`"
        class="values-row-table__cell values-row-table__cell--image"
        :class="{ 'values-row-table__cell--fade': isDynamic }"
      >
        <img :src="src" :alt="`${imageLabel}${index + 1}`" />
      </td>
    </tr>
  </table>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { withBase } from "vitepress";

const props = defineProps({
  mode: {
    type: String,
    default: "static",
    validator: (value) => value === "static" || value === "dynamic",
  },
  label: {
    type: String,
    default: "温度",
  },
  values: {
    type: Array,
    default: () => ["20℃", "21℃", "22℃", "23℃", "24℃", "25℃", "26℃", "27℃"],
  },
  imageLabel: {
    type: String,
    default: "花",
  },
  images: {
    type: Array,
    default: () =>
      Array.from({ length: 8 }, (_, i) => withBase(`/images/hua${i + 1}.png`)),
  },
  interval: {
    type: Number,
    default: 500,
  },
  pause: {
    type: Number,
    default: 800,
  },
});

const visibleCount = ref(0);
let timerId = null;

const isDynamic = computed(() => props.mode === "dynamic");

const displayedValues = computed(() => {
  if (!isDynamic.value) return props.values;
  return props.values.slice(0, visibleCount.value);
});

const displayedImages = computed(() => {
  if (!isDynamic.value) return props.images;
  return props.images.slice(0, visibleCount.value);
});

const loopLength = computed(() =>
  Math.max(props.values.length, props.images.length)
);

function clearTimer() {
  if (timerId != null) {
    clearTimeout(timerId);
    timerId = null;
  }
}

function scheduleNext(step) {
  clearTimer();
  timerId = setTimeout(step, props.interval);
}

function startDynamicLoop() {
  clearTimer();
  visibleCount.value = 0;

  const tick = () => {
    if (visibleCount.value < loopLength.value) {
      visibleCount.value += 1;
      scheduleNext(tick);
      return;
    }

    timerId = setTimeout(() => {
      visibleCount.value = 0;
      scheduleNext(tick);
    }, props.pause);
  };

  scheduleNext(tick);
}

function stopDynamicLoop() {
  clearTimer();
  visibleCount.value = 0;
}

watch(
  () => [props.mode, props.values, props.images, props.interval, props.pause],
  () => {
    if (isDynamic.value) {
      startDynamicLoop();
      return;
    }
    stopDynamicLoop();
  },
  { deep: true }
);

onMounted(() => {
  if (isDynamic.value) startDynamicLoop();
});

onUnmounted(() => {
  stopDynamicLoop();
});
</script>

<style lang="scss" scoped>
.values-row-table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
  font-size: 14px;
  color: var(--vp-c-text-1);

  td {
    border: 1px solid var(--vp-c-divider);
    padding: 8px 12px;
    text-align: center;
    white-space: nowrap;
  }
}

.values-row-table__label {
  font-weight: 600;
  background: var(--vp-c-bg-soft);
}

.values-row-table__cell--image {
  padding: 6px;

  img {
    display: block;
    margin: 0 auto;
    height: 56px;
    width: auto;
    object-fit: contain;
  }
}

.values-row-table__cell--fade {
  animation: valuesRowFadeIn 0.4s ease forwards;
}

@keyframes valuesRowFadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

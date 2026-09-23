<template>
  <div v-if="yaos?.length === 6 && yaos.every(Boolean)" class="qi-gua-result">
    <div class="qi-gua-result__pair">
      <div class="qi-gua-result__card">
        <div class="qi-gua-result__title">本卦</div>
        <div v-if="benGua" class="qi-gua-result__name">{{ benGua.name }}</div>
        <div v-if="benGua" class="qi-gua-result__full">{{ benGua.full }}</div>
        <YaoStack :yaos="yaos" mode="ben" />
      </div>
      <div v-if="hasChanging" class="qi-gua-result__card">
        <div class="qi-gua-result__title">变卦</div>
        <div v-if="zhiGua" class="qi-gua-result__name">{{ zhiGua.name }}</div>
        <div v-if="zhiGua" class="qi-gua-result__full">{{ zhiGua.full }}</div>
        <YaoStack :yaos="yaos" mode="zhi" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineComponent, h } from "vue";
import { resolveHex } from "../../config/liuShiSiGuaWei.ts";
import { yaosToCode } from "../../config/meihua.ts";

const props = defineProps({
  yaos: {
    type: Array,
    required: true,
  },
});

const hasChanging = computed(() =>
  props.yaos.some((y) => y && y.changing),
);

const benGua = computed(() => resolveHex(yaosToCode(props.yaos, "ben")));
const zhiGua = computed(() => resolveHex(yaosToCode(props.yaos, "zhi")));

const YaoStack = defineComponent({
  name: "YaoStack",
  props: {
    yaos: { type: Array, required: true },
    mode: { type: String, default: "ben" },
  },
  setup(stackProps) {
    return () => {
      const lines = [];
      for (let i = 5; i >= 0; i--) {
        const y = stackProps.yaos[i];
        if (!y) {
          lines.push(
            h("div", { class: "qi-gua-result__line qi-gua-result__line--empty", key: i }, "—"),
          );
          continue;
        }
        let yang = y.yang;
        if (stackProps.mode === "zhi" && y.changing) yang = !yang;
        lines.push(
          h(
            "div",
            {
              class: [
                "qi-gua-result__line",
                yang ? "qi-gua-result__line--yang" : "qi-gua-result__line--yin",
                stackProps.mode === "ben" && y.changing
                  ? "qi-gua-result__line--dong"
                  : "",
              ],
              key: i,
            },
            yang
              ? h("span", { class: "qi-gua-result__bar" })
              : [
                  h("span", { class: "qi-gua-result__bar qi-gua-result__bar--half" }),
                  h("span", { class: "qi-gua-result__bar qi-gua-result__bar--half" }),
                ],
          ),
        );
      }
      return h("div", { class: "qi-gua-result__stack" }, lines);
    };
  },
});
</script>

<style scoped>
.qi-gua-result {
  margin-top: 0.75rem;
}

.qi-gua-result__pair {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.qi-gua-result__card {
  padding: 0.85rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.qi-gua-result__title {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
  text-align: center;
}

.qi-gua-result__name {
  font-size: 1.15rem;
  font-weight: 700;
  text-align: center;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

.qi-gua-result__full {
  font-size: 0.78rem;
  text-align: center;
  color: var(--vp-c-text-2);
  margin-bottom: 0.65rem;
}

:deep(.qi-gua-result__stack) {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 6.5rem;
  margin: 0 auto;
}

:deep(.qi-gua-result__line) {
  display: flex;
  justify-content: center;
  gap: 0.35rem;
  height: 0.55rem;
}

:deep(.qi-gua-result__line--empty) {
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
  height: auto;
}

:deep(.qi-gua-result__bar) {
  display: block;
  height: 100%;
  width: 100%;
  border-radius: 1px;
  background: var(--vp-c-text-1);
}

:deep(.qi-gua-result__bar--half) {
  width: calc(50% - 0.18rem);
}

:deep(.qi-gua-result__line--dong .qi-gua-result__bar) {
  background: color-mix(in srgb, #ef4444 70%, var(--vp-c-text-1));
}
</style>

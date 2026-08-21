<template>
  <div class="bagua-yuan-tu">
    <div class="ring ring--outer"></div>
    <div class="ring ring--mid"></div>
    <div class="ring ring--inner"></div>
    <div class="ring ring--core"></div>

    <div
      v-for="i in 4"
      :key="`d-${i}`"
      class="divider"
      :style="{ transform: `rotate(${(i - 1) * 45 + 22.5}deg)` }"
    ></div>

    <svg class="sectors" viewBox="0 0 100 100" aria-hidden="true">
      <path
        v-for="(item, i) in items"
        :key="item.name"
        class="sector"
        :class="{ 'sector--active': hoverIndex === i }"
        :d="sectorPath(i)"
        @mouseenter="hoverIndex = i"
        @mouseleave="hoverIndex = -1"
      />
    </svg>

    <div
      v-for="(item, i) in items"
      :key="item.name"
      class="spoke"
      :class="{ 'spoke--active': hoverIndex === i }"
      :style="{ transform: `rotate(${i * 45}deg)` }"
    >
      <div class="rail">
        <div class="cell cell--fang">
          <span class="label" :style="unrotate(i)">{{ item.fang }}</span>
        </div>
        <div class="cell cell--name">
          <span class="label" :style="unrotate(i)">{{ item.name }}</span>
        </div>
        <div class="cell cell--gua">
          <span class="label" :style="unrotate(i)">
            <Gua :name="item.name" :size="32" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Gua from "./Gua.vue";

defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const hoverIndex = ref(-1);

const CX = 50;
const CY = 50;
const R_OUTER = 50;
const R_INNER = 10.7;

function polar(r, deg) {
  const rad = (deg * Math.PI) / 180;
  return [CX + r * Math.sin(rad), CY - r * Math.cos(rad)];
}

function sectorPath(i) {
  const start = i * 45 - 22.5;
  const end = i * 45 + 22.5;
  const [x1, y1] = polar(R_OUTER, start);
  const [x2, y2] = polar(R_OUTER, end);
  const [x3, y3] = polar(R_INNER, end);
  const [x4, y4] = polar(R_INNER, start);
  return `M ${x1} ${y1} A ${R_OUTER} ${R_OUTER} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${R_INNER} ${R_INNER} 0 0 0 ${x4} ${y4} Z`;
}

function unrotate(i) {
  return { transform: `rotate(${-i * 45}deg)` };
}
</script>

<style lang="scss" scoped>
.bagua-yuan-tu {
  --size: min(440px, 90vw);
  position: relative;
  width: var(--size);
  height: var(--size);
  margin: 0 auto;
  color: var(--vp-c-text-1);
}

.ring {
  position: absolute;
  left: 50%;
  top: 50%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  pointer-events: none;
}

.ring--outer {
  width: 100%;
  height: 100%;
}

.ring--mid {
  width: 73.8%;
  height: 73.8%;
}

.ring--inner {
  width: 47.6%;
  height: 47.6%;
}

.ring--core {
  width: 21.4%;
  height: 21.4%;
}

.divider {
  position: absolute;
  left: 50%;
  top: 0;
  width: 1px;
  height: 100%;
  margin-left: -0.5px;
  background: var(--vp-c-divider);
  transform-origin: center center;
  pointer-events: none;
  z-index: 2;
}

.sectors {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.sector {
  fill: transparent;
  cursor: pointer;
  transition: fill 0.15s ease;
}

.sector--active {
  fill: var(--vp-c-brand-soft);
}

.spoke {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
}

.spoke--active {
  color: var(--vp-c-brand-1);
}

.rail {
  position: absolute;
  left: 50%;
  top: 0;
  height: 50%;
  width: 0;
  transform: translateX(-50%);
}

.cell {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cell--fang {
  top: 13.1%;
}

.cell--name {
  top: 39.3%;
}

.cell--gua {
  top: 65.5%;
}

.label {
  display: inline-block;
  white-space: nowrap;
  font-size: 16px;
  line-height: 1;
  user-select: none;
}

.cell--fang .label {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.spoke--active .cell--fang .label {
  color: var(--vp-c-brand-1);
}

.cell--name .label {
  font-size: 18px;
  font-weight: 600;
}
</style>

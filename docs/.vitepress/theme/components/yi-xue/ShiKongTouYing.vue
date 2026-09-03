<template>
  <div class="shi-kong-tou-ying">
    <div class="shi-kong-tou-ying__projector">
      <TaiJiTu :scale="0.4" />
      <span class="shi-kong-tou-ying__label">投影机 / 模型</span>
    </div>

    <div class="shi-kong-tou-ying__cone" aria-hidden="true" />

    <div class="shi-kong-tou-ying__sphere-wrap">
      <div class="shi-kong-tou-ying__sphere">
        <div class="shi-kong-tou-ying__sphere-globe">
          <span class="shi-kong-tou-ying__sphere-text">时空</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TaiJiTu from "../dao/TaiJiTu.vue";
</script>

<style lang="scss" scoped>
.shi-kong-tou-ying {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2.5rem auto 1.5rem;
  max-width: 320px;
}

.shi-kong-tou-ying__projector {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
}

.shi-kong-tou-ying__label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  letter-spacing: 0.05em;
}

.shi-kong-tou-ying__cone {
  width: 160px;
  height: 72px;
  margin-top: -4px;
  background: linear-gradient(
    to bottom,
    rgba(180, 180, 180, 0.35) 0%,
    rgba(180, 180, 180, 0.12) 55%,
    rgba(180, 180, 180, 0.05) 100%
  );
  clip-path: polygon(38% 0, 62% 0, 92% 100%, 8% 100%);
  z-index: 1;
}

.shi-kong-tou-ying__sphere-wrap {
  margin-top: -8px;
}

.shi-kong-tou-ying__sphere {
  width: 200px;
  height: 200px;
}

.shi-kong-tou-ying__sphere-globe {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(
      circle at 32% 28%,
      rgba(255, 255, 255, 0.85) 0%,
      rgba(255, 255, 255, 0.2) 18%,
      transparent 42%
    ),
    radial-gradient(
      circle at 50% 50%,
      #6a6a6a 0%,
      #3a3a3a 45%,
      #1a1a1a 78%,
      #0a0a0a 100%
    );
  box-shadow:
    inset -18px -14px 36px rgba(0, 0, 0, 0.55),
    inset 12px 10px 28px rgba(255, 255, 255, 0.18),
    0 12px 28px rgba(0, 0, 0, 0.28);
}

.shi-kong-tou-ying__sphere-text {
  font-size: 1.25rem;
  letter-spacing: 0.35em;
  color: rgba(255, 255, 255, 0.88);
  text-indent: 0.35em;
  user-select: none;
}
</style>

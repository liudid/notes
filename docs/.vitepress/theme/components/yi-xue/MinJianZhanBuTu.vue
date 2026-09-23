<template>
  <div class="zhan-bu-tu">
    <ul class="zhan-bu-tu__tree">
      <li>
        <div class="zhan-bu-tu__node zhan-bu-tu__node--root">
          <strong>民间占卜传统</strong>
          <span>两条不同源流</span>
        </div>
        <ul>
          <li>
            <div class="zhan-bu-tu__node zhan-bu-tu__node--bushi">
              <strong>卜筮系统</strong>
              <span>产生阴阳爻</span>
            </div>
            <ul>
              <li>
                <div class="zhan-bu-tu__node zhan-bu-tu__node--bushi">
                  <strong>卜：灼龟看兆</strong>
                  <span>烧灼龟甲看裂纹</span>
                </div>
              </li>
              <li>
                <div class="zhan-bu-tu__node zhan-bu-tu__node--bushi">
                  <strong>筮：起卦得爻</strong>
                  <span>多种起卦方式</span>
                </div>
                <ul>
                  <li>
                    <div class="zhan-bu-tu__node zhan-bu-tu__node--bushi">
                      <strong>大衍揲蓍</strong>
                      <span>五十策，其用49</span>
                    </div>
                    <ul>
                      <li>
                        <div class="zhan-bu-tu__node zhan-bu-tu__node--bushi">
                          <strong>依卦爻辞占</strong>
                          <span>最贴近周易文本</span>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div class="zhan-bu-tu__node zhan-bu-tu__node--bushi">
                      <strong>金钱卦</strong>
                      <span>摇三枚铜钱</span>
                    </div>
                    <ul>
                      <li>
                        <div class="zhan-bu-tu__node zhan-bu-tu__node--bushi">
                          <strong>六爻纳甲断法</strong>
                          <span>配干支、用神</span>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div class="zhan-bu-tu__node zhan-bu-tu__node--bushi">
                      <strong>梅花易数</strong>
                      <span>邵雍创，重数理</span>
                    </div>
                    <ul>
                      <li>
                        <div class="zhan-bu-tu__node zhan-bu-tu__node--bushi">
                          <strong>时间起卦</strong>
                          <span>年月日时数</span>
                        </div>
                      </li>
                      <li>
                        <div class="zhan-bu-tu__node zhan-bu-tu__node--bushi">
                          <strong>数字物象起卦</strong>
                          <span>看到的事物数量</span>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <div class="zhan-bu-tu__node zhan-bu-tu__node--qian">
              <strong>签占系统</strong>
              <span>抽签对签诗</span>
            </div>
            <ul>
              <li>
                <div class="zhan-bu-tu__node zhan-bu-tu__node--qian">
                  <strong>掣签（灵签）</strong>
                  <span>如观音/关帝签</span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.zhan-bu-tu {
  overflow-x: auto;
  margin: 0.85rem 0 1.25rem;
  padding: 0.25rem 0;
  color: var(--vp-c-text-3);
}

.zhan-bu-tu__tree,
.zhan-bu-tu__tree ul {
  display: flex;
  justify-content: center;
  padding-top: 0.85rem;
  position: relative;
  margin: 0;
  list-style: none;
}

.zhan-bu-tu__tree {
  min-width: max-content;
  padding-top: 0;
}

.zhan-bu-tu__tree ul::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  height: 0.85rem;
  border-left: 1.5px solid currentColor;
  transform: translateX(-50%);
}

.zhan-bu-tu__tree li {
  position: relative;
  padding: 0.85rem 0.4rem 0;
  text-align: center;
}

.zhan-bu-tu__tree li::before,
.zhan-bu-tu__tree li::after {
  content: "";
  position: absolute;
  top: 0;
  right: 50%;
  width: 50%;
  height: 0.85rem;
  border-top: 1.5px solid currentColor;
}

.zhan-bu-tu__tree li::after {
  right: auto;
  left: 50%;
  border-left: 1.5px solid currentColor;
}

.zhan-bu-tu__tree li:only-child::before,
.zhan-bu-tu__tree li:only-child::after {
  display: none;
}

.zhan-bu-tu__tree li:only-child {
  padding-top: 0.85rem;
}

.zhan-bu-tu__tree > li:only-child {
  padding-top: 0;
}

.zhan-bu-tu__tree li:first-child::before,
.zhan-bu-tu__tree li:last-child::after {
  border: 0 none;
}

.zhan-bu-tu__tree li:last-child::before {
  border-right: 1.5px solid currentColor;
  border-radius: 0 0.35rem 0 0;
}

.zhan-bu-tu__tree li:first-child::after {
  border-radius: 0.35rem 0 0 0;
}

.zhan-bu-tu__node {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  min-width: 5.6rem;
  max-width: 8.2rem;
  padding: 0.32rem 0.48rem;
  border: 1px solid transparent;
  border-radius: 5px;
  text-align: center;
  line-height: 1.3;
  box-shadow: 0 1px 2px rgb(0 0 0 / 5%);
  vertical-align: top;
}

.zhan-bu-tu__node strong {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.zhan-bu-tu__node span {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
}

.zhan-bu-tu__node--root {
  background: color-mix(in srgb, var(--vp-c-bg-soft) 88%, #94a3b8);
  border-color: color-mix(in srgb, var(--vp-c-divider) 70%, #64748b);
}

.zhan-bu-tu__node--bushi {
  background: color-mix(in srgb, var(--vp-c-bg) 72%, #86efac);
  border-color: color-mix(in srgb, var(--vp-c-divider) 55%, #22c55e);
}

.zhan-bu-tu__node--qian {
  background: color-mix(in srgb, var(--vp-c-bg) 72%, #fca5a5);
  border-color: color-mix(in srgb, var(--vp-c-divider) 55%, #ef4444);
}
</style>

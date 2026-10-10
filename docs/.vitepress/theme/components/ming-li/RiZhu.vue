<template>
  <div class="ri-zhu" :class="{ 'ri-zhu--shishen': variant === 'shishen' }">
    <div class="toolbar">
      <p class="caption">{{ caption }}</p>
      <button type="button" class="open-btn" @click="openPicker">改四柱</button>
    </div>

    <div class="pillars">
      <article
        v-for="pillar in viewPillars"
        :key="pillar.name"
        class="pillar"
        :class="{ 'pillar--day': pillar.isDay }"
      >
        <div class="pillar__name">{{ pillar.name }}</div>
        <div
          v-for="cell in pillar.cells"
          :key="cell.slot"
          class="cell"
          :class="{ 'cell--me': cell.isMe }"
          :style="cellStyle(cell.element)"
        >
          <span v-if="cell.isMe" class="me-badge">{{ variant === "shishen" ? "日主 / 参照" : "日主 / 我" }}</span>
          <span class="cell__char">{{ cell.char }}</span>
          <span class="cell__element">{{ cell.elementLine }}</span>
          <span v-if="cell.tag" class="cell__tag">{{ cell.tagLine }}</span>
          <span v-if="cell.note" class="cell__note">{{ cell.note }}</span>
        </div>
      </article>
    </div>

    <div v-if="variant === 'shishen'" class="compare-wrap">
      <section
        v-for="table in compareTables"
        :key="table.kind"
        class="compare"
        :aria-label="table.title + '十神对照'"
      >
        <p class="compare__center">
          {{ table.title }} - 参照中心：日干 {{ dayStem }} · {{ meYinYang }}{{ meElement }}
        </p>
        <div class="compare__head">
          <span>五行关系</span>
          <span>同阴阳</span>
          <span>异阴阳</span>
        </div>
        <div v-for="row in table.rows" :key="row.rel" class="compare__row">
          <div class="compare__rel">{{ row.rel }}</div>
          <div class="compare__god" :class="{ 'compare__god--on': row.sameChars.length }">
            <span class="compare__name">{{ row.same }}</span>
            <span v-if="row.sameChars.length" class="compare__chars">{{ row.sameChars.join("、") }}</span>
          </div>
          <div class="compare__god" :class="{ 'compare__god--on': row.diffChars.length }">
            <span class="compare__name">{{ row.diff }}</span>
            <span v-if="row.diffChars.length" class="compare__chars">{{ row.diffChars.join("、") }}</span>
          </div>
        </div>
      </section>
    </div>

    <div v-if="variant === 'shishen'" class="meanings">
      <article v-for="item in meanings" :key="item.group" class="meaning">
        <div class="meaning__group">{{ item.group }}</div>
        <div class="meaning__body">
          <div class="meaning__names">{{ item.names }}</div>
          <p class="meaning__core">核心关系：{{ item.core }}。</p>
          <p class="meaning__text">{{ item.text }}</p>
        </div>
      </article>
    </div>

    <div v-else class="map" aria-label="以日主为参照的五类关系">
      <div class="map__node map__node--sheng">
        <span class="map__name">生我</span>
        <span class="map__detail">{{ relationText("生我") }}</span>
      </div>
      <div class="map__arrow map__arrow--down" aria-hidden="true"></div>

      <div class="map__node map__node--ke">
        <span class="map__name">克我</span>
        <span class="map__detail">{{ relationText("克我") }}</span>
      </div>
      <div class="map__arrow map__arrow--right map__arrow--into" aria-hidden="true"></div>

      <div class="map__me">
        <span class="map__name">我</span>
        <span class="map__detail">{{ meText }}</span>
        <span class="map__same">同我 · {{ sameChars }}</span>
      </div>

      <div class="map__arrow map__arrow--right map__arrow--outward" aria-hidden="true"></div>
      <div class="map__node map__node--out">
        <span class="map__name">我生</span>
        <span class="map__detail">{{ relationText("我生") }}</span>
      </div>

      <div class="map__arrow map__arrow--down map__arrow--from-me" aria-hidden="true"></div>
      <div class="map__node map__node--control">
        <span class="map__name">我克</span>
        <span class="map__detail">{{ relationText("我克") }}</span>
      </div>
    </div>

    <p class="footnote">{{
      variant === "shishen"
        ? "地支取本气藏干，再比日干的阴阳。其余藏干不在这一页。七杀也叫偏官，偏印也叫枭神。"
        : "地支按本气归类。藏干，以及十神的正偏，不在这一页。"
    }}</p>

    <div
      v-if="open"
      class="mask"
      @click.self="closePicker"
    >
      <div
        class="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ri-zhu-picker-title"
        @keydown.esc="closePicker"
      >
        <div class="dialog__head">
          <div id="ri-zhu-picker-title" class="dialog__title">改四柱</div>
          <button type="button" class="text-btn" @click="closePicker">关闭</button>
        </div>
        <p class="dialog__hint">{{ hint }}</p>

        <div class="pillars pillars--dialog">
          <article
            v-for="(pillar, pillarIndex) in draft"
            :key="pillar.name"
            class="pillar"
            :class="{ 'pillar--day': pillarIndex === 2 }"
          >
            <div class="pillar__name">{{ pillar.name }}</div>
            <button
              v-for="kind in ['stem', 'branch']"
              :key="kind"
              type="button"
              class="cell cell--btn"
              :class="{
                'cell--active': cursor === slotIndex(pillarIndex, kind),
                'cell--locked': isLocked(slotIndex(pillarIndex, kind)),
                'cell--empty': !pillar[kind],
              }"
              :style="pillar[kind] ? cellStyle(charElement(pillar[kind], kind)) : undefined"
              :disabled="isLocked(slotIndex(pillarIndex, kind))"
              @click="focusSlot(slotIndex(pillarIndex, kind))"
            >
              <span class="cell__char">{{ pillar[kind] || (kind === "stem" ? "干" : "支") }}</span>
              <span class="cell__element">{{
                pillar[kind] ? charElement(pillar[kind], kind) : kind === "stem" ? "天干" : "地支"
              }}</span>
            </button>
          </article>
        </div>

        <div class="pool" role="listbox" :aria-label="poolLabel">
          <button
            v-for="char in pool"
            :key="char"
            type="button"
            class="pool__btn"
            :class="{ 'pool__btn--on': currentChar === char }"
            :style="cellStyle(charElement(char, cursorIsStem ? 'stem' : 'branch'))"
            @click="pick(char)"
          >
            {{ char }}
          </button>
        </div>

        <div class="dialog__actions">
          <button type="button" class="text-btn" @click="restoreDefault">恢复默认</button>
          <button type="button" class="done-btn" :disabled="!draftComplete" @click="commit">
            完成
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";

const props = defineProps({
  variant: { type: String, default: "" },
});

const PILLAR_NAMES = ["年柱", "月柱", "日柱", "时柱"];
const STEP_LABELS = ["年干", "年支", "月干", "月支", "日干", "日支", "时干", "时支"];
const ELEMENTS = ["木", "火", "土", "金", "水"];
const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const STEM_ELEMENT = {
  甲: "木",
  乙: "木",
  丙: "火",
  丁: "火",
  戊: "土",
  己: "土",
  庚: "金",
  辛: "金",
  壬: "水",
  癸: "水",
};

const BRANCH_ELEMENT = {
  子: "水",
  丑: "土",
  寅: "木",
  卯: "木",
  辰: "土",
  巳: "火",
  午: "火",
  未: "土",
  申: "金",
  酉: "金",
  戌: "土",
  亥: "水",
};

const STEM_YINYANG = {
  甲: "阳",
  乙: "阴",
  丙: "阳",
  丁: "阴",
  戊: "阳",
  己: "阴",
  庚: "阳",
  辛: "阴",
  壬: "阳",
  癸: "阴",
};

const BRANCH_QI = {
  子: "癸",
  丑: "己",
  寅: "甲",
  卯: "乙",
  辰: "戊",
  巳: "丙",
  午: "丁",
  未: "己",
  申: "庚",
  酉: "辛",
  戌: "戊",
  亥: "壬",
};

const SHI_SHEN = {
  同我: ["比肩", "劫财"],
  生我: ["偏印", "正印"],
  我生: ["食神", "伤官"],
  我克: ["偏财", "正财"],
  克我: ["七杀", "正官"],
};

const meanings = [
  {
    group: "比劫",
    names: "比肩、劫财",
    core: "同我",
    text: "比肩有并肩、同类之象；劫财有争夺、分夺之象。传统命理常由此引申出同辈、竞争、助力等象意。",
  },
  {
    group: "食伤",
    names: "食神、伤官",
    core: "我生",
    text: "食神有滋养、享用、产出之象；伤官有表达、显露、突破常规之象。传统命理会进一步引申到才艺、言语、创造与子女等领域。",
  },
  {
    group: "财星",
    names: "正财、偏财",
    core: "我克",
    text: "财星以日主所克之物为基本关系。传统命理常借此取象于财物、资源、经营，以及某些亲属关系。",
  },
  {
    group: "官杀",
    names: "正官、七杀（偏官）",
    core: "克我",
    text: "官星有约束、秩序、名位、责任之象；七杀有压力、权势、制约与攻身之象。两者虽同属克我，但阴阳关系不同。",
  },
  {
    group: "印星",
    names: "正印、偏印（枭神）",
    core: "生我",
    text: "印星有生养、庇护、承接、受纳之象。传统命理常引申到长辈、学业、文书、名誉等方面。",
  },
];

const ink = {
  木: "#2e7d32",
  火: "#c62828",
  土: "#e65100",
  金: "#b8860b",
  水: "#1565c0",
};

const wash = {
  木: "rgba(76, 175, 80, 0.16)",
  火: "rgba(244, 67, 54, 0.14)",
  土: "rgba(255, 152, 0, 0.18)",
  金: "rgba(255, 193, 7, 0.22)",
  水: "rgba(33, 150, 243, 0.16)",
};

function defaultChart() {
  return [
    { stem: "甲", branch: "辰" },
    { stem: "丙", branch: "寅" },
    { stem: "戊", branch: "午" },
    { stem: "壬", branch: "申" },
  ].map((item, index) => ({ name: PILLAR_NAMES[index], ...item }));
}

function cloneChart(source) {
  return source.map((item) => ({ ...item }));
}

const chart = ref(defaultChart());
const open = ref(false);
const draft = ref(defaultChart());
const cursor = ref(0);

const cursorIsStem = computed(() => cursor.value % 2 === 0);
const pool = computed(() => (cursorIsStem.value ? STEMS : BRANCHES));
const poolLabel = computed(() => (cursorIsStem.value ? "选择天干" : "选择地支"));
const currentChar = computed(() => {
  const pillar = draft.value[Math.floor(cursor.value / 2)];
  return cursorIsStem.value ? pillar.stem : pillar.branch;
});
const draftComplete = computed(() =>
  draft.value.every((pillar) => pillar.stem && pillar.branch)
);
const hint = computed(() => {
  const step = STEP_LABELS[cursor.value];
  return cursorIsStem.value
    ? `从年柱开始。正在选${step}，选定后才选这一柱的地支。`
    : `正在选${step}。地支选定后，才能进入下一柱。`;
});

const dayStem = computed(() => chart.value[2].stem);
const meElement = computed(() => STEM_ELEMENT[dayStem.value]);
const meYinYang = computed(() => STEM_YINYANG[dayStem.value]);

const caption = computed(() => {
  const text = chart.value.map((pillar) => pillar.stem + pillar.branch).join("、");
  if (props.variant === "shishen") {
    return `示例：${text}。参照中心是日干${dayStem.value}，${meYinYang.value}${meElement.value}。`;
  }
  return `示例：${text}。日主是${dayStem.value}${meElement.value}。`;
});

const meText = computed(() => `${dayStem.value} · ${meElement.value}`);

const viewPillars = computed(() => buildPillars(chart.value));

const grouped = computed(() => {
  const groups = { 生我: [], 同我: [], 我生: [], 我克: [], 克我: [] };
  viewPillars.value.forEach((pillar) => {
    pillar.cells.forEach((cell) => {
      if (!cell.isMe && groups[cell.tag]) groups[cell.tag].push(cell);
    });
  });
  return groups;
});

const sameChars = computed(() => grouped.value.同我.map((cell) => cell.char).join("、") || "—");

const compareTables = computed(() =>
  [
    { title: "天干", kind: "stem" },
    { title: "地支", kind: "branch" },
  ].map((table) => ({
    ...table,
    rows: ["同我", "我生", "我克", "克我", "生我"].map((rel) => {
      const [same, diff] = SHI_SHEN[rel];
      const cells = grouped.value[rel].filter((cell) => cell.kind === table.kind);
      return {
        rel,
        same,
        diff,
        sameChars: cells.filter((cell) => cell.shiShen === same).map((cell) => cell.char),
        diffChars: cells.filter((cell) => cell.shiShen === diff).map((cell) => cell.char),
      };
    }),
  }))
);

function relationElement(tag) {
  const index = ELEMENTS.indexOf(meElement.value);
  const offset = { 生我: 4, 我生: 1, 克我: 3, 我克: 2, 同我: 0 }[tag];
  return ELEMENTS[(index + offset) % 5];
}

function relationText(tag) {
  const chars = grouped.value[tag].map((cell) => cell.char);
  return `${relationElement(tag)} · ${chars.length ? chars.join("、") : "—"}`;
}

function buildPillars(source) {
  const day = source[2].stem;
  return source.map((pillar, index) => ({
    name: pillar.name,
    isDay: index === 2,
    cells: ["stem", "branch"].map((kind) => {
      const char = pillar[kind];
      const element = charElement(char, kind);
      const isMe = index === 2 && kind === "stem";
      const refStem = !char || isMe ? "" : kind === "stem" ? char : BRANCH_QI[char];
      const named = refStem ? nameShiShen(day, refStem) : { rel: "", name: "" };
      const yinYang = refStem ? STEM_YINYANG[refStem] : isMe ? STEM_YINYANG[day] : "";
      return {
        slot: `${pillar.name}-${kind}`,
        kind,
        char,
        element,
        elementLine: elementLine(kind, element, yinYang, refStem, isMe),
        isMe,
        tag: isMe ? "" : named.rel,
        shiShen: isMe ? "" : named.name,
        tagLine: isMe ? "" : props.variant === "shishen" ? `${named.rel} · ${named.name}` : named.rel,
        note: index === 2 && kind === "branch" ? "日支，不是日主" : "",
      };
    }),
  }));
}

function elementLine(kind, element, yinYang, refStem, isMe) {
  if (!element) return "";
  if (props.variant !== "shishen") return element;
  if (isMe) return `${yinYang}${element}`;
  if (kind === "branch") return `${yinYang}${element} · 本气${refStem}`;
  return `${yinYang}${element}`;
}

function nameShiShen(day, other) {
  const rel = relate(STEM_ELEMENT[day], STEM_ELEMENT[other]);
  const same = STEM_YINYANG[day] === STEM_YINYANG[other];
  return { rel, name: SHI_SHEN[rel][same ? 0 : 1] };
}

function charElement(char, kind) {
  if (!char) return "";
  return kind === "stem" ? STEM_ELEMENT[char] : BRANCH_ELEMENT[char];
}

function relate(me, other) {
  if (!me || !other) return "";
  if (me === other) return "同我";
  if (generates(other, me)) return "生我";
  if (generates(me, other)) return "我生";
  if (controls(other, me)) return "克我";
  return "我克";
}

function generates(from, to) {
  return (ELEMENTS.indexOf(from) + 1) % 5 === ELEMENTS.indexOf(to);
}

function controls(from, to) {
  return (ELEMENTS.indexOf(from) + 2) % 5 === ELEMENTS.indexOf(to);
}

function cellStyle(element) {
  if (!element) return undefined;
  return {
    color: ink[element],
    background: wash[element],
    borderColor: ink[element],
  };
}

function slotIndex(pillarIndex, kind) {
  return pillarIndex * 2 + (kind === "stem" ? 0 : 1);
}

function isLocked(index) {
  const pillarIndex = Math.floor(index / 2);
  const isBranch = index % 2 === 1;
  for (let i = 0; i < pillarIndex; i += 1) {
    if (!draft.value[i].stem || !draft.value[i].branch) return true;
  }
  return isBranch && !draft.value[pillarIndex].stem;
}

function focusSlot(index) {
  if (isLocked(index)) return;
  cursor.value = index;
}

function pick(char) {
  const pillarIndex = Math.floor(cursor.value / 2);
  const pillar = draft.value[pillarIndex];
  if (cursorIsStem.value) {
    pillar.stem = char;
    pillar.branch = "";
    cursor.value = pillarIndex * 2 + 1;
    return;
  }
  pillar.branch = char;
  const next = cursor.value + 1;
  if (next < 8 && !isLocked(next)) cursor.value = next;
}

function openPicker() {
  draft.value = cloneChart(chart.value);
  cursor.value = 0;
  open.value = true;
}

function closePicker() {
  open.value = false;
}

function restoreDefault() {
  draft.value = defaultChart();
  cursor.value = 0;
}

function commit() {
  if (!draftComplete.value) return;
  chart.value = cloneChart(draft.value);
  open.value = false;
}

function onKeydown(event) {
  if (event.key === "Escape" && open.value) closePicker();
}

watch(open, (value) => {
  document.body.style.overflow = value ? "hidden" : "";
});

if (typeof window !== "undefined") {
  window.addEventListener("keydown", onKeydown);
}

onBeforeUnmount(() => {
  document.body.style.overflow = "";
  if (typeof window !== "undefined") {
    window.removeEventListener("keydown", onKeydown);
  }
});
</script>

<style lang="scss" scoped>
.ri-zhu {
  margin: 1.25rem 0 1.5rem;
}

.toolbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.caption,
.footnote,
.dialog__hint {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.footnote {
  margin-top: 12px;
}

.open-btn,
.done-btn,
.text-btn,
.pool__btn,
.cell--btn {
  font: inherit;
}

.open-btn,
.done-btn {
  flex: none;
  border: 0;
  border-radius: 999px;
  background: #e65100;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  line-height: 32px;
  padding: 0 14px;
  cursor: pointer;
}

.done-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.text-btn {
  border: 0;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 14px;
  cursor: pointer;
}

.pillars {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 14px;
}

.pillar {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.pillar--day {
  border-color: #e65100;
  box-shadow: 0 0 0 1px rgba(230, 81, 0, 0.25);
}

.pillar__name {
  margin: 0;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.cell {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-height: 108px;
  padding: 12px 8px 10px;
  border: 1px solid;
  border-radius: 10px;
  text-align: center;
}

.cell--btn {
  width: 100%;
  cursor: pointer;
}

.cell--btn:disabled {
  cursor: not-allowed;
}

.cell--me {
  border-width: 2px;
  box-shadow: 0 0 0 3px rgba(230, 81, 0, 0.18);
}

.cell--active {
  box-shadow: 0 0 0 3px rgba(230, 81, 0, 0.45);
}

.cell--locked {
  opacity: 0.38;
}

.cell--empty {
  border-style: dashed;
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-3);
  background: transparent;
}

.me-badge {
  padding: 0 8px;
  border-radius: 999px;
  background: #e65100;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.04em;
}

.cell__char {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.15;
  font-family: "Songti SC", "STSong", "SimSun", serif;
}

.cell--me .cell__char {
  margin-top: 2px;
}

.cell__element,
.cell__tag,
.cell__note {
  font-size: 12px;
  line-height: 1.4;
}

.cell__tag {
  font-weight: 700;
}

.cell__note {
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.ri-zhu--shishen .cell {
  min-height: 132px;
}

.compare-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 22px;
}

.compare {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

.compare__center {
  margin: 0;
  padding: 12px 14px;
  background: rgba(255, 152, 0, 0.16);
  color: #e65100;
  font-weight: 700;
  text-align: center;
}

.compare__head,
.compare__row {
  display: grid;
  grid-template-columns: 88px 1fr 1fr;
}

.compare__head {
  padding: 8px 10px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 700;
}

.compare__row + .compare__row {
  border-top: 1px solid var(--vp-c-divider);
}

.compare__rel,
.compare__god {
  padding: 10px 12px;
}

.compare__rel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.compare__element,
.compare__chars {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.compare__god {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-left: 1px solid var(--vp-c-divider);
}

.compare__god--on {
  background: rgba(230, 81, 0, 0.08);
}

.compare__name {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.meanings {
  margin-top: 22px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

.meaning {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 12px;
  padding: 14px 16px;
}

.meaning + .meaning {
  border-top: 1px solid var(--vp-c-divider);
}

.meaning__group {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.meaning__names {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.meaning__core,
.meaning__text {
  margin: 4px 0 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.map {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 28px minmax(0, 1.15fr) 28px minmax(0, 1fr);
  grid-template-areas:
    ". . sheng . ."
    ". . down . ."
    "ke right me right2 out"
    ". . down2 . ."
    ". . control . .";
  align-items: center;
  justify-items: center;
  gap: 8px 0;
  margin-top: 22px;
  padding: 16px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}

.map__node,
.map__me {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 168px;
  min-height: 72px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  text-align: center;
}

.map__node--sheng {
  grid-area: sheng;
}
.map__node--ke {
  grid-area: ke;
}
.map__node--out {
  grid-area: out;
}
.map__node--control {
  grid-area: control;
}
.map__me {
  grid-area: me;
  border-color: #e65100;
  background: rgba(255, 152, 0, 0.16);
}

.map__name {
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.map__detail,
.map__same {
  margin-top: 2px;
  font-size: 13px;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.map__same {
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px dashed rgba(230, 81, 0, 0.45);
  color: #e65100;
  font-weight: 700;
}

.map__arrow--down {
  grid-area: down;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid var(--vp-c-text-3);
}

.map__arrow--from-me {
  grid-area: down2;
}

.map__arrow--right {
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 8px solid var(--vp-c-text-3);
}

.map__arrow--into {
  grid-area: right;
}

.map__arrow--outward {
  grid-area: right2;
}

.mask {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background: rgba(0, 0, 0, 0.45);
}

.dialog {
  width: min(760px, 100%);
  max-height: calc(100vh - 48px);
  overflow: auto;
  padding: 16px 16px 18px;
  border-radius: 16px;
  background: var(--vp-c-bg);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
}

.dialog__head,
.dialog__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.dialog__title {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.dialog__hint {
  margin-top: 8px;
}

.dialog__actions {
  margin-top: 16px;
}

.pool {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.pool__btn {
  width: 44px;
  height: 44px;
  border-width: 1px;
  border-style: solid;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
  font-family: "Songti SC", "STSong", "SimSun", serif;
  cursor: pointer;
}

.pool__btn--on {
  box-shadow: 0 0 0 2px currentColor;
}

@media (max-width: 720px) {
  .pillars,
  .compare__head,
  .compare__row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .compare__head {
    display: none;
  }

  .compare__rel {
    grid-column: 1 / -1;
    flex-direction: row;
    gap: 8px;
    padding-bottom: 0;
  }

  .map {
    grid-template-columns: 1fr;
    grid-template-areas:
      "sheng"
      "down"
      "ke"
      "me"
      "out"
      "down2"
      "control";
  }

  .map__arrow--right {
    display: none;
  }
}
</style>

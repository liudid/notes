import { T, byPair, type Hexagram, type TrigramKey } from "./liuShiSiGua.ts";

const POS_NAMES = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"];
export const POS_IS_YANG = [true, false, true, false, true, false];
export const POS_ORDINAL = [
  "第一位",
  "第二位",
  "第三位",
  "第四位",
  "第五位",
  "第六位",
];
const YING_MAP = [3, 4, 5, 0, 1, 2];

export function yaoTraditionalLabel(index: number, isYang: boolean): string {
  const yy = isYang ? "九" : "六";
  if (index === 0) return `初${yy}`;
  if (index === 5) return `上${yy}`;
  return `${yy}${["二", "三", "四", "五"][index - 1]}`;
}

export function yaoXingLabel(isYang: boolean): string {
  return isYang ? "阳爻" : "阴爻";
}

export function posAttrLabel(index: number): string {
  return POS_IS_YANG[index] ? "阳位" : "阴位";
}

export function posLabelWithOrdinal(index: number): string {
  return `${POS_NAMES[index]}（${POS_ORDINAL[index]}）`;
}

export { POS_NAMES };

const BITS_TO_KEY = Object.fromEntries(
  Object.entries(T).map(([k, v]) => [v.bits, k as TrigramKey]),
);

export type WeiTag = {
  key: string;
  label: string;
  tone: "good" | "warn" | "neutral";
};

function codeToLines(code: string): boolean[] {
  return code.split("").map((c) => c === "1");
}

function hexFullFromCode(code: string): string {
  return resolveHex(code)?.full ?? "（未知）";
}

/** 由六位 code 解析六十四卦（初爻在左，1=阳） */
export function resolveHex(code: string): Hexagram | null {
  if (!code || code.length !== 6) return null;
  const lower = BITS_TO_KEY[code.slice(0, 3)];
  const upper = BITS_TO_KEY[code.slice(3, 6)];
  if (!lower || !upper) return null;
  return byPair[`${lower}-${upper}`] ?? null;
}

/** 由六位 code 解析卦全名 */
export function resolveHexFull(code: string): string {
  return hexFullFromCode(code);
}

/** 错卦 bits：阴阳全变 */
export function bitsCuo(code: string): string {
  return code
    .split("")
    .map((c) => (c === "1" ? "0" : "1"))
    .join("");
}

/** 综卦 bits：上下颠倒 */
export function bitsZong(code: string): string {
  return code.split("").reverse().join("");
}

/** 互卦 bits：下互二三四，上互三四五 */
export function bitsHu(code: string): string {
  return code[1] + code[2] + code[3] + code[2] + code[3] + code[4];
}

/** 错卦：阴阳全变（返回全名） */
export function codeCuo(code: string): string {
  return hexFullFromCode(bitsCuo(code));
}

/** 综卦：上下颠倒（返回全名） */
export function codeZong(code: string): string {
  return hexFullFromCode(bitsZong(code));
}

/** 互卦：下互二三四，上互三四五（返回全名） */
export function codeHu(code: string): string {
  return hexFullFromCode(bitsHu(code));
}

export type BianNode = {
  code: string;
  full: string;
};

/** 错 / 综 / 互：各含 code + 全名 */
export function computeBianTree(code: string): {
  cuo: BianNode;
  zong: BianNode;
  hu: BianNode;
} {
  const cuoCode = bitsCuo(code);
  const zongCode = bitsZong(code);
  const huCode = bitsHu(code);
  return {
    cuo: { code: cuoCode, full: hexFullFromCode(cuoCode) },
    zong: { code: zongCode, full: hexFullFromCode(zongCode) },
    hu: { code: huCode, full: hexFullFromCode(huCode) },
  };
}

/** 按动爻标志翻转，得之卦 */
export function applyDongYao(
  code: string,
  movingFlags: boolean[],
): BianNode | null {
  if (!movingFlags.some(Boolean)) return null;
  const chars = code.split("");
  for (let i = 0; i < 6; i++) {
    if (movingFlags[i]) chars[i] = chars[i] === "1" ? "0" : "1";
  }
  const next = chars.join("");
  return { code: next, full: hexFullFromCode(next) };
}

export function computeBianGua(code: string) {
  return {
    cuo: codeCuo(code),
    zong: codeZong(code),
    hu: codeHu(code),
    bianGua: "（待指定变爻后计算）",
  };
}

export type BiKind = "support" | "ride" | "hostile";

export type BiPair = {
  index: number;
  kind: BiKind;
  tag: string;
  title: string;
  hint: string;
};

/** 相邻五对之比：亲比（承/乘）或敌比 */
export function computeBiPairs(code: string): BiPair[] {
  const lines = codeToLines(code);
  const out: BiPair[] = [];

  for (let i = 0; i < 5; i++) {
    const lowerYang = lines[i];
    const upperYang = lines[i + 1];
    const lowerLabel = yaoTraditionalLabel(i, lowerYang);
    const upperLabel = yaoTraditionalLabel(i + 1, upperYang);

    if (lowerYang === upperYang) {
      out.push({
        index: i,
        kind: "hostile",
        tag: "敌比",
        title: `${lowerLabel} 与 ${upperLabel}`,
        hint: `同为${lowerYang ? "阳" : "阴"}爻，相斥不相得`,
      });
    } else if (lowerYang) {
      out.push({
        index: i,
        kind: "ride",
        tag: "亲比·乘",
        title: `${upperLabel} 乘 ${lowerLabel}`,
        hint: "阴压在阳上，柔乘刚，逆",
      });
    } else {
      out.push({
        index: i,
        kind: "support",
        tag: "亲比·承",
        title: `${lowerLabel} 承 ${upperLabel}`,
        hint: "阴托在阳下，柔承刚，顺",
      });
    }
  }

  return out;
}

/** 应位三对：初四、二五、三上 */
export const YING_PAIRS: readonly [number, number][] = [
  [0, 3],
  [1, 4],
  [2, 5],
];

const YING_SLOT_NAMES = ["初四", "二五", "三上"];

export type YingKind = "match" | "void";

export type YingPair = {
  index: number;
  lo: number;
  hi: number;
  kind: YingKind;
  tag: string;
  title: string;
  hint: string;
  slot: string;
};

/** 隔位三对之应：异性正应、同性无应 */
export function computeYingPairs(code: string): YingPair[] {
  const lines = codeToLines(code);
  return YING_PAIRS.map(([lo, hi], index) => {
    const aYang = lines[lo];
    const bYang = lines[hi];
    const match = aYang !== bYang;
    const aLabel = yaoTraditionalLabel(lo, aYang);
    const bLabel = yaoTraditionalLabel(hi, bYang);
    return {
      index,
      lo,
      hi,
      kind: match ? "match" : "void",
      tag: match ? "正应" : "无应",
      slot: YING_SLOT_NAMES[index],
      title: `${aLabel} 与 ${bLabel}`,
      hint: match
        ? "异性相吸，志同相应"
        : `同为${aYang ? "阳" : "阴"}爻，隔位不相得`,
    };
  });
}

const JU_SLOT_NAMES = ["初", "二", "三", "四", "五", "上"];

export type JuPair = {
  index: number;
  lo: number;
  hi: number;
  title: string;
  hint: string;
  slot: string;
};

/** 相邻据：阳在上、阴在下 */
export function computeJuPairs(code: string): JuPair[] {
  const lines = codeToLines(code);
  const out: JuPair[] = [];
  for (let hi = 1; hi <= 5; hi++) {
    const lo = hi - 1;
    if (lines[hi] && !lines[lo]) {
      const aLabel = yaoTraditionalLabel(lo, false);
      const bLabel = yaoTraditionalLabel(hi, true);
      out.push({
        index: out.length,
        lo,
        hi,
        slot: `${JU_SLOT_NAMES[hi]}据${JU_SLOT_NAMES[lo]}`,
        title: `${bLabel} 据 ${aLabel}`,
        hint: "阳爻在阴爻之上，相邻据阴",
      });
    }
  }
  return out;
}

export function computeYaoWei(code: string): WeiTag[][] {
  const lines = codeToLines(code);

  return lines.map((isYang, i) => {
    const tags: WeiTag[] = [];

    const dangWei = isYang === POS_IS_YANG[i];
    tags.push({
      key: "zheng",
      label: dangWei ? "当位" : "不当位",
      tone: dangWei ? "good" : "warn",
    });

    if (i === 1 || i === 4) {
      tags.push({ key: "zhong", label: "得中", tone: "good" });
    }

    const below = i > 0 ? lines[i - 1] : null;
    const above = i < 5 ? lines[i + 1] : null;

    if (!isYang && above === true) {
      tags.push({ key: "cheng", label: "承", tone: "neutral" });
    }
    if (!isYang && below === true) {
      tags.push({ key: "chengYao", label: "乘", tone: "warn" });
    }
    if (isYang && below === false) {
      tags.push({ key: "ju", label: "据", tone: "neutral" });
    }

    if (below !== null) {
      const biQin = isYang !== below;
      tags.push({
        key: "bi",
        label: biQin ? "比（下邻）" : "不比（下邻）",
        tone: biQin ? "good" : "neutral",
      });
    }
    if (above !== null) {
      const biQin = isYang !== above;
      tags.push({
        key: "bi",
        label: biQin ? "比（上邻）" : "不比（上邻）",
        tone: biQin ? "good" : "neutral",
      });
    }

    const j = YING_MAP[i];
    const other = lines[j];
    if (other !== isYang) {
      tags.push({
        key: "ying",
        label: `正应（与${POS_NAMES[j]}）`,
        tone: "good",
      });
    } else {
      tags.push({
        key: "ying",
        label: `无应（与${POS_NAMES[j]}）`,
        tone: "neutral",
      });
    }

    return tags;
  });
}


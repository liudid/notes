import { T, byPair, type TrigramKey } from "./liuShiSiGua.ts";

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
  return `${yy}${["", "", "二", "三", "四", "五"][index]}`;
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
  const lower = BITS_TO_KEY[code.slice(0, 3)];
  const upper = BITS_TO_KEY[code.slice(3, 6)];
  if (!lower || !upper) return "（未知）";
  return byPair[`${lower}-${upper}`]?.full ?? "（未知）";
}

/** 错卦：阴阳全变 */
export function codeCuo(code: string): string {
  const flipped = code
    .split("")
    .map((c) => (c === "1" ? "0" : "1"))
    .join("");
  return hexFullFromCode(flipped);
}

/** 综卦：上下颠倒 */
export function codeZong(code: string): string {
  return hexFullFromCode(code.split("").reverse().join(""));
}

/** 互卦：下互二三四，上互三四五 */
export function codeHu(code: string): string {
  const huLower = code[1] + code[2] + code[3];
  const huUpper = code[2] + code[3] + code[4];
  const lower = BITS_TO_KEY[huLower];
  const upper = BITS_TO_KEY[huUpper];
  if (!lower || !upper) return "（未知）";
  return byPair[`${lower}-${upper}`]?.full ?? "（未知）";
}

export function computeBianGua(code: string) {
  return {
    cuo: codeCuo(code),
    zong: codeZong(code),
    hu: codeHu(code),
    bianGua: "（待指定变爻后计算）",
  };
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


import {
  T,
  getByPair,
  type Hexagram,
  type TrigramKey,
} from "./liuShiSiGua.ts";

/** 先天八卦数 */
export const XIAN_TIAN_NUM: Record<number, TrigramKey> = {
  1: "qian",
  2: "dui",
  3: "li",
  4: "zhen",
  5: "xun",
  6: "kan",
  7: "gen",
  8: "kun",
};

export const XIAN_TIAN_ZH: Record<number, string> = {
  1: "乾",
  2: "兑",
  3: "离",
  4: "震",
  5: "巽",
  6: "坎",
  7: "艮",
  8: "坤",
};

/** 后天方位 → 先天数（取卦用） */
export const HOU_TIAN_DIR: {
  key: string;
  label: string;
  num: number;
}[] = [
  { key: "kan", label: "正北（坎）", num: 6 },
  { key: "gen", label: "东北（艮）", num: 7 },
  { key: "zhen", label: "正东（震）", num: 4 },
  { key: "xun", label: "东南（巽）", num: 5 },
  { key: "li", label: "正南（离）", num: 3 },
  { key: "kun", label: "西南（坤）", num: 8 },
  { key: "dui", label: "正西（兑）", num: 2 },
  { key: "qian", label: "西北（乾）", num: 1 },
];

export type YaoLine = {
  value: number;
  name: string;
  yang: boolean;
  changing: boolean;
};

export function mod8(n: number): number {
  const r = Math.abs(Math.trunc(n)) % 8;
  return r === 0 ? 8 : r;
}

export function mod6(n: number): number {
  const r = Math.abs(Math.trunc(n)) % 6;
  return r === 0 ? 6 : r;
}

export function trigramByNum(num: number): TrigramKey {
  return XIAN_TIAN_NUM[mod8(num)];
}

export function hexFromUpperLower(
  upperNum: number,
  lowerNum: number,
): Hexagram | null {
  const upper = trigramByNum(upperNum);
  const lower = trigramByNum(lowerNum);
  return getByPair(lower, upper);
}

/** 动爻位 1=初 … 6=上；该位为动，阴阳取本卦 */
export function yaosFromDong(
  hex: Hexagram,
  dongWei: number | null,
): YaoLine[] {
  const code = hex.code;
  const dong = dongWei == null ? -1 : mod6(dongWei);
  return Array.from({ length: 6 }, (_, i) => {
    const yang = code[i] === "1";
    const changing = dong === i + 1;
    if (yang && changing) {
      return { value: 9, name: "老阳", yang: true, changing: true };
    }
    if (yang) {
      return { value: 7, name: "少阳", yang: true, changing: false };
    }
    if (changing) {
      return { value: 6, name: "老阴", yang: false, changing: true };
    }
    return { value: 8, name: "少阴", yang: false, changing: false };
  });
}

/** 由上卦数、下卦数、动爻数起卦 */
export function castByNumbers(
  upperNum: number,
  lowerNum: number,
  dongNum: number | null,
): { hex: Hexagram; dongWei: number | null; yaos: YaoLine[] } | null {
  const hex = hexFromUpperLower(upperNum, lowerNum);
  if (!hex) return null;
  const dongWei = dongNum == null ? null : mod6(dongNum);
  return { hex, dongWei, yaos: yaosFromDong(hex, dongWei) };
}

/** 报数：1～3 个正整数 */
export function castByBaoShu(nums: number[]) {
  const cleaned = nums.map((n) => Math.abs(Math.trunc(n))).filter((n) => n > 0);
  if (cleaned.length === 0) return null;
  if (cleaned.length === 1) {
    const a = cleaned[0];
    return castByNumbers(a, a, a);
  }
  if (cleaned.length === 2) {
    const [a, b] = cleaned;
    return castByNumbers(a, b, a + b);
  }
  const [a, b, c] = cleaned;
  return castByNumbers(a, b, c);
}

/** 公历时间起卦：年+月+日 → 上；+时 → 下；总和 → 动 */
export function castByDateTime(d: Date) {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const h = d.getHours();
  const upper = y + m + day;
  const lower = upper + h;
  const dong = lower;
  return {
    ...castByNumbers(upper, lower, dong)!,
    detail: { y, m, day, h, upper, lower, dong },
  };
}

export function yaosToCode(
  yaos: (YaoLine | null)[],
  mode: "ben" | "zhi" = "ben",
): string {
  return yaos
    .map((y) => {
      if (!y) return "0";
      let yang = y.yang;
      if (mode === "zhi" && y.changing) yang = !yang;
      return yang ? "1" : "0";
    })
    .join("");
}

export { T };

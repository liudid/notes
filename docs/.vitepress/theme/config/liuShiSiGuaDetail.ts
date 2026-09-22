import jingZhuan from "./liuShiSiGuaJingZhuan.json";

export type YaoDetail = {
  label: string;
  yaoCi: string;
  xiaoXiang: string;
};

export type HexagramDetail = {
  num: number;
  jingWen: {
    guaCi: string;
    yaoCi: YaoDetail[];
    yongJiu?: string;
    yongLiu?: string;
    yongJiuXiaoXiang?: string;
    yongLiuXiaoXiang?: string;
  };
  zhuanWen: {
    tuanZhuan: string;
    daXiang: string;
  };
};

type JsonYao = { label: string; text: string };
type JsonHex = {
  num: number;
  jingWen: {
    guaCi: string;
    yaoCi: JsonYao[];
    yongJiu?: string;
    yongLiu?: string;
  };
  zhuanWen: {
    tuanZhuan: string;
    xiangZhuan: {
      daXiang: string;
      xiaoXiang: JsonYao[];
    };
  };
};

function adaptHex(raw: JsonHex): HexagramDetail {
  const xiaoByLabel = Object.fromEntries(
    (raw.zhuanWen.xiangZhuan.xiaoXiang ?? []).map((x) => [x.label, x.text]),
  );

  const yaoCi: YaoDetail[] = (raw.jingWen.yaoCi ?? []).map((y) => ({
    label: y.label,
    yaoCi: y.text,
    xiaoXiang: xiaoByLabel[y.label] ?? "",
  }));

  const detail: HexagramDetail = {
    num: raw.num,
    jingWen: {
      guaCi: raw.jingWen.guaCi ?? "",
      yaoCi,
    },
    zhuanWen: {
      tuanZhuan: raw.zhuanWen.tuanZhuan ?? "",
      daXiang: raw.zhuanWen.xiangZhuan.daXiang ?? "",
    },
  };

  if (raw.jingWen.yongJiu) {
    detail.jingWen.yongJiu = raw.jingWen.yongJiu;
    detail.jingWen.yongJiuXiaoXiang = xiaoByLabel["用九"] ?? "";
  }
  if (raw.jingWen.yongLiu) {
    detail.jingWen.yongLiu = raw.jingWen.yongLiu;
    detail.jingWen.yongLiuXiaoXiang = xiaoByLabel["用六"] ?? "";
  }

  return detail;
}

const detailByNum: Record<number, HexagramDetail> = Object.fromEntries(
  (jingZhuan.hexagrams as JsonHex[]).map((h) => [h.num, adaptHex(h)]),
);

export function getHexDetail(num: number): HexagramDetail | null {
  return detailByNum[num] ?? null;
}

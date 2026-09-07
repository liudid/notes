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
  };
  zhuanWen: {
    tuanZhuan: string;
    daXiang: string;
  };
  jieGua: {
    bian: {
      cuo: string;
      zong: string;
      hu: string;
      bianGua: string;
    };
  };
};

const emptyYao = (): YaoDetail[] =>
  Array.from({ length: 6 }, (_, i) => ({
    label: ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"][i],
    yaoCi: "",
    xiaoXiang: "",
  }));

export const HEX_DETAIL_MOCK: HexagramDetail[] = [
  {
    num: 1,
    jingWen: {
      guaCi: "元、亨、利、贞。",
      yaoCi: [
        {
          label: "初九",
          yaoCi: "潜龙勿用。",
          xiaoXiang: "潜龙勿用，阳在下也。",
        },
        {
          label: "九二",
          yaoCi: "见龙在田，利见大人。",
          xiaoXiang: "见龙在田，德施普也。",
        },
        {
          label: "九三",
          yaoCi: "君子终日乾乾，夕惕若厉，无咎。",
          xiaoXiang: "终日乾乾，反复道也。",
        },
        {
          label: "九四",
          yaoCi: "或跃在渊，无咎。",
          xiaoXiang: "或跃在渊，进无咎也。",
        },
        {
          label: "九五",
          yaoCi: "飞龙在天，利见大人。",
          xiaoXiang: "飞龙在天，大人造也。",
        },
        {
          label: "上九",
          yaoCi: "亢龙有悔。",
          xiaoXiang: "亢龙有悔，盈不可久也。",
        },
      ],
    },
    zhuanWen: {
      tuanZhuan:
        "大哉乾元，万物资始，乃统天。云行雨施，品物流形。大明终始，六位时成，时乘六龙以御天。乾道变化，各正性命，保合太和，乃利贞。首出庶物，万国咸宁。",
      daXiang: "天行健，君子以自强不息。",
    },
    jieGua: {
      bian: {
        cuo: "",
        zong: "",
        hu: "",
        bianGua: "（待指定变爻后计算）",
      },
    },
  },
  {
    num: 2,
    jingWen: {
      guaCi: "元，亨，利牝马之贞。君子有攸往，先迷后得主，利西南得朋，东北丧朋。安贞，吉。",
      yaoCi: emptyYao(),
    },
    zhuanWen: {
      tuanZhuan: "",
      daXiang: "",
    },
    jieGua: {
      bian: {
        cuo: "",
        zong: "",
        hu: "",
        bianGua: "（待指定变爻后计算）",
      },
    },
  },
];

const detailByNum = Object.fromEntries(
  HEX_DETAIL_MOCK.map((d) => [d.num, d]),
);

export function getHexDetail(num: number): HexagramDetail | null {
  return detailByNum[num] ?? null;
}

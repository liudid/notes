export const GUA = {
  乾: { name: "乾", el: "天", sym: "☰" },
  坤: { name: "坤", el: "地", sym: "☷" },
  震: { name: "震", el: "雷", sym: "☳" },
  艮: { name: "艮", el: "山", sym: "☶" },
  离: { name: "离", el: "火", sym: "☲" },
  坎: { name: "坎", el: "水", sym: "☵" },
  兑: { name: "兑", el: "泽", sym: "☱" },
  巽: { name: "巽", el: "风", sym: "☴" },
};

export function getGua(name) {
  return GUA[name] ?? null;
}

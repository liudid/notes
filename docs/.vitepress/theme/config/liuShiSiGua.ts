export type TrigramKey =
  | "qian"
  | "kun"
  | "zhen"
  | "gen"
  | "li"
  | "kan"
  | "dui"
  | "xun";

export type Trigram = {
  zh: string;
  el: string;
  bits: string;
  sym: string;
};

export type Hexagram = {
  num: number;
  name: string;
  full: string;
  py: string;
  lower: TrigramKey;
  upper: TrigramKey;
  gloss: string;
  code: string;
};

export const T: Record<TrigramKey, Trigram> = {
  qian: { zh: "乾", el: "天", bits: "111", sym: "☰" },
  kun: { zh: "坤", el: "地", bits: "000", sym: "☷" },
  zhen: { zh: "震", el: "雷", bits: "100", sym: "☳" },
  gen: { zh: "艮", el: "山", bits: "001", sym: "☶" },
  li: { zh: "离", el: "火", bits: "101", sym: "☲" },
  kan: { zh: "坎", el: "水", bits: "010", sym: "☵" },
  dui: { zh: "兑", el: "泽", bits: "110", sym: "☱" },
  xun: { zh: "巽", el: "风", bits: "011", sym: "☴" },
};

export const ORDER: TrigramKey[] = [
  "qian",
  "kun",
  "zhen",
  "gen",
  "li",
  "kan",
  "dui",
  "xun",
];

/** 八卦相重视图：乾坤震巽坎离艮兑 */
export const OVERLAP_ORDER: TrigramKey[] = [
  "qian",
  "kun",
  "zhen",
  "xun",
  "kan",
  "li",
  "gen",
  "dui",
];

export const JING_FANG_COLS = [
  "本宫",
  "一世",
  "二世",
  "三世",
  "四世",
  "五世",
  "游魂",
  "归魂",
] as const;

export const JING_FANG_PALACES: { label: string; names: string[] }[] = [
  { label: "乾宫", names: ["乾", "姤", "遁", "否", "观", "剥", "晋", "大有"] },
  { label: "坎宫", names: ["坎", "节", "屯", "既济", "革", "丰", "明夷", "师"] },
  { label: "艮宫", names: ["艮", "贲", "大畜", "损", "睽", "履", "中孚", "渐"] },
  { label: "震宫", names: ["震", "豫", "解", "恒", "升", "井", "大过", "随"] },
  { label: "巽宫", names: ["巽", "小畜", "家人", "益", "无妄", "噬嗑", "颐", "蛊"] },
  { label: "离宫", names: ["离", "旅", "鼎", "未济", "蒙", "涣", "讼", "同人"] },
  { label: "坤宫", names: ["坤", "复", "临", "泰", "大壮", "夬", "需", "比"] },
  { label: "兑宫", names: ["兑", "困", "萃", "咸", "蹇", "谦", "小过", "归妹"] },
];

const HEX_RAW: Omit<Hexagram, "code">[] = [
  { num: 1, name: "乾", full: "乾为天", py: "qián", lower: "qian", upper: "qian", gloss: "刚健自强，元亨利贞" },
  { num: 2, name: "坤", full: "坤为地", py: "kūn", lower: "kun", upper: "kun", gloss: "柔顺承载，厚德载物" },
  { num: 3, name: "屯", full: "水雷屯", py: "zhūn", lower: "zhen", upper: "kan", gloss: "初生艰难，蓄势待发" },
  { num: 4, name: "蒙", full: "山水蒙", py: "méng", lower: "kan", upper: "gen", gloss: "蒙昧未开，启蒙求知" },
  { num: 5, name: "需", full: "水天需", py: "xū", lower: "qian", upper: "kan", gloss: "静待时机，蓄力守正" },
  { num: 6, name: "讼", full: "天水讼", py: "sòng", lower: "kan", upper: "qian", gloss: "争讼相持，慎断是非" },
  { num: 7, name: "师", full: "地水师", py: "shī", lower: "kan", upper: "kun", gloss: "兴师动众，纪律为本" },
  { num: 8, name: "比", full: "水地比", py: "bǐ", lower: "kun", upper: "kan", gloss: "亲比相依，团结互助" },
  { num: 9, name: "小畜", full: "风天小畜", py: "xiǎo xù", lower: "qian", upper: "xun", gloss: "小有积蓄，蓄势未成" },
  { num: 10, name: "履", full: "天泽履", py: "lǚ", lower: "dui", upper: "qian", gloss: "谨慎而行，如履薄冰" },
  { num: 11, name: "泰", full: "地天泰", py: "tài", lower: "qian", upper: "kun", gloss: "上下交泰，通达安康" },
  { num: 12, name: "否", full: "天地否", py: "pǐ", lower: "kun", upper: "qian", gloss: "闭塞不通，逆境待变" },
  { num: 13, name: "同人", full: "天火同人", py: "tóng rén", lower: "li", upper: "qian", gloss: "与人和同，志同道合" },
  { num: 14, name: "大有", full: "火天大有", py: "dà yǒu", lower: "qian", upper: "li", gloss: "大有所获，盛大丰足" },
  { num: 15, name: "谦", full: "地山谦", py: "qiān", lower: "gen", upper: "kun", gloss: "谦逊自守，德行渐彰" },
  { num: 16, name: "豫", full: "雷地豫", py: "yù", lower: "kun", upper: "zhen", gloss: "悦豫顺时，未雨绸缪" },
  { num: 17, name: "随", full: "泽雷随", py: "suí", lower: "zhen", upper: "dui", gloss: "随时而动，顺势而为" },
  { num: 18, name: "蛊", full: "山风蛊", py: "gǔ", lower: "xun", upper: "gen", gloss: "积弊待治，革故图新" },
  { num: 19, name: "临", full: "地泽临", py: "lín", lower: "dui", upper: "kun", gloss: "居高临下，教化亲民" },
  { num: 20, name: "观", full: "风地观", py: "guān", lower: "kun", upper: "xun", gloss: "观察省思，以观化人" },
  { num: 21, name: "噬嗑", full: "火雷噬嗑", py: "shì kè", lower: "zhen", upper: "li", gloss: "刚断除弊，明察而断" },
  { num: 22, name: "贲", full: "山火贲", py: "bì", lower: "li", upper: "gen", gloss: "文饰有度，质朴为本" },
  { num: 23, name: "剥", full: "山地剥", py: "bō", lower: "kun", upper: "gen", gloss: "阳消阴长，静观其变" },
  { num: 24, name: "复", full: "地雷复", py: "fù", lower: "zhen", upper: "kun", gloss: "一阳来复，否极泰来" },
  { num: 25, name: "无妄", full: "天雷无妄", py: "wú wàng", lower: "zhen", upper: "qian", gloss: "顺应自然，不妄不欺" },
  { num: 26, name: "大畜", full: "山天大畜", py: "dà xù", lower: "qian", upper: "gen", gloss: "蓄养积厚，待时而发" },
  { num: 27, name: "颐", full: "山雷颐", py: "yí", lower: "zhen", upper: "gen", gloss: "颐养有道，慎言节食" },
  { num: 28, name: "大过", full: "泽风大过", py: "dà guò", lower: "xun", upper: "dui", gloss: "非常之时，刚过而济" },
  { num: 29, name: "坎", full: "坎为水", py: "kǎn", lower: "kan", upper: "kan", gloss: "重险相叠，行险如常" },
  { num: 30, name: "离", full: "离为火", py: "lí", lower: "li", upper: "li", gloss: "附丽而明，光明相继" },
  { num: 31, name: "咸", full: "泽山咸", py: "xián", lower: "gen", upper: "dui", gloss: "相感相应，虚心以待" },
  { num: 32, name: "恒", full: "雷风恒", py: "héng", lower: "xun", upper: "zhen", gloss: "恒久守常，历久弥坚" },
  { num: 33, name: "遁", full: "天山遁", py: "dùn", lower: "gen", upper: "qian", gloss: "知机而退，全身远害" },
  { num: 34, name: "大壮", full: "雷天大壮", py: "dà zhuàng", lower: "qian", upper: "zhen", gloss: "刚盛势壮，守正戒躁" },
  { num: 35, name: "晋", full: "火地晋", py: "jìn", lower: "kun", upper: "li", gloss: "顺势上进，光明渐显" },
  { num: 36, name: "明夷", full: "地火明夷", py: "míng yí", lower: "li", upper: "kun", gloss: "光明受损，韬光养晦" },
  { num: 37, name: "家人", full: "风火家人", py: "jiā rén", lower: "li", upper: "xun", gloss: "齐家有道，各正其位" },
  { num: 38, name: "睽", full: "火泽睽", py: "kuí", lower: "dui", upper: "li", gloss: "乖离相异，异中求同" },
  { num: 39, name: "蹇", full: "水山蹇", py: "jiǎn", lower: "gen", upper: "kan", gloss: "险阻在前，反身修德" },
  { num: 40, name: "解", full: "雷水解", py: "xiè", lower: "kan", upper: "zhen", gloss: "危解患释，宽缓待人" },
  { num: 41, name: "损", full: "山泽损", py: "sǔn", lower: "dui", upper: "gen", gloss: "损下益上，损而有孚" },
  { num: 42, name: "益", full: "风雷益", py: "yì", lower: "zhen", upper: "xun", gloss: "损上益下，损己利人" },
  { num: 43, name: "夬", full: "泽天夬", py: "guài", lower: "qian", upper: "dui", gloss: "刚决柔退，果断有度" },
  { num: 44, name: "姤", full: "天风姤", py: "gòu", lower: "xun", upper: "qian", gloss: "阴阳相遇，防微杜渐" },
  { num: 45, name: "萃", full: "泽地萃", py: "cuì", lower: "kun", upper: "dui", gloss: "聚萃有序，同心协力" },
  { num: 46, name: "升", full: "地风升", py: "shēng", lower: "xun", upper: "kun", gloss: "积小成大，柔顺渐升" },
  { num: 47, name: "困", full: "泽水困", py: "kùn", lower: "kan", upper: "dui", gloss: "身处困境，守志不移" },
  { num: 48, name: "井", full: "水风井", py: "jǐng", lower: "xun", upper: "kan", gloss: "井养不穷，恒常利物" },
  { num: 49, name: "革", full: "泽火革", py: "gé", lower: "li", upper: "dui", gloss: "变革除旧，顺时而改" },
  { num: 50, name: "鼎", full: "火风鼎", py: "dǐng", lower: "xun", upper: "li", gloss: "鼎新革故，稳重承重" },
  { num: 51, name: "震", full: "震为雷", py: "zhèn", lower: "zhen", upper: "zhen", gloss: "震动惊惧，处变不惊" },
  { num: 52, name: "艮", full: "艮为山", py: "gèn", lower: "gen", upper: "gen", gloss: "止而不动，安分守静" },
  { num: 53, name: "渐", full: "风山渐", py: "jiàn", lower: "gen", upper: "xun", gloss: "循序渐进，稳步而行" },
  { num: 54, name: "归妹", full: "雷泽归妹", py: "guī mèi", lower: "dui", upper: "zhen", gloss: "少女出嫁，谨守正道" },
  { num: 55, name: "丰", full: "雷火丰", py: "fēng", lower: "li", upper: "zhen", gloss: "丰盛之时，居安思危" },
  { num: 56, name: "旅", full: "火山旅", py: "lǚ", lower: "gen", upper: "li", gloss: "羁旅在外，柔顺谨慎" },
  { num: 57, name: "巽", full: "巽为风", py: "xùn", lower: "xun", upper: "xun", gloss: "谦逊随顺，渐入渐深" },
  { num: 58, name: "兑", full: "兑为泽", py: "duì", lower: "dui", upper: "dui", gloss: "喜悦交流，和悦待人" },
  { num: 59, name: "涣", full: "风水涣", py: "huàn", lower: "kan", upper: "xun", gloss: "涣散离析，聚合人心" },
  { num: 60, name: "节", full: "水泽节", py: "jié", lower: "dui", upper: "kan", gloss: "节制有度，进退有节" },
  { num: 61, name: "中孚", full: "风泽中孚", py: "zhōng fú", lower: "dui", upper: "xun", gloss: "诚信中孚，感通万物" },
  { num: 62, name: "小过", full: "雷山小过", py: "xiǎo guò", lower: "gen", upper: "zhen", gloss: "小事可过，大事守常" },
  { num: 63, name: "既济", full: "水火既济", py: "jì jì", lower: "kan", upper: "li", gloss: "功成之际，居安思危" },
  { num: 64, name: "未济", full: "火水未济", py: "wèi jì", lower: "li", upper: "kan", gloss: "事未竟功，慎终如始" },
];

export const HEX: Hexagram[] = HEX_RAW.map((h) => ({
  ...h,
  code: T[h.lower].bits + T[h.upper].bits,
}));

export const byPair: Record<string, Hexagram> = Object.fromEntries(
  HEX.map((h) => [`${h.lower}-${h.upper}`, h]),
);

export const byNum: Record<number, Hexagram> = Object.fromEntries(
  HEX.map((h) => [h.num, h]),
);

export const byName: Record<string, Hexagram> = Object.fromEntries(
  HEX.map((h) => [h.name, h]),
);

export function getByPair(lower: TrigramKey, upper: TrigramKey) {
  return byPair[`${lower}-${upper}`] ?? null;
}

export function getByName(name: string) {
  return byName[name] ?? null;
}

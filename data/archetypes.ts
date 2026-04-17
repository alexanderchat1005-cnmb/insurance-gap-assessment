import { Archetype } from "./types";

// Pattern vectors live in the same 0-100 space as normalized user scores.
// Higher = better coverage / more awareness. Matcher uses Euclidean distance
// so patterns must occupy distinct regions of the 5-D space.
//
// Gradients use the 柏泰 Better brand palette:
//   teal-dark  #003f3d   teal      #005956   teal-mid   #287370
//   teal-soft  #79a8a6   teal-pale #a5c4c3
//   peach-dark #d88870   peach     #f0ad90   peach-soft #f7cdb8

export const archetypes: Archetype[] = [
  {
    id: "streaker",
    name: "保障裸奔选手",
    englishName: "The Streaker",
    emoji: "🏃",
    tagline: "你正光着身子在下雨",
    symptoms: `寿险、重疾、医疗、储蓄——四样都是0。一场感冒能让你动用花呗，一次住院能让你触底返贫。你不是不需要保险，你是还没意识到自己需要。人生这场游戏你玩的是地狱模式，但你以为是试玩版。`,
    brokerNote: `从任何一个险种开始都行，哪怕先配一份百万医疗。真的，先穿条裤子。`,
    soulLabels: ["四大皆空", "花呗人生", "未设防"],
    pattern: { life: 15, ci: 15, med: 15, wealth: 15, aware: 10 },
    gradient: ["#d88870", "#f0ad90"],
    priorityProducts: ["med", "ci", "life", "wealth"],
  },
  {
    id: "load-bearing",
    name: "顶梁柱侥幸主义者",
    englishName: "The Load-Bearing Optimist",
    emoji: "🗿",
    tagline: "上有老下有小，信仰「不会那么倒霉」",
    symptoms: `你一个人扛着全家的现金流，父母的医药费、孩子的学费、配偶的安全感，全部挂在你的工资卡上。但你的寿险额度，约等于三个月工资。你不是不爱家人，你只是习惯了当没事发生。`,
    brokerNote: `你是全家最该买寿险+重疾的人。建议寿险保额 ≥ 家庭年支出 × 10，不够也至少 ×5。`,
    soulLabels: ["家庭单点故障", "侥幸心理", "塌了全家塌"],
    pattern: { life: 15, ci: 25, med: 50, wealth: 45, aware: 35 },
    gradient: ["#003f3d", "#287370"],
    priorityProducts: ["life", "ci"],
  },
  {
    id: "medical-ostrich",
    name: "体检恐惧症患者",
    englishName: "The Medical Ostrich",
    emoji: "🫣",
    tagline: "报告在抽屉里封印着",
    symptoms: `你的健康意识早就觉醒了——看了太多病友帖、刷了太多科普号、对每一种结节都有PTSD。但你没去体检，没配重疾，没配医疗。你选择用「不知道」代替「没保障」，仿佛只要不打开那个报告，癌症就不存在。`,
    brokerNote: `焦虑不能治病，重疾+百万医疗能。越早配越便宜，健康告知也越容易过。`,
    soulLabels: ["结节恐惧症", "假装没事", "选择性失明"],
    pattern: { life: 50, ci: 15, med: 20, wealth: 50, aware: 75 },
    gradient: ["#287370", "#f0ad90"],
    priorityProducts: ["ci", "med"],
  },
  {
    id: "aesthetic-broke",
    name: "精致穷理财家",
    englishName: "The Aesthetic Broke",
    emoji: "💸",
    tagline: "月入两万，余额八百",
    symptoms: `健身卡、私教课、轻食套餐、SKII、最新款iPhone——你过得非常讲究。但账户余额是个笑话，资产配置是个空气，退休规划是句玩笑。你投资了自己的皮肤，但没投资自己的风险边界。`,
    brokerNote: `先把每月订阅砍掉两个，预算挪去配一份储蓄险+百万医疗。同样是仪式感，这个更持久。`,
    soulLabels: ["精致月光", "体验派消费", "理财绝缘体"],
    pattern: { life: 40, ci: 35, med: 25, wealth: 10, aware: 30 },
    gradient: ["#79a8a6", "#f7cdb8"],
    priorityProducts: ["wealth", "med"],
  },
  {
    id: "all-in",
    name: "梭哈型中产",
    englishName: "The All-In Mid-class",
    emoji: "🎰",
    tagline: "资产全在波动里，保障全在运气里",
    symptoms: `你有资产——只不过都在美股、币圈和某不知名基金里。一轮牛市你就是股神，一轮熊市你就是哲学家。你愿意为一个K线图熬夜研究，但不愿意花10分钟看懂一份保单。家里真出事，你的"资产"三天就能腰斩。`,
    brokerNote: `把风险资产里的 5% 挪到重疾+医疗，相当于给你的梭哈加一个止损线。`,
    soulLabels: ["风险偏好S+", "保障偏好F", "熊市哲学家"],
    pattern: { life: 50, ci: 25, med: 25, wealth: 65, aware: 55 },
    gradient: ["#f0ad90", "#003f3d"],
    priorityProducts: ["ci", "med", "life"],
  },
  {
    id: "over-insurer",
    name: "保险卷王",
    englishName: "The Over-Insurer",
    emoji: "🛡️",
    tagline: "买得多，不一定买得对",
    symptoms: `寿险、重疾、医疗、意外、年金、教育金——你全家人均5张保单。但仔细一查：重疾重复保了3份，医疗险和百万医疗功能重叠，年金回报率还不如定存。你的问题不是缺保障，是配置太乱，保费花得不值。`,
    brokerNote: `你需要的不是加保，是保单体检+配置优化。把重复的砍掉，缺口的补上，整体保费可能还能降。`,
    soulLabels: ["保单收藏家", "配置错乱", "保费黑洞"],
    pattern: { life: 75, ci: 80, med: 80, wealth: 55, aware: 85 },
    gradient: ["#005956", "#79a8a6"],
    priorityProducts: ["wealth"],
  },
];

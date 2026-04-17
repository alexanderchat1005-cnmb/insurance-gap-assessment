import { Question } from "./types";

// Score vectors: { life, ci, med, wealth, aware }
// Convention: higher score = better covered / more financially resilient / more aware
// Normalized 0-100 at the end; gap = 100 - score.

export const questions: Question[] = [
  // ═══ Part 1: 💸 月光打工人日常 (Q1–Q3) ═══
  {
    id: 1, emoji: "💳", section: 1,
    dimension: "wealth", dimensionLabel: "现金流韧性",
    text: `如果你明天失业了，账上的钱能撑几个月？`,
    options: [
      { label: "A", text: `一个月。但是房贷和花呗一起来，三天。⏳`, scores: { life: 1, ci: 1, med: 1, wealth: 0, aware: 2 } },
      { label: "B", text: `三个月，前提是我改吃白粥，退订所有会员 🥣`, scores: { life: 2, ci: 2, med: 2, wealth: 3, aware: 4 } },
      { label: "C", text: `半年没问题。我爸妈也算我的现金流储备。👨‍👩‍👧`, scores: { life: 4, ci: 3, med: 3, wealth: 6, aware: 3 } },
    ],
  },
  {
    id: 2, emoji: "🛒", section: 1,
    dimension: "wealth", dimensionLabel: "理财意识",
    text: `你对自己资产的认识水平是——`,
    options: [
      { label: "A", text: `我有资产？我只有花呗余额和房贷余额 🫥`, scores: { life: 0, ci: 0, med: 0, wealth: 0, aware: 0 } },
      { label: "B", text: `都在余额宝里。我知道利率低，但是搞别的我看不懂 🐢`, scores: { life: 2, ci: 1, med: 1, wealth: 2, aware: 3 } },
      { label: "C", text: `定投+宝宝类+一点股票+一点储蓄险，我自认为配置得明明白白 📊`, scores: { life: 4, ci: 3, med: 3, wealth: 7, aware: 6 } },
    ],
  },
  {
    id: 3, emoji: "📱", section: 1,
    dimension: "aware", dimensionLabel: "风险认知",
    text: `你对「保险」这两个字的第一反应是——`,
    options: [
      { label: "A", text: `亲戚推销的，饭桌上躲都躲不掉的那种 😬`, scores: { life: 1, ci: 1, med: 1, wealth: 1, aware: 1 } },
      { label: "B", text: `应该是个好东西吧，但看不懂也不敢买 🤷`, scores: { life: 2, ci: 2, med: 2, wealth: 2, aware: 3 } },
      { label: "C", text: `家庭配置的基础设施，比吃外卖重要 🛡️`, scores: { life: 5, ci: 5, med: 5, wealth: 4, aware: 7 } },
    ],
  },

  // ═══ Part 2: 🏥 健康脆皮实录 (Q4–Q6) ═══
  {
    id: 4, emoji: "🫣", section: 2,
    dimension: "med", dimensionLabel: "体检习惯",
    text: `你上次体检是什么时候？`,
    options: [
      { label: "A", text: `上次？啥叫上次？我连这次都没有。🫠`, scores: { life: 1, ci: 1, med: 0, wealth: 1, aware: 1 } },
      { label: "B", text: `去年公司组织的，报告出来没敢看，还在抽屉里封印着 📪`, scores: { life: 2, ci: 1, med: 1, wealth: 2, aware: 3 } },
      { label: "C", text: `每年都测，医生说我看起来比实际年龄老十岁 👴`, scores: { life: 4, ci: 4, med: 5, wealth: 3, aware: 6 } },
    ],
  },
  {
    id: 5, emoji: "🏨", section: 2,
    dimension: "med", dimensionLabel: "医疗承受力",
    text: `如果你突然住院10天，需要自费5万，你的反应是——`,
    options: [
      { label: "A", text: `5万？我连5千都拿不出来。🫥 先挂花呗再说`, scores: { life: 0, ci: 0, med: 0, wealth: 0, aware: 1 } },
      { label: "B", text: `有点肉痛，但刷信用卡+动存款能凑出来，之后吃土半年 🍜`, scores: { life: 2, ci: 2, med: 2, wealth: 3, aware: 4 } },
      { label: "C", text: `百万医疗险直接报销，我只需要出0免赔额 💳✨`, scores: { life: 5, ci: 5, med: 8, wealth: 4, aware: 7 } },
    ],
  },
  {
    id: 6, emoji: "🧬", section: 2,
    dimension: "ci", dimensionLabel: "重疾储备",
    text: `如果医生明天告诉你"需要动大手术+休养2年"，你会——`,
    options: [
      { label: "A", text: `先哭。然后去水滴筹。然后继续哭。😭`, scores: { life: 1, ci: 0, med: 0, wealth: 1, aware: 2 } },
      { label: "B", text: `动用所有存款+借钱，治病的钱有了，但家里的日常开支就崩了 📉`, scores: { life: 2, ci: 2, med: 2, wealth: 2, aware: 4 } },
      { label: "C", text: `重疾险一次性赔50万，家里日子照常过，我安心养病 🛡️💰`, scores: { life: 6, ci: 8, med: 5, wealth: 4, aware: 7 } },
    ],
  },

  // ═══ Part 3: 👨‍👩‍👧 家庭角色扮演 (Q7–Q9) ═══
  {
    id: 7, emoji: "🗿", section: 3,
    dimension: "life", dimensionLabel: "家庭责任",
    text: `你家里谁在赚钱？`,
    options: [
      { label: "A", text: `我一个人扛，上有老下有小，我塌了全家塌 🗿`, scores: { life: 0, ci: 2, med: 2, wealth: 2, aware: 3 } },
      { label: "B", text: `双职工，但一个人的工资都养不起这个家 💸💸`, scores: { life: 2, ci: 2, med: 2, wealth: 3, aware: 4 } },
      { label: "C", text: `我只养自己，DINK/单身/啃老中，心安理得 😇`, scores: { life: 5, ci: 3, med: 3, wealth: 4, aware: 4 } },
    ],
  },
  {
    id: 8, emoji: "🥡", section: 3,
    dimension: "life", dimensionLabel: "身后事规划",
    text: `你对"如果我不在了，家里怎么办"这件事的思考程度——`,
    options: [
      { label: "A", text: `我连今晚吃啥都不知道，想什么身后事 🥡`, scores: { life: 0, ci: 1, med: 1, wealth: 1, aware: 0 } },
      { label: "B", text: `想过一次，然后发现越想越难受，默默关了知乎 📵`, scores: { life: 2, ci: 2, med: 2, wealth: 2, aware: 4 } },
      { label: "C", text: `寿险受益人写好了，遗嘱也立了，该给猫的给猫 🐱📜`, scores: { life: 8, ci: 5, med: 4, wealth: 5, aware: 8 } },
    ],
  },
  {
    id: 9, emoji: "👨‍⚕️", section: 3,
    dimension: "med", dimensionLabel: "父母保障",
    text: `你爸妈的医保情况——`,
    options: [
      { label: "A", text: `城乡居民医保 + 心诚则灵 🙏`, scores: { life: 2, ci: 1, med: 1, wealth: 1, aware: 2 } },
      { label: "B", text: `我就是他们的医保。💳 出事了我负责`, scores: { life: 1, ci: 1, med: 1, wealth: 2, aware: 5 } },
      { label: "C", text: `职工医保 + 百万医疗 + 防癌险，我盯着给他们安排的 🛡️`, scores: { life: 5, ci: 6, med: 7, wealth: 4, aware: 8 } },
    ],
  },

  // ═══ Part 4: 🌙 深夜财富焦虑 (Q10–Q11) ═══
  {
    id: 10, emoji: "📉", section: 4,
    dimension: "wealth", dimensionLabel: "资产配置",
    text: `深夜打开资产账户，你的画面是——`,
    options: [
      { label: "A", text: `账户？我工资到账当天就清零了，哪来的账户 🕳️`, scores: { life: 0, ci: 0, med: 0, wealth: 0, aware: 1 } },
      { label: "B", text: `美股/币圈梭哈，今天浮盈明天浮亏，心脏负荷+1 🎰`, scores: { life: 2, ci: 1, med: 1, wealth: 3, aware: 4 } },
      { label: "C", text: `定投+储蓄险+一点风险资产，数字稳步上涨，我睡得很香 😴📈`, scores: { life: 4, ci: 3, med: 3, wealth: 8, aware: 7 } },
    ],
  },
  {
    id: 11, emoji: "👵", section: 4,
    dimension: "wealth", dimensionLabel: "养老准备",
    text: `说到"60岁退休后的生活"，你脑海里的画面是——`,
    options: [
      { label: "A", text: `啥？60岁？我能活到60岁再说吧 🫠`, scores: { life: 0, ci: 1, med: 1, wealth: 0, aware: 0 } },
      { label: "B", text: `我想靠社保+儿女，但又担心儿女也靠我 😬`, scores: { life: 2, ci: 2, med: 2, wealth: 2, aware: 4 } },
      { label: "C", text: `年金险+养老金计算器算过，月领金额够吃海底捞 🍲🛏️`, scores: { life: 4, ci: 3, med: 3, wealth: 8, aware: 7 } },
    ],
  },

  // ═══ Part 5: 🪞 自我认知拷问 (Q12–Q13) ═══
  {
    id: 12, emoji: "🎲", section: 5,
    dimension: "aware", dimensionLabel: "风险态度",
    text: `"坏事不会发生在我身上"这句话——`,
    options: [
      { label: "A", text: `没错，我人生信条。不会那么倒霉的。🍀`, scores: { life: 1, ci: 1, med: 1, wealth: 2, aware: 0 } },
      { label: "B", text: `知道是错的，但一想就焦虑，所以选择不想 🫣`, scores: { life: 2, ci: 2, med: 2, wealth: 2, aware: 4 } },
      { label: "C", text: `概率游戏。我不赌我赌不起的东西。🎯`, scores: { life: 5, ci: 5, med: 5, wealth: 5, aware: 8 } },
    ],
  },
  {
    id: 13, emoji: "📋", section: 5,
    dimension: "aware", dimensionLabel: "保单体检",
    text: `你现在买过的保险——`,
    options: [
      { label: "A", text: `一份都没有。买菜都嫌贵，买这个？下次吧。📭`, scores: { life: 0, ci: 0, med: 0, wealth: 0, aware: 1 } },
      { label: "B", text: `有，但是我爸妈/对象给买的，具体啥我也不知道，保单我找不到 📄❓`, scores: { life: 3, ci: 3, med: 3, wealth: 2, aware: 2 } },
      { label: "C", text: `重疾+医疗+寿险+意外，一年保费预算固定，定期检视 📊✅`, scores: { life: 7, ci: 7, med: 7, wealth: 5, aware: 9 } },
    ],
  },
];

export interface DimensionScores {
  life: number;   // 家庭责任杠杆 (寿险需求)
  ci: number;     // 健康风险储备 (重疾险需求)
  med: number;    // 医疗现金流韧性 (医疗险需求)
  wealth: number; // 财富增值与传承 (储蓄/年金需求)
  aware: number;  // 风险认知水平 (软维度)
}

export interface AnswerOption {
  label: string;
  text: string;
  scores: DimensionScores;
}

export interface Question {
  id: number;
  emoji: string;
  text: string;
  section: number;
  dimension: string;
  dimensionLabel: string;
  options: [AnswerOption, AnswerOption, AnswerOption];
}

export interface Section {
  id: number;
  emoji: string;
  title: string;
  subtitle: string;
}

export interface Archetype {
  id: string;
  name: string;
  englishName: string;
  emoji: string;
  tagline: string;
  symptoms: string;
  brokerNote: string;
  soulLabels: string[];
  pattern: DimensionScores;
  gradient: [string, string];
  /** Which product lines this archetype most needs — drives the gap CTA copy. */
  priorityProducts: Array<"life" | "ci" | "med" | "wealth">;
}

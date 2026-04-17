import { DimensionScores, Archetype } from "../data/types";
import { archetypes } from "../data/archetypes";
import { questions } from "../data/questions";

const DIMS = ["life", "ci", "med", "wealth", "aware"] as const;

/** Compute the actual min/max possible raw score per dimension from question data */
function computeRanges(): Record<keyof DimensionScores, { min: number; max: number }> {
  const ranges = {} as Record<keyof DimensionScores, { min: number; max: number }>;
  for (const d of DIMS) {
    let min = 0, max = 0;
    for (const q of questions) {
      const vals = q.options.map((o) => o.scores[d]);
      min += Math.min(...vals);
      max += Math.max(...vals);
    }
    ranges[d] = { min, max };
  }
  return ranges;
}

const dimensionRanges = computeRanges();

/** Sum all answer score vectors into raw dimension totals */
export function sumScores(answerScores: DimensionScores[]): DimensionScores {
  const total: DimensionScores = { life: 0, ci: 0, med: 0, wealth: 0, aware: 0 };
  for (const s of answerScores) {
    total.life += s.life;
    total.ci += s.ci;
    total.med += s.med;
    total.wealth += s.wealth;
    total.aware += s.aware;
  }
  return total;
}

/**
 * Normalize raw scores to 0-100 range.
 * Each dimension uses its own min/max computed from the actual question data,
 * so every dimension spans the full 0-100 range regardless of how many
 * questions target it.
 */
export function normalizeScores(raw: DimensionScores): DimensionScores {
  const result = {} as DimensionScores;
  for (const d of DIMS) {
    const { min, max } = dimensionRanges[d];
    const range = max - min;
    result[d] = range === 0 ? 50 : Math.round(Math.max(0, Math.min(100, ((raw[d] - min) / range) * 100)));
  }
  return result;
}

/**
 * Euclidean distance between two dimension score vectors.
 * Switched from cosine (used by the brain-diagnosis app) because insurance
 * archetypes span both low-coverage and high-coverage regions of the space —
 * cosine can't distinguish a near-zero vector from a near-100 vector if
 * they're directionally parallel. Euclidean respects absolute position.
 */
function euclideanDistance(a: DimensionScores, b: DimensionScores): number {
  let sumSq = 0;
  for (const k of DIMS) {
    const d = a[k] - b[k];
    sumSq += d * d;
  }
  return Math.sqrt(sumSq);
}

export interface ArchetypeResult {
  primary: Archetype;
  secondary: Archetype;
  scores: DimensionScores;
  rawScores: DimensionScores;
}

/** Match normalized scores against archetype patterns, return top 2 (nearest first) */
export function matchArchetype(answerScores: DimensionScores[]): ArchetypeResult {
  const raw = sumScores(answerScores);
  const scores = normalizeScores(raw);

  const ranked = archetypes
    .map((a) => ({ archetype: a, distance: euclideanDistance(scores, a.pattern) }))
    .sort((x, y) => x.distance - y.distance);

  return {
    primary: ranked[0].archetype,
    secondary: ranked[1].archetype,
    scores,
    rawScores: raw,
  };
}

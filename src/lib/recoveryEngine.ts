/**
 * Recovery Score Engine
 *
 * Calculates a 0–100 recovery score from three inputs:
 *   • HRV (ms)      – weight 40%
 *   • Sleep (hours)  – weight 35%
 *   • Training Load  – weight 25% (inverted: higher load → lower score)
 *
 * Each metric is normalized to 0–100 before weighting.
 */

const WEIGHTS = { hrv: 0.4, sleep: 0.35, load: 0.25 } as const;

// Normalization ranges (configurable baselines)
const HRV_MIN = 20; // ms — heavily suppressed
const HRV_MAX = 100; // ms — excellent parasympathetic tone

const SLEEP_MIN = 4; // hours — severe deficit
const SLEEP_MAX = 9; // hours — optimal

const LOAD_MIN = 0;    // AU — rest day
const LOAD_MAX = 600;  // AU — extreme session

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function normalize(value: number, min: number, max: number): number {
  return ((clamp(value, min, max) - min) / (max - min)) * 100;
}

export interface RecoveryInputs {
  hrv: number | null;        // ms
  sleepHours: number | null;  // hours
  trainingLoad: number | null; // AU (duration × intensity)
}

export interface RecoveryResult {
  score: number;
  hrvNorm: number | null;
  sleepNorm: number | null;
  loadNorm: number | null;
  hasData: boolean;
}

export function calculateRecoveryScore(inputs: RecoveryInputs): RecoveryResult {
  const { hrv, sleepHours, trainingLoad } = inputs;

  const hasAny = hrv !== null || sleepHours !== null || trainingLoad !== null;

  if (!hasAny) {
    return { score: 0, hrvNorm: null, sleepNorm: null, loadNorm: null, hasData: false };
  }

  // Normalize each metric; use 50 (neutral) when data is missing
  const hrvNorm = hrv !== null ? normalize(hrv, HRV_MIN, HRV_MAX) : null;
  const sleepNorm = sleepHours !== null ? normalize(sleepHours, SLEEP_MIN, SLEEP_MAX) : null;
  // Invert training load: high load → low recovery contribution
  const loadNorm = trainingLoad !== null ? 100 - normalize(trainingLoad, LOAD_MIN, LOAD_MAX) : null;

  // Weighted average — redistribute weight of missing metrics proportionally
  let totalWeight = 0;
  let weightedSum = 0;

  if (hrvNorm !== null) {
    weightedSum += hrvNorm * WEIGHTS.hrv;
    totalWeight += WEIGHTS.hrv;
  }
  if (sleepNorm !== null) {
    weightedSum += sleepNorm * WEIGHTS.sleep;
    totalWeight += WEIGHTS.sleep;
  }
  if (loadNorm !== null) {
    weightedSum += loadNorm * WEIGHTS.load;
    totalWeight += WEIGHTS.load;
  }

  const score = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;

  return {
    score: clamp(score, 0, 100),
    hrvNorm,
    sleepNorm,
    loadNorm,
    hasData: true,
  };
}

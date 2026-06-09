/**
 * Metabolic Fatigue Engine
 *
 * Estimates cumulative metabolic fatigue from:
 *   • Training load (duration × intensity AU)
 *   • HR intensity zone (1–5)
 *   • Workout duration (minutes)
 *   • Days since last rest day
 *
 * Each factor is normalized to 0–100, then combined with weights:
 *   Load 35%, HR zone 25%, Duration 20%, Rest deficit 20%
 */

export interface MetabolicFatigueInputs {
  trainingLoad: number;       // AU (duration × intensity)
  hrZone: number;             // 1–5
  durationMinutes: number;    // workout length
  daysSinceRest: number;      // consecutive training days
}

export type FatigueLevel = "low" | "moderate" | "high";

export interface MetabolicFatigueResult {
  score: number;              // 0–100
  level: FatigueLevel;
  levelLabel: string;
  insight: string;
  breakdown: {
    loadContrib: number;
    hrZoneContrib: number;
    durationContrib: number;
    restContrib: number;
  };
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function normalize(value: number, min: number, max: number): number {
  return ((clamp(value, min, max) - min) / (max - min)) * 100;
}

const WEIGHTS = { load: 0.35, hrZone: 0.25, duration: 0.20, rest: 0.20 } as const;

export function calculateMetabolicFatigue(inputs: MetabolicFatigueInputs): MetabolicFatigueResult {
  const { trainingLoad, hrZone, durationMinutes, daysSinceRest } = inputs;

  // Normalize each factor to 0–100
  const loadNorm = normalize(trainingLoad, 0, 600);
  const hrZoneNorm = normalize(hrZone, 1, 5) ;
  const durationNorm = normalize(durationMinutes, 0, 180);
  const restNorm = normalize(daysSinceRest, 0, 7); // 7+ consecutive days = max fatigue

  const score = Math.round(
    loadNorm * WEIGHTS.load +
    hrZoneNorm * WEIGHTS.hrZone +
    durationNorm * WEIGHTS.duration +
    restNorm * WEIGHTS.rest
  );

  const clampedScore = clamp(score, 0, 100);

  let level: FatigueLevel;
  let levelLabel: string;
  let insight: string;

  if (clampedScore < 35) {
    level = "low";
    levelLabel = "Low";
    insight = "Metabolic fatigue is minimal — you're cleared for high-intensity training.";
  } else if (clampedScore < 65) {
    level = "moderate";
    levelLabel = "Moderate";
    insight = "Moderate metabolic fatigue detected — monitor effort levels and prioritize post-workout nutrition.";
  } else {
    level = "high";
    levelLabel = "High";
    insight = "High metabolic fatigue detected — consider low-intensity recovery training today.";
  }

  return {
    score: clampedScore,
    level,
    levelLabel,
    insight,
    breakdown: {
      loadContrib: Math.round(loadNorm),
      hrZoneContrib: Math.round(hrZoneNorm),
      durationContrib: Math.round(durationNorm),
      restContrib: Math.round(restNorm),
    },
  };
}

/**
 * Readiness Engine
 *
 * Combines recovery score (0–100) with subjective check-in data
 * to produce a final readiness status.
 *
 * Readiness Score = Recovery Score × 0.55 + Subjective Score × 0.45
 *
 * Subjective Score (0–100) derived from:
 *   • Rested feeling: direct map (1–10 → 0–100)
 *   • Muscle soreness: inverted (10 = worst → 0)
 *   • Stress level: inverted (10 = worst → 0)
 */

export type ReadinessStatus = "ready" | "caution" | "rest";

export interface ReadinessResult {
  readinessScore: number;       // 0–100
  status: ReadinessStatus;
  statusLabel: string;
  insight: string;
  subjectiveScore: number;
}

export interface ReadinessInputs {
  recoveryScore: number;
  hasRecoveryData: boolean;
  rested: number;       // 1–10
  soreness: number;     // 1–10 (high = more sore)
  stress: number;       // 1–10 (high = more stressed)
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function calculateReadiness(inputs: ReadinessInputs): ReadinessResult {
  const { recoveryScore, hasRecoveryData, rested, soreness, stress } = inputs;

  // Normalize subjective metrics to 0–100
  const restedNorm = ((clamp(rested, 1, 10) - 1) / 9) * 100;
  const sorenessNorm = ((10 - clamp(soreness, 1, 10)) / 9) * 100; // inverted
  const stressNorm = ((10 - clamp(stress, 1, 10)) / 9) * 100;     // inverted

  const subjectiveScore = Math.round((restedNorm + sorenessNorm + stressNorm) / 3);

  // If no recovery data, use subjective only
  const readinessScore = hasRecoveryData
    ? Math.round(recoveryScore * 0.55 + subjectiveScore * 0.45)
    : subjectiveScore;

  const clamped = clamp(readinessScore, 0, 100);

  let status: ReadinessStatus;
  let statusLabel: string;
  let insight: string;

  if (clamped >= 70) {
    status = "ready";
    statusLabel = "Ready to Train";
    insight = "Your body and mind are well-recovered — go for your planned session.";
  } else if (clamped >= 45) {
    status = "caution";
    statusLabel = "Train with Caution";
    insight = "Mixed signals — reduce intensity or volume. Focus on technique work.";
  } else {
    status = "rest";
    statusLabel = "Rest Recommended";
    insight = "Recovery markers are low — prioritize sleep, nutrition, and active recovery.";
  }

  return { readinessScore: clamped, status, statusLabel, insight, subjectiveScore };
}

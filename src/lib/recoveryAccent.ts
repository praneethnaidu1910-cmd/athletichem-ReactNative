/**
 * Dynamic Recovery Accent Colors
 *
 * Maps recovery score to a 4-tier color system:
 *   80–100 → green  (--recovery)
 *   60–79  → amber  (--moderate)
 *   40–59  → orange (--training)
 *   0–39   → red    (--warning)
 */

export type RecoveryTier = "green" | "amber" | "orange" | "red";

export interface RecoveryAccent {
  tier: RecoveryTier;
  /** CSS token name (e.g. "recovery") for use in hsl(var(--<token>)) */
  token: string;
  /** Full HSL string for inline styles */
  hsl: string;
  /** Tailwind text class */
  text: string;
  /** Tailwind bg/10 class */
  bgSubtle: string;
  /** Tailwind border class */
  border: string;
  /** Badge classes (bg + text + border) */
  badge: string;
}

export function getRecoveryAccent(score: number): RecoveryAccent {
  if (score >= 80) {
    return {
      tier: "green",
      token: "recovery",
      hsl: "hsl(var(--recovery))",
      text: "text-recovery",
      bgSubtle: "bg-recovery/10",
      border: "border-recovery/30",
      badge: "bg-recovery/20 text-recovery border-recovery/30",
    };
  }
  if (score >= 60) {
    return {
      tier: "amber",
      token: "moderate",
      hsl: "hsl(var(--moderate))",
      text: "text-moderate",
      bgSubtle: "bg-moderate/10",
      border: "border-moderate/30",
      badge: "bg-moderate/20 text-moderate border-moderate/30",
    };
  }
  if (score >= 40) {
    return {
      tier: "orange",
      token: "training",
      hsl: "hsl(var(--training))",
      text: "text-training",
      bgSubtle: "bg-training/10",
      border: "border-training/30",
      badge: "bg-training/20 text-training border-training/30",
    };
  }
  return {
    tier: "red",
    token: "warning",
    hsl: "hsl(var(--warning))",
    text: "text-warning",
    bgSubtle: "bg-warning/10",
    border: "border-warning/30",
    badge: "bg-warning/20 text-warning border-warning/30",
  };
}

export function getRecoveryLabel(score: number): string {
  if (score >= 80) return "Peak Readiness";
  if (score >= 60) return "Ready to Train";
  if (score >= 40) return "Recovery Needed";
  return "Rest Recommended";
}

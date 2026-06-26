/**
 * Hydration & Electrolyte Balance Engine
 *
 * Estimates sweat/fluid loss using:
 *   • Workout duration (minutes)
 *   • Ambient temperature (°C)
 *   • Humidity (%)
 *   • Body weight (kg)
 *   • Training intensity (1–10)
 *
 * Base sweat rate ≈ 0.5–2.0 L/hr depending on conditions.
 * Formula inspired by sports-science heuristics (ACSM guidelines).
 */

export interface HydrationInputs {
  durationMinutes: number;
  temperatureC: number;
  humidityPct: number;
  bodyWeightKg: number;
  intensity: number; // 1–10
}

export type HydrationStatus = "optimal" | "mild" | "high";

export interface HydrationResult {
  fluidLossLiters: number;
  recommendedIntakeLiters: number;
  status: HydrationStatus;
  statusLabel: string;
  recommendation: string;
  electrolyteNote: string;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function calculateHydration(inputs: HydrationInputs): HydrationResult {
  const { durationMinutes, temperatureC, humidityPct, bodyWeightKg, intensity } = inputs;

  // Base sweat rate: ~0.8 L/hr for a 70 kg person at moderate intensity in mild conditions
  const baseLPerHr = 0.8;

  // Weight factor (heavier = more sweat, scaled linearly around 70 kg)
  const weightFactor = bodyWeightKg / 70;

  // Intensity factor: scales 0.5 (low) to 2.0 (max)
  const intensityFactor = 0.5 + (clamp(intensity, 1, 10) - 1) * (1.5 / 9);

  // Temperature factor: ramps from 0.7 at 10°C to 1.8 at 40°C
  const tempNorm = clamp((temperatureC - 10) / 30, 0, 1);
  const tempFactor = 0.7 + tempNorm * 1.1;

  // Humidity factor: 1.0 at 30%, up to 1.4 at 90%
  const humNorm = clamp((humidityPct - 30) / 60, 0, 1);
  const humFactor = 1.0 + humNorm * 0.4;

  const sweatRateLPerHr = baseLPerHr * weightFactor * intensityFactor * tempFactor * humFactor;
  const durationHrs = durationMinutes / 60;
  const fluidLoss = Math.round(sweatRateLPerHr * durationHrs * 100) / 100;

  // Recommended intake: 125–150% of fluid loss
  const recommended = Math.round(fluidLoss * 1.3 * 10) / 10;

  // Body-weight percentage loss estimate
  const pctLoss = (fluidLoss / bodyWeightKg) * 100;

  let status: HydrationStatus;
  let statusLabel: string;
  if (pctLoss < 1.5) {
    status = "optimal";
    statusLabel = "Optimal";
  } else if (pctLoss < 3) {
    status = "mild";
    statusLabel = "Mild Dehydration Risk";
  } else {
    status = "high";
    statusLabel = "High Dehydration Risk";
  }

  const electrolyteNote =
    fluidLoss > 1.5
      ? "Add electrolyte mix (sodium 500–700 mg/L) to replenishment fluids."
      : fluidLoss > 0.8
        ? "Consider electrolyte tablets with water."
        : "Plain water is sufficient for this session.";

  const recommendation = `Estimated fluid loss: ${fluidLoss.toFixed(1)}L — Recommended intake: ${recommended.toFixed(1)}L water + electrolyte replenishment.`;

  return {
    fluidLossLiters: fluidLoss,
    recommendedIntakeLiters: recommended,
    status,
    statusLabel,
    recommendation,
    electrolyteNote,
  };
}

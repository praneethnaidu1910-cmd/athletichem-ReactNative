import { z } from "zod";

export const dailyLogSchema = z.object({
  hrv: z.union([
    z.literal(""),
    z.string().refine(v => {
      const n = parseInt(v);
      return !isNaN(n) && n >= 1 && n <= 300;
    }, { message: "HRV must be between 1 and 300 ms" }),
  ]),
  sleepHours: z.union([
    z.literal(""),
    z.string().refine(v => {
      const n = parseFloat(v);
      return !isNaN(n) && n >= 0 && n <= 24;
    }, { message: "Sleep must be between 0 and 24 hours" }),
  ]),
  restingHr: z.union([
    z.literal(""),
    z.string().refine(v => {
      const n = parseInt(v);
      return !isNaN(n) && n >= 20 && n <= 250;
    }, { message: "Resting HR must be between 20 and 250 bpm" }),
  ]),
  bodyWeightKg: z.union([
    z.literal(""),
    z.string().refine(v => {
      const n = parseFloat(v);
      return !isNaN(n) && n >= 20 && n <= 300;
    }, { message: "Body weight must be between 20 and 300 kg" }),
  ]).optional(),
});

export const recoveryScoreSchema = z.object({
  score: z.number().min(0).max(100),
  hrvNorm: z.number().min(0).max(100).nullable().optional(),
  sleepNorm: z.number().min(0).max(100).nullable().optional(),
  loadNorm: z.number().min(0).max(100).nullable().optional(),
});

export const workoutSchema = z.object({
  workoutType: z.string().min(1, "Workout type is required"),
  duration: z.string().refine(v => {
    const n = parseInt(v);
    return !isNaN(n) && n >= 1 && n <= 600;
  }, { message: "Duration must be between 1 and 600 minutes" }),
  intensity: z.number().min(1).max(10),
});

export const readinessCheckInSchema = z.object({
  restedFeeling: z.number().int().min(1).max(10),
  muscleSoreness: z.number().int().min(1).max(10),
  stressLevel: z.number().int().min(1).max(10),
});

export type DailyLogFormData = z.infer<typeof dailyLogSchema>;
export type WorkoutFormData = z.infer<typeof workoutSchema>;
export type ReadinessCheckInFormData = z.infer<typeof readinessCheckInSchema>;

/**
 * Sanitize a user-supplied display name (full name).
 * - Strips HTML tags and angle brackets (defense against pasted scripts)
 * - Collapses whitespace and trims
 * - Caps length at 100 characters
 * Returns an empty string if the result is empty after cleaning.
 */
export function sanitizeName(input: string | null | undefined): string {
  if (!input) return "";
  return input
    .replace(/<[^>]*>/g, "")  // strip HTML tags
    .replace(/[<>]/g, "")     // strip stray angle brackets
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);
}

/**
 * Sanitize free-form text input (notes, goals, sport, etc.).
 * - Strips HTML tags and angle brackets
 * - Strips null bytes
 * - Collapses whitespace and trims
 * - Caps length at maxLength (default 2000)
 * Returns an empty string if the result is empty after cleaning.
 */
export function sanitizeText(input: string | null | undefined, maxLength = 2000): string {
  if (!input) return "";
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .replace(/\0/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

/**
 * Escape a value for safe inclusion in a CSV cell.
 * Prevents CSV formula injection by prefixing cells that start with
 * =, +, -, @, or tab with a single quote. Also properly escapes
 * embedded double quotes and handles newlines.
 */
export function sanitizeCsvCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  const escaped = str.replace(/"/g, '""');
  if (/^[=+\-@\t\r]/.test(str)) {
    return `"'${escaped}"`;
  }
  if (str.includes(",") || str.includes("\n") || str.includes('"')) {
    return `"${escaped}"`;
  }
  return str;
}

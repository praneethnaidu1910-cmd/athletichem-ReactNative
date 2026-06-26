/**
 * Centralized date utilities for timezone-safe daily logic.
 *
 * Policy: All "today" computations use the viewer's browser local timezone.
 * Coach views show data relative to the coach's local timezone (Option A).
 * DB timestamp columns (created_at) are queried with UTC-converted local day bounds.
 * DB date columns (log_date, metric_date, score_date) use local date keys directly.
 */

/**
 * Returns yyyy-MM-dd in the browser's local timezone.
 * Use for date columns (log_date, metric_date, score_date).
 */
export function getLocalDateKey(date?: Date): string {
  const d = date ?? new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Returns local midnight → next local midnight as UTC ISO strings.
 * Use for filtering timestamp columns (e.g. workouts.created_at).
 *
 * @param dateKey - yyyy-MM-dd in local timezone. Defaults to today.
 * @returns { startUtcIso, endUtcIso } — use .gte(col, start).lt(col, end)
 */
export function getLocalDayBoundsUtc(dateKey?: string): {
  startUtcIso: string;
  endUtcIso: string;
} {
  const key = dateKey ?? getLocalDateKey();
  const [y, m, d] = key.split("-").map(Number);

  // Local midnight for the given date
  const start = new Date(y, m - 1, d, 0, 0, 0, 0);
  // Local midnight for the next date (handles DST automatically)
  const end = new Date(y, m - 1, d + 1, 0, 0, 0, 0);

  return {
    startUtcIso: start.toISOString(),
    endUtcIso: end.toISOString(),
  };
}

/**
 * Returns a local date key offset by `daysAgo` days from today.
 */
export function getLocalDateKeyDaysAgo(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return getLocalDateKey(d);
}

/**
 * Parses a yyyy-MM-dd date key as a local calendar date.
 * Important: avoid `new Date("yyyy-MM-dd")`, which is interpreted as UTC.
 */
export function parseLocalDateKey(dateKey: string): Date {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

/**
 * Formats a yyyy-MM-dd date key for display in the viewer's local timezone.
 */
export function formatLocalDateKey(
  dateKey: string,
  options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
): string {
  return parseLocalDateKey(dateKey).toLocaleDateString("en-US", options);
}

/**
 * Converts a UTC timestamp string to a local date key.
 * Use when grouping timestamp-based records (e.g. workouts) by local day.
 */
export function utcTimestampToLocalDateKey(utcTimestamp: string): string {
  return getLocalDateKey(new Date(utcTimestamp));
}

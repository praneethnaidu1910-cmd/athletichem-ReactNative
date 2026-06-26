/**
 * Maps raw Supabase/PostgreSQL error messages to user-friendly text.
 * Falls back to a generic message if no match is found.
 */
export function friendlyError(rawMessage: string | undefined | null): string {
  if (!rawMessage) return "Something went wrong. Please try again.";

  const msg = rawMessage.toLowerCase();

  // --- Auth / Signup errors ---
  // Use generic messages to prevent user enumeration (CRIT-06)
  if (msg.includes("user already registered") || msg.includes("already been registered")) {
    return "If this email is not yet registered, a verification link has been sent. Please check your inbox.";
  }
  if (msg.includes("invalid login credentials") || msg.includes("invalid credentials")) {
    return "Invalid email or password. Please check your credentials and try again.";
  }
  if (msg.includes("email not confirmed")) {
    return "Unable to sign in. If you recently signed up, check your inbox for a verification link.";
  }
  if (msg.includes("signup is disabled") || msg.includes("signups not allowed")) {
    return "New signups are currently disabled. Please contact support.";
  }
  if (msg.includes("password") && (msg.includes("too short") || msg.includes("at least") || msg.includes("characters"))) {
    return "Password must be at least 10 characters with uppercase, lowercase, a number, and a special character.";
  }
  if (msg.includes("password") && msg.includes("pwned")) {
    return "This password has appeared in a data breach. Please choose a different password.";
  }
  if (msg.includes("rate limit") || msg.includes("too many requests") || msg.includes("over_request_rate_limit") || msg.includes("over_email_send_rate_limit")) {
    return "Too many attempts. Please wait a moment and try again.";
  }
  if (msg.includes("current password is incorrect") || msg.includes("re-authentication") || msg.includes("reauthentication") || msg.includes("requires reauthentication")) {
    return "Current password is incorrect. Please try again.";
  }
  if (msg.includes("invalid email") || msg.includes("unable to validate email")) {
    return "Please enter a valid email address.";
  }

  // --- Email change errors (HIGH-06) ---
  // Generic message to avoid enumeration and to never surface raw GoTrue text.
  if (
    msg.includes("email_change") ||
    msg.includes("email change") ||
    msg.includes("email_exists") ||
    msg.includes("email address already") ||
    msg.includes("same_email") ||
    msg.includes("new email") ||
    msg.includes("email_address_invalid") ||
    msg.includes("reauth")
  ) {
    return "We couldn't update your email. Please confirm both addresses from the links we sent.";
  }

  // --- Database / RLS errors ---
  if (msg.includes("duplicate key") || msg.includes("unique constraint") || msg.includes("already exists")) {
    return "This entry already exists. Please update it instead.";
  }
  if (msg.includes("violates not-null constraint")) {
    return "A required field is missing. Please fill in all required fields.";
  }
  if (msg.includes("violates check constraint")) {
    return "One or more values are out of the allowed range.";
  }
  if (msg.includes("violates foreign key constraint")) {
    return "This record references data that doesn't exist.";
  }
  if (msg.includes("permission denied") || msg.includes("rls") || msg.includes("row-level security")) {
    return "You don't have permission to perform this action.";
  }
  if (msg.includes("jwt expired") || msg.includes("invalid jwt") || msg.includes("not authenticated")) {
    return "Your session has expired. Please sign in again.";
  }
  if (msg.includes("network") || msg.includes("fetch") || msg.includes("failed to fetch")) {
    return "Network error. Please check your connection and try again.";
  }
  if (msg.includes("timeout")) {
    return "The request timed out. Please try again.";
  }

  return "Something went wrong. Please try again.";
}

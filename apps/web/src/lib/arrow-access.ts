type ClerkEmailAddress = {
  emailAddress?: string | null;
};

type ClerkUserLike = {
  primaryEmailAddress?: ClerkEmailAddress | null;
  emailAddresses?: ClerkEmailAddress[] | null;
};

export function getArrowAllowedEmails(
  raw = process.env.ARROW_ALLOWED_EMAILS || "",
): ReadonlySet<string> {
  const emails = raw
    .split(/[\s,;]+/)
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  return new Set(emails);
}

export function getUserPrimaryEmail(user: ClerkUserLike | null | undefined) {
  return (
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.find((email) => email.emailAddress)?.emailAddress ||
    null
  );
}

export function isArrowAllowedEmail(
  email: string | null | undefined,
  allowedEmails = getArrowAllowedEmails(),
) {
  if (!email) return false;
  return allowedEmails.has(email.trim().toLowerCase());
}

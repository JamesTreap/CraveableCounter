export function daysSince(timestamp: Date): number {
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime(); // difference in milliseconds
  const diffDays = diffMs / (1000 * 60 * 60 * 24); // convert to days
  return Math.floor(diffDays); // round down to full days
}

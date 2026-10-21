/** Display helpers for API values. */

const CONSULTATION_TIME_ZONE = "Asia/Riyadh";

/** "Sun, 18 Oct · 09:30". `date` is the API's calendar date (midnight UTC). */
export function formatSlot(date: string, time: string): string {
  const day = new Date(date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  return `${day} · ${time}`;
}

/** "18" and "Oct" for the overview's date block. */
export function dayAndMonth(date: string): { day: string; month: string } {
  const d = new Date(date);
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit", timeZone: "UTC" }),
    month: d.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" }),
  };
}

/** "Just now", "5m ago", "2h ago", "3d ago", then "12 Mar 2026". */
export function timeAgo(iso: string, now = Date.now()): string {
  const minutes = Math.floor((now - new Date(iso).getTime()) / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(iso);
}

/** "12 Mar 2026". */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/** Today's date (YYYY-MM-DD) on the consultation clock, to tell upcoming bookings from past ones. */
export function consultationToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: CONSULTATION_TIME_ZONE }).format(new Date());
}

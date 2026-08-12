export function formatRelativeTime(unixSeconds: number): string {
  const diff = Math.max(0, Math.floor(Date.now() / 1000 - unixSeconds))

  if (diff < 60) return "now"

  if (diff < 3600) {
    const m = Math.floor(diff / 60)
    return `${m} minute${m > 1 ? "s" : ""} ago`
  }

  if (diff < 86400) {
    const h = Math.floor(diff / 3600)
    return `${h} hour${h > 1 ? "s" : ""} ago`
  }

  const d = Math.floor(diff / 86400)
  return `${d} day${d > 1 ? "s" : ""} ago`
}

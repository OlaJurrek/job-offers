export function formatDate(date: Date) {
  return date
    .toLocaleString()
    .replace(/ (AM|PM)/, "&nbsp;$1")
    .replace(/&nbsp;/, "\u00A0");
}

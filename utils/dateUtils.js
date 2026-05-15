export function formatDate(isoString) {
  if (!isoString) return null;
  const [year, month, day] = isoString.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function isOverdue(isoString) {
  if (!isoString) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [year, month, day] = isoString.split('-').map(Number);
  return new Date(year, month - 1, day) < today;
}

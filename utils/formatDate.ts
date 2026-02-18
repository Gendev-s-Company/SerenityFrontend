export function formatDate(dateString: string | Date): string {
  if (!dateString) return ""; // si la valeur est null ou undefined
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
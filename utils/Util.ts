

export function getCurrency (amount: number,lang: string='fr', currency:string='MGA'){
    return new Intl.NumberFormat(lang, {
    style: "currency",
    currency: currency,
}).format(amount)
}

export const dateToBackend = (isoString : string) => {
  if (!isoString) return "";

  const date = new Date(isoString);
  
  // 1. Ajouter manuellement 3 heures (3 * 60 * 60 * 1000 ms)
  const offsetDate = new Date(date.getTime() + (3 * 60 * 60 * 1000));

  // 2. Convertir en format ISO et retirer le 'Z' final
  // .toISOString() donne "2026-02-23T20:00:11.960Z"
  // .replace('Z', '') donne "2026-02-23T20:00:11.960"
  return offsetDate.toISOString().replace('Z', '');
};